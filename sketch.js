let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_4.jpg";
let maskFile   = "mask_4.png";
let outputFile = "output_4.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0, 0, 128);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  colorMode(HSB);
}
// let X_STOP = 640;
// let Y_STOP = 480;
let X_STOP = 1920;
let Y_STOP = 1080;
let OFFSET = 30;

function draw () {
  let num_lines_to_draw = 40;
  angleMode(DEGREES);
  for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<Y_STOP; j++) {
    for(let i=0; i<1920; i++) {
      colorMode(RGB);
      let x = floor(random(sourceImg.width));
      let y = floor(random(sourceImg.height));
      let pixco = sourceImg.get(x, y);
      let pix = sourceImg.get(i, j);
        // create a color from the values (always RGB)
      let col = color(pix);
      colorMode(HSB, 360, 100, 100);
        // draw a "dimmed" version in gray
      let h = hue(col);
      let s = saturation(col);
      let b = brightness(col);
      let mask = maskImg.get(i, j);
      
      if(mask[0] > 128) { /// when mask is white
        // draw the full pixels
        // let new_sat = map(s, 0, 100, 50, 100);
        pix = sourceImg.get(i, j);
        let new_brt = map(b, 0, 100, 100, 50);
        let new_hue = map(h, 0, 360, 180, 540);
        let new_col = color(new_hue, 0, new_brt);
        set(i, j, new_col);
      }
      else { // when mask is black
        // fill(pix);
        // let pointSize = 50;
        // rect(i, j, pointSize, pointSize);
        let wave = sin(j*3);
        let slip = map(wave, -1, 1, -OFFSET, OFFSET);
        pix = sourceImg.get(i+slip, j);
        set(i, j, pix);
      }
      // if(mask[0]<128){
      //   get(i, j, pix);
      //   fill(pixco);
      //   let pointSize = 50;
      //   rect(i, j, pointSize, pointSize);
      // }
      

      
        
    }
  renderCounter = renderCounter + num_lines_to_draw;
  updatePixels();
  // print(renderCounter);

  if(renderCounter >= 1080) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
   // saveArtworkImage(outputFile);
    
  }


function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
}
}