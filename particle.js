```javascript
class Particle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 0: red, 1: blue, 2: green
    this.energy = Math.random() * 50 + 50;
  }

  draw(ctx) {
    ctx.fillStyle = this.type === 0 ? '#ff3333' : this.type === 1 ? '#3333ff' : '#33ff33';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, this.energy / 5, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.energy -= 0.5;
    return this.energy <= 0;
  }
}

module.exports = Particle;
