let speech;
let speak;
let button1;
let button2;
let button3;
let button4;
let button5;
let button6;
let serial;
let canvas;
let myVoice = new p5.Speech();
let  input;


function setup() {
  canvas = createCanvas(1080, 720);
  canvas.position (0,0);
  canvas.style ('z-index,-1');
  canvas.background(250); 

  input = createInput("Copy and Paste your text Please");
  input.position(870, 50);

  // serial constructor
  serial = new p5.SerialPort();
  // get a list of all connected serial devices
  serial.list();
  // serial port to use - you'll need to change this
  serial.open('/dev/tty.usbmodem141101');
  // callback for when the sketchs connects to the server
  serial.on('connected', serverConnected);
  // callback to print the list of serial devices
  serial.on('list', gotList);
  // what to do when we get serial data
  serial.on('data', gotData);
  // what to do when there's an error
  serial.on('error', gotError);
  // when to do when the serial port opens
  serial.on('open', gotOpen);
  // what to do when the port closes
  serial.on('close', gotClose); //////////////////////////////////////////////////////////

  button1 = createButton("download");
  button1.position(720, 50);
  button1.mousePressed(saveFile);
  button2 = createButton("read");
  button2.mousePressed(doSpeak);
  button2.position(810, 50);
  button3 = createButton("English");
  button3.position(650, 90);
  button4 = createButton("Español");
  button4.position(720, 90);
  button5 = createButton("Français");
  button5.position(790, 90);
  button6 = createButton("中國人");
  button6.position(865, 88);


      ///////Language/Listeninhg///////
//English
  speechRec = new p5.SpeechRec('en-us', gotSpeech);
  let continuous = true;
  let interimResults = false;
  speechRec.start(continuous, interimResults);
  let output = select('#speech');
//Spanish
  speechRecS = new p5.SpeechRec('es-mx', gotSpeech);
  let continuousSpanish = true;
  let interimResultsSpanish = false;
  speechRec.start(continuous, interimResults);
  let outputSpanish = select('#speech');
//French
  speechRecF = new p5.SpeechRec('fr', gotSpeech);
  let continuousFench = true;
  let interimResultsFench = false;
  speechRec.start(continuous, interimResults);
  let outputFench = select('#speech');
//Chinese 
  speechRecC = new p5.SpeechRec('zh-tw', gotSpeech);
  let continuousChinese = true;
  let interimResultsChinese = false;
  speechRec.start(continuous, interimResults);
  let outputChinese = select('#speech');

}

///writing of text///
function gotSpeech() {
  if (speechRec.resultValue) {
    createP(speechRec.resultString)
    text(speechRec,10,100);
  }

}

///speaking///
speak = new p5.Speech(voiceReady);
speak.started(startSpeaking);

function startSpeaking() {}

function voiceReady() {
  console.log(speak.voices);

}

function serverConnected() {
  print("Connected to Server");
}

// list the ports
function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

// when data is received in the serial buffer

function gotData() {
  let currentString = serial.readLine(); // store the data in a variable
  trim(currentString); // get rid of whitespace
  if (!currentString) return; // if there's nothing in there, ignore it
  console.log(currentString); // print it out
  latestData = currentString; // save it to the global variable

  //button on arduino
  if (latestData == 1) {
    saveFile();
  }

  if (latestData == 0) {

    doSpeak();
  }

}

//voice
function draw() {
  background(225);
  button3.mousePressed(speechRec);
  button4.mousePressed(speechRecS);
  button5.mousePressed(speechRecF);
  button6.mousePressed(speechRecC);
  
}
// what qwert will say
function doSpeak(){
        myVoice.setVoice('Google 國語（臺灣）');
        myVoice.setPitch(1.8);
	  	myVoice.speak(input.value());
	}

function saveFile() {
  stringList = input.value().split("\n");
  save(stringList, "QwertEntry.txt");
}


