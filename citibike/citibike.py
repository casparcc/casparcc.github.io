import json
import urllib2

STATION = 174 #find a better way to do this... (reverse table lookup)

response = urllib2.urlopen('https://gbfs.citibikenyc.com/gbfs/en/station_status.json')
station_status = response.read()
status = json.loads(station_status)

i = urllib2.urlopen('https://gbfs.citibikenyc.com/gbfs/en/station_information.json').read()
information = json.loads(i)

name  = information['data']['stations'][STATION]['name']
bikes =      status['data']['stations'][STATION]['num_bikes_available']
docks =      status['data']['stations'][STATION]['num_docks_available']

f = open('information.json', 'w')
f.write(i)

print "%s: %s Bikes, %s Docks" % (name, bikes, docks)

# print status['data']['stations']['num_baikes_available']