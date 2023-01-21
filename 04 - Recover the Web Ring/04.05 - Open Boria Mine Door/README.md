# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Web Ring
### Open Boria Mine Door
Difficulty: :christmas_tree::christmas_tree::christmas_tree:
Open the door to the Boria Mines. Help Alabaster Snowball in the Web Ring to get some hints for this challenge.

#### Hints
##### Lock Mechanism
*From: Alabaster Snowball*
The locks take input, render some type of image, and process on the back end to unlock. To start, take a good look at the source HTML/JavaScript.
##### Content-Security-Policy
*From: Alabaster Snowball*
Understanding how [Content-Security-Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) works can help with this challenge.
##### Input Validation
*From: Alabaster Snowball*
Developers use both client- and server-side [input validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) to keep out naughty input.

#### Solution
##### Lock #1
First thing I noticed, is that each lock is a iframe on its own, so I opened the source code of the first lock
identifying a comment within the HTML code:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lock 1</title>
    <link rel="stylesheet" href="pin.css">
</head>
<body>
    <form method='post' action='pin1'>
        <!-- @&@&&W&&W&&&& -->
        <input class='inputTxt' name='inputTxt' type='text' value='' autocomplete='off' />
        <button>GO</button>
    </form>
    <div class='output'></div>
    <img class='captured'/>
    
    <!-- js -->
    <script src='pin.js'></script>
</body>
</html>
```
The string `@&@&&W&&W&&&&` inside the comment resolves lock #1.

##### Lock #2
The second lock didn’t have comments in the code but considering the suggestion on input sanitization, I thought it was possible to inject HTML. The following line of code solves lock #2:
```html
<div style="background:white; width:1000px; height:1000px"></div>
```

##### Lock #3
Previous solution didn’t work on the third one. With a similar idea, I tried using SVG to draw inside the box. The following line of code solves lock #3:
```html
<svg width="1000" height="1000"><rect width="1000" height="1000" fill="blue" /></svg>
```

##### Lock #4
Same solution of lock #3, just with some more code:
```html
<svg width="1000" height="1000">
  <rect y=23 width="1000" height="25" fill="#00ff00" />
  
  <rect y=60 width="1000" height="25" fill="red" />
  <rect y=60 x=190 width="10" height="1000" fill="red" />
  
  <rect y=100 width="180" height="25" fill="blue" />
  <rect y=100 x=140 width="10" height="1000" fill="blue" />
</svg>
```

##### Lock #5
It was not possible to insert code directly in the input field because of a client side input sanitization inside the HTML code. By injecting the code directly in the request with Burp it was possible to bypass the input sanitization:  
![lock5](imgs/lock5.png)  
The payload used is the following:
```html
<svg width="1000" height="1000">
  <rect width="10" height="1000" fill="red" />
  <rect y=40 width="1000" height="10" fill="red" />
  
  <rect y=160 x=30 width="1000" height="10" fill="blue" />
  <rect y=50 x=190 width="10" height="1000" fill="blue" />
</svg>
```

##### Lock #6
Here I applied the same solution of lock #5:  
![lock6](imgs/lock6.png)  
The payload used is the following:
```html
<svg width="1000" height="1000">
  <rect y=40 width="1000" height="10" fill="white" />

  <rect y=130 width="1000" height="10" fill="blue" />
