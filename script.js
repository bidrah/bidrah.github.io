let sides = 5; // Default number of sides
let angle = 0; // Rotation angle
let rotationSpeed = 0.02; // Speed of rotation
let polygonRadius = 100;
let ball;
let gravity = 0.2;

function setup() {
    createCanvas(400, 400);
    ball = new Ball();
}

function draw() {
    background(220);
    
    // Move origin to center
    translate(width / 2, height / 2);
    
    // Rotate the entire scene
    rotate(angle);
    
    // Draw the polygon
    drawPolygon(0, 0, polygonRadius, sides);
    
    // Apply rotational acceleration to the ball
    ball.applyRotation(angle, rotationSpeed);
    ball.update();
    ball.display();
    
    // Increase rotation angle
    angle += rotationSpeed;
}

// Function to draw a polygon
function drawPolygon(x, y, radius, sides) {
    beginShape();
    for (let i = 0; i < sides; i++) {
        let a = TWO_PI * i / sides;
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

class Ball {
    constructor() {
        this.pos = createVector(0, -polygonRadius / 2); // Start near the top
        this.vel = createVector(0, 0);
        this.acc = createVector(0, gravity);
    }

    applyRotation(angle, rotationSpeed) {
        // Convert rotation into a force acting on the ball
        let centrifugalForce = p5.Vector.fromAngle(angle + HALF_PI);
        centrifugalForce.mult(rotationSpeed * 5); // Tune the effect
        
        // Apply force due to rotation
        this.vel.add(centrifugalForce);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        // Collision with bottom
        if (this.pos.mag() > polygonRadius * 0.9) {
            this.pos.setMag(polygonRadius * 0.9);
            this.vel.mult(-0.6); // Bounce back
        }
    }

    display() {
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, 20, 20);
    }
}

// Update polygon when user changes input
function updatePolygon() {
    sides = int(document.getElementById("sides").value);
}