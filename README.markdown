# Quantum Flux

Quantum Flux is a unique JavaScript-based puzzle game where players manipulate energy particles to create stable quantum fields. Connect particles of the same type to score points and advance through levels. Built with Node.js and the `canvas` library, this game is designed for developers looking to extend or integrate it into larger projects.

## Features
- **Dynamic Gameplay**: Connect particles of the same color (red, blue, or green) to score points.
- **Progressive Difficulty**: Levels increase as you score, with particles gaining more energy.
- **Modular Design**: Clean JavaScript classes for easy extension and integration.
- **Canvas Rendering**: Uses Node.js `canvas` for server-side or desktop rendering.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quantum-flux.git
   ```
2. Navigate to the project directory:
   ```bash
   cd quantum-flux
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the game:
   ```bash
   npm start
   ```

## How to Play
- **Objective**: Connect adjacent particles of the same color by cycling their types (red, blue, green).
- **Scoring**: Each connection earns 10 points multiplied by the current level.
- **Leveling Up**: Reach 100 points per level to advance, increasing particle energy and spawning new particles.
- **Interaction**: Use `game.handleClick(x, y)` to cycle particle types (requires UI integration).
- **Reset**: Call `game.reset()` to restart the game.

## Development
- **Tech Stack**: Node.js, JavaScript, `canvas`
- **Dependencies**: `canvas` for rendering
- **Code Structure**:
  - `index.js`: Main game logic and canvas rendering.
  - `particle.js`: Particle class for game entities.
  - `package.json`: Project metadata and dependencies.
- **Extending**: Integrate with a UI framework (e.g., Electron for desktop or a web server) to handle input and display the canvas.

## Notes
- The current implementation outputs a PNG snapshot (`output.png`) for testing. To make the game interactive, integrate with a UI framework to handle mouse clicks and real-time rendering.
- Example integration: Use Electron for a desktop app or a WebSocket server for web-based play.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, open an issue first to discuss your ideas.

## Support
If you enjoy Quantum Flux and want to support its development, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/your-username). Your support helps keep this project alive and growing!

## License
MIT License. See [LICENSE](LICENSE) for details.