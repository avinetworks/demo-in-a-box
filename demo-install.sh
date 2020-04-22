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
}


check_for_ansible() {
    if command -v ansible &> /dev/null; then
        echo "=====> ansible is already installed"
        currentver="$(ansible --version | grep -m 1 ansible | awk '{split($0,a,"ansible"); print a[2]}')"
        requiredver="2.6.4"
        if [ "$(printf '%s\n' "$requiredver" "$currentver" | sort -n | head -n1)" = "$requiredver" ]; then 
            echo "=====> ansible version greater than 2.6.4"
        else
            echo "=====> ansible version less than 2.6.4"
            pip install 'ansible==2.6.4' --upgrade
        fi
    else
        echo "=====> ansible is missing, installing"
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


check_for_unbuffer() {
    if command -v unbuffer &> /dev/null; then
        echo "=====> unbuffer is already installed"
    else
        echo "=====> unbuffer is missing, installing"
        if [ $pkg_mgr = "yum" ]; then
            yum install -y expect
        else
            apt-get install -y expect-dev
        fi
    fi
}


check_for_cleanup() {
    for a in "${cmd_args[@]}"; do
        if [[ "$a" == "cleanup" ]]; then
            download_files
            demo=$(docker inspect --format '{{ index .Config.Labels "demo"}}' avicontroller)
            ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demos/demo_cleanup.yml
            exit 0
            #if [ "$demo" == "default" ]; then
            #    ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demo_single_host_delete.yml
            #    exit 0
            #elif [ "$demo" == "kubernetes" ]; then
            #    ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demo_single_host_kubernetes_delete.yml
            #    exit 0
            #elif [ "$demo" == "openshift" ]; then
            #    ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demo_single_host_openshift_delete.yml
            #    exit 0
            #fi
        fi
    done
    }


check_for_change_version() {
    for a in "${cmd_args[@]}"; do
        if [[ "$a" == "change_version" ]]; then
            export AVI_VERSION_CHANGE="true"
            demo=$(docker inspect --format '{{ index .Config.Labels "demo"}}' avicontroller)
            retrieve_avi_versions
            download_files
            if [[ "$demo" == "default" ]]; then
                ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demos/nocloud/nocloud_change_ver.yml
                exit 0
            elif [[ "$demo" == "kubernetes" ]]; then
                ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demos/kubernetes/kubernetes_controller_change_ver.yml
                exit 0
            elif [[ "$demo" == "openshift" ]]; then
                ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demos/openshift/openshift_controller_change_ver.yml
                exit 0
            fi
            
        fi
    done
    }
    

dependency_check() {
    echo "=====> Checking for dependencies"
    check_for_pip
    check_for_ansible
    check_for_dockerpy
    check_for_avisdk
    check_for_ansible_roles
    check_for_unzip
    check_for_curl
    check_for_unbuffer
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
            result=$(unbuffer ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demos/kubernetes/demo_kubernetes.yml | tee /dev/tty)
            if  [[ $result =~ "failed=1" ]]; then
                echo "=====> ERROR: install script encountered an error"
                exit 1
            else
                return 0
            fi      
        elif [[ "$a" == "openshift" ]]; then
            result=$(unbuffer ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demos/openshift/demo_openshift.yml | tee /dev/tty)
            if  [[ $result =~ "failed=1" ]]; then
                echo "=====> ERROR: install script encountered an error"
                exit 1
            else
                return 0
            fi 
        elif [[ "$a" == "nocloud" ]]; then
           result=$(unbuffer ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demos/nocloud/demo_nocloud.yml | tee /dev/tty)
           if  [[ $result =~ "failed=1" ]]; then
               echo "=====> ERROR: install script encountered an error"
               exit 1
            else
                return 0     
            fi   
        fi    
    done
    result=$(unbuffer ansible-playbook -i demo-in-a-box-master/hosts demo-in-a-box-master/demos/nocloud/demo_nocloud.yml | tee /dev/tty)
    if  [[ $result =~ "failed=1" ]]; then
        echo "=====> ERROR: install script encountered an error"
        exit 1
    else
        return 0
    fi
}


playbook_metrics_install() {
    echo "=====> Begin executing ansible playbooks to install metrics"
    ansible-playbook -i demo-in-a-box-master/demos/metrics/metrics_hosts demo-in-a-box-master/demos/metrics/metrics_install.yml
}


playbook_metrics_delete() {
    echo "=====> Begin executing ansible playbooks to delete metrics"
    ansible-playbook -i demo-in-a-box-master/demos/metrics/metrics_hosts demo-in-a-box-master/demos/metrics/metrics_delete.yml
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
        if [[ "$a" == "version" ]] || [[ "$a" == "change_version" ]]; then
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


set_controller_sizes() {
    INDEX=0
    for a in "${cmd_args[@]}"; do
        #echo "processing arg $a ${INDEX}"
        if [[ "$a" == "controller-memory" ]]; then
            echo
            export AVI_CONTROLLER_MEMORY="${cmd_args[INDEX+1]}"
            echo "=====> Using Controller Memory ${AVI_CONTROLLER_MEMORY} GB"
            echo
            break
        fi
        let INDEX=${INDEX}+1
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
            break
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
check_for_cleanup
check_for_change_version
retrieve_avi_versions
set_controller_sizes
distro_check
dependency_check
download_files
playbook_install_demo

check_for_args
conclusion

