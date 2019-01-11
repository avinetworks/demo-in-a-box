root_check() {
    if ! [ $(id -u) = 0 ]; then
        echo "=====> this script must be run as root"
        exit 1
    fi
}



distro_check() {
    if command -v apt-get &> /dev/null; then
        pkg_mgr="apt-get"
        apt-get update
    elif command -v yum &> /dev/null; then
        pkg_mgr="yum"
        yum install -y firewalld
    elif [ "$(uname)" == "Darwin" ]; then
        pkg_mgr="mac"
    fi
}


check_for_pip() {
    if command -v pip &> /dev/null; then
        echo "=====> python-pip is already installed "
    else
        echo "=====> python-pip is missing, installing "
        if [ $pkg_mgr = "yum" ]; then
            if  ! yum repolist | grep epel; then
                echo "=====> epel repo is required for python-pip install, installing epel "
                yum install -y epel-release
            fi
            echo "=====> installing python-pip "
            yum install -y python-pip
        elif [ $pkg_mgr = "apt-get" ]; then
            apt-get install -y python-pip
        elif [ $pkg_mgr = "mac" ]; then
            easy_install pip
        fi
    fi
}



check_for_dockerpy() {
    if python -c "import docker" &> /dev/null; then
        echo "=====> docker-py already installed"
    else
        echo "=====> docker-py is missing, installing"
        pip install docker-py --upgrade
    fi
}


check_for_avisdk() {
    pip install avisdk --upgrade
    #pip install avisdk==18.1.5b3 --upgrade
    #if python -c "import avi" &> /dev/null; then
    #    echo "=====> avisdk already installed"
    #else
    #    echo "=====> avisdk is missing, installing"
    #    pip install avisdk --upgrade
    #fi
}



check_for_ansible() {
    if command -v ansible &> /dev/null; then
        echo "=====> ansible is already installed"
    else
        echo "=====> ansible is missing, installing"
        check_for_pip
        pip install 'ansible==2.6.4' --upgrade
    fi
}


check_for_ansible_roles() {
    if ansible-galaxy list avinetworks.docker | grep "not found" &> /dev/null; then
        echo "=====> ansible avinetworks.docker role not installed"
        ansible-galaxy install avinetworks.docker
    else
        echo "=====> ansible avinetworks.docker role already installed"
    fi
    if ansible-galaxy list avinetworks.avicontroller | grep "not found" &> /dev/null; then
        echo "=====> ansible avinetworks.avicontroller role not installed"
        ansible-galaxy install avinetworks.avicontroller
    else
        echo "=====> ansible avinetworks.avicontroller role already installed"
    fi
    if ansible-galaxy list avinetworks.avisdk | grep "not found" &> /dev/null; then
        echo "=====> ansible avinetworks.avisdk role not installed"
        ansible-galaxy install avinetworks.avisdk
    else
        echo "=====> ansible avinetworks.avisdk role already installed"
    fi
    if ansible-galaxy list avinetworks.aviconfig | grep "not found" &> /dev/null; then
        echo "=====> ansible avinetworks.aviconfig role not installed"
        ansible-galaxy install avinetworks.aviconfig
    else
        echo "=====> ansible avinetworks.aviconfig role already installed"
    fi
}



check_for_unzip() {
    if command -v unzip &> /dev/null; then
        echo "=====> unzip is already installed"
    else
        echo "=====> unzip is missing, installing"
        if [ $pkg_mgr = "yum" ]; then
            yum install -y unzip
        elif [ $pkg_mgr = "apt-get" ]; then
            apt-get install -y unzip
        fi
    fi
}


check_for_curl() {
    if command -v curl &> /dev/null; then
        echo "=====> curl is already installed"
    else
        echo "=====> curl is missing, installing"
        if [ $pkg_mgr = "yum" ]; then
            yum install -y curl
        else
            apt-get install -y curl
        fi
    fi
}


dependency_check() {
    echo "=====> Checking for dependencies"
    check_for_ansible
    check_for_dockerpy
    check_for_avisdk
    check_for_ansible_roles
    check_for_unzip
    check_for_curl
    rm -rf /usr/local/lib/python2.7/dist-packages/ansible/modules/network/avi
    rm -rf /usr/lib/python2.7/site-packages/ansible/modules/network/avi
}


download_files() {
    curl -sSLk https://github.com/avinetworks/demo-in-a-box/archive/master.zip --output avidemo.zip
    unzip -nq avidemo.zip
}


