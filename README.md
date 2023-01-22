# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings

## thedead@dellian:~$ whoami
```bash
thedead@dellian:~$ whoami

Andrea Lamonato

Cyber Security Engineer

mailto: lamonato.andrea@gmail.com
Github: https://github.com/LamonatoAndrea
Linkedin: https://www.linkedin.com/in/andrea-lamonato/

Hopefully, your worst one-liner of the season:
    ➤    __________________________________________
    ➤   / for i in $(grep "Pre-sale purchase of a  \
    ➤   | BSRS NFT." * | cut -d "'" -f4); do       |
    ➤   | root=$(grep $i * | grep "_proof" | cut   |
    ➤   | -d "'" -f 8 | tr -d "\n" | python3 -c    |
    ➤   | "import sys; print (bytes(sys.stdin.buff |
    ➤   | er.read()).decode('unicode_escape').enco |
    ➤   | de('raw_unicode_escape').hex())") &&     |
    ➤   \ echo $i $root; done                      /
    ➤    ------------------------------------------
    ➤            \   ^__^ 
    ➤             \  (oo)\_______
    ➤                (__)\       )\/\
    ➤                    ||----w |
    ➤                    ||     ||
```

## [KringleCon Orientation](/01%20-%20KringleCon%20Orientation/README.md)

## Recover the Tolkien Ring

### [Wireshark Practice](/02%20-%20Recover%20the%20Tolkien%20Ring/02.01%20-%20Wireshark%20Practice/README.md)

### [Windows Event Logs](/02%20-%20Recover%20the%20Tolkien%20Ring/02.02%20-%20Windows%20Event%20Logs/README.md)

### [Suricata Regatta](/02%20-%20Recover%20the%20Tolkien%20Ring/02.03%20-%20Suricata%20Regatta/README.md)

### [The Tolkien Ring](/02%20-%20Recover%20the%20Tolkien%20Ring/02.04%20-%20The%20Tolkien%20Ring/README.md)

## Recover the Elfen Ring

### [Clone with a Difference](/03%20-%20Recover%20the%20Elfen%20Ring/03.01%20-%20Clone%20with%20a%20Difference/README.md)

### [Prison Escape](/03%20-%20Recover%20the%20Elfen%20Ring/03.02%20-%20Prison%20Escape/README.md)

### [Jolly CI_CD](/03%20-%20Recover%20the%20Elfen%20Ring/03.03%20-%20Jolly%20CI_CD/README.md)

### [The Elfen Ring](/03%20-%20Recover%20the%20Elfen%20Ring/03.04%20-%20The%20Elfen%20Ring/README.md)

## Recover the Web Ring

### [Naughty IP](/04%20-%20Recover%20the%20Web%20Ring/04.01%20-%20Naughty%20IP/README.md)

### [Credential Mining](/04%20-%20Recover%20the%20Web%20Ring/04.02%20-%20Credential%20Mining/README.md)

### [404 FTW](/04%20-%20Recover%20the%20Web%20Ring/04.03%20-%20404%20FTW/README.md)

### [IMDS, XXE, and Other Abbreviations](/04%20-%20Recover%20the%20Web%20Ring/04.04%20-%20IMDS,%20XXE,%20and%20Other%20Abbreviations/README.md)

### [Open Boria Mine Door](/04%20-%20Recover%20the%20Web%20Ring/04.05%20-%20Open%20Boria%20Mine%20Door/README.md)

### [Glamtariel's Fountain](/04%20-%20Recover%20the%20Web%20Ring/04.06%20-%20Glamtariel's%20Fountain/README.md)

### [The Web Ring](/04%20-%20Recover%20the%20Web%20Ring/04.07%20-%20The%20Web%20Ring/README.md)

## Recover the Cloud Ring

### [AWS CLI Intro](/05%20-%20Recover%20the%20Cloud%20Ring/05.01%20-%20AWS%20CLI%20Intro/README.md)

### [Trufflehog Search](/05%20-%20Recover%20the%20Cloud%20Ring/05.02%20-%20Trufflehog%20Search/README.md)

### [Exploitation via AWS CLI](/05%20-%20Recover%20the%20Cloud%20Ring/05.03%20-%20Exploitation%20via%20AWS%20CLI/README.md)

### [The Cloud Ring](/05%20-%20Recover%20the%20Cloud%20Ring/05.04%20-%20The%20Cloud%20Ring/README.md)

## Recover the Burning Ring of Fire

### [Buy a Hat](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.01%20-%20Buy%20a%20Hat/README.md)

### [Blockchain Divination](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.02%20-%20Blockchain%20Divination/README.md)

### [Exploit a Smart Contract](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.03%20-%20Exploit%20a%20Smart%20Contract/README.md)

### [Mistakes were made… the key](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.04%20-%20Mistakes%20were%20made…%20the%20key/README.md)

### [The Burning Ring of Fire](/06%20-%20Recover%20the%20Burning%20Ring%20of%20Fire/06.05%20-%20The%20Burning%20Ring%20of%20Fire/README.md)

## Narrative
*Five Rings for the Christmas king immersed in cold*

*Each Ring now missing from its zone*

*The first with bread kindly given, not sold*

*Another to find 'ere pipelines get owned*

*One beneath a fountain where water flowed*

*Into clouds Grinchum had the fourth thrown*

*The fifth on blockchains where shadows be bold*

*One hunt to seek them all, five quests to find them*

*One player to bring them all, and Santa Claus to bind them*

## Conclusions
Hey folks, nice seeing you again! Thanks for this year’s challenge. Must admit it was a twist with respect
to previous years, most objectives felt kinda easier while the Glamtariel's Fountain was much more on the
CTF side. I must admit I missed Jack, but now I’ll just be looking forward to next year’s adventure!

### The Victors shop
Just to add a note that it exists and Eve Snowshoes told me it is at [https://my-store-d61669.creator-spring.com/](https://my-store-d61669.creator-spring.com/)!
![victors_shop](imgs/victors_shop.png)

### Inbox (1)
I must admit I saw that email just this year while doing the report! Really sorry for this but you deserve an
answer and you’ll get it as soon as this report is uploaded. Who's “you”? One of the images below should
be a hint on that, the other a response :)
![minions_bye](imgs/minions_bye.png)
![missed_email](imgs/missed_email.jpeg)