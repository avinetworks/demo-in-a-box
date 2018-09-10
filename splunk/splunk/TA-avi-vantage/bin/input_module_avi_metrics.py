
# encoding = utf-8

import traceback
import requests
import ConfigParser
import xml.dom.minidom, xml.sax.saxutils
from multiprocessing import Process
import json
import time
import base64
import sys
import logging
import os
import cPickle as pickle
import datetime

try:
    requests.packages.urllib3.disable_warnings()
except:
    pass

'''
    IMPORTANT
    Edit only the validate_input and collect_events functions.
    Do not edit any other part in this file.
    This file is generated only once when creating the modular input.
'''
'''
# For advanced users, if you want to create single instance mod input, uncomment this method.
def use_single_instance_mode():
    return True
'''

def validate_input(helper, definition):
    """Implement your own validation logic to validate the input stanza configurations"""
    # This example accesses the modular input variable
    # avi_controller = definition.parameters.get('avi_controller', None)
    # avi_user = definition.parameters.get('avi_user', None)
    # avi_pass = definition.parameters.get('avi_pass', None)
    pass

def collect_events(helper, ew):
    """Implement your data collection logic here

    # The following examples get the arguments of this input.
    # Note, for single instance mod input, args will be returned as a dict.
    # For multi instance mod input, args will be returned as a single value.
    opt_avi_controller = helper.get_arg('avi_controller')
    opt_avi_user = helper.get_arg('avi_user')
    opt_avi_pass = helper.get_arg('avi_pass')
    # In single instance mode, to get arguments of a particular input, use
    opt_avi_controller = helper.get_arg('avi_controller', stanza_name)
    opt_avi_user = helper.get_arg('avi_user', stanza_name)
    opt_avi_pass = helper.get_arg('avi_pass', stanza_name)
    """
    avi_user = helper.get_arg('avi_user')
    avi_pass = helper.get_arg('avi_pass')
    avi_controller = helper.get_arg('avi_controller')
    logging.error('Accessing Avi API for metrics data')


    #----- This class is where all the test methods/functions exist and are executed
    class avi_metrics_splunk():
        def __init__(self,avi_controller, avi_user, avi_pass):
            self.avi_cluster_ip = avi_controller
            self.avi_controller = avi_controller
            self.avi_user = avi_user
            self.avi_pass = avi_pass
            #------
            vs_metric_list  = [
                'l4_server.avg_errored_connections',
                'l4_server.avg_rx_pkts',
                'l4_server.avg_bandwidth',
                'l4_server.avg_open_conns',
                'l4_server.avg_new_established_conns',
                'l4_server.avg_pool_complete_conns',
                'l4_server.apdexc',
                'l4_server.avg_total_rtt',
                'l4_client.apdexc',
                'l4_client.avg_bandwidth',
                'l4_client.avg_application_dos_attacks',
                'l4_client.avg_complete_conns',
                'l4_client.avg_connections_dropped',
                'l4_client.avg_new_established_conns',
                'l4_client.avg_policy_drops',
                'l4_client.avg_rx_pkts',
                'l4_client.avg_tx_pkts',
                'l4_client.avg_rx_bytes',
                'l4_client.avg_tx_bytes',
                'l4_client.max_open_conns',
                'l4_client.avg_lossy_connections',
                'l7_client.avg_complete_responses',
                'l7_client.avg_client_data_transfer_time',
                'l7_client.avg_resp_4xx_avi_errors',
                'l7_client.avg_resp_5xx_avi_errors',
                'l7_client.avg_resp_4xx',
                'l7_client.avg_resp_5xx',
                'l4_client.avg_total_rtt',
                'l7_server.avg_resp_latency',
                'l7_server.apdexr',
                'l7_client.avg_page_load_time',
                'l7_client.apdexr',
                'l7_client.avg_ssl_handshakes_new',
                'l7_client.avg_ssl_connections',
                'l7_server.avg_application_response_time',
                'l7_server.pct_response_errors',
                'l7_server.avg_frustrated_responses',
                'l7_server.avg_total_requests',
                'l7_client.sum_get_reqs',
                'l7_client.sum_post_reqs',
                'l7_client.sum_other_reqs',
                'l7_client.avg_frustrated_responses',
                'l7_client.avg_waf_attacks',
                'l7_client.pct_waf_attacks',
                'dns_client.avg_complete_queries',
                'dns_client.avg_domain_lookup_failures',
                'dns_client.avg_tcp_queries',
                'dns_client.avg_udp_queries',
                'dns_client.avg_udp_passthrough_resp_time',
                'dns_client.avg_unsupported_queries',
                'dns_client.pct_errored_queries',
                'dns_client.avg_domain_lookup_failures',
                'dns_client.avg_avi_errors',
                'dns_server.avg_complete_queries',
                'dns_server.avg_errored_queries',
                'dns_server.avg_tcp_queries',
                'dns_server.avg_udp_queries']
            self.vs_metric_list = ','.join(vs_metric_list)
            se_metric_list = [
                'se_if.avg_bandwidth',
                'se_stats.avg_connection_mem_usage',
                'se_stats.avg_connections',
                'se_stats.avg_connections_dropped',
                'se_stats.avg_cpu_usage',
                'se_stats.avg_disk1_usage',
                'se_stats.avg_mem_usage',
                'se_stats.avg_persistent_table_usage',
                'se_stats.avg_rx_bandwidth',
                'se_if.avg_rx_bytes',
                'se_if.avg_rx_pkts',
                'se_if.avg_rx_pkts_dropped_non_vs',
                'se_if.avg_tx_pkts',
                'se_if.avg_tx_bytes',
                'se_stats.avg_ssl_session_cache_usage',
                'se_if.avg_connection_table_usage',
                'se_stats.max_se_bandwidth',
                'se_stats.avg_eth0_bandwidth',
                'se_stats.pct_syn_cache_usage',
                'se_stats.avg_packet_buffer_usage',
                'se_stats.avg_packet_buffer_header_usage',
                'se_stats.avg_packet_buffer_large_usage',
                'se_stats.avg_packet_buffer_small_usage']
            self.se_metric_list = ','.join(se_metric_list)
            controller_metric_list  = [
                'controller_stats.avg_cpu_usage',
                'controller_stats.avg_disk_usage',
                'controller_stats.avg_mem_usage']
            self.controller_metric_list = ','.join(controller_metric_list)
            controller_process_metric_list = [
                'process_stats.avg_rss',
                'process_stats.avg_swap',
                'process_stats.max_cpu_pct',
                'process_stats.avg_num_threads',
                'process_stats.avg_fds',
                'process_stats.avg_pss',
                'process_stats.avg_vms']
            self.controller_process_metric_list = ','.join(controller_process_metric_list)
            #----
    
    
    
    
        def avi_login(self):
            try:
                login = pickle.load(open((os.path.join(fdir,self.avi_cluster_ip)),'rb'))
                for c in login.cookies:
                    expires = c.expires
                headers = ({"X-Avi-Tenant": "admin", 'content-type': 'application/json'})
                resp = requests.get('https://%s/api/cluster' %self.avi_cluster_ip, verify=False, headers = headers,cookies=dict(sessionid= login.cookies['sessionid']),timeout=5)
                #if expires > time.time():
                if resp.status_code == 200:
                    return login
                else:
                    login = requests.post('https://%s/login' %self.avi_cluster_ip, verify=False, data={'username': self.avi_user, 'password': self.avi_pass},timeout=15)
                    pickle.dump(login, open((os.path.join(fdir,self.avi_cluster_ip)),'wb'))
                    return login
            except:
                login = requests.post('https://%s/login' %self.avi_cluster_ip, verify=False, data={'username': self.avi_user, 'password': self.avi_pass},timeout=15)
                pickle.dump(login, open((os.path.join(fdir,self.avi_cluster_ip)),'wb'))
                return login
    
    
    
    
        def avi_request(self,avi_api,tenant):
            headers = ({"X-Avi-Tenant": "%s" %tenant, 'content-type': 'application/json'})
            return requests.get('https://%s/api/%s' %(self.avi_controller,avi_api), verify=False, headers = headers,cookies=dict(sessionid= self.login.cookies['sessionid']),timeout=50)
    
    
        def avi_post(self,api_url,tenant,payload):
            headers = ({"X-Avi-Tenant": "%s" %tenant, 'content-type': 'application/json','referer': 'https://%s' %self.avi_controller, 'X-CSRFToken': dict(self.login.cookies)['csrftoken']})
            cookies = dict(sessionid= self.login.cookies['sessionid'],csrftoken=self.login.cookies['csrftoken'])
            return requests.post('https://%s/api/%s' %(self.avi_controller,api_url), verify=False, headers = headers,cookies=cookies, data=json.dumps(payload),timeout=50)
    
    
    
        #----- Tries to determine a follower controller to poll
        def controller_to_poll(self):
            headers = ({"X-Avi-Tenant": "admin", 'content-type': 'application/json'})
            resp = (requests.get('https://%s/api/%s' %(self.avi_cluster_ip,'cluster/runtime'), verify=False, headers = headers,cookies=dict(sessionid= self.login.cookies['sessionid']),timeout=50)).json()
            follower_list = []
            if len(resp['node_states']) > 1:
                for c in resp['node_states']:
                    if c['state'] == 'CLUSTER_ACTIVE' and c['role']  == 'CLUSTER_FOLLOWER':
                        follower_list.append(c['mgmt_ip'])
                if len(follower_list) == 0:
                    return self.avi_cluster_ip
                else:
                    return sorted(follower_list)[0]
            else:
                return self.avi_cluster_ip
    
    
    
    
        #----- Creates inventory dicts to be used by other methods
        def gen_inventory_dict(self):
                start_time = time.time()
                vs_dict = {'tenants':{},'admin_vs':[]}
                se_dict={'tenants':{},'admin_se':[]}
                if self.login.json()['user']['is_superuser'] == True: #----if SU, use wildcard tenant
                    vs_inv = self.avi_request('virtualservice-inventory?page_size=1000','*').json()
                    vs_total_pages = (vs_inv['count']/1000) + (vs_inv['count'] % 1000 > 0)
                    page_number = 1
                    while vs_total_pages > page_number:
                        page_number += 1
                        resp = self.avi_request('virtualservice-inventory?page_size=1000&page='+page_number,'*').json()
                        vs_inv['results'].append(resp['results'])
                    #------------------
                    se_inv = self.avi_request('serviceengine-inventory?page_size=1000','*').json()
                    if vs_inv['count'] > 0:
                        for v in vs_inv['results']:
                            for t in self.tenants:
                                if t['url'].split('/tenant/')[1] == v['config']['tenant_ref'].split('/tenant/')[1]:
                                    temp_tenant = t['name']
                            if temp_tenant not in vs_dict['tenants']:
                                vs_dict['tenants'][temp_tenant] = {'count':1,'results':[v]}
                            else:
                                vs_dict['tenants'][temp_tenant]['count']+=1
                                vs_dict['tenants'][temp_tenant]['results'].append(v)
                            vs_dict[v['uuid']] = v['config']['name']
                            if temp_tenant == 'admin':
                                vs_dict['admin_vs'].append(v['uuid'])
                    if se_inv['count'] > 0:
                        for s in se_inv['results']:
                            for t in self.tenants:
                                if t['url'].split('/tenant/')[1] == s['config']['tenant_ref'].split('/tenant/')[1]:
                                    temp_tenant = t['name']
                            if temp_tenant not in se_dict['tenants']:
                                se_dict['tenants'][temp_tenant] = {'count':1,'results':[s]}
                            else:
                                se_dict['tenants'][temp_tenant]['count']+=1
                                se_dict['tenants'][temp_tenant]['results'].append(s)
                            se_dict[s['uuid']] = s['config']['name']
                            if temp_tenant == 'admin':
                                se_dict['admin_se'].append(s['uuid'])
                else:
                    for t in self.tenants:
                        vs_inv = self.avi_request('virtualservice-inventory?page_size=1000',t['name']).json()
                        vs_total_pages = (vs_inv['count']/1000) + (vs_inv['count'] % 1000 > 0)
                        page_number = 1
                        while vs_total_pages > page_number:
                            page_number += 1
                            resp = self.avi_request('virtualservice-inventory?page_size=1000&page='+page_number,t['name']).json()
                            vs_inv['results'].append(resp['results'])
                        #------------------
                        se_inv = self.avi_request('serviceengine-inventory?page_size=1000',t['name']).json()
                        if vs_inv['count'] > 0:
                            vs_dict['tenants'][t['name']]=vs_inv
                        for v in vs_inv['results']:
                            vs_dict[v['uuid']] = v['config']['name']
                            if t['name'] == 'admin':
                                vs_dict['admin_vs'].append(v['uuid'])
                        if se_inv['count'] > 0:
                            se_dict['tenants'][t['name']] = se_inv
                        for s in se_inv['results']:
                            se_dict[s['uuid']] = s['config']['name']
                            if t['name'] == 'admin':
                                se_dict['admin_se'].append(s['uuid'])
                temp_total_time = str(time.time()-start_time)
                logging.info(self.avi_cluster_ip+': func gen_inventory_dict completed, executed in '+temp_total_time+' seconds')
                return vs_dict, se_dict
    
    
    
    
        #-----------------------------------
    
    
        def srvc_engn_stats(self):
            #try:
                temp_start_time = time.time()
                discovered_ses = []  #--- this is used b/c se in admin show up in other tenants
                discovered_health = []
                for t in self.tenants:
                    if t['name'] in self.se_dict['tenants'] and self.se_dict['tenants'][t['name']]['count'] > 0:
                        payload = {
                            "metric_requests": [
                                {
                                    "step": 300,
                                    "limit": 1,
                                    "aggregate_entity": False,
                                    "entity_uuid": "*",
                                    "se_uuid": "*",
                                    "id": "collItemRequest:AllSEs",
                                    "metric_id": self.se_metric_list
                                }
                                ]}
                        se_stat = self.avi_post('analytics/metrics/collection?pad_missing_data=false', t['name'], payload).json()
                        payload = {
                            "metric_requests": [
                                {
                                    "step": 5,
                                    "limit": 1,
                                    "aggregate_entity": False,
                                    "entity_uuid": "*",
                                    "se_uuid": "*",
                                    "id": "collItemRequest:AllSEs",
                                    "metric_id": self.se_metric_list
                                }
                                ]}
                        realtime_stat = self.avi_post('analytics/metrics/collection?pad_missing_data=false', t['name'], payload).json()
                        if 'series' in realtime_stat:
                            se_stat['series']['collItemRequest:AllSEs'].update(realtime_stat['series']['collItemRequest:AllSEs'])
                        for s in se_stat['series']['collItemRequest:AllSEs']:
                            if s in self.se_dict:
                                se_name = self.se_dict[s]
                                if se_name not in discovered_ses:
                                    discovered_ses.append(se_name)
                                    for entry in se_stat['series']['collItemRequest:AllSEs'][s]:
                                        if 'data' in entry:
                                            temp = {}
                                            temp['timestamp']=int(time.time())
                                            temp['se_name'] = se_name
                                            temp['avi_controller'] = self.avi_cluster_ip
                                            temp['metric_type'] = 'serviceengine_metrics'
                                            temp['metric_name'] = entry['header']['name']
                                            temp['metric_value'] = entry['data'][0]['value']
                                            event = helper.new_event(json.dumps(temp)+'\n')
                                            event.write_to(sys.stdout)
                temp_total_time = str(time.time()-temp_start_time)
                logging.info(self.avi_cluster_ip+': func srvc_engn_stats completed, executed in '+temp_total_time+' seconds')
            #except:
            #    pass

    
        #-----------------------------------
    
        def srvc_engn_dispatcher_cpu_usage(self):
            #try:
                temp_start_time = time.time()
                srvc_engn_dict = {}
                discovered_ses = []
                for t in self.tenants:
                    if t['name'] in self.se_dict['tenants'] and self.se_dict['tenants'][t['name']]['count'] > 0:
                        for entry in self.se_dict['tenants'][t['name']]['results']:
                            if entry['uuid'] not in discovered_ses:
                                discovered_ses.append(entry['uuid'])
                                dispatcher_usage = self.avi_request('serviceengine/%s/cpu' %entry['uuid'],t['name']).json()
                                if type(dispatcher_usage) == list:
                                    for cpu_resp in dispatcher_usage[0]['process_cpu_utilization']:
                                        if 'dp' in cpu_resp['process_name']:
                                            temp = {}
                                            temp['timestamp']=int(time.time())
                                            temp['se_name'] = entry['config']['name']
                                            temp['avi_controller'] = self.avi_cluster_ip
                                            temp['metric_type'] = 'serviceengine_dispatcher_usage'
                                            temp['metric_value'] = cpu_resp['process_cpu_usage']
                                            event = helper.new_event(json.dumps(temp)+'\n')
                                            event.write_to(sys.stdout)
                temp_total_time = str(time.time()-temp_start_time)
                logging.info(self.avi_cluster_ip+': func srvc_engn_dispatcher_cpu_usage completed, executed in '+temp_total_time+' seconds')
            #except:
            #    pass
    
    
        #-----------------------------------
        #-----------------------------------
        #--- This function will loop through all tenants pulling the following statistics
        #--- for all Virtual Services.
        def virtual_service_stats_threaded(self):
            proc = []
            for t in self.tenants:
                t_name = t['name']
                p = Process(target = self.virtual_service_stats, args = (t_name,))
                p.start()
                proc.append(p)
            for p in proc:
                p.join()
    
    
    
        def virtual_service_stats(self,tenant):
                temp_start_time = time.time()
                #-----
                if tenant in self.vs_dict['tenants'] and self.vs_dict['tenants'][tenant]['count'] > 0:
                    endpoint_payload_list = []
                    payload =  {'metric_requests': [{'step' : 300, 'limit': 1, 'id': 'allvs', 'entity_uuid' : '*', 'metric_id': self.vs_metric_list}]}
                    vs_stats = self.avi_post('analytics/metrics/collection?pad_missing_data=false', tenant, payload).json()
                    #----- this pulls 1 min avg stats for vs that have realtime stats enabled
                    payload =  {'metric_requests': [{'step' : 5, 'limit': 1, 'id': 'allvs', 'entity_uuid' : '*', 'metric_id': self.vs_metric_list}]}
                    realtime_stats = self.avi_post('analytics/metrics/collection?pad_missing_data=false', tenant, payload).json()
                    #----- overwrites real time vs' 5 min avg with the 1 min avg
                    if 'series' in realtime_stats:
                        vs_stats['series']['allvs'].update(realtime_stats['series']['allvs'])
                    #----- THIS IS NEW
                    for v in vs_stats['series']['allvs']:
                        if v in self.vs_dict:
                            vs_uuid = v
                            vs_name = self.vs_dict[vs_uuid]
                            for m in vs_stats['series']['allvs'][v]:
                                metric_name = m['header']['name']
                                if 'data' in m:
                                    temp = {}
                                    temp['timestamp']=int(time.time())
                                    temp['vs_name'] = vs_name
                                    temp['avi_controller'] = self.avi_cluster_ip
                                    temp['metric_name'] = metric_name
                                    temp['metric_type'] = 'virtualservice_metrics'
                                    temp['metric_value'] = m['data'][0]['value']
                                    event = helper.new_event(json.dumps(temp)+'\n')
                                    event.write_to(sys.stdout)
                #-----------------------------------
                #----- SEND SUM OF VS_COUNT LIST - TOTAL NUMBER OF VS
                temp_total_time = str(time.time()-temp_start_time)
                logging.info(self.avi_cluster_ip+': func virtual_service_stats completed for tenant: '+tenant+', executed in '+temp_total_time+' seconds')

    
    
    
    
        def vs_metrics_per_se_threaded(self):
                temp_start_time = time.time()
                major,minor = self.login.json()['version']['Version'].rsplit('.',1)
                if float(major) >= 17.2 and float(minor) >= 8: #----- controller metrics api introduced in 17.2.5
                    proc = []
                    for t in self.tenants:
                        if t['name'] in self.se_dict['tenants'] and self.se_dict['tenants'][t['name']]['count'] > 0:
                            p = Process(target = self.vs_metrics_per_se, args = (t['name'],))
                            p.start()
                            proc.append(p)
                        elif 'admin' in self.se_dict['tenants'] and self.se_dict['tenants']['admin']['count'] > 0:
                            p = Process(target = self.vs_metrics_per_se, args = (t['name'],))
                            p.start()
                            proc.append(p)
                    for p in proc:
                            p.join()
                    temp_total_time = str(time.time()-temp_start_time)
                    logging.info(self.avi_cluster_ip+': func vs_metrics_per_se_threaded completed, executed in '+temp_total_time+' seconds')

    
    
    
        def vs_metrics_per_se(self,tenant):
                temp_start_time = time.time()
                endpoint_payload_list = []
                payload =  {'metric_requests': [{'step' : 300, 'limit': 1, 'id': 'vs_metrics_by_se', 'entity_uuid' : '*', 'serviceengine_uuid': '*', 'include_refs': True, 'metric_id': self.vs_metric_list}]}
                vs_stats = self.avi_post('analytics/metrics/collection?pad_missing_data=false', tenant, payload).json()
                #----- this will pull 1 min stats for vs that have realtime stat enabled
                payload =  {'metric_requests': [{'step' : 5, 'limit': 1, 'id': 'vs_metrics_by_se', 'entity_uuid' : '*', 'serviceengine_uuid': '*', 'include_refs': True, 'metric_id': self.vs_metric_list}]}
                realtime_stats = self.avi_post('analytics/metrics/collection?pad_missing_data=false', tenant, payload).json()
                #----- overwrite 5 min avg stats with 1 min avg stats for vs that have realtime stats enabled
                if 'series' in realtime_stats:
                    vs_stats['series']['vs_metrics_by_se'].update(realtime_stats['series']['vs_metrics_by_se'])
                if len(vs_stats['series']['vs_metrics_by_se']) > 0:
                    for entry in vs_stats['series']['vs_metrics_by_se']:
                        if tenant == 'admin' and entry not in self.vs_dict['admin_vs']:
                            continue
                        elif tenant != 'admin' and entry in self.vs_dict['admin_vs']:
                            continue
                        else:
                            vs_name = self.vs_dict[entry]
                            for d in vs_stats['series']['vs_metrics_by_se'][entry]:
                                if 'data' in d:
                                    se_name = self.se_dict[d['header']['serviceengine_ref'].split('serviceengine/')[1]]
                                    temp = {}
                                    temp['timestamp']=int(time.time())
                                    temp['vs_name'] = vs_name
                                    temp['avi_controller'] = self.avi_cluster_ip
                                    temp['se_name'] = se_name
                                    temp['metric_type'] = 'virtualservice_metrics_per_serviceengine'
                                    temp['metric_name'] = d['header']['name']
                                    temp['metric_value'] = d['data'][0]['value']
                                    event = helper.new_event(json.dumps(temp)+'\n')
                                    event.write_to(sys.stdout)                    
                    temp_total_time = str(time.time()-temp_start_time)
                    logging.info(self.avi_cluster_ip+': func vs_metrics_per_se_threaded completed, executed in '+temp_total_time+' seconds')

    
    
    
    
        #----- PULL VS HEALTHSCORES
        def vs_se_healthscores(self):
            #----- PULL VS HEALTHSCORES
            #try:
                temp_start_time = time.time()
                discovered_vs = []
                discovered_se = []
                for t in self.tenants:
                    if t['name'] in self.vs_dict['tenants'] and self.vs_dict['tenants'][t['name']]['count'] > 0:
                        for v in self.vs_dict['tenants'][t['name']]['results']:
                            if v['uuid'] not in discovered_vs:
                                discovered_vs.append(v['uuid'])
                                vs_name = v['config']['name']
                                temp_dict = {}
                                temp_dict['healthscore'] = v['health_score']['health_score']
                                temp_dict['resources_penalty'] = v['health_score']['resources_penalty']
                                temp_dict['anomaly_penalty'] = v['health_score']['anomaly_penalty']
                                temp_dict['performance_score'] = v['health_score']['performance_score']
                                temp_dict['security_penalty'] = v['health_score']['security_penalty']
                                for h in temp_dict:
                                    vs_healthscore = v['health_score']['health_score']
                                    temp = {}
                                    temp['timestamp']=int(time.time())
                                    temp['metric_name'] = h
                                    temp['avi_controller'] = self.avi_cluster_ip
                                    temp['vs_name'] = vs_name
                                    temp['metric_type'] = 'virtualservice_healthscore'
                                    temp['metric_value'] = temp_dict[h]
                                    event = helper.new_event(json.dumps(temp)+'\n')
                                    #ew.write_event(event)
                                    event.write_to(sys.stdout)
                    if t['name'] in self.se_dict['tenants'] and self.se_dict['tenants'][t['name']]['count'] > 0:
                        for s in self.se_dict['tenants'][t['name']]['results']:
                            if s['uuid'] not in discovered_se:
                                discovered_se.append(s['uuid'])
                                se_healthscore = s['health_score']['health_score']
                                temp1_dict = {}
                                temp1_dict['healthscore'] = s['health_score']['health_score']
                                temp1_dict['resources_penalty'] = s['health_score']['resources_penalty']
                                temp1_dict['anomaly_penalty'] = s['health_score']['anomaly_penalty']
                                temp1_dict['performance_score'] = s['health_score']['performance_score']
                                temp1_dict['security_penalty'] = s['health_score']['security_penalty']
                                for h in temp1_dict:
                                    temp = {}
                                    temp['timestamp']=int(time.time())
                                    temp['metric_name'] = h
                                    temp['avi_controller'] = self.avi_cluster_ip
                                    temp['se_name'] = self.se_dict[s['uuid']]
                                    temp['metric_type'] = 'serviceengine_healthscore'
                                    temp['metric_value'] = temp1_dict[h]
                                    event = helper.new_event(json.dumps(temp)+'\n')
                                    event.write_to(sys.stdout)
                temp_total_time = str(time.time()-temp_start_time)
                logging.info(self.avi_cluster_ip+': func vs_healthscores completed, executed in '+temp_total_time+' seconds')
            #except:
            #    pass

    
    
    
    
        #-----------------------------------
        #----- GET customer Member specific statistics - WORKING ON
        def controller_cluster_metrics(self):
            #try:
                temp_start_time = time.time()
                major,minor = self.login.json()['version']['Version'].rsplit('.',1)
                if float(major) >= 17.2 and float(minor) >= 6: #----- controller metrics api introduced in 17.2.6
                    cluster= self.avi_request('cluster','admin').json()
                    cluster_nodes = {}
                    temp_list=[]
                    endpoint_payload_list = []
                    for c in cluster['nodes']:
                        cluster_nodes[c['vm_uuid']]=c['ip']['addr']
                        #cluster_nodes[c['vm_uuid']]=c['vm_hostname']
                        resp = self.avi_request('analytics/metrics/controller/%s/?metric_id=%s&limit=1&step=300&?aggregate_entity=False' %(c['vm_uuid'],self.controller_metric_list),'admin').json()
                        temp_list.append(resp)
                    for n in temp_list:
                        node = cluster_nodes[n['entity_uuid']]
                        for m in n['series']:
                            temp = {}
                            temp['timestamp']=int(time.time())
                            temp['metric_name'] = m['header']['name']
                            temp['controller_name'] = node
                            temp['avi_controller'] = self.avi_cluster_ip
                            temp['metric_type'] = 'controller_metrics'
                            temp['metric_value'] = m['data'][0]['value']
                            event = helper.new_event(json.dumps(temp)+'\n')
                            event.write_to(sys.stdout)
                temp_total_time = str(time.time()-temp_start_time)
                logging.info(self.avi_cluster_ip+': func controller_cluster_metrics completed, executed in '+temp_total_time+' seconds')
            #except:
            #    pass

    
    
    
    
        def gather_metrics(self):
            #try:
                start_time = time.time()
                self.login = self.avi_login()
                self.tenants = self.login.json()['tenants']
                self.avi_controller = self.controller_to_poll()
                self.vs_dict, self.se_dict = self.gen_inventory_dict()
                #----- Do not remove
                event = helper.new_event('Avi metric script starting\n')
                ew.write_event(event)
                #-----------------------------------
                #----- Add Test functions to list for threaded execution
                #-----------------------------------
                test_functions = []
                test_functions.append(self.srvc_engn_stats)
                test_functions.append(self.virtual_service_stats_threaded)
                test_functions.append(self.vs_metrics_per_se_threaded)
                test_functions.append(self.vs_se_healthscores)
                test_functions.append(self.controller_cluster_metrics)
                #-----------------------------------
                #-----------------------------------
                #-----
                #-----------------------------------
                #----- BEGIN Running Test Functions
                #-----------------------------------
                proc = []
                for f in test_functions:
                    p = Process(target = f, args = ())
                    p.start()
                    proc.append(p)
                for p in proc:
                    p.join()
                #-----------------------------------
                #-----
                #-----------------------------------
                #----- Log time it took to execute script
                #-----------------------------------
                total_time = str(time.time()-start_time)
            #except:
            #    pass

    
        def run(self):
            self.gather_metrics()
    
    
    fdir = os.path.abspath(os.path.dirname(__file__))    
    c = avi_metrics_splunk(avi_controller, avi_user, avi_pass)
    c.run()
    sys.exit(0)

