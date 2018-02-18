---
layout: post
title: Python Demos -- Passive OpenSource Recon
tags: [Python, InfoSec]
---


# pcap tricks + recon

A few years ago I gave a talk @ RIT SPARSA detailing some interesting Python libraries that provide a simplified gateway into the beginning statges of a pentest event.  These are only a scraching of the surface.  The rabbit hole goes deeper than this ... much, much deeper.

The repo is found here: [https://github.com/mypluribus/pyrecon](https://github.com/mypluribus/pyrecon)

These demos require:

    python 2.7.3
    dpkt: https://pypi.python.org/pypi/dpkt
    BeautifulSoup: http://www.crummy.com/software/BeautifulSoup/
    pywhois: https://code.google.com/p/pywhois/
    geoip2: https://pypi.python.org/pypi/geoip2
    dnslib: https://pypi.python.org/pypi/dnslib
    Maxmind GeoLiteCity Database: http://www.maxmind.com/
    shodan: https://pypi.python.org/pypi/shodan
    shodan API key: shodanhq.com


The idea of this demo is to be able to capture some benign network traffic and learn how much insight could be gathered from it.  So, to begin, capture some ethernet/ip traffic and and save it to a file somewhere.  For my use case, I'm hitting the target's website with a browser (make sure to turn off adblock and noscript addons for greater mileage).

## Parsing Packets

Next, run:

{% highlight bash %}
    ./parse_eth.py --pcap [ your pcap here ]
{% endhighlight %}

Most of the heavy lifting here is done by the `dpkt` library written by Doug Song.  The `dpkt` library is not entirely well documented, but there are enough examples out there to get you started.  In this case, we're just initializing a pcap `Reader` object and iterating over the resulting timestamp (`ts`) and data buffers.  After that, `dpkt` has some helper classes to extract the relavent information (in this case, the ethernet frame).  After that we can just test for the IP protocol and start peeling back the onion to extract IP addresses and data:
 
{% highlight python linenos %}
with open(path, 'r') as f:
    pcap = dpkt.pcap.Reader(f)
    for (ts, buf) in pcap:
        try:
            eth = dpkt.ethernet.Ethernet(buf)
            if eth.type == 2048:
                ...
{% endhighlight %}

A list of unique IP addresses can be output using a set within the nested loop (once src_ip and dst_ip are collected) like so:

{% highlight python linenos %}
    ##
    ## collect unique IP using a set
    ##
    if uniq_ip is None:
        uniq_ip = set({})

    uniq_ip.add(ip_src)
    uniq_ip.add(ip_src)
{% endhighlight %}

Then later output the completed set:

{% highlight python linenos %}
for x in sorted(uniq_ip):
    print('%s'%x)
{% endhighlight %}

## IP to ASN Mapping

Once you have a list of unique IP addresses, save it to a file.  This file can be passed on to the [Team Cymru IP to ASN mapping service](http://www.team-cymru.org/IP-ASN-mapping.html).  Make sure to prepend the file with the word `begin`, and append `end`, each on a their own line so that all of the IP addresses are sent in a single TCP connection.  Otherwise you'll risk being null routed by Team Cymru.

Now run:

{% highlight bash %}
    ./ipwhois.py --ipfile [ your_ip_file.txt ]
{% endhighlight %}

Affectively we're calling the command:

{% highlight bash %}
netcat whois.cymru.com 43 < list01 | sort -n > list02
{% endhighlight %}

This provides a little bit of insight into the services that are being utilized by the target 

## Geolocation

Geolocation is not a new practice.  One of the most common (free) methods of geolocating IP addresses is to cross reference the MaxMind GeoLiteCity database.  MaxMind has released their own Python library to interact directly with thier free downloads found here: [MaxMind Geolite City Database](https://dev.maxmind.com/geoip/geoip2/geolite2/)

{% highlight bash linenos %}
./geoloc.py --ipfile [ip file here] --geodb [geolite DB here]
{% endhighlight %}

The output of this script is a colon separated list containing IP:LAT:LON.  Save this to a file file.  This geolocation is as accurate as the free Maxmind GeoLite database ... so your mileage may vary.  Next we'll use Python to create a KML file to visualize this data in Google Earth.

{% highlight bash linenos %}
./kml.py --geodata [ geodata file here ] --outfile [ KML output file here ]
{% endhighlight %}

This makes a very simple KML file for Google Earth.  Other info could be added to the `cdata` portion to make this file a bit more interesting, but I'll leave that as an experiment for the reader.

## HTTP Headers

In my case, I have some HTTP data in my packet capture.  These HTTP requests were thoses that I initiated as well as those that were initiated asynchronously via JavaScript.  These are often more interesting, and can illustrate different service usages or 3rd party partnerships.  To parse out the HTTP requests and responses we'll trigger on common HTTP TCP ports 80 and 8080.

{% highlight bash %}
./http.py --pcap [ pcap file here ]
{% endhighlight %}

Assuming that your traffic capture contains HTTP traffic (not HTTPS), you should see a list of URLS that were requested.

## DNS

`dpkt` can also be used to extract DNS requests and responses.  This has many wide ranging uses, we'll scratch the surface here:

{% highlight bash %}
./dns.py --pcap [ pcap file here ]
{% endhighlight %}

Assuming that your traffic capture contains DNS traffic, you should now see a list of DNS reqests and responses, along with the IP of the source and destination.  This technique will often turn up obscure OCSP servers, thrid party ad partnershipts (potentially full of your target's data) and can add potential unknown targets to the scope of your investigation.  Use your foo to extract a list of unique hosts.

## Host based whois

Using the hotsnames collected form the DNS queries in the PCAP we can get the information of all of the domain registrants.  Typically large corporations mask much of thier domain whois info, but once in a while there are some easter eggs in there.

{% highlight bash %}
./hostwhois.py --hosts [ host file here ]
{% endhighlight %}

A list of registrant names, email addresses and name servers will fly by as you watch.  Yippie!  More fodder.  Also interesting to note, outside the scope of this article, there are some legacy whois databases out there that contain whois information from a time **before** it was possible to mask.

## Shodan

The Shodan service is out there scanning the web everyday, and making this info available to security researchers.  While there was a time that this service was free, it is no longer.  I was lucky enough to get a couple keys back in those days.  If you weren't, make sure to put Black Friday on your calendar because Shodan typically has a sale on keys (~$20 USD).

You can use the same list of hosts to search Shodan to scrape lots of interesting info, including server version strings.  Run:

{% highlight bash %}
./shdan.py --hosts [ host file here ]
{% endhighlight %}

This is going to make a call to shodanhq.com using their web API.  You should see a list of IPs and the servers they are running as well as a list of any additional domains that IP has been registered to.  Extract a unique list of servers in the form of IP:SERVER and write to a file.  

## ExploitDB

Once upon a time you would have been able to take your list of servers and scrape exploit-db.com ... but apparently that's no longer kosher, because it doesn't work anymore, and one try will evidently get you blacklisted.  So, have a look at exploitdb.py for now, and then skip to the next exercise.

{% highlight bash %}
./exploitdb.py --servers [ server file here ]
{% endhighlight %}

## BONUS: Tor

Tor demo that illustrates the use of Tor in python.  You might want to 
reconfigure some of these scripts to use it.  Requires:

    stem: https://pypi.python.org/pypi/stem/
    socksipy: https://code.google.com/p/socksipy-branch/

Run:

{% highlight bash %}
./tordemo.py
{% endhighlight %}

Perhaps modifying the above exploit-db.com example might benefit from the method shown here ... dunno.

# References
 * [dpkt Documentation](https://dpkt.readthedocs.io/en/latest/)
 * [Team Cymru IP to ASN mapping service](http://www.team-cymru.org/IP-ASN-mapping.html)