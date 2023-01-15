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