# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Tolkien Ring
### Windows Event Logs
Difficulty: :christmas_tree::christmas_tree:  
Investigate the Windows [event log](https://storage.googleapis.com/hhc22_player_assets/powershell.evtx) mystery in the terminal or offline. Get hints for this challenge by typing hint in the upper panel of the Windows Event Logs terminal.

#### Hints
##### Built-In Hints
*From: Sparkle Redberry*  
The hardest steps in this challenge have hints. Just type `hint` in the top panel!  
##### Event Logs Exposé
*From: Sparkle Redberry*  
New to Windows event logs? Get a jump start with [Eric's talk](https://youtu.be/5NZeHYPMXAE)!

#### Solution
Please note that I used `evtx_dump.py`([python-evtx](https://pypi.org/project/python-evtx/)) to convert logs in a more readable format, the filename that will be used in commands is `powershell.evtx.dump`.

##### Question 1 - What month/day/year did the attack take place? - Answer: `12/24/2022`
Assuming there were multiple actions via PowerShell during the attack, I counted the number of logs by date and sorted by amount of logs with below command:
```bash
thedead@dellian:~$ for i in $(grep "TimeCreated" powershell.evtx.dump | cut -d '"' -f 2 | cut -d " " -f 1 | sort | uniq); do a=$(grep "$i" powershell.evtx.dump | wc -l) && echo -e "$a\t$i"; done | sort -rn
3540	2022-12-24
2811	2022-12-23
2088	2022-12-13
1422	2022-11-19
240	2022-11-11
181	2022-12-04
46	2022-10-13
36	2022-12-18
36	2022-11-26
34	2022-11-01
```
The hardest part in this question was realizing that `2022-12-24` was the right answer in the wrong format :smile:  
![date_format](imgs/date_format.jpg)  
[https://devrant.com/rants/1791863/a-perfect-date-for-a-programmer](https://devrant.com/rants/1791863/a-perfect-date-for-a-programmer)

##### Question 2 - An attacker got a secret from a file. What was the original file's name? - Answer: `recipe_updated.txt`
Searching for `secret` within the dump file allows finding multiple `Get-Content` commands against the file `Recipe.txt` and `recipe_updated.txt`, the latter being the answer.

##### Question 3 - The contents of the previous file were retrieved, changed, and stored to a variable by the attacker. This was done multiple times. Submit the last full PowerShell line that performed only these actions. - Answer: `$foo = Get-Content .\Recipe| % {$_ -replace 'honey', 'fish oil'}`
Using the regex `\$.*=` in grep allows finding variable assignments within events:
```bash
thedead@dellian:~$ grep '<Data Name="ScriptBlockText"' powershell.evtx.dump | grep -e "\$.*=" | tail -n 5
<Data Name="ScriptBlockText">$foo = Get-Content .\Recipe| % {$_ -replace 'honey', 'fish oil'} $foo | Add-Content -Path 'recipe_updated.txt'
<Data Name="ScriptBlockText">$foo = Get-Content .\Recipe| % {$_-replace 'honey','fish oil'} $foo | Add-Content -Path 'recipe_updated.txt'</Data>
<Data Name="ScriptBlockText">$foo = Get-Content .\Recipe| % {$_-replace 'honey','fish oil'}</Data>
<Data Name="ScriptBlockText">$foo = Get-Content .\Recipe| % {$_-replace 'honey','fish oil'}</Data>
<Data Name="ScriptBlockText">$foo = Get-Content .\Recipe| % {$_ -replace 'honey', 'fish oil'}</Data>
```

##### Question 4 - After storing the altered file contents into the variable, the attacker used the variable to run a separate command that wrote the modified data to a file. This was done multiple times. Submit the last full PowerShell line that performed only this action. - Answer: `$foo | Add-Content -Path 'Recipe'`
Previous questions led to the variable `$foo`, looking for it within the events identifies below usages:
```bash
thedead@dellian:~$ grep '<Data Name="ScriptBlockText"' powershell.evtx.dump | grep "\$foo" | sort | uniq -c | sort -rn
3 <Data Name="ScriptBlockText">$foo | Add-Content -Path 'Recipe.txt'</Data>
2 <Data Name="ScriptBlockText">$foo = Get-Content .\Recipe| % {$_-replace 'honey','fish oil'}</Data>1 <Data Name="ScriptBlockText">$foo = Get-Content .\Recipe| % {$_ -replace 'honey', 'fish oil'}</Data>
1 <Data Name="ScriptBlockText">$foo = Get-Content .\Recipe| % {$_-replace 'honey','fish oil'} $foo | Add-Content -Path 'recipe_updated.txt'</Data>
1 <Data Name="ScriptBlockText">$foo = Get-Content .\Recipe| % {$_ -replace 'honey', 'fish oil'} $foo | Add-Content -Path 'recipe_updated.txt'
1 <Data Name="ScriptBlockText">$foo | Add-Content -Path 'recipe_updated.txt'</Data>
1 <Data Name="ScriptBlockText">$foo | Add-Content -Path 'Recipe'</Data>
```
With above command it is possible to observe that the only write command being called multiple times is `$foo | Add-Content -Path 'Recipe'`.

##### Question 5 - The attacker ran the previous command against one file multiple times. What is the name of this file? - Answer: `Recipe.txt`
Previous question counted the occurrences of the `$foo` variable, and the file with most hits is `Recipe.txt`.

##### Question 6 - Were any files deleted? - Answer: `Yes`
Searching for the `del` command it is possible to observe the below two deletion events:
```bash
thedead@dellian:~$ grep '<Data Name="ScriptBlockText"' powershell.evtx.dump | grep "del "
<Data Name="ScriptBlockText">del .\Recipe.txt</Data>
<Data Name="ScriptBlockText">del .\recipe_updated.txt</Data>
```

##### Question 7 - Was the original file (from question 2) deleted? - Answer: `No`
To be fair, no-think 50% chance :)  
![50_percent](imgs/50_percent.jpg)  
[http://www.quickmeme.com/meme/3stmyl](http://www.quickmeme.com/meme/3stmyl)

##### Question 8 - What is the Event ID of the logs that show the actual command lines the attacker typed and ran? - Answer: `4104`
`4104` is the Event ID that logs the scriptblock [https://www.myeventlog.com/search/show/980](https://www.myeventlog.com/search/show/980).

##### Question 9 - Is the secret ingredient compromised? - Answer: `Yes`
Command `$foo = Get-Content .\Recipe| % {$_-replace 'honey','fish oil'} $foo | Add-Content -Path 'recipe_updated.txt'` identified in question 3 substituted `honey` with `fish oil` in the `recipe_updated.txt` file.

##### Question 10 - What is the secret ingredient? - Answer: `Honey`
As per previous question, it was possible to identify the substitution of `honey` with `fish oil` in the `recipe_updated.txt` file.

---
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
### [Open Boria Mine Door (Recover the Web Ring)](/04%20-%20Recover%20the%20Web%20Ring/04.05%20-%20Open%20Boria%20Mine%20Door/README.md)
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