var Note = function (selector, tuner) {
  this.tuner = tuner

  const $root = document.querySelector(selector)
  this.$note = $root.querySelector('.note-name')
  this.$noteNames = $root.querySelector('.note-names')
  this.$frequency = $root.querySelector('.note-frequency .frequency-value')

  this.$notes = []
  this.$notesMap = {}

  const indexes = Oboe.notes.map(function(a){ return a.note })
  this.initNotes(indexes)
}

Note.prototype.initNotes = function (indexes) {
  const minNumbered = 3
  const maxNumbered = 5
  const notesAmount = 12
  const minBagpipeValue = 58
  const maxBagpipeValue = 77

  for (var numbered = minNumbered; numbered <= maxNumbered; numbered++) {
    for (var n = 0; n < notesAmount; n++) {
      const value = notesAmount * (numbered + 1) + n
      if( value > minBagpipeValue && value < maxBagpipeValue ) {
        var $note = document.createElement('div')
        $note.className = 'note-name'
        $note.dataset.name = this.tuner.noteStrings[n]
        $note.dataset.numbered = numbered
        $note.dataset.value = value
        $note.dataset.frequency = this.tuner.getFrequency($note.dataset.value)
        $note.innerHTML = $note.dataset.name

        // const self = this
        // var found = indexes.find(function(index) {
        //   return self.$notes.length === index;
        // });
        // $note.style.display = found === undefined ? 'none' : 'block'

        this.$noteNames.appendChild($note)
        this.$notes.push($note)
        this.$notesMap[$note.dataset.value] = $note
      }
    }
  }
}

Note.prototype.require = function ($note) {
  var $active = this.$noteNames.querySelector('.required')
  if ($active) { $active.classList.remove('required') }
  $note.classList.add('required')
}

Note.prototype.active = function ($note) {
  var $active = this.$noteNames.querySelector('.active')
  if ($active) { $active.classList.remove('active') }
  $note.classList.add('active')
}

Note.prototype.update = function (playingNote, requiredNote) {
  if(!playingNote || !requiredNote) return

  if (requiredNote.value in this.$notesMap) {
    this.require(this.$notesMap[requiredNote.value])
  }

  if (playingNote.value in this.$notesMap) {
    this.active(this.$notesMap[playingNote.value])
  }
}
