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


function displayBlocks(blocks, text){
  // Clear the screen
  clear();
  // Display the blocks
  for (var i in blocks){
    blocks[i].draw_block();
  }
}


// Flags the canvas
var cnv;


// Centers the canvas
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}




// Re-centers the canvas when the window is resized
function windowResized() {
  centerCanvas();
}


function bubbleSort(blocks){
  var lastBlock;
  var currentBlock;
  while (true) {
    var madeSwap = false;
    for (var i in blocks){
      // deepcode ignore UseStrictEquality: Doesn't compare correctly with triple equals
      if (i == 0){
        continue;
      }
      lastBlock = blocks[i-1];
      currentBlock = blocks[i];
      // If the last block is taller than the current block
      if (lastBlock.height > currentBlock.height) {
          // Swap them
          blocks.splice(i-1, 2, currentBlock, lastBlock);
          madeSwap = true;
      }
    }
    if (!madeSwap){
      return blocks;

    }
  }
}


// Sets up the canvas
function setup() {
  cnv = createCanvas(1000, 600);
  centerCanvas();
  background(255, 255, 255);

  // Adds block objects to the array blocks
  var blocks = [];
  // Stores the block width
  var blockWidth = 50;
  // Determines the number of blocks based on the number that can fit on screen
  var num_blocks = Math.floor(width / blockWidth);
  for (var i = 0; i < num_blocks; i++){
    var blockHeight = randint(10,height);
    // Add a new block object to the blocks array
    append(blocks,
      new block(
        blockWidth,
        blockHeight,
        // Reason for "height - blockHeight" is otherwise they would be upside
        // down. (i * blockWidth) also makes the blocks touch each other
        createVector(i * blockWidth, height - blockHeight),
        // Give the block a rgb object
        new rgb(100, 75, 200)
    ));
  }
  blocks = bubbleSort(blocks);
  displayBlocks(blocks);

}
