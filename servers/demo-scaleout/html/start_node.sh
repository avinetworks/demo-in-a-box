#!/bin/bash
cd /usr/share/nginx/www

#PORT=7777 IP=10.10.116.12 supervisor -w delay.js delay.js &
PORT=$2 IP=$1 node delay.js &