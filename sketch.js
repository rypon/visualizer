let song
let fft
let particles = [];

function preload(){
  // song = loadSound('Ecdysis.mp3')
  // song = loadSound('musician.mp3')
  song = loadSound('go.mp3')
}

//callback fcn for button
function buttonClicked() {
  //reset slider value to 200
  if(song.isPlaying()){
    song.pause()
    noLoop()
  } else {
    song.play()
    loop()
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i<width/20;i++){
    particles.push(new Particle());
  }
  angleMode(DEGREES)

  fft = new p5.FFT()
  
  button = createButton('Play/Pause')
  button.mouseClicked(buttonClicked);
  button.position(10, 15)

  volumeSlider = createSlider(0, 1, 0.5, 0.01)
  volumeSlider.position(60,40) 

  label = createDiv('Volume');
  label.position(10, 40);  
  // volumeSlider = createSlider(0, 1, 0.5, 0.01)
  // volumeSlider.parent(label);


}


function draw() {
  background('#018fa7');
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
  song.setVolume(volumeSlider.value())
  noFill()
  let wave = fft.waveform()
  translate(width / 2, height / 2)


  stroke('#96020e')
  strokeWeight(30)
  //This loop creates both sides of the circle, starting at -1, then going to 1 
  for (let t = -1; t <= 1; t += 2){
    //create the one side of the circle
    beginShape()
    for (let i = 0; i <=180; i += 15){
      let index = floor(map(i, 0, 180, 0, wave.length - 1))
      let radius = map(wave[index], -1, 1, 350, 250)
      //*t created the other side of the shape from the main for loop on t
      let x = radius * sin(i) * t
      let y = radius * cos(i)

      vertex(x,y)
    }
    endShape()
}
stroke('#fc7c87')
strokeWeight(1)
for (let t = -1; t <= 1; t += 2){
  beginShape()
  for (let i = 0; i <=180; i += 0.01){
    let index = floor(map(i, 0, 180, 0, wave.length - 1))
    let radius = map(wave[index], -1, 1, 350, 250)
    let x = radius * sin(i) * t
    let y = radius * cos(i)

    vertex(x,y)
  }
  endShape()
}

stroke('#ea0417')
strokeWeight(5)

for (let t = -1; t <= 1; t += 2){
  beginShape()
  for (let i = 0; i <=180; i += 1){
    let index = floor(map(i, 0, 180, 0, wave.length - 1))
    let radius = map(wave[index], -1, 2, 100, 150)
    let x = radius * sin(i) * t
    let y = radius * cos(i)

    vertex(x,y)
  }
  endShape()
}

stroke('#96020e')
strokeWeight(5)

for (let t = -1; t <= 1; t += 2){
  beginShape()
  for (let i = 0; i <=180; i += .2){
    let index = floor(map(i, 0, 180, 0, wave.length - 1))
    let radius = map(wave[index], -1, 2, 100, 200)
    let x = radius * sin(-i)
    let y = radius * cos(i)

    vertex(x,y)
  }
  endShape()
}

stroke('#96020e')
strokeWeight(5)

for (let t = -1; t <= 1; t += 2){
  beginShape()
  for (let i = 0; i <=180; i += .2){
    let index = floor(map(i, 0, 180, 0, wave.length - 1))
    let radius = map(wave[index], -1, 2, 100, 75)
    let x = radius * sin(i)
    let y = radius * cos(i)

    vertex(x,y)
  }
  endShape()
}



}



//particles background
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
    constructor(){
      this.x = random(0,width);
      this.y = random(0,height);
      this.r = random(1,8);
      this.xSpeed = random(-2,2);
      this.ySpeed = random(-1,1.5);
    }
  
  // creation of a particle.
    createParticle() {
      noStroke();
      fill('#046d85');
      circle(this.x,this.y,this.r);
    }
  
  // setting the particle in motion.
    moveParticle() {
      if(this.x < 0 || this.x > width)
        this.xSpeed*=-1;
      if(this.y < 0 || this.y > height)
        this.ySpeed*=-1;
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  
  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
    joinParticles(particles) {
      particles.forEach(element =>{
        let dis = dist(this.x,this.y,element.x,element.y);
        if(dis<85) {
          stroke('#652448');
          strokeWeight(1)
          line(this.x,this.y,element.x,element.y);
        }
      });
    }
  }