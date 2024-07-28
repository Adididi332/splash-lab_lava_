class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 60);
    this.speedX = random(-0.5, 0.5);
    this.speedY = random(-1, -2);
    this.alpha = random(100, 200);
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.y < 0) {
      this.y = height;
      this.x = random(width);
    }
    
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    
    this.alpha = map(this.y, height, 0, 200, 0);
  }
  
  display(r, g, b) {
    noStroke();
    fill(r, g, b, this.alpha); // Dynamic color with alpha
    ellipse(this.x, this.y, this.size);
  }
}

let particles = [];
const numParticles = 200;
let happySound, bubblesSound, needSound, currentSound;
let logoImage, lavaImage, waterImage, oilImage, sweetenerImage, foodColoringImage, measuringCupImage, diyImage, whatToDoImage, step1Image, step2Image, step3Image, step4Image, shareImage;
let video;
let isCameraScreen = false;
let waterX = -200; // Start the water image off-screen to the left
let oilX = -200; // Start the oil image off-screen to the left
let sweetenerX = -200; // Start the sweetener image off-screen to the left
let foodColoringX = -200; // Start the food coloring image off-screen to the left
let measuringCupX = -200; // Start the measuring cup image off-screen to the left
let isWaterMoving = false;
let isOilMoving = false; // Flag to control oil movement
let isSweetenerMoving = false; // Flag to control sweetener movement
let isFoodColoringMoving = false; // Flag to control food coloring movement
let isMeasuringCupMoving = false; // Flag to control measuring cup movement
let showWhatToDo = false; // Flag to control showing the "what to do" image
let showStep1 = false; // Flag to control showing the "step 1" image
let showStep2 = false; // Flag to control showing the "step 2" image
let showStep3 = false; // Flag to control showing the "step 3" image
let showStep4 = false; // Flag to control showing the "step 4" image
let showShare = false; // Flag to control showing the "share" image

function preload() {
  soundFormats('mp3');
  happySound = loadSound('Happy.mp3');
  bubblesSound = loadSound('Bubbles.mp3');
  needSound = loadSound('need.mp3');
  logoImage = loadImage('Logo.png');
  lavaImage = loadImage('Lava.png');
  waterImage = loadImage('water.png'); // Load the water image
  oilImage = loadImage('oil.png'); // Load the oil image
  sweetenerImage = loadImage('sweetener.png'); // Load the sweetener image
  foodColoringImage = loadImage('Food coloring.png'); // Load the food coloring image
  measuringCupImage = loadImage('measuring cup.png'); // Load the measuring cup image
  diyImage = loadImage('Do it yourself.png'); // Load the DIY image
  whatToDoImage = loadImage('what to do.png'); // Load the "what to do" image
  step1Image = loadImage('step 1.png'); // Load the "step 1" image
  step2Image = loadImage('step 2.png'); // Load the "step 2" image
  step3Image = loadImage('step 3.png'); // Load the "step 3" image
  step4Image = loadImage('step 4.png'); // Load the "step 4" image
  shareImage = loadImage('share.png'); // Load the "share" image
}

function setup() {
  createCanvas(1920, 1080);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  currentSound = bubblesSound;
  currentSound.loop();
  
  // Set up the sound ended callback
  needSound.onended(() => {
    happySound.loop();
    isWaterMoving = false; // Stop moving the water image when need sound ends
    isOilMoving = false; // Stop moving the oil image when need sound ends
    isSweetenerMoving = false; // Stop moving the sweetener image when need sound ends
    isFoodColoringMoving = false; // Stop moving the food coloring image when need sound ends
    isMeasuringCupMoving = false; // Stop moving the measuring cup image when need sound ends
    waterX = -200; // Reset water image position
    oilX = -200; // Reset oil image position
    sweetenerX = -200; // Reset sweetener image position
    foodColoringX = -200; // Reset food coloring image position
    measuringCupX = -200; // Reset measuring cup image position
    showWhatToDo = true; // Show the "what to do" image
    showStep1 = false; // Reset the showStep1 flag
    showStep2 = false; // Reset the showStep2 flag
    showStep3 = false; // Reset the showStep3 flag
    showStep4 = false; // Reset the showStep4 flag
    showShare = false; // Reset the showShare flag
  });
}

