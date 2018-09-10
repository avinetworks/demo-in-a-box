#!/usr/bin/python

import subprocess
from multiprocessing import Process
import os
import time



#----- USE ENV VARS TO FIND VS IPs
#----- os.environ




#----- Add VS FQDN entries
#cmd = 'echo "169.254.10.2    scaleout.demovip.avi.local" >> /etc/hosts'
#result = subprocess.check_output(cmd, shell=True)
#time.sleep(1)





script_list = [
    '/usr/bin/python /opt/avi/client/scaleout/traffic-ecc.py >> /opt/avi/client/scaleout/traffic-ecc.log',
    '/usr/bin/python /opt/avi/client/scaleout/traffic-rsa.py >> /opt/avi/client/scaleout/traffic-rsa.log'
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