playbook_install_demo() {
    echo "=====> Begin executing ansible playbooks to install demo"
    for a in "${cmd_args[@]}"; do
        if [[ "$a" == "kubernetes" ]]; then
            ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demo_single_host_kubernetes.yml
            return 0
        elif [[ "$a" == "openshift" ]]; then
            ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demo_single_host_openshift.yml
            return 0            
        fi    
    done
    ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demo_single_host.yml
}


playbook_metrics_install() {
    echo "=====> Begin executing ansible playbooks to install metrics"
    ansible-playbook -i demo-in-a-box-master/metrics/metrics_hosts demo-in-a-box-master/metrics/metrics_install.yml
}


playbook_metrics_delete() {
    echo "=====> Begin executing ansible playbooks to delete metrics"
    ansible-playbook -i demo-in-a-box-master/metrics/metrics_hosts demo-in-a-box-master/metrics/metrics_delete.yml
}



playbook_splunk_install() {
    echo "=====> Begin executing ansible playbooks to install splunk"
    ansible-playbook -i demo-in-a-box-master/splunk/splunk_hosts demo-in-a-box-master/splunk/splunk/splunk-install.yml
    ansible-playbook -i demo-in-a-box-master/splunk/splunk_hosts demo-in-a-box-master/splunk/alertconfig/app.yml
}


check_for_args() {
    for a in "${cmd_args[@]}"; do
        if [[ "$a" == "grafana" ]]; then
            playbook_metrics_install
        elif [[ "$a" == "grafana-delete" ]]; then
            playbook_metrics_delete
        elif [[ "$a" == "splunk-install" ]]; then
            playbook_splunk_install
        fi
    done
    }





retrieve_avi_versions() {
    for a in "${cmd_args[@]}"; do
        if [[ "$a" == "version" ]]; then
            echo
            echo "=====> Select the Avi version to deploy"
            echo
            versions=`curl -s https://hub.docker.com/v2/repositories/avinetworks/controller/tags/?page_size=20 | sed -e 's/[{}]/''/g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | grep name | awk '{split($0,a,"\"name\":"); print a[2]}' | sed "s/\"//g" | sed "s/ //g" | sed "/latest/d"`
            SAVEIFS=$IFS
            IFS=$'\n'
            versions=($versions)
            IFS=$SAVEIFS
            select selection in "${versions[@]}"; do
              choice="${selection}"
              [[ -n $choice ]] && break
            done < /dev/tty
            export AVI_VERSION="$choice"
            echo
            echo "=====> Version $choice selected"
            echo
        fi
    done
    }



conclusion() {
    default_iface=$(awk '$2 == 00000000 { print $1 }' /proc/net/route)
    default_ip=$(ip addr show dev "$default_iface" | awk '$1 ~ /^inet/ { sub("/.*", "", $2); print $2 }' | grep -v :)
    echo
    echo
    echo "==========> Avi Controller ============"
    echo "---------------------------------------"
    echo "==========>    https://$default_ip"
    echo "==========>    username:  admin"
    echo "==========>    password:  AviDemo1!"
    echo
    echo
    echo
    for a in "${cmd_args[@]}"; do
        if [[ "$a" == "grafana" ]]; then
            echo "==========> Grafana Info ==========="
            echo "---------------------------------------"
            echo "==========>    GUI https://$default_ip:3000"
            echo "==========>    username:  admin"
            echo "==========>    password:  AviDemo1!"
            echo
            echo
            echo
        fi
    done
    for a in "${cmd_args[@]}"; do
        if [[ "$a" == "kubernetes" ]]; then
            echo "==========> Kubernetes Info ==========="
            echo "---------------------------------------"
            echo "==========>    GUI http://$default_ip:30000"
            #echo "==========>     Demo Portal https://<server_ip>:8008"
            echo
            echo
            echo
            return 0
        elif [[ "$a" == "openshift" ]]; then
            echo "==========> Openshift Info ==========="
            echo "---------------------------------------"
            echo "==========>    GUI https://$default_ip:8443"
            echo "==========>    username:  admin"
            echo "==========>    password:  AviDemo1!"
            echo
            echo
            echo
            return 0
        fi        
    done
    echo "==========> RDP Server Info ==========="
    echo "---------------------------------------"
    echo "==========>    $default_ip:3389"
    echo "==========>    username:  admin"
    echo "==========>    password:  AviDemo1!"
    echo
    echo
    }



#-----------------------------------


root_check
#----- cmd args are passed with -s
cmd_args=("$@")
retrieve_avi_versions
distro_check
dependency_check
download_files
playbook_install_demo

check_for_args
conclusion
