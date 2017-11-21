float rotx = PI/4;
float roty = PI/4;

void setup() {
  size(1280, 800, P3D);
  frame.setResizable(true);
  textureMode(NORMAL);
  lights();
  background(0);
  noStroke();
  noFill();
  noCursor();
}

void draw() {
  background(0);
  translate(mouseX, mouseY, 0);
  rotateX(rotx);
  rotateY(roty);
  stroke(255);
  sphere(200.0);
}

void mouseMoved() {
  float rate = 0.007;
  rotx += (pmouseY-mouseY) * rate;
  roty += (mouseX-pmouseX) * rate;
}

void mouseDragged() {
  sphereDetail(mouseX/30);
}

