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
  background(200, 0, 255);
}
// Re-centers the canvas when the window is resized
function windowResized() {
  centerCanvas();
}
