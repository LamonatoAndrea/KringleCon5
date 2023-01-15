# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Web Ring
### Open Boria Mine Door
Difficulty: :christmas_tree::christmas_tree::christmas_tree::christmas_tree::christmas_tree:
Stare into Glamtariel's fountain and see if you can find the ring! What is the filename of the ring she presents you? Talk to Hal Tandybuck in the Web Ring for hints.

#### Hints
##### eXternal Entities
*From: Hal Tandybuck*
Sometimes we can hit web pages with [XXE](https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing) when they aren't expecting it!

##### Significant CASE
*From: Hal Tandybuck*
Early parts of this challenge can be solved by focusing on Glamtariel's WORDS.

#### Solution
##### Initial assessment
###### The game
The initial page contains 4 draggable images: a candy cane![candyCane](imgs/candyCane.png), a Santa![santa](imgs/santa.png), an elf![elf](imgs/elf.png) and an ice cube![iceCube](imgs/iceCube.png). There are also 2 static images: Glamtariel (aka the Princess)[![princess](imgs/princessSmall.png)](imgs/princess.png) and the Fountain[![fountain](imgs/fountainSmall.png)](imgs/fountain.png).
By dragging the first set of images in different parts of the background the Fountain and the Princess will reply with a specific message. The JS scripts behind the images also change and get reloaded with a newversion followed by the timestamp (e.g. images-1672661334202.js where is the output of (new Date()).getTime(); ). Images can be dropped on the Fountain, the Princess, both or none of them. When the whole set of images has been dropped on both the Fountain and the Princess, the draggable images change. The second set of draggable images is: a ring, a boat, an igloo and a star. When the silver ring is dragged on top of the fountain the “ominous” eye appears and has to be clicked away to proceed. When the whole second set of images has been dropped on both the Fountain and the Princess, a third set appears. The third set is: two blue rings, a silver ring and a red ring.

---
## Recover the Web Ring
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