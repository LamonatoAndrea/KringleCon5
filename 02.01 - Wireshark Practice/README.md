# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Tolkien Ring
### Wireshark Practice
Difficulty: :christmas_tree:

Use the Wireshark Phishing terminal in the Tolkien Ring to solve the mysteries around the [suspicious PCAP](https://storage.googleapis.com/hhc22_player_assets/suspicious.pcap). Get hints for this challenge by typing hint in the upper panel of the terminal.

### Solution
Please note that I used both the file `suspicious.pcap`, downloaded from above URL, and `pcap_challenge.pcap`, present inside the terminal. Their `md5` hashes match and are `f0450df7d1bf6e695f80a61259083307`.

#### Question 1 - What type of objects can be exported from this PCAP? - Answer: `http`
The Wireshark “Export objects” functionality finds only HTTP exportable objects:
![Wireshark "Export" HTTP Object list](imgs/wireshark.png)

Interestingly enough there are 2 `app.php` files of different sizes. `Diff`ing the two files it is possible to observe a base64 encoded payload.

#### Question 2 - What is the file name of the largest file we can export? - Answer: `app.php`
Wireshark’s “Export HTTP object list” window also shows filenames.

#### Question 3 - What packet number starts that app.php file? - Answer: `687`
Wireshark’s “Export HTTP object list” window also shows the initial packet for the file download.

#### Question 4 - What is the IP of the Apache server? - Answer: `192.185.57.242`
Filter on the packet number and get the source IP:
```bash
elf@2c6b9deef396:~$ tshark -r pcap_challenge.pcap -T fields -e ip.src "frame.number == 687"
192.185.57.242
```

#### Question 5 - What file is saved to the infected host? - Answer: `Ref_Sept24-2020.zip`
By analyzing the modified `app.php` it is possible to notice that some JS code was added. This chunk of code contains a base64 encoded payload that gets decoded and downloaded with abovementioned filename:
```js
saveAs(blob1, 'Ref_Sept24-2020.zip');
```
The zip file contains a file named `Ref_Sept24-2020.scr` which is recognized by [multiple AV solutions](https://www.virustotal.com/gui/file/fad001d463e892e7844040cabdcfa8f8431c07e7ef1ffd76ffbd190f49d7693d) as being `Dridex` malware.

#### Question 6 - Attackers used bad TLS certificates in this traffic. Which countries were they registered to? - Answer: `Irelan, Israel, South Sudan`
It is possible to extract all the countries with `tshark` and some commands:
```bash
elf@2c6b9deef396:~$ tshark -r pcap_challenge.pcap -V | grep "DNSequence item: 1 item (id-at-countryName=" | cut -d = -f 2 | cut -d ")" -f1 | sort | uniq
IE
IL
SS
US
```
These four countries map to: IE ➤ Ireland, IL ➤ Israel, SS ➤ South Sudan, US ➤ United States. At this
point it is enough to order them excluding the pretty obvious “United States” from the list.

#### Question 7 - Is the host infected (Yes/No)? - Answer: `Yes`
It is possible to observe that after the malicious content is retrieved, the host does a connection to `adv.epostoday.uk` which is a [known Dridex IOC](https://github.com/Esox-Lucius/PiHoleblocklists/blob/main/Dridex%20IOCs%20-%20Domains%20%26%20Hosts):
```bash
elf@2c6b9deef396:~$ tshark -r pcap_challenge.pcap -V "frame.number > 687 && ip.src == 10.9.24.101 && dns" | grep "type A" | cut -d " " -f9 | cut -d ":" -f 1 | sort | uniq
adv.epostoday.uk
array807.prod.do.dsp.mp.microsoft.com
array811.prod.do.dsp.mp.microsoft.com
cp801.prod.do.dsp.mp.microsoft.com
disc801.prod.do.dsp.mp.microsoft.com
dns.msftncsi.com
edge.microsoft.com
geo.prod.do.dsp.mp.microsoft.com
kv801.prod.do.dsp.mp.microsoft.com
localdomain.localdomain
v10.events.data.microsoft.com
wpad.localdomain
www.bing.com
```

---
### Windows Event Logs
### Suricata Regatta
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