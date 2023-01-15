# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Web Ring
### Credential Mining
Difficulty: :christmas_tree:
The first attack is a [brute force](https://owasp.org/www-community/attacks/Brute_force_attack) login. What's the first username tried?

#### Hints
##### Wireshark String Searching
*From: Alabaster Snowball*  
The site's login function is at `/login.html`. Maybe start by [searching](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkFindPacketSection.html) for a string.

#### Solution
Considering the hint about the login page and the already known attacker’s IP address, I used tshark and extracted the first POST payload toward `/login.html`:
```bash
thedead@dellian:~$ tshark -r victim.pcap -T fields -e http.file_data "ip.src==18.222.86.32 && http.request.uri contains login.html && http.request.method==POST" | head -n 1
username=alice&password=philip
```

---
## Recover the Web Ring
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