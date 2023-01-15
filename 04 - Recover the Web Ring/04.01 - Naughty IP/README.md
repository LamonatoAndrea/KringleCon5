# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Web Ring
### Naughty IP
Difficulty: :christmas_tree:
Use [the artifacts](https://storage.googleapis.com/hhc22_player_assets/boriaArtifacts.zip) from Alabaster Snowball to analyze this attack on the Boria mines. Most of the traffic to this site is nice, but one IP address is being naughty! Which is it? Visit Sparkle Redberry in the Tolkien Ring for hints.

#### Hints
##### Wireshark Top Talkers
*From: Alabaster Snowball*  
The victim web server is 10.12.42.16. Which host is the next [top talker](https://protocoholic.com/2018/05/24/wireshark-how-to-identify-top-talkers-in-network/)?

#### Solution
Considering the hint about top talkers, I got the top talkers from the `weberror.log` file:
```bash
thedead@dellian:~$ for i in $(grep -E "^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+" weberror.log | cut -d " " -f 1 | sort | uniq); do a=$(grep $i weberror.log | wc -l); echo $a $i; done | sort -nr
1384 18.222.86.32
136 52.15.98.99
131 18.222.86.46
131 18.216.39.196
129 3.19.71.188
127 3.144.72.40
127 3.137.145.185
124 18.222.232.221
123 3.15.9.141
123 3.144.44.185
123 18.188.150.119
120 3.136.161.22
119 3.144.150.195
119 18.191.6.79
117 3.19.76.208
115 3.142.70.127
```
The answer is the top talker: `18.222.86.32`.  
![cat](imgs/cat.jpeg)  
[https://twitter.com/askubuntumemes/status/1318605978145902601](https://twitter.com/askubuntumemes/status/1318605978145902601)

---
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