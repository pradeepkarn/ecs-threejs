# Entities are just numbers that represent objects in the game
# Components are just data that describes the object
# Systems are just functions that take a list of entities and components and modify the game state
# ECS is a pattern for organizing game objects and their behaviors

*********
# Input Component - listens for keyboard events and updates player state, input is just a request
# Player Controller  - read inputs and decide what the player intends to do
# Movement System - Applies the result consistently with delta time

*********
# Order is important in ECS systems
# 1. Input System first 
# 2. Controller Second 
# 3. Physics and Movement System next and
# 4. Render System is last