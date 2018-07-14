var Application = function () {
  this.tuner = new Tuner()
  this.$note = document.querySelector('.note-name')
  this.$frequency = document.querySelector('.note-frequency')
  this.note = new Note('.notes-list', this.tuner)
  this.meter = new Meter('.meter')
  this.frequencyBars = new FrequencyBars('.frequency-bars', this.note)
  this.frequencyData = new Uint8Array(this.tuner.analyser.frequencyBinCount)
  this.listen = false
  this.update({name: 'A', frequency: 440, numbered: 4, value: 69, cents: 0})
  this.currentNote = null
  this.song = Oboe
  this.play()
}

Application.prototype.play = function () {
  var time = 0
  const sh = { frequency: 0, name: null }
  const playback = this.song.notes
  const tuner = this.tuner
  var self = this

  tuner.play(0) // this might not be necessary

  for(var i = 0; i < playback.length; i++) {
    time += playback[i].time
    const item = playback[i+1]
    setTimeout(function(){
      if(item && item.note > -1) {
        self.listen = false
        self.currentNote = self.note.$notes[item.note].dataset
        tuner.play(self.currentNote.frequency)
      } else {
        self.currentNote = sh
        tuner.play(0)
      }
    }, time - 100)
  }
}

Application.prototype.start = function () {
  var self = this
  this.tuner.onNoteDetected = function (note) {
    if (self.lastNote === note.name) {
      self.update(note)
    } else {
      self.lastNote = note.name
    }
  }
  this.tuner.start()
  this.loop()
}

Application.prototype.loop = function () {
  this.tuner.analyser.getByteFrequencyData(this.frequencyData)
  this.frequencyBars.update(this.frequencyData)
  requestAnimationFrame(this.loop.bind(this))
}

Application.prototype.update = function (note) {
  this.note.update(note, this.currentNote)
  this.meter.update(note)

  if(this.listen) {
    if(this.currentNote && this.currentNote.name){
      if(this.currentNote.name === note.name){
        this.meter.addTuning(100-Math.abs(note.cents*2))
      } else {
        this.meter.addTuning(0)
      }
    }
  } else {
    this.listen = true
  }
}

var app = new Application()
app.start()
