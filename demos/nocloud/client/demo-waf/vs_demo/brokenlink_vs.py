#!/usr/bin/python

import time
import subprocess
import sys
import traceback
from datetime import datetime


ip_list = ["161.98.255.1", "37.60.63.2", "206.223.191.1", "23.26.110.2", "27.113.239.2", "42.97.255.1", "132.247.255.2", "14.192.95.1", "37.16.63.1", "49.213.31.2", "41.67.128.1", "27.97.1.2"]
vs = sys.argv[1]

iphone = '"Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"'
chrome = '"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"'
firefox = '"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0"'
ie = '"Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko"'
ipad = '"Mozilla/5.0(iPad; U; CPU OS 4_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F191 Safari/6533.18.5"'

#iphone = "\"Mozilla\/5.0 (iPhone CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit\/534.46 (KHTML, like Gecko) Version/5.1 Mobile\/9B206 Safari\/7534.48.3\""
#chrome = "\"Mozilla\/5.0 (Macintosh Intel Mac OS X 10_9_2) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/34.0.1847.131 Safari\/537.36\""
#firefox = "\"Mozilla\/5.0 (Windows NT 6.1 WOW64 rv:29.0) Gecko\/20100101 Firefox\/29.0\""
#ie = "\"Mozilla\/5.0 (Windows NT 6.3 WOW64 Trident\/7.0 Touch rv:11.0) like Gecko\""
#ipad = "\"Mozilla/5.0(iPad U CPU OS 4_3 like Mac OS X en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F191 Safari/6533.18.5\""


url1 = "http://"+vs+"/imgs/logo.png"
url2 = "https://"+vs+"/"
url3 = "http://"+vs+"/imgs/conversion.js"
url4 = "https://"+vs+"/imgs/header.png"
url5 = "https://"+vs+"/assets/avi.webm"
url6 = "https://"+vs+"/avinetworks/index.html"
url7 = "https://"+vs+"/index.htm"


while True:
    print '-----> STARTING NEW LOOP'
    for ip in ip_list:
        try:
            print "<<<<< Client IP: "+ip+" \n\n"
            curl = "curl --interface "+ip+" -s -s -L -k -A "+iphone+" "+url2+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            time.sleep(0.1)
            curl = "curl --interface "+ip+" -s -L -k -A "+chrome+" "+url4+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            time.sleep(0.1)
            curl = "curl --interface "+ip+" -s -L -k -A "+chrome+" "+url1+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            time.sleep(0.1)
            curl = "curl --interface "+ip+" -s -L -k -A "+firefox+" "+url5+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            time.sleep(0.1)
            curl = "curl --interface "+ip+" -s -L -k -A "+ie+" "+url6+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            curl = "curl --interface "+ip+" -s -L -k -A "+chrome+" "+url7+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            time.sleep(0.1)
            curl = "curl --interface "+ip+" -s -L -k -A "+ie+" "+url3+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            curl = "curl --interface "+ip+" -s -L -k -A "+chrome+" "+url2+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            time.sleep(0.1)
            curl = "curl --interface "+ip+" -s -L -k -A "+ipad+" "+url2+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            curl = "curl --interface "+ip+" -s -L -k -A "+ipad+" "+url3+" -o tmp"
            print curl+ "\n\n"
            result = subprocess.check_output(curl, shell=True)
            print ">>>>>\n\n"
            time.sleep(0.1)
        except:
            exception_text = traceback.format_exc()
            print(str(datetime.now())+' '+exception_text)
            print 'ERROR - moving on to next IP'
