let song
let fft
let particles = [];

function preload(){
  song = loadSound('musician.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i<width/10;i++){
    particles.push(new Particle());
  }
  angleMode(DEGREES)
  fft = new p5.FFT()

}


function draw() {
  background('#0f0f0f');
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
  stroke(25, 122, 196)
  strokeWeight(5)
  noFill()
  translate(width / 2, height / 2)

  let wave = fft.waveform()

  //This loop creates both sides of the circle, starting at -1, then going to 1 
  for (let t = -1; t <= 1; t += 2){
    //create the one side of the circle
    beginShape()
    for (let i = 0; i <=180; i += 5){
      let index = floor(map(i, 0, 180, 10, wave.length - 1))

      let radius = map(wave[index], -1, 2, 350, 250)

      //*t created the other side of the shape from the main for loop on t
      let x = radius * sin(i) * t
      let y = radius * cos(i)

      vertex(x,y)
    }
    endShape()
}

stroke(219, 142, 255)
strokeWeight(1)
for (let t = -1; t <= 1; t += 2){
  //create the one side of the circle
  beginShape()
  for (let i = 0; i <=180; i += 10){
    let index = floor(map(i, 0, 180, 0, wave.length - 1))
    let radius = map(wave[index], -1, 2, 100, 150)

    //*t created the other side of the shape from the main for loop on t
    let x = radius * sin(i) * t
    let y = radius * cos(i)

    vertex(x,y)
  }
  endShape()
}

stroke(25, 223, 196)
strokeWeight(5)
for (let t = -1; t <= 1; t += 2){
  //create the one side of the circle
  beginShape()
  for (let i = 0; i <=180; i += 10){
    let index = floor(map(i, 0, 180, 0, wave.length - 1))
    let radius = map(wave[index], -1, 2, 10, 70)

    //*t created the other side of the shape from the main for loop on t
    let x = radius * sin(i) * t
    let y = radius * cos(i)

    vertex(x,y)
  }
  endShape()
}

}

function mousePressed(){
  if(song.isPlaying()){
    song.pause()
    noLoop()
  } else {
    song.play()
    loop()
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
      fill('rgba(25, 122, 196, 0.63)');
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
          stroke('rgba(87, 75, 207, 0.5)');
          strokeWeight(2)
          line(this.x,this.y,element.x,element.y);
        }
      });
    }
  }