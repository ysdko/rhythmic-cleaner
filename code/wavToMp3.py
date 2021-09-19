import ffmpeg
 
audio = ffmpeg.input("dst.wav")
audio = ffmpeg.output(audio, "dst.mp3")
ffmpeg.run(audio)