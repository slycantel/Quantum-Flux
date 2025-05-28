```javascript
const { createCanvas } = require('canvas');
const Particle = require('./particle.js');

class QuantumFlux {
  constructor() {
    this.canvas = createCanvas(400, 600);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 40;
    this.cols = 10;
    this.rows = 15;
    this.particles = [];
    this.score = 0;
    this.level = 1;
    this.spawnParticle();
  }

  spawnParticle() {
    const col = Math.floor(Math.random() * this.cols);
    const row = Math.floor(Math.random() * this.rows);
    const type = Math.floor(Math.random() * 3);
    this.particles.push(new Particle(col * this.gridSize, row * this.gridSize, type));
  }

  drawGrid() {
    this.ctx.strokeStyle = '#666666';
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  update() {
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].draw(this.ctx);
      if (this.particles[i].update()) {
        this.particles.splice(i, 1);
        this.spawnParticle();
      }
    }

    this.checkConnections();
    this.drawUI();
  }

  checkConnections() {
    const toRemove = [];
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        if (
          p1.type === p2.type &&
          Math.abs(p1.x - p2.x) <= this.gridSize &&
          Math.abs(p1.y - p2.y) <= this.gridSize
        ) {
          this.ctx.strokeStyle = p1.type === 0 ? '#ff3333' : p1.type === 1 ? '#3333ff' : '#33ff33';
          this.ctx.lineWidth = 3;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x + this.gridSize / 2, p1.y + this.gridSize / 2);
          this.ctx.lineTo(p2.x + this.gridSize / 2, p2.y + this.gridSize / 2);
          this.ctx.stroke();
          toRemove.push(i, j);
          this.score += 10 * this.level;
        }
      }
    }

    toRemove.sort((a, b) => b - a);
    toRemove.forEach(i => this.particles.splice(i, 1));
    if (toRemove.length > 0) {
      this.spawnParticle();
      if (this.score >= this.level * 100) this.levelUp();
    }
  }

  levelUp() {
    this.level++;
    this.particles.forEach(p => (p.energy = Math.min(p.energy + 20, 100)));
    this.spawnParticle();
  }

  drawUI() {
    this.ctx.fillStyle = '#00ffcc';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`Level: ${this.level}`, 10, 40);
  }

  handleClick(x, y) {
    for (const particle of this.particles) {
      const d = Math.sqrt(
        Math.pow(x - (particle.x + this.gridSize / 2), 2) +
        Math.pow(y - (particle.y + this.gridSize / 2), 2)
      );
      if (d < this.gridSize / 2) {
        particle.type = (particle.type + 1) % 3;
        break;
      }
    }
  }

  reset() {
    this.particles = [];
    this.score = 0;
    this.level = 1;
    this.spawnParticle();
  }
}

// Example usage (for testing in Node.js)
const game = new QuantumFlux();
game.update();
console.log('Quantum Flux game initialized. Use a UI framework or save canvas to render.');
// For rendering, you can save the canvas to a file or integrate with a UI framework
const fs = require('fs');
const out = fs.createWriteStream('output.png');
const stream = game.canvas.createPNGStream();
stream.pipe(out);
