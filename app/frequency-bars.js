/**
 * the frequency histogram
 *
 * @param {string} selector
 * @constructor
 */
var FrequencyBars = function (selector, note) {
  this.$canvas = document.querySelector(selector)
  this.$canvas.width = document.body.clientWidth - 300
  this.$canvas.height = document.body.clientHeight
  this.canvasContext = this.$canvas.getContext('2d')
  this.note = note
}


var startTime = Date.now();

FrequencyBars.prototype.update = function (data) {
  const length = 64 // low frequency only
  const width = this.$canvas.width / length - 0.5
  this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height)

  for (var i = 0; i < length; i += 1) {
    this.canvasContext.fillStyle = '#ffef00'
    this.canvasContext.fillRect(i * (width + 0.5), this.$canvas.height - data[i], width, data[i])
  }

  const playback = Oboe.notes
  const notes = this.note.$notes
  var time = 0

  var elapsedTime = (Date.now() - startTime)/10

  for(var i = 0; i < playback.length; i++) {
    const item = playback[i]

    if(item) {
      const note = notes[item.note]
      const y = notes.indexOf(note)
      this.canvasContext.fillStyle = '#00b8da'
      this.canvasContext.fillRect(time - elapsedTime, 49*(y+1)-38, item.time/10, 30)
    }

    time += (item.time/10)
  }
}
