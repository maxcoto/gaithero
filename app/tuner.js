var Tuner = function () {
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  if (!window.AudioContext) {
    return alert('AudioContext not supported')
  }

  this.middleA = 440
  this.semitone = 69
  this.bufferSize = 4096
  this.noteStrings = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si']
  this.audioContext = new window.AudioContext()
  this.analyser = this.audioContext.createAnalyser()
  this.scriptProcessor = this.audioContext.createScriptProcessor(this.bufferSize, 1, 1)
  this.pitchDetector = new (Module().AubioPitch)('default', this.bufferSize, 1, this.audioContext.sampleRate)
}

Tuner.prototype.start = function () {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
  if (!navigator.getUserMedia) {
    return alert('getUserMedia not supported')
  }

  const self = this

  const success = function (stream) {
    self.audioContext.createMediaStreamSource(stream).connect(self.analyser)
    self.analyser.connect(self.scriptProcessor)
    self.scriptProcessor.connect(self.audioContext.destination)
    self.scriptProcessor.addEventListener('audioprocess', function (event) {
      var frequency = self.pitchDetector.do(event.inputBuffer.getChannelData(0))
      if (frequency && self.onNoteDetected) {
        var note = self.getNote(frequency)
        self.onNoteDetected({
          name: self.noteStrings[note % 12],
          value: note,
          cents: self.getCents(frequency, note),
          numbered: parseInt(note / 12) - 1,
          frequency: frequency,
        })
      }
    })
  }

  const failure = function (error) {
    alert(error.name + ': ' + error.message)
  }

  navigator.getUserMedia(Config.media, success, failure)
}

Tuner.prototype.getNote = function (frequency) {
  var note = 12 * (Math.log(frequency / this.middleA) / Math.log(2))
  return Math.round(note) + this.semitone
}

Tuner.prototype.getFrequency = function (note) {
  return this.middleA * Math.pow(2, (note - this.semitone) / 12)
}

Tuner.prototype.getCents = function (frequency, note) {
  return Math.floor(1200 * Math.log(frequency / this.getFrequency(note)) / Math.log(2))
}

Tuner.prototype.play = function (frequency) {
  if (!this.oscillator) {
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.connect(this.audioContext.destination)
    this.oscillator.start()
  }
  this.oscillator.frequency.value = frequency
}

Tuner.prototype.stop = function () {
  this.oscillator.stop()
  this.oscillator = null
}
