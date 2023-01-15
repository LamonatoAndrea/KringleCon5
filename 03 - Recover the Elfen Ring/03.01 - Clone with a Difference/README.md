# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Elfen Ring
### Clone with a Difference
Difficulty: :christmas_tree:  
Clone a code repository. Get hints for this challenge from Bow Ninecandle in the Elfen Ring.

#### Hints
##### HTTPS Git Cloning
*From: Bow Ninecandle*  
There's a consistent format for Github repositories cloned via HTTPS. Try converting!

#### Solution
Trying to clone the repo over SSH results in a permission denied error. The hint is “HTTPS Git Cloning”, so let’s just try to clone it over HTTPS:
```bash
bow@fa95bb60d384:~$ git clone https://haugfactory.com/asnowball/aws_scripts.git
Cloning into 'aws_scripts'...
remote: Enumerating objects: 64, done.
remote: Total 64 (delta 0), reused 0 (delta 0), pack-reused 64
Unpacking objects: 100% (64/64), 23.83 KiB | 1.83 MiB/s, done.
```
That worked, so let’s get the last word of the `README` file:
```bash
bow@fa95bb60d384:~$ tail -n1 aws_scripts/README.md | rev | cut -d " " -f 1 | rev
maintainers.
```
The solution is `maintainers` and can be confirmed with `runtoanswer`:
```bash
bow@fa95bb60d384:~$ runtoanswer
Read that repo!
What's the last word in the README.md file for the aws_scripts repo?

> maintainers
Your answer: maintainers

Checking......
Your answer is correct!
```

---
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