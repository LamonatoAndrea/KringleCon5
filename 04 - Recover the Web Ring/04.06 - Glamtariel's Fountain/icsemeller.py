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