</svg>
```

#### All Locks!
Just to take a look at my drawing skills:  
![allLocks](imgs/allLocks.png)  

---
### [Glamtariel's Fountain (Recover the Web Ring)](/04%20-%20Recover%20the%20Web%20Ring/04.06%20-%20Glamtariel's%20Fountain/README.md)
### [The Web Ring (Recover the Web Ring)](/04%20-%20Recover%20the%20Web%20Ring/04.07%20-%20The%20Web%20Ring/README.md)
### [AWS CLI Intro (Recover the Cloud Ring)](/05%20-%20Recover%20the%20Cloud%20Ring/05.01%20-%20AWS%20CLI%20Intro/README.md)
### [Trufflehog Search (Recover the Cloud Ring)](/05%20-%20Recover%20the%20Cloud%20Ring/05.02%20-%20Trufflehog%20Search/README.md)
### [Exploitation via AWS CLI (Recover the Cloud Ring)](/05%20-%20Recover%20the%20Cloud%20Ring/05.03%20-%20Exploitation%20via%20AWS%20CLI/README.md)
### [The Cloud Ring (Recover the Cloud Ring)](/05%20-%20Recover%20the%20Cloud%20Ring/05.04%20-%20The%20Cloud%20Ring/README.md)
### [Buy a Hat (Recover the Burning Ring of Fire)](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.01%20-%20Buy%20a%20Hat/README.md)
### [Blockchain Divination (Recover the Burning Ring of Fire)](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.02%20-%20Blockchain%20Divination/README.md)
### [Exploit a Smart Contract (Recover the Burning Ring of Fire)](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.03%20-%20Exploit%20a%20Smart%20Contract/README.md)
### [Mistakes were made… the key (Recover the Burning Ring of Fire)](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.04%20-%20Mistakes%20were%20made…%20the%20key/README.md)
### [The Burning Ring of Fire (Recover the Burning Ring of Fire)](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.05%20-%20The%20Burning%20Ring%20of%20Fire/README.md)
### [Narrative](/README.md#narrative)
### [Conclusions](/README.md#conclusions)
---
### [thedead@dellian:~$ whoami](/README.md#thedeaddellian-whoami)
### [KringleCon Orientation](/01%20-%20KringleCon%20Orientation/README.md)
### [Wireshark Practice (Recover the Tolkien Ring)](/02%20-%20Recover%20the%20Tolkien%20Ring/02.01%20-%20Wireshark%20Practice/README.md)
### [Windows Event Logs (Recover the Tolkien Ring)](/02%20-%20Recover%20the%20Tolkien%20Ring/02.02%20-%20Windows%20Event%20Logs/README.md)
### [Suricata Regatta (Recover the Tolkien Ring)](/02%20-%20Recover%20the%20Tolkien%20Ring/02.03%20-%20Suricata%20Regatta/README.md)
### [The Tolkien Ring (Recover the Tolkien Ring)](/02%20-%20Recover%20the%20Tolkien%20Ring/02.04%20-%20The%20Tolkien%20Ring/README.md)
### [Clone with a Difference (Recover the Elfen Ring)](/03%20-%20Recover%20the%20Elfen%20Ring/03.01%20-%20Clone%20with%20a%20Difference/README.md)
### [Prison Escape (Recover the Elfen Ring)](/03%20-%20Recover%20the%20Elfen%20Ring/03.02%20-%20Prison%20Escape/README.md)
### [Jolly CI_CD (Recover the Elfen Ring)](/03%20-%20Recover%20the%20Elfen%20Ring/03.03%20-%20Jolly%20CI_CD/README.md)
### [The Elfen Ring (Recover the Elfen Ring)](/03%20-%20Recover%20the%20Elfen%20Ring/03.04%20-%20The%20Elfen%20Ring/README.md)
### [Naughty IP (Recover the Web Ring)](/04%20-%20Recover%20the%20Web%20Ring/04.01%20-%20Naughty%20IP/README.md)
### [Credential Mining (Recover the Web Ring)](/04%20-%20Recover%20the%20Web%20Ring/04.02%20-%20Credential%20Mining/README.md)
### [404 FTW (Recover the Web Ring)](/04%20-%20Recover%20the%20Web%20Ring/04.03%20-%20404%20FTW/README.md)
### [IMDS, XXE, and Other Abbreviations (Recover the Web Ring)](/04%20-%20Recover%20the%20Web%20Ring/04.04%20-%20IMDS,%20XXE,%20and%20Other%20Abbreviations/README.md)