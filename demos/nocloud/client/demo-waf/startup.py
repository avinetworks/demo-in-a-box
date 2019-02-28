#!/usr/bin/python

import subprocess
from multiprocessing import Process
import os
import time



#----- USE ENV VARS TO FIND VS IPs
#----- os.environ




#----- Add VS FQDN entries
#cmd = 'echo "169.254.10.3    waf.demovip.avi.local" >> /etc/hosts'
#result = subprocess.check_output(cmd, shell=True)
#time.sleep(1)


#----- Add traffic shaping
cmd = '/bin/bash /opt/avi/client/netem'
result = subprocess.check_output(cmd, shell=True)
time.sleep(1)


#----- Add additional interface IPs
cmd = '/etc/init.d/networking stop; /etc/init.d/networking start'
result = subprocess.check_output(cmd, shell=True)
time.sleep(1)






script_list = [
    '/usr/bin/python /opt/avi/client/vs_demo/brokenlink_vs.py 169.254.10.1 >> /opt/avi/client/vs_demo/brokenlink_vs.log',
    '/usr/bin/python /opt/avi/client/vs_demo/ssl_traffic.py 169.254.10.1 >> /opt/avi/client/vs_demo/ssl_traffic.log',
    '/usr/bin/python /opt/avi/client/waf/waf_traffic.py >> /opt/avi/client/waf/waf_traffic.log'
    ]


def run_script(script):
    result = subprocess.check_output(script, shell=True)




while True:
    proc = []
    for s in script_list:
        p = Process(target = run_script, args = (s,))
        p.start()
        proc.append(p)
    for p in proc:
        p.join()
