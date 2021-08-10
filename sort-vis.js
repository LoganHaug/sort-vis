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
	// sovietAnthem = loadSound('sovietAnthem.mp3');
}
// Initialize block width, block height array, and block state array
const w = 20;
let blocks = [];
const states = [];
let sort_text = {
	comparisons: 0,
	swaps: 0
};

/** p5 Setup function */
async function setup() {
	// Create the canvas
	cnv = createCanvas(windowWidth, windowHeight);
	// Center the Canvas
	centerCanvas();
	// Continuously sort
	while (true) {
		sort_text = {
			comparisons: 0,
			swaps: 0
		};
		// Add a random block height in the available space
		for (let i = 0; i < floor(width / w) + 1; i++) {
			// Random height bit
			blocks[i] = randint(10, height - 10);
			// States is 1 for not being sorted right now
			states[i] = 1;
		}
		// Sort the blocks
		await bubblesort();
		for (let i = 0; i < states.length - 1; i++) {
			states[i] = 2;
		}
		await sleep(1000);
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
			if (nextValue === blocks.length - 1) {
				break;
			} else if (blocks[currentValue] > blocks[nextValue]) {
				await sleep(20)
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
	var first, second;
	let n = blocks.length;
	for (first = 0; first < n - 1 ; first++) {
		for (second = 0; second < n - first - 1; second++) {
			states[second] = 0;
			states[second + 1] = 0;
			sort_text.comparisons++;
			if (blocks[second] > blocks[second + 1]) {
				sort_text.swaps++;
				swap(blocks, second, second + 1);
				await sleep(1);
			}
			states[second] = 1;
			states[second + 1] = 0;
		}
	}
}



/** Swaps an element in an array with the one above it
	@param {array} array the array to perform the swap on
	@param {int} pos position in the array
	@return {array} returns the new array
*/
function swap(array, pos, pos_2) {
	temp = array[pos];
	array[pos] = array[pos_2];
	array[pos_2] = temp;
}

/** p5 draw function */
function draw() {
	// Remove the ugly stroke from the rectangle
	noStroke();
	// Set the background to black
	background(0);
	fill(100, 100, 100);
	text("Comparisons: " + sort_text.comparisons, 10, 10, 200, 50);
	text("Swaps: " + sort_text.swaps, 10, 30, 200, 50);
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