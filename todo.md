- [ ] Task 1: Create GameState class and static canvas  
  File: src/game.js  
  Action: Create file  
  Description: Initialize GameState with snake [[8,8],[7,8]], food at [9,8], direction='right'. Include grid rendering logic.  
  Code Snippet:  
  ```javascript
  class GameState {
    constructor() {
      this.snake = [[8,8], [7,8]];
      this.food = [9,8];
      this.direction = 'right';
      this.score = 0;
      this.gameOver = false;
    }
  }
  ```

  File: public/index.html  
  Action: Add SVG canvas  
  Description: 16x16 grid with green snake segments and red food  
  UI Component: 
  ```html
  <svg id="canvas" width="320" height="320">
    <!-- Grid lines -->
    <path d="M0 0 L320 0 M0 32 L320 32 [...]" class="grid"/>
    <!-- Snake segments -->
    <rect id="snake-0" x="128" y="128" width="32" height="32" fill="#00ff00"/>
    <!-- Food -->
    <rect id="food" x="160" y="128" width="32" height="32" fill="#ff0000"/>
  </svg>
  ```

- [ ] Task 2: Implement movement endpoint  
  File: server.js  
  Action: Add POST /move handler  
  Description: Advance snake in current direction, remove tail  
  API Endpoint: POST /move  
  Code Snippet:
  ```javascript
  app.post('/move', (req, res) => {
    const head = [...gameState.snake[0]];
    switch(gameState.direction) {
      case 'right': head[0]++; break;
      case 'left': head[0]--; break;
      case 'up': head[1]--; break;
      case 'down': head[1]++; break;
    }
    gameState.snake.unshift(head);
    gameState.snake.pop();
    res.json(gameState);
  });
  ```

- [ ] Task 3: Add directional controls  
  File: public/app.js  
  Action: Add button handlers  
  UI Component: Direction buttons  
  Code Snippet:
  ```javascript
  document.getElementById('up-btn').addEventListener('click', () => {
    if (gameState.direction !== 'down') {
      fetch('/move', { method: 'POST', body: JSON.stringify({direction: 'up'}) });
    }
  });
  ```

  File: server.js  
  Action: Modify POST /move to accept direction  
  Description: Validate direction changes  
  Code Snippet:
  ```javascript
  const newDir = req.body.direction;
  const invalidPairs = {up: 'down', down: 'up', left: 'right', right: 'left'};
  if (!invalidPairs[gameState.direction] === newDir) {
    gameState.direction = newDir;
  }
  ```

- [ ] Task 4: Implement food consumption  
  File: src/game.js  
  Action: Add checkFoodCollision()  
  Description: Grow snake and regenerate food  
  Code Snippet:
  ```javascript
  checkFoodCollision() {
    if (this.snake[0][0] === this.food[0] && this.snake[0][1] === this.food[1]) {
      this.score++;
      this.snake.push([...this.snake.slice(-1)[0]]);
      this.regenerateFood();
    }
  }
  ```

- [ ] Task 5: Add collision detection  
  File: src/game.js  
  Action: Add checkCollisions()  
  Description: Wall and self collisions  
  Code Snippet:
  ```javascript
  checkCollisions() {
    const [x,y] = this.snake[0];
    if (x < 0 || x > 15 || y < 0 || y > 15) return true;
    return this.snake.slice(1).some(([sx,sy]) => sx === x && sy === y);
  }
  ```

- [ ] Task 6: Implement win condition  
  File: public/index.html  
  Action: Add victory message div  
  UI Component: Victory overlay  
  Code Snippet:
  ```html
  <div id="victory" style="display:none">
    <h2>YOU WIN</h2>
  </div>
  ```

- [ ] Task 7: Create state validation endpoint  
  File: server.js  
  Action: Add POST /validate  
  API Endpoint: POST /validate  
  Code Snippet:
  ```javascript
  app.post('/validate', (req, res) => {
    const {state, checksum} = req.body;
    if (validateState(state, checksum)) {
      res.sendStatus(200);
    } else {
      resetGame();
      res.sendStatus(418);
    }
  });
  ```

- [ ] Task 8: Apply CRT styling  
  File: public/styles.css  
  Action: Add scanline overlay  
  UI Component: Canvas effects  
  Code Snippet:
  ```css
  .scanlines {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #0002 50%, #fff2 50%);
    background-size: 100% 4px;
    pointer-events: none;
  }
  ```

- [ ] Task 9: Add restart functionality  
  File: public/index.html  
  Action: Add restart button  
  UI Component: Restart button  
  API Endpoint: POST /restart  
  Code Snippet:
  ```javascript
  app.post('/restart', (req, res) => {
    gameState = new GameState();
    res.sendStatus(200);
  });
  ```

- [ ] Task 10: Implement mobile scaling  
  File: public/styles.css  
  Action: Add media query  
  Description: Scale canvas for mobile  
  Code Snippet:
  ```css
  @media (max-width: 600px) {
    #canvas {
      transform: scale(0.8);
    }
    .control-btn {
      padding: 1.2em;
    }
  }
  ```