import fileinput
import os
import subprocess


for line in fileinput.input("v1.txt"):
	sp = line.split('?')
	ln = line.rsplit()
	print ln[0]
	mv_file = 'mv %s %s' %(ln[0], sp[0])
	print mv_file
	subprocess.call(mv_file, shell=True)


print 'done'

