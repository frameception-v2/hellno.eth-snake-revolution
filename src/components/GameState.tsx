"use client";

import { useEffect, useState } from "react";

export class GameState {
  snake: number[][];
  food: number[];
  direction: string;
  score: number;
  gameOver: boolean;

  constructor() {
    this.snake = [[8,8], [7,8]];
    this.food = [9,8];
    this.direction = 'right';
    this.score = 0;
    this.gameOver = false;
  }

  checkFoodCollision() {
    if (this.snake[0][0] === this.food[0] && this.snake[0][1] === this.food[1]) {
      this.score++;
      this.snake.push([...this.snake.slice(-1)[0]]);
      this.regenerateFood();
    }
  }

  checkCollisions() {
    const [x,y] = this.snake[0];
    if (x < 0 || x > 15 || y < 0 || y > 15) return true;
    return this.snake.slice(1).some(([sx,sy]) => sx === x && sy === y);
  }

  private regenerateFood() {
    // Simple food regeneration - will be improved later
    this.food = [
      Math.floor(Math.random() * 16),
      Math.floor(Math.random() * 16)
    ];
  }
}

export function GameCanvas() {
  const [gameState] = useState(new GameState());
  
  return (
    <svg width="320" height="320" className="border rounded-lg">
      {/* Grid lines */}
      <path 
        d={Array.from({length: 16}, (_,i) => 
          `M0 ${i*20} L320 ${i*20} M${i*20} 0 L${i*20} 320`
        ).join(' ')}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
      
      {/* Snake segments */}
      {gameState.snake.map(([x,y], i) => (
        <rect
          key={`snake-${i}`}
          x={x*20 + 1}
          y={y*20 + 1}
          width="18"
          height="18"
          fill="#00ff00"
          rx="4"
        />
      ))}
      
      {/* Food */}
      <rect
        x={gameState.food[0]*20 + 1}
        y={gameState.food[1]*20 + 1}
        width="18"
        height="18"
        fill="#ff0000"
        rx="4"
      />
    </svg>
  );
}
