// Rgb class, essentially a glorified array, holds rgb values
class rgb {
  constructor(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
}



// Makes the class block an object of which is the blocks display
class block {
  // Takes a width, height, and a p5 vector
  constructor(width, height, vect, rgb){
    this.width = width;
    this.height = height;
    this.vect = vect;
    this.rgb = rgb;
  }
  // Draws the block
  draw_block() {
    // Set fill color
    fill(this.rgb.r, this.rgb.g, this.rgb.b);
    // Draw a rectangle on screen
    rect(this.vect.x, this.vect.y, this.width, this.height);
  }
}

// Generates a random integer
function randint(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}



// Flags the canvas
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

  // Adds block objects to the array blocks
  var blocks = [];
  // Stores the block width
  var blockWidth = 10;
  // Determines the number of blocks based on the number that can fit on screen
  var num_blocks = width / blockWidth;
  for (var i = 0; i < num_blocks; i++){
    var blockHeight = randint(10,500);
    // Add a new block object to the blocks array
    append(blocks,
      new block(
        blockWidth,
        blockHeight,
        // Reason for "height - blockHeight" is otherwise they would be upside
        // down. (i * blockWidth) also makes the blocks touch each other
        createVector(i * blockWidth, height - blockHeight),
        // Give the block a rgb object
        new rgb(200, 0, 200)
    ));
  }

  // Display the blocks
  for (var i in blocks){
    blocks[i].draw_block();
  }

}
// Re-centers the canvas when the window is resized
function windowResized() {
  centerCanvas();
}
