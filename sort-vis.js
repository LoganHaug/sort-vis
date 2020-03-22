// Makes the class block an object of which is the blocks display
class block {
  // Takes a width, height, and a p5 vector
  constructor(width, height, vect){
    this.width = width;
    this.height = height;
    this.vect = vect
  }
  draw_block() {
    fill(randint(0,255), randint(0,255), randint(0,255));
    rect(this.vect.x, this.vect.y, this.width, this.height);
  }
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}




var cnv;

// Centers the canvas
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}
// Sets up the canvas
function setup() {
  cnv = createCanvas(1000, 600);
  centerCanvas();
  background(255, 255, 255);


  var blocks = [];
  var num_blocks = 10;
  for (var i = 0; i < num_blocks; i++){
    append(blocks,
      new block(10,
      randint(-15,-200),
      createVector(i * 100, 300)
    ));
  }
  for (var i in blocks){
    blocks[i].draw_block();
  }

}
// Re-centers the canvas when the window is resized
function windowResized() {
  centerCanvas();
}
