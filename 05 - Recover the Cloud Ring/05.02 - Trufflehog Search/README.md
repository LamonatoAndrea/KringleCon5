# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Cloud Ring
### Trufflehog Search
Difficulty: :christmas_tree::christmas_tree:  
Use Trufflehog to find secrets in a Git repo. Work with Jill Underpole in the Cloud Ring for hints. What's the name of the file that has AWS credentials?

#### Hints
##### Trufflehog Tool
*From: Jill Underpole*
You can search for secrets in a Git repo with `trufflehog git https://some.repo/here.git`

##### Checkout Old Commits
*From: Jill Underpole*
If you want to look at an older code commit with git, you can `git checkout CommitNumberHere`.

#### Solution
Speaking with Gerty Snowburrow, it is possible to obtain the URL of the git repo, being [https://haugfactory.com/orcadmin/aws_scripts](https://haugfactory.com/orcadmin/aws_scripts). I then cloned the repo, looked through it for the keyword secret and finally added some context:
```bash
thedead@dellian:~$ git clone https://haugfactory.com/orcadmin/aws_scripts
Cloning into 'aws_scripts'...
warning: redirecting to https://haugfactory.com/orcadmin/aws_scripts.git/
remote: Enumerating objects: 64, done.
remote: Total 64 (delta 0), reused 0 (delta 0), pack-reused 64
Unpacking objects: 100% (64/64), done.
```
```bash
thedead@dellian:~/aws_scripts$ commits=$(git log | head -n -1 | grep commit | cut -d " " -f 2) && for i in $commits; do prev=$(echo "$commits" | grep -A 1 "$i" | tail -n 1) && git diff $i $prev | grep secret; done
-    aws_secret_access_key=SECRETACCESSKEY,
+    aws_secret_access_key="e95qToloszIgO9dNBsQMQsc5/foiPdKunPJwc1rL",
-    aws_secret_access_key="e95qToloszIgO9dNBsQMQsc5/foiPdKunPJwc1rL",
+    aws_secret_access_key=SECRETACCESSKEY,
-if ('secrets' in arguments):
-    thread_list.append(awsthread.AWSThread('secrets', security.get_secrets_inventory, ownerId, profile_name, boto3_config, selected_regions))
-def get_secrets_inventory(oId, profile, boto3_config, selected_regions):
-        Returns all secrets managed by AWS (without values of the secrets ;-)
-        :return: secrets inventory 
-        aws_service = "secretsmanager", 
-        function_name = "list_secrets", 
-    aws_secret_access_key=SECRETACCESSKEY,
+    aws_secret_access_key="e95qToloszIgO9dNBsQMQsc5/foiPdKunPJwc1rL",
-    aws_secret_access_key="e95qToloszIgO9dNBsQMQsc5/foiPdKunPJwc1rL",
```
```bash
thedead@dellian:~/aws_scripts$ commits=$(git log | head -n -1 | grep commit | cut -d " " -f 2) && for i in $commits; do prev=$(echo "$commits" | grep -A 1 "$i" | tail -n 1) && git diff $i $prev | grep -B 10 secret; done
# Output removed to shorten report
--- a/put_policy.py
+++ /dev/null
@@ -1,15 +0,0 @@
-import boto3
-import json
-
-
-iam = boto3.client('iam',
-    region_name='us-east-1',
-    aws_access_key_id="AIDAYRANYAHGQOHD7OUSS",
-    aws_secret_access_key="e95qToloszIgO9dNBsQMQsc5/foiPdKunPJwc1rL",
```
The name of the file being the answer to the challenge is: `put_policy.py`.
##### Actually...
As it happens to me sometimes, I just quickly read the challenge request and then I end up resolving it in a different manner, noticing it only while writing the report :) The hints were pointing out to a tool, [trufflehog](https://github.com/trufflesecurity/trufflehog). It automatically searches for secrets inside a repository. My solution was kind of the raw & ugly version of it. For the sake of completeness, below is the solution using `trufflehog` (it’s just 1 line!:smile:):
```bash
thedead@dellian:~$ trufflehog https://haugfactory.com/orcadmin/aws_scripts
~~~~~~~~~~~~~~~~~~~~~
Reason: High Entropy
Date: 2022-09-07 16:53:32
Hash: 3476397f95da11a776d4118f1f9ae6c9d4afd0c9
Filepath: put_policy.py
Branch: origin/main
Commit: added

@@ -4,8 +4,8 @@ import json
 
 iam = boto3.client('iam',
     region_name='us-east-1',
-    aws_access_key_id=ACCESSKEYID,
-    aws_secret_access_key=SECRETACCESSKEY,
+    aws_access_key_id="AKIAAIDAYRANYAHGQOHD",
+    aws_secret_access_key="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",
 )
 # arn:aws:ec2:us-east-1:accountid:instance/*
 response = iam.put_user_policy(

~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~
Reason: High Entropy
Date: 2022-09-07 16:53:12
Hash: 106d33e1ffd53eea753c1365eafc6588398279b5
Filepath: put_policy.py
Branch: origin/main
Commit: added

@@ -4,8 +4,8 @@ import json
 
 iam = boto3.client('iam',
     region_name='us-east-1',
-    aws_access_key_id="AKIAAIDAYRANYAHGQOHD",
-    aws_secret_access_key="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",
+    aws_access_key_id=ACCESSKEYID,
+    aws_secret_access_key=SECRETACCESSKEY,
 )
 # arn:aws:ec2:us-east-1:accountid:instance/*
 response = iam.put_user_policy(

~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~
Reason: High Entropy
Date: 2022-09-06 22:11:23
Hash: 03a20997c70f2443959446d5569e5b9846d95036
Filepath: put_policy.py
Branch: origin/main
Commit: added

@@ -4,12 +4,12 @@ import json
 
 iam = boto3.client('iam',
     region_name='us-east-1',
-    aws_access_key_id=ACCESSKEYID,
-    aws_secret_access_key=SECRETACCESSKEY,
+    aws_access_key_id="AIDAYRANYAHGQOHD7OUSS",
+    aws_secret_access_key="e95qToloszIgO9dNBsQMQsc5/foiPdKunPJwc1rL",
 )
 # arn:aws:ec2:us-east-1:accountid:instance/*
 response = iam.put_user_policy(
     PolicyDocument='{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["ssm:SendCommand"],"Resource":["arn:aws:ec2:us-east-1:748127089694:instance/i-0415bfb7dcfe279c5","arn:aws:ec2:us-east-1:748127089694:document/RestartServices"]}]}',
     PolicyName='AllAccessPolicy',
-    UserName='nwt8_test',
+    UserName='elf_test',
 )

~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~
Reason: High Entropy
Date: 2022-09-06 22:10:48
Hash: 422708564ef952ff28ce719ab6dc15002fa84a6e
Filepath: put_policy.py
Branch: origin/main
Commit: added

@@ -1,15 +0,0 @@
-import boto3
-import json
-
-
-iam = boto3.client('iam',
-    region_name='us-east-1',
-    aws_access_key_id="AIDAYRANYAHGQOHD7OUSS",
-    aws_secret_access_key="e95qToloszIgO9dNBsQMQsc5/foiPdKunPJwc1rL",
-)
-# arn:aws:ec2:us-east-1:accountid:instance/*
-response = iam.put_user_policy(
-    PolicyDocument='{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["ssm:SendCommand"],"Resource":["arn:aws:ec2:us-east-1:748127089694:instance/i-0415bfb7dcfe279c5","arn:aws:ec2:us-east-1:748127089694:document/RestartServices"]}]}',
-    PolicyName='AllAccessPolicy',
-    UserName='elf_test',
-)

~~~~~~~~~~~~~~~~~~~~~
```
Much cleaner! Much Better! Kudos!

---
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