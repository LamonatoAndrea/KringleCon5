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
By dragging the first set of images in different parts of the background the Fountain and the Princess will reply with a specific message. The JS scripts behind the images also change and get reloaded with a new version followed by the timestamp (e.g. `images-1672661334202.js` where `1672661334202` is the output of `(new Date()).getTime();`). Images can be dropped on the Fountain, the Princess, both or none of them. When the whole set of images has been dropped on both the Fountain and the Princess, the draggable images change. The second set of draggable images is: a ring![ring](imgs/ring.png), a boat![boat](imgs/boat.png), an igloo![igloo](imgs/igloo.png) and a star![star](imgs/star.png). When the silver ring is dragged on top of the fountain the “ominous” eye[![ominousEye](imgs/ominousEyeSmall.png)](imgs/ominousEye.png) appears and has to be clicked away to proceed. When the whole second set of images has been dropped on both the Fountain and the Princess, a third set appears. The third set is: two blue rings![blueRing](imgs/blueRing.png), a silver ring![silverRing](imgs/silverRing.png) and a red ring![redRing](imgs/redRing.png).

###### The `\dropped` endpoint
Each time an object is dragged and dropped somewhere it fires an AJAX request toward the endpoint `/dropped`. The request payload resembles the following JSON:
```js
{
"imgDrop":"img2", // The image being dropped
"who":"princess", // Whom it is being dropped on
"reqType":"json" // "json"
}
```
Possible values of `imgDrop` are: `img1`, `img2`, `img3`, `img4`. Possible values of `who` are: `both`, `fountain`, `princess`, `none`. The `reqType` field is being programmatically set to `json` in the [`ajax.js`](https://glamtarielsfountain.com/static/js/ajax.js) file.
A CSRF token passed in the headers with the name `x-grinchum`. Cookies contain two keys named `GCLB` and `MiniLembanh`.
Below the execution of the request to `/dropped`:
```bash
thedead@dellian:~$ curl 'https://glamtarielsfountain.com/dropped' -H 'content-type: application/json' -H 'cookie: GCLB="63922974e8c3e53a"; MiniLembanh=e0bce14e-5def-4cf5-87f3-01ffc0bf7a54.vX7-q6DlZ1N25L8BqwRQB8F9qHM' -H 'x-grinchum: IjVlMzBmN2VmYWExYmJjOTczZjE2N2I1MTFiYjExODQyZjE4OTQxYWYi.Y7KxeQ.8XicSOhk_PCYaQx6gEsIvnvb4nY' --data-raw '{"imgDrop":"img2","who":"princess","reqType":"json"}'
{
  "appResp": "I've told you all I know about Kringle.^Visions come, visions go.",
  "droppedOn": "princess",
  "visit": "none"
}
```
The response is a JSON with following contents:
```js
{
  "appResp": "I've told you all I know about Kringle.^Visions come, visions go.", // The response of the princess and the fountain, in this order, separated by ^
  "droppedOn": "princess", // Whom the object was dropped on 
  "visit": "none" // Eventually populated with an URL pointing to an image that would be shown in the center of the background
}
```
###### Timeouts, MiniLembanh and `x-grinchum`

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