# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Cloud Ring
### AWS CLI Intro
Difficulty: :christmas_tree:  
Try out some basic AWS command line skills in this terminal. Talk to Jill Underpole in the Cloud Ring for hints.

#### Hints
##### AWS Whoami?
*From: Jill Underpole*
In the AWS command line (CLI), the Secure Token Service or [STS](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/get-caller-identity.html) has one very useful function.

#### Solution
```bash
You may not know this, but AWS CLI help messages are very easy to access. First, try typing:
$ aws help
───────────────────────────────────────────────────────────────────────
elf@867a85b8d4e7:~$ aws help
```
```bash
Great! When you re done, you can quit with q.
Next, please configure the default aws cli credentials with the access key AKQAAYRKO7A5Q5XUY2IY, the secret key qzTscgNdcdwIo/soPKPoJn9sBrl5eMQQL19iO5uf and the region us-east-1 .
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config
───────────────────────────────────────────────────────────────────────
elf@867a85b8d4e7:~$ aws configure
AWS Access Key ID [None]: AKQAAYRKO7A5Q5XUY2IY 
AWS Secret Access Key [None]: qzTscgNdcdwIo/soPKPoJn9sBrl5eMQQL19iO5uf
Default region name [None]: us-east-1
Default output format [None]: 
```
```bash
Excellent! To finish, please get your caller identity using the AWS command line. For more details please reference:
$ aws sts help
or reference:
https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/index.html
───────────────────────────────────────────────────────────────────────
elf@867a85b8d4e7:~$ aws sts get-caller-identity
{
    "UserId": "AKQAAYRKO7A5Q5XUY2IY",
    "Account": "602143214321",
    "Arn": "arn:aws:iam::602143214321:user/elf_helpdesk"
}
```
```bash
Great, you did it all!
```

---
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