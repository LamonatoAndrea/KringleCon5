# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Tolkien Ring
### Suricata Regatta
Difficulty: :christmas_tree::christmas_tree::christmas_tree:

Help detect this kind of malicious activity in the future by writing some Suricata rules. Work with Dusty
Giftwrap in the Tolkien Ring to get some hints.

#### Solution
There are already some rules in the `suricata.rules` file:
```bash
alert http any any -> any any (msg:"FILE tracking PNG (1x1 pixel) (1)"; filemagic:"PNG image data, 1 x 1,"; sid:19; rev:1;)
```
```bash
alert http $EXTERNAL_NET any -> $HOME_NET any (msg:"ET HUNTING Possible ELF executable sent when remote host claims to send a Text File"; flow:established,from_server; http.header; content:"Content-Type|3a 20|text/plain"; file.data; content:"|7f 45 4c 46|"; startswith; fast_pattern; isdataat:3000,relative; classtype:bad-unknown; sid:2032973; rev:1; metadata:updated_at 2021_05_18;)
```
```bash
alert ip any any -> any any (msg:"SURICATA IPv4 invalid checksum"; ipv4-csum:invalid; classtype:protocol-command-decode; sid:2200073; rev:2;)
```
```bash
alert ip [199.184.82.0/24,199.184.223.0/24] any -> $HOME_NET any (msg:"ET DROP Spamhaus DROP Listed Traffic Inbound group 27"; reference:url,www.spamhaus.org/drop/drop.lasso; threshold: type limit, track by_src, seconds 3600, count 1; classtype:misc-attack; flowbits:set,ET.Evil; flowbits:set,ET.DROPIP; sid:2400026; rev:3398; metadata:updated_at 2022_10_06;)
```
```bash
alert dns $HOME_NET any -> any any (msg:"ET WEB_CLIENT Malicious Chrome Extension Domain Request (stickies .pro in DNS Lookup)"; dns.query; content:"stickies.pro"; nocase; sid:2025218; rev:4;)
```
```bash
alert tcp any any -> any any (msg:"SURICATA Applayer No TLS after STARTTLS"; flow:established; app-layer-event:applayer_no_tls_after_starttls; flowint:applayer.anomaly.count,+,1; classtype:protocol-command-decode; sid:2260004; rev:2;)
```
```bash
alert pkthdr any any -> any any (msg:"SURICATA IPv4 total length smaller than header size"; decode-event:ipv4.iplen_smaller_than_hlen; classtype:protocol-command-decode; sid:2200002; rev:2;)
```
```bash
alert udp any any -> any 123 (msg:"ET DOS Possible NTP DDoS Inbound Frequent Un-Authed GET_RESTRICT Requests IMPL 0x02"; content:"|00 02 10|"; offset:1; depth:3; byte_test:1,!&,128,0; byte_test:1,&,4,0; byte_test:1,&,2,0; byte_test:1,&,1,0; threshold: type both,track by_dst,count 2,seconds 60; classtype:attempted-dos; sid:2019021; rev:3; metadata:created_at 2014_08_26, updated_at 2014_08_26;)
```

The challenge requires 4 alert rules: DNS lookups to adv.epostoday.uk , HTTP traffic to 192.185.57.242 ,
traffic where the Certificate subject is eardbellith.Icanwepeh.nagoya and gzip -ed HTTP response
containing let byteCharacters = atob within the body. Below the 4 rules I used in the above order:
```bash
alert dns any any -> any any (msg:"Known bad DNS lookup, possible Dridex infection"; dns.query; content:"adv.epostoday.uk"; nocase; sid:1; rev:1;)
```
```bash
alert http any any <> 192.185.57.242 any (msg:"Investigate suspicious connections, possible Dridex infection"; sid:2; rev:1;)
```
```bash
alert tls any any <> any any (msg:"Investigate bad certificates, possible Dridex infection"; tls.cert_subject; content:"CN=heardbellith.Icanwepeh.nagoya"; isdataat:!1,relative; sid:3; rev:1;)
```
```bash
alert http any any <> any any (msg:"Suspicious JavaScript function, possible Dridex infection"; http.accept_enc; http.response_body; content:"let byteCharacters = atob"; sid:4; rev:1;)
```

Below the execution `./rule_checker`:
```bash
elf@6061ca6b4d4a:~$ echo 'alert dns any any -> any any (msg:"Known bad DNS lookup, possible Dridex infection"; dns.query; content:"adv.epostoday.uk"; nocase; sid:1; rev:1;)' >> suricata.rules
elf@6061ca6b4d4a:~$ echo 'alert http any any <> 192.185.57.242 any (msg:"Investigate suspicious connections, possible Dridex infection"; sid:2; rev:1;)' >> suricata.rules
elf@6061ca6b4d4a:~$ echo 'alert tls any any <> any any (msg:"Investigate bad certificates, possible Dridex infection"; tls.cert_subject; content:"CN=heardbellith.Icanwepeh.nagoya"; isdataat:!1,relative; sid:3; rev:1;)' >> suricata.rules
elf@6061ca6b4d4a:~$ echo 'alert http any any <> any any (msg:"Suspicious JavaScript function, possible Dridex infection"; http.accept_enc; http.response_body; content:"let byteCharacters = atob"; sid:4; rev:1;)' >> suricata.rules
elf@6061ca6b4d4a:~$ ./rule_checker
rm: cannot remove '/home/elf/logs/*': No such file or directory
6/1/2023 -- 12:37:19 - <Notice> - This is Suricata version 6.0.8 RELEASE running in USER mode
6/1/2023 -- 12:37:20 - <Notice> - all 5 packet processing threads, 4 management threads initialized, engine started.
6/1/2023 -- 12:37:20 - <Notice> - Signal Received. Stopping engine.
6/1/2023 -- 12:37:20 - <Notice> - Pcap-file module read 1 files, 5172 packets, 3941260 bytes
First rule looks good!
Second rule looks good!
Third rule looks good!
Fourth rule looks good! You've done it - thank you!
```

---
## Recover the Tolkien Ring
### The Tolkien Ring
## Recover the Elfen Ring
### Clone with a Difference
### Prison Escape
### Jolly CI/CD
### The Elfen Ring
## Recover the Web Ring
### Naughty IP
### Credential Mining
### 404 FTW
### IMDS, XXE, and Other Abbreviations
### Open Boria Mine Door
### Glamtariel's Fountain
### The Web Ring
## Recover the Cloud Ring
### AWS CLI Intro
### Trufflehog Search
### Exploitation via AWS CLI
## Recover the Burning Ring of Fire
### Buy a Hat
### Blockchain Divination
### Exploit a Smart Contract
### Mistakes were made... the key
### The Burning Ring of Fire
## [Narrative](/README.md#narrative)
## [Conclusions](/README.md#conclusions)
### [The Victors shop](/README.md#the-victors-shop)
### [Inbox (1)](/README.md#inbox-1)
---
## [thedead@dellian:~$ whoami](/README.md#thedeaddellian-whoami)
## KringleCon Orientation
## Recover the Tolkien Ring
### Wireshark Practice