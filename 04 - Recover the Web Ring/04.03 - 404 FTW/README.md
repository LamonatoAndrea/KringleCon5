# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Web Ring
### 404 FTW
Difficulty: :christmas_tree:
The next attack is [forced browsing](https://owasp.org/www-community/attacks/Forced_browsing) where the naughty one is guessing URLs. What's the first successful URL path in this attack?

#### Hints
##### HTTP Status Codes
*From: Alabaster Snowball*  
With forced browsing, there will be many 404 status codes returned from the web server. Look for 200 codes in that group of 404s. This one can be completed with the PCAP or the log file.

#### Solution
Knowing the attacker is going to be guessing URLs, I searched for all URLs with a `404` response code followed by a `200` for the known malicious IP address in the `weberror.log` file:
```bash
thedead@dellian:~$ grep "18.222.86.32" weberror.log | grep -B1 "404 -" | grep "200 -"
18.222.86.32 - - [05/Oct/2022 16:47:46] "GET /proc HTTP/1.1" 200 -
18.222.86.32 - - [05/Oct/2022 16:47:47] "GET /maintenance.html HTTP/1.1" 200 -
```
The answer is the first URL identified: `/proc`.

---
## Recover the Web Ring

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