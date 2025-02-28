### Step 1: Initialize GameState and Static Canvas  
```text  
- Build: Create initial GameState with default snake position, food placement, and direction. Render SVG grid (16x16) with snake segments (green) and food (red).  
- Outcome: Canvas displays static snake (e.g., [[8,8],[7,8]]) and food at startup with visible grid lines.  
```  

### Step 2: Basic Snake Movement  
```text  
- Build: Implement /move endpoint logic to advance snake in current direction. Update snake array (head moves, tail removed unless growing).  
- Outcome: Repeated POST /move calls show snake moving rightward across the grid in automated tests.  
```  

### Step 3: Directional Input Handling  
```text  
- Build: Add directional buttons that send new direction in POST /move. Validate inputs (block reverse directions like down→up).  
- Outcome: Clicking ▲ changes snake direction to up; subsequent moves reflect new heading.  
```  

### Step 4: Food Consumption Mechanics  
```text  
- Build: Detect head/food collision. Generate new food in random empty cell. Grow snake by retaining tail on eat.  
- Outcome: Snake length increases by 1 after eating; score increments; new food appears not under snake.  
```  

### Step 5: Collision Detection System  
```text  
- Build: Check for wall collisions (x/y <0 or >15) and self-collisions (head in body coordinates). Set gameOver flag.  
- Outcome: Snake hitting wall or body stops movement; gameOver becomes true.  
```  

### Step 6: Win Condition Implementation  
```text  
- Build: Check if score >=10. Display "YOU WIN" message and disable controls when triggered.  
- Outcome: Collecting 10 food pellets ends game with victory message.  
```  

### Step 7: State Serialization API  
```text  
- Build: Encode GameState to Base64 with CRC32 checksum. Handle POST /validate to detect/reset corrupted states.  
- Outcome: Tampered state strings automatically reset game; valid states persist between moves.  
```  

### Step 8: CRT Styling Core  
```text  
- Build: Apply Press Start 2P font and CSS scanline overlay. Style canvas with black background + white grid lines.  
- Outcome: Canvas has visible retro styling with pixel font and subtle scanlines.  
```  

### Step 9: Restart Flow Integration  
```text  
- Build: Add restart button (visible when gameOver=true). Implement POST /restart to reset GameState.  
- Outcome: Clicking restart resets snake, score, and clears gameOver flag.  
```  

### Step 10: Mobile Responsive Controls  
```text  
- Build: Media query scaling for buttons and canvas at <=600px width. Use CSS transform for touch-friendly sizing.  
- Outcome: Controls remain usable on mobile with properly scaled SVG and button tap targets.  
```