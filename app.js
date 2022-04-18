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


//create the audiocontext
let AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext;


//create the master and osc volumes, initial values, connect master volume to the output destination
const masterVolume = context.createGain();
masterVolume.gain.value = .5;
document.getElementById('outputVolume').innerHTML = masterVolume.gain.value;
const osc1Volume = context.createGain();
osc1Volume.gain.value = 0;
document.getElementById('outputOsc1Volume').innerHTML =osc1Volume.gain.value;
const osc2Volume = context.createGain();
osc2Volume.gain.value = 0;
document.getElementById('outputOsc2Volume').innerHTML = osc2Volume.gain.value;
masterVolume.connect(context.destination);

//initial frequencies for the oscillators
let currentOsc1Freq = 440.00;
document.getElementById('outputOsc1freq').innerHTML = currentOsc1Freq;
let currentOsc2Freq = 440.00;
document.getElementById('outputOsc2freq').innerHTML = currentOsc2Freq;

//grab the html controls
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const volumeControl = document.querySelector('#volume-control');
const osc1vol = document.querySelector('#osc1-vol');
const osc2vol = document.querySelector('#osc2-vol');
const osc1freq = document.querySelector('#osc1-freq');
const osc2freq = document.querySelector('#osc2-freq');
const osc1SubOsc1Vol = document.querySelector('#osc1-subOsc1-vol');
const osc1SubOsc2Vol = document.querySelector('#osc1-subOsc2-vol');
const osc1SubOsc1FreqDiv = document.querySelector('#osc1-subOsc1-freq');
const osc1SubOsc2FreqDiv = document.querySelector('#osc1-subOsc2-freq');



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
//get initial waveform selection
setWaveform();

function setSubOscfreq (freq, div)
{
    return freq * 1/div;
}



//This is, for now, where the oscillators get created and destroyed.
startButton.addEventListener('click', function()
{
    //Oscilator 1 initialisation
    const osc = context.createOscillator();
    osc.frequency.setValueAtTime(currentOsc1Freq,0);
    osc.connect(osc1Volume);
    osc1Volume.connect(masterVolume);
    osc.type = waveform;
    osc.start(0);
    

    const osc1subosc1 = context.createOscillator();
    osc1subosc1.frequency.setValueAtTime(setSubOscfreq(currentOsc1Freq,osc1SubOsc1FreqDiv), 0);
    osc1subosc1.connect(osc1SubOsc1Vol);
    osc1SubOsc1Vol.connect(masterVolume);
    osc.type = waveform;
    osc1subosc1.start(0);


    //oscillator 2 initialisation.
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
        osc1subosc1.stop(0);
        delete osc1subosc1;
        osc2.stop(0);
        delete osc2;
    });


    
    osc1freq.addEventListener('input', function()
    {
        currentOsc1Freq = this.value;
        osc.frequency.setValueAtTime(currentOsc1Freq,0);
        osc1subosc1.frequency.setValueAtTime(setSubOscfreq(currentOsc1Freq,osc1SubOsc1FreqDiv),0);
        document.getElementById('outputOsc1freq').innerHTML = this.value;


    });



    osc2freq.addEventListener('input', function()
    {
        currentOsc2Freq = this.value;
        osc2.frequency.setValueAtTime(currentOsc2Freq,0);
        document.getElementById('outputOsc2freq').innerHTML = this.value;



    });
});