function draw() {
  if (isCameraScreen) {
    // Display camera screen
    background(0);
    image(video, 0, 0, width, height);
    
    tint(255, 255);
    image(logoImage, 1811, 55); // Align the logo with the Y-coordinate of the DIY image
    image(diyImage, width / 2 - diyImage.width / 2, 0);

    // Display and move the water image if it's active
    if (isWaterMoving) {
      image(waterImage, waterX, height / 2 - waterImage.height / 2);
      waterX += 5; // Slower speed for water movement
      
      // Reset the water position and stop moving when it goes off-screen
      if (waterX > width) {
        isWaterMoving = false;
        waterX = -200;
      }
    }
    
    // Display and move the oil image if it's active
    if (isOilMoving) {
      image(oilImage, oilX, height / 2 - oilImage.height / 2 + waterImage.height); // Adjust Y position to be below the water image
      oilX += 5; // Slower speed for oil movement
      
      // Reset the oil position and stop moving when it goes off-screen
      if (oilX > width) {
        isOilMoving = false;
        oilX = -200;
      }
    }

    // Display and move the sweetener image if it's active
    if (isSweetenerMoving) {
      image(sweetenerImage, sweetenerX, height / 2 - sweetenerImage.height / 2 + waterImage.height + oilImage.height); // Adjust Y position to be below the oil image
      sweetenerX += 5; // Slower speed for sweetener movement
      
      // Reset the sweetener position and stop moving when it goes off-screen
      if (sweetenerX > width) {
        isSweetenerMoving = false;
        sweetenerX = -200;
      }
    }
    
    // Display and move the food coloring image if it's active
    if (isFoodColoringMoving) {
      image(foodColoringImage, foodColoringX, height / 2 - foodColoringImage.height / 2 + waterImage.height + oilImage.height + sweetenerImage.height); // Adjust Y position to be below the sweetener image
      foodColoringX += 5; // Slower speed for food coloring movement
      
      // Reset the food coloring position and stop moving when it goes off-screen
      if (foodColoringX > width) {
        isFoodColoringMoving = false;
        foodColoringX = -200;
      }
    }
    
    // Display and move the measuring cup image if it's active
    if (isMeasuringCupMoving) {
      image(measuringCupImage, measuringCupX, height / 2 - measuringCupImage.height / 2 + waterImage.height + oilImage.height + sweetenerImage.height + foodColoringImage.height); // Adjust Y position to be below the food coloring image
      measuringCupX += 5; // Slower speed for measuring cup movement
      
      // Check if the measuring cup has passed the screen
      if (measuringCupX > width) {
        isMeasuringCupMoving = false;
        measuringCupX = -200;
        showWhatToDo = true; // Show the "what to do" image when measuring cup passes
      }
    }

    // Display the "what to do" image if the flag is set
    if (showWhatToDo) {
      image(whatToDoImage, 0, diyImage.height);
    }

    // Display the "step 1" image if the flag is set
    if (showStep1) {
      image(step1Image, 0, diyImage.height + whatToDoImage.height);
    }

    // Display the "step 2" image if the flag is set
    if (showStep2) {
      image(step2Image, 0, diyImage.height + whatToDoImage.height + step1Image.height);
    }

    // Display the "step 3" image if the flag is set
    if (showStep3) {
      image(step3Image, 0, diyImage.height + whatToDoImage.height + step1Image.height + step2Image.height);
    }

    // Display the "step 4" image if the flag is set
    if (showStep4) {
      image(step4Image, 0, diyImage.height + whatToDoImage.height + step1Image.height + step2Image.height + step3Image.height);
    }

    // Display the "share" image if the flag is set
    if (showShare) {
      image(shareImage, width - shareImage.width, diyImage.height + whatToDoImage.height + step1Image.height + step2Image.height + step3Image.height + step4Image.height);
    }
  } else {
    // Original background drawing code
    background(255, 237, 8);
    let pinkAmount = mouseX / width;
    let r = lerp(69, 238, pinkAmount);
    let g = lerp(199, 61, pinkAmount);
    let b = lerp(243, 118, pinkAmount);
    for (let particle of particles) {
      particle.update();
      particle.display(r, g, b);
    }
    tint(255, 255);
    image(logoImage, 1811, 55); // Align the logo with the Y-coordinate of the DIY image
    image(lavaImage, width / 2 - lavaImage.width / 2, 660);
    noTint();
  }
}

