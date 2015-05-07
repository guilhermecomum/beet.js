var context = new AudioContext();
var gain = context.createGain();
gain.connect(context.destination);
gain.gain.value = 0.2;


var Poly = require('./lib/poly');
var poly = new Poly({
  context: context,
  tempo: 90
});

function on(time) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.start(time);
  osc.stop(time + 0.1);
}

function off(time) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.frequency.value = 220;
  osc.start(time);
  osc.stop(time + 0.15);
}
var sequence = poly.sequence(4, 4);
var sequence2 = poly.sequence(5, 5);
var layer = poly.layer(sequence, on, off);
var layer2 = poly.layer(sequence2, off, off);
poly.add(layer);
poly.add(layer2);
poly.start();

// var Metro = require('wa-metro');
// var metro = new Metro(context, on);
// metro.start();