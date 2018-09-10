## Avi Vantage Demo Setup

This project results in creating a "demo-in-a-box" of the Avi Vantage platform.  This demo setup will deploy clients, servers and virtual services all within a single host resulting in an up and running demo system within minutes.

### Prerequisites
 * Linux Server
   - RHEL
   - Centos
   - Ubuntu




### System Resources
 <table class="table table table-bordered table-hover">  
 <tbody>       
 <tr>    
 <th>
 </th>
 <th>**CPU**
 </th>
 <th>**Memory**
 </th>
 <th>**Storage**
 </th>
 </tr>
 <tr>    
 <td><strong>Recommended</strong></td>
 <td>16+</td>
 <td>64+ GB</td>
  <td>96+ GB</td>
 </tr>
 <tr>    
 <td><strong>Minimum</strong></td>
 <td>12</td>
 <td>32 GB</td>
 <td>72 GB</td>
 </tr>

 </tbody>
 </table>


## Install Instructions

### Automated Install
```
curl -sSL https://raw.githubusercontent.com/avinetworks/demo-in-a-box/master/demo-install.sh | sudo bash
```




 ## Demo Setup

 Utilizing docker containers, the "demo-in-a-box" setup is completely self contained within a single host.  

 A bridged network (<b>avinet : 169.254.0.0/16</b>) has been created for the internal docker networking.

 The table below lists the containers that will be created and amongst other information the roles they serve for the demo.  


 <table class="table table table-bordered table-hover">  
 <tbody>       
 <tr>   
 <th>CONTAINER NAME
 </th>
 <th>CONTAINER ROLE
 </th>
 <th>INTERNAL IP
 </th>
 <th>EXPOSED PORTS
 </th>
 </tr>
 <tr>    
 <td><strong>avicontroller</strong></td>
 <td>Avi Vantage controller</td>
 <td>169.254.0.100</td>
 <td>tcp:80, tcp:443, tcp:5054, tcp:5098(ssh), tcp:8443, udp:161</td>
 </tr>
 <tr>    
 <td><strong>avise1</strong></td>
 <td>Avi Service Engine</td>
 <td>169.254.0.101</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>avise2</strong></td>
 <td>Avi Service Engine</td>
 <td>169.254.0.102</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>democlient1</strong></td>
 <td>Client running scripted traffic against <strong> avi-demo-vs </strong> and <strong>waf-vs</strong> virtual services</td>
 <td>169.254.63.1</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>democlient2</strong></td>
 <td>Client running scripted traffic against <strong> avi-demo-vs </strong> and <strong>waf-vs</strong> virtual services</td>
 <td>169.254.63.2</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>scaleoutclient1</strong></td>
 <td>Client running scripted traffic against <strong> avi-scaleout-vs </strong> virtual service</td>
 <td>169.254.63.3</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>demoserver1</strong></td>
 <td>Server used for <strong> avi-demo-vs </strong> and <strong>avi-scaleout-vs</strong> virtual services</td>
 <td>169.254.127.200</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>demoserver2</strong></td>
 <td>Server used for <strong> avi-demo-vs </strong> and <strong>avi-scaleout-vs</strong> virtual services</td>
 <td>169.254.127.201</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>demoserver3</strong></td>
 <td>Server used for <strong> avi-demo-vs </strong> and <strong>avi-scaleout-vs</strong> virtual services</td>
 <td>169.254.127.203</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>wafserver1</strong></td>
 <td>Server used for <strong> waf-vs</strong> virtual service</td>
 <td>169.254.127.100</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>wafserver2</strong></td>
 <td>Server used for <strong> waf-vs</strong> virtual service</td>
 <td>169.254.127.101</td>
 <td>none</td>
 </tr>
 <tr>    
 <td><strong>rdpserver</strong></td>
 <td>An rdp server to be used to access virtual services</td>
 <td>169.254.63.0</td>
 <td>tcp:3389</td>
 </tr>
 </tbody>
 </table>

 ## How to Access

 There are two containers that are exposing services externally on the host; the Avi Controller and the RDP Server


#### Avi Controller
 The Avi Vantage Controller can be accessed through the GUI or SSH.  To access the GUI point a browser to https://<host_ip>.  To access the cli, ssh to the host ip on port 5098.  Login credentials for the Avi controller are:<br>
  - u: admin<br>
  - p: AviDemo1!

#### RDP Server
Because this demo setup is isolated within the host an RDP server is provided to allow for manual access to the virtual services.  To login to the RDP server, using an RDP client connect to the host IP on port 3389.  Login credentials for the RDP server are:<br>
 -  u: admin<br>
 -  p: AviDemo1!