function mousePressed() {
  let lavaX = width / 2 - lavaImage.width / 2;
  let lavaY = 660;
  let lavaWidth = lavaImage.width;
  let lavaHeight = lavaImage.height;
  if (mouseX >= lavaX && mouseX <= lavaX + lavaWidth && mouseY >= lavaY && mouseY <= lavaY + lavaHeight) {
    isCameraScreen = true;
    currentSound.stop();
    needSound.play();
    waterX = -200; // Reset water position
    oilX = -200; // Reset oil position
    sweetenerX = -200; // Reset sweetener position
    foodColoringX = -200; // Reset food coloring position
    measuringCupX = -200; // Reset measuring cup position
    showWhatToDo = false; // Reset the showWhatToDo flag
    showStep1 = false; // Reset the showStep1 flag
    showStep2 = false; // Reset the showStep2 flag
    showStep3 = false; // Reset the showStep3 flag
    showStep4 = false; // Reset the showStep4 flag
    showShare = false; // Reset the showShare flag
    
    // Stagger the movements with the specified delays
    setTimeout(() => { isWaterMoving = true; }, 0);
    setTimeout(() => { isOilMoving = true; }, 1000); // Delay of 1000ms (1 second)
    setTimeout(() => { isSweetenerMoving = true; }, 2000); // Delay of 2000ms (2 seconds)
    setTimeout(() => { isFoodColoringMoving = true; }, 3000); // Delay of 3000ms (3 seconds)
    setTimeout(() => { isMeasuringCupMoving = true; }, 4000); // Delay of 4000ms (4 seconds)
  }
  
  // Check if the "what to do" image is clicked
  if (showWhatToDo) {
    let whatToDoX = 0;
    let whatToDoY = diyImage.height;
    let whatToDoWidth = whatToDoImage.width;
    let whatToDoHeight = whatToDoImage.height;
    if (mouseX >= whatToDoX && mouseX <= whatToDoX + whatToDoWidth && mouseY >= whatToDoY && mouseY <= whatToDoY + whatToDoHeight) {
      showStep1 = true; // Show the "step 1" image when "what to do" image is clicked
    }
  }

  // Check if the "step 1" image is clicked
  if (showStep1) {
    let step1X = 0;
    let step1Y = diyImage.height + whatToDoImage.height;
    let step1Width = step1Image.width;
    let step1Height = step1Image.height;
    if (mouseX >= step1X && mouseX <= step1X + step1Width && mouseY >= step1Y && mouseY <= step1Y + step1Height) {
      showStep2 = true; // Show the "step 2" image when "step 1" image is clicked
    }
  }

  // Check if the "step 2" image is clicked
  if (showStep2) {
    let step2X = 0;
    let step2Y = diyImage.height + whatToDoImage.height + step1Image.height;
    let step2Width = step2Image.width;
    let step2Height = step2Image.height;
    if (mouseX >= step2X && mouseX <= step2X + step2Width && mouseY >= step2Y && mouseY <= step2Y + step2Height) {
      showStep3 = true; // Show the "step 3" image when "step 2" image is clicked
    }
  }

  // Check if the "step 3" image is clicked
  if (showStep3) {
    let step3X = 0;
    let step3Y = diyImage.height + whatToDoImage.height + step1Image.height + step2Image.height;
    let step3Width = step3Image.width;
    let step3Height = step3Image.height;
    if (mouseX >= step3X && mouseX <= step3X + step3Width && mouseY >= step3Y && mouseY <= step3Y + step3Height) {
      showStep4 = true; // Show the "step 4" image when "step 3" image is clicked
    }
  }

  // Check if the "step 4" image is clicked
  if (showStep4) {
    let step4X = 0;
    let step4Y = diyImage.height + whatToDoImage.height + step1Image.height + step2Image.height + step3Image.height;
    let step4Width = step4Image.width;
    let step4Height = step4Image.height;
    if (mouseX >= step4X && mouseX <= step4X + step4Width && mouseY >= step4Y && mouseY <= step4Y + step4Height) {
      showShare = true; // Show the "share" image when "step 4" image is clicked
      showWhatToDo = false; // Hide the "what to do" image
      showStep1 = false; // Hide the "step 1" image
      showStep2 = false; // Hide the "step 2" image
      showStep3 = false; // Hide the "step 3" image
      showStep4 = false; // Hide the "step 4" image
    }
  }
}
