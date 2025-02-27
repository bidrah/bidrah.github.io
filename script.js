let sides = 5;  // Default number of sides
let angle = 0;  // Rotation angle
let ball;
let gravity = 0.2;
let polygonRadius = 100;
let rotationSpeed = 0.02;

function setup() {
    createCanvas(400, 400);
    ball = new Ball();
}

function draw() {
    background(220);
    translate(width / 2, height / 2);
    
    // Rotate and draw the polygon
    rotate(angle);
    drawPolygon(0, 0, polygonRadius, sides);
    
    // Ball physics and interaction
    angle += rotationSpeed;
    ball.update();
    ball.display();
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
        this.pos = createVector(0, -polygonRadius / 2);
        this.vel = createVector(0, 0);
    }

    update() {
        this.vel.y += gravity; // Apply gravity
        this.pos.add(this.vel);

        // Collision with bottom
        if (this.pos.y > polygonRadius / 2) {
            this.pos.y = polygonRadius / 2;
            this.vel.y *= -0.6; // Bounce with damping
        }

        // Keep the ball inside the polygon (crude boundary handling)
        let distFromCenter = this.pos.mag();
        if (distFromCenter > polygonRadius * 0.9) {
            this.pos.setMag(polygonRadius * 0.9);
            this.vel.mult(-0.6); // Reverse velocity on impact
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