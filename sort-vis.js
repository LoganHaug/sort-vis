/*
  Written By Logan Haug
  Visualizes sorting algorithms using p5 JS
*/
/** Generates a random integer
  @param {int} min minimum value of the generated random integer
  @param {int} max maximum value of the generated random integer
  @return {int} the random integer
*/
function randint(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

/** Sleep function
  @param {int} ms number of milliseconds that the computer will sleep
  @return {Promise} promise that sets a timeout
*/
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Flags the canvas
let cnv;

/** Centers the canvas */
function centerCanvas() {
  // Centers the canvas
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
/* eslint-disable no-unused-vars */
/** Recenters the canvas on window re-size */
function windowResized() {
  centerCanvas();
}
let sovietAnthem;
/** p5 JS preload function, loads sovietAnthem before executing setup() */
function preload() {
  sovietAnthem = loadSound('sovietAnthem.mp3');
}
// Initialize block width, block height array, and block state array
const w = 10;
let blocks = [];
const states = [];
/** p5 Setup function */
async function setup() {
  // Create the canvas
  cnv = createCanvas(windowWidth, windowHeight);
  // Center the Canvas
  centerCanvas();
  // Main sorting loop
  while (true) {
    // Add a random block height in the available space
    for (let i = 0; i < floor(width / w) + 1; i++) {
      // Random height bit
      blocks[i] = randint(10, height - 10);
      // States is 1 for not being sorted right now
      states[i] = 1;
    }
    console.log(blocks.length);
    // Sort the blocks
    await stalinSort();
    for (let i = 0; i < states.length - 1; i++) {
      states[i] = 2;
    }
    sovietAnthem.play();
    await sleep(5000);
    break;
  }
}

/** Stalin-sort, removes any element that isn't already sorted */
async function stalinSort() {
  let currentValue = 0;
  let nextValue = 1;
  states[currentValue] = 0;
  states[nextValue] = 0;
  for (let i = 0; i < blocks.length - 1; i++) {
    while (true) {
      await sleep(1);
      if (nextValue === blocks.length - 1) {
        break;
      } else if (blocks[currentValue] > blocks[nextValue]) {
        await sleep(1);
        blocks.splice(nextValue, 1);
        states.splice(nextValue, 1);
      } else {
        break;
      }
    }
    states[currentValue] = 0;
    states[nextValue] = 0;
    currentValue++;
    nextValue++;
  }
}

/** Bubblesort function */
async function bubblesort() {
  // Flag the indexes that we will compare later
  let currentValue;
  let previousValue;
  // Flag made_swap
  let madeSwap = false;
  let timesSorted = 0;
  // Infinite loop
  while (true) {
    // Flag whether or not a swap has been made
    madeSwap = false;
    // Iterate through each value in blocks
    for (let i = 0; i < blocks.length - (1 + timesSorted); i++) {
      // Stores the current value, and the next value
      currentValue = i;
      nextValue = i + 1;
      // Sets the current state to red (being sorted) for both blocks
      states[currentValue] = 0;
      states[nextValue] = 0;
      // Sleeps
      await sleep(0.001);
      // If the next block is smaller than the current block, swap them
      if (nextValue === blocks.length - 1) {
        break;
      } else if (blocks[currentValue] > blocks[nextValue]) {
        blocks = swap(blocks, currentValue);
        madeSwap = true;
      }
      states[currentValue] = 1;
      states[nextValue] = 1;
    }
    timesSorted++;
    if (!madeSwap) {
      break;
    }
  }
}

/** Swaps an element in an array with the one above it
  @param {array} array the array to perform the swap on
  @param {int} pos position in the array
  @return {array} returns the new array
*/
function swap(array, pos) {
  temp = array[pos];
  array[pos] = array[pos + 1];
  array[pos + 1] = temp;
  return array;
}

/** p5 draw function */
function draw() {
  // Remove the ugly stroke from the rectangle
  noStroke();
  // Set the background to black
  background(0);
  for (let i = 0; i < blocks.length - 1; i++) {
    switch (states[i]) {
      case (0):
        fill(235, 61, 52);
        break;
      case (1):
        fill(220, 220, 220);
        break;
      case (2):
        fill(95, 232, 104);
        break;
    }
    rect(i * w, height - blocks[i], w, blocks[i]);
  }
}
