// Generates a random integer
function randint(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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


// Initialize block width, block height array, and block state array
var w = 10;
let blocks = [];
var states = [];

async function setup() {
  // Create the canvas
  cnv = createCanvas(1000, 600);
  // Center the Canvas
  centerCanvas();
  // Add a random block height in the available space
  for (var i = 0; i < floor(width / w); i++) {
    // Random height bit
    blocks[i] = randint(10, height - 10);
    // States is 1 for not being sorted right now
    states[i] = 1;
  }
  // Bubble sort the blocks
  await bubblesort();
  for (var i in states){
    states[i] = 2;
  }
}

async function bubblesort() {
  // Flag the indexes that we will compare later
  var current_value;
  var previous_value;
  // Flag made_swap
  var made_swap = false;
  var times_sorted = 0;
  // Infinite loop
  while (true){
      // Flag whether or not a swap has been made
      made_swap = false;
      // Iterate through each value in blocks
      for (var i = 0; i < blocks.length - (1 + times_sorted); i++){
        current_value = i;
        next_value = i + 1;
        states[current_value] = 0;
        states[next_value] = 0;
        await sleep(0.001);
        if (blocks[current_value] > blocks[next_value]){
          blocks = swap(blocks, current_value);
          made_swap = true;
          }
          states[current_value] = 1;
          states[next_value] = 1;
          }
      times_sorted++;
      if (!made_swap){
        break;
        }

    }
}


function swap(array, pos){
  temp = array[pos];
  array[pos] = array[pos + 1];
  array[pos + 1] = temp;
  return array;
}
function draw() {
  // Remove the ugly stroke from the rectangle
  noStroke();
  // Set the background to black
  background(0);
  for (var i in blocks) {
    // If the state is 0 set the fill color to red
    if (states[i] === 0){
      fill(235, 61, 52);
    }
    // If the state is 1 set the fill color to white
    else if (states[i] === 1) {
      fill(220, 220, 220);
    }
    // If the state is 1 set the fill color to green
    else if (states[i] == 2) {
      fill(95, 232, 104);
    }
    rect(i * w, height - blocks[i], w, blocks[i]);
  }

}
