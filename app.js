/*
This works to creat multiple oscillators.

TODO: 
- Set up GUI for setting fundamental tone [x]
- Seperate oscillators so they can have seperate waveshapes []
- work out subharmonics based on fundamental []
- add two subharmonic oscillators to each oscillator on creation (4 in total) []
- add sliders for choosing subharmonics (with detents) []
- add per subharmonic oscilaator volume controls []
- make basic 4 step sequencer []
- add polyrhythms []
- filter []
- ?
*/



let AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext;

const masterVolume = context.createGain();
const osc1Volume = context.createGain();
const osc2Volume = context.createGain();
masterVolume.connect(context.destination);

let currentOsc1Freq = 440.00;
let currentOsc2Freq = 440.00;
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const volumeControl = document.querySelector('#volume-control');
const osc1vol = document.querySelector('#osc1-vol')
const osc2vol = document.querySelector('#osc2-vol')
const osc1freq = document.querySelector('#osc1-freq')
const osc2freq = document.querySelector('#osc2-freq')
masterVolume.gain.value = .1;
document.getElementById('outputVolume').innerHTML = this.value;
osc1Volume.gain.value = .1;
document.getElementById('outputOsc1Volume').innerHTML = this.value;

osc2Volume.gain.value = .1;
document.getElementById('outputOsc2Volume').innerHTML = this.value;

volumeControl.addEventListener('input', changeVolume);
osc1vol.addEventListener('input', changeOsc1Vol);
osc2vol.addEventListener('input', changeOsc2Vol);




function changeOsc1Vol()
{
    osc1Volume.gain.value = this.value;
    document.getElementById('outputOsc1Volume').innerHTML = this.value;

}
function changeOsc2Vol()
{
    osc2Volume.gain.value = this.value;
    document.getElementById('outputOsc2Volume').innerHTML = this.value;

}

function changeVolume()
{
    masterVolume.gain.value = this.value;
    document.getElementById('outputVolume').innerHTML = this.value;
}

const waveforms = document.getElementsByName('waveform');
let waveform;

function setWaveform()
{
    for(var i = 0; i < waveforms.length; i++)
    {
        if(waveforms[i].checked)
        {
            waveform = waveforms[i].value;
        }
    }
}



startButton.addEventListener('click', function()
{
    const osc = context.createOscillator();
    osc.frequency.setValueAtTime(currentOsc1Freq,0);
    osc.connect(osc1Volume);
    osc1Volume.connect(masterVolume);
    osc.start(0);
    osc.type = waveform;

    const osc2 = context.createOscillator();
    osc2.frequency.setValueAtTime(currentOsc2Freq,0);
    osc2.connect(osc2Volume);
    osc2Volume.connect(masterVolume);
    osc2.start(0);
    osc2.type = waveform;

    stopButton.addEventListener('click', function()
    {
        osc.stop(0);
        delete osc;
        osc2.stop(0);
        delete osc2;
    });
    waveforms.forEach((waveformInput) =>
    {
        waveformInput.addEventListener('change', function()
        {
            setWaveform();
            osc.type = waveform;
            osc2.type = waveform;
        });
    });

    
    osc1freq.addEventListener('input', function()
    {
        currentOsc1Freq = this.value;
        osc.frequency.setValueAtTime(currentOsc1Freq,0);
        document.getElementById('outputOsc1freq').innerHTML = this.value;


    });



    osc2freq.addEventListener('input', function()
    {
        currentOsc2Freq = this.value;
        osc2.frequency.setValueAtTime(currentOsc2Freq,0);
        document.getElementById('outputOsc2freq').innerHTML = this.value;



    });
});




