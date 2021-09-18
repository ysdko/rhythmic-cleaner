import base64

with open("src.txt", "r") as f:
	txt = f.read()
audio = base64.b64decode(txt.encode())
with open("dst.mp3", "wb") as f:
	f.write(audio)