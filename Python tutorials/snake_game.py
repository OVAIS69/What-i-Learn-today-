import os
import sys
import time
import random
import threading
from collections import deque

# Windows-specific imports for non-blocking input
if os.name == 'nt':
    import msvcrt

class SnakeGame:
    def __init__(self, width=40, height=20):
        self.width = width
        self.height = height
        self.reset_game()
        self.running = True
        self.last_direction = None
        
    def reset_game(self):
        # Initialize snake in the center
        center_x = self.width // 2
        center_y = self.height // 2
        self.snake = deque([(center_x, center_y)])
        self.direction = 'RIGHT'
        self.food = self.generate_food()
        self.score = 0
        self.game_over = False
        
    def generate_food(self):
        while True:
            x = random.randint(1, self.width - 2)
            y = random.randint(1, self.height - 2)
            if (x, y) not in self.snake:
                return (x, y)
    
    def get_input(self):
        """Non-blocking input for Windows"""
        if os.name == 'nt':
            if msvcrt.kbhit():
                key = msvcrt.getch().decode('utf-8').lower()
                if key == 'w' and self.direction != 'DOWN':
                    self.direction = 'UP'
                elif key == 's' and self.direction != 'UP':
                    self.direction = 'DOWN'
                elif key == 'a' and self.direction != 'RIGHT':
                    self.direction = 'LEFT'
                elif key == 'd' and self.direction != 'LEFT':
                    self.direction = 'RIGHT'
                elif key == 'q':
                    self.running = False
                elif key == 'r' and self.game_over:
                    self.reset_game()
    
    def move_snake(self):
        if self.game_over:
            return
            
        head_x, head_y = self.snake[0]
        
        # Calculate new head position
        if self.direction == 'UP':
            new_head = (head_x, head_y - 1)
        elif self.direction == 'DOWN':
            new_head = (head_x, head_y + 1)
        elif self.direction == 'LEFT':
            new_head = (head_x - 1, head_y)
        elif self.direction == 'RIGHT':
            new_head = (head_x + 1, head_y)
        
        # Check wall collision
        if (new_head[0] <= 0 or new_head[0] >= self.width - 1 or 
            new_head[1] <= 0 or new_head[1] >= self.height - 1):
            self.game_over = True
            return
        
        # Check self collision
        if new_head in self.snake:
            self.game_over = True
            return
        
        # Add new head
        self.snake.appendleft(new_head)
        
        # Check food collision
        if new_head == self.food:
            self.score += 10
            self.food = self.generate_food()
        else:
            # Remove tail if no food eaten
            self.snake.pop()
    
    def draw_game(self):
        # Clear screen
        os.system('cls' if os.name == 'nt' else 'clear')
        
        # Create game board
        board = [[' ' for _ in range(self.width)] for _ in range(self.height)]
        
        # Draw borders
        for x in range(self.width):
            board[0][x] = '#'
            board[self.height - 1][x] = '#'
        for y in range(self.height):
            board[y][0] = '#'
            board[y][self.width - 1] = '#'
        
        # Draw snake
        for i, (x, y) in enumerate(self.snake):
            if i == 0:  # Head
                board[y][x] = '@'
            else:  # Body
                board[y][x] = 'o'
        
        # Draw food
        food_x, food_y = self.food
        board[food_y][food_x] = '*'
        
        # Print the board
        for row in board:
            print(''.join(row))
        
        # Print game info
        print(f"Score: {self.score}")
        print("Controls: WASD to move, Q to quit")
        
        if self.game_over:
            print("GAME OVER! Press R to restart or Q to quit")
    
    def run(self):
        print("Starting Snake Game...")
        print("Use WASD keys to control the snake")
        print("Eat the food (*) to grow and score points")
        print("Don't hit the walls or yourself!")
        print("Press any key to start...")
        
        if os.name == 'nt':
            msvcrt.getch()
        
        while self.running:
            self.get_input()
            
            if not self.game_over:
                self.move_snake()
            
            self.draw_game()
            
            # Game speed
            time.sleep(0.2)
        
        print("\nThanks for playing Snake!")

def main():
    try:
        game = SnakeGame()
        game.run()
    except KeyboardInterrupt:
        print("\nGame interrupted. Thanks for playing!")
    except Exception as e:
        print(f"An error occurred: {e}")
        print("Make sure you're running this in a terminal that supports the required features.")

if __name__ == "__main__":
    main()
