/**
 * @param {string} selector
 * @constructor
 */
var Meter = function (selector) {
  this.$root = document.querySelector(selector)
  this.$pointer = this.$root.querySelector('.meter-pointer')

  this.$stats = document.querySelector('.stats')
  this.$percent = this.$stats.querySelector('.meter-percent')
  this.$frequency = this.$stats.querySelector('.meter-frequency')
  this.$median = this.$stats.querySelector('.meter-accuracy')
  this.$average = this.$stats.querySelector('.meter-tuning')
  this.$note = this.$stats.querySelector('.meter-note')

  this.tunings = []
  this.init()
}

Meter.prototype.init = function () {
  for (var i = 0; i <= 10; i += 1) {
    var $scale = document.createElement('div')
    $scale.className = 'meter-scale'
    $scale.style.transform = 'rotate(' + (i * 9 - 45) + 'deg)'
    if (i % 5 == 0) {
      $scale.classList.add('meter-scale-strong')
    }
    this.$root.appendChild($scale)
  }
}

Meter.prototype.update = function (note) {
  const deg = note.cents / 50 * 45
  this.$pointer.style.transform = 'rotate(' + deg + 'deg)'
  this.$frequency.textContent = parseFloat(note.frequency).toFixed(1) + ' Hz'
  this.$note.innerHTML = note.name
}

Meter.prototype.addTuning = function (tuning) {
  this.tunings.push(tuning)
  const median = this.median(this.tunings)
  const average = this.average(this.tunings)
  this.$median.innerHTML = parseInt(median) + '%'
  this.$average.innerHTML = parseInt(average) + '%'
}

Meter.prototype.median = function (values) {
  if(values.length === 0) return 100
  values.sort( function(a,b) { return a - b; } )
  const result = values[Math.floor(values.length / 2)]/0.9
  return result > 100 ? 100 : result
}

Meter.prototype.average = function (values) {
  if(values.length === 0) return 100
  const result = (values.reduce((total, value) => total + value) / values.length)/0.9
  return result > 100 ? 100 : result
}
