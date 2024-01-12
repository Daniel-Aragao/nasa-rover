# Nasa

This project is a rover simulator that should navigate in a board

## Instructions

In the Action field insert the command you want to reproduce.

Insrting multiple commands by breaking lines and writting new ones before hitting Run.

Also, if multiple commands of movement are inserted with spaces separations you can also run deconsidering the delay set.

### Create a board

At any point you can create a new board by inserting the board dimensions

> X Y

where:  

* 0 <= X  
* 0 <= Y

### Create Rover

At any point a Rover can be created/overwritted by setting the postion and direction in the Action field

> X Y D

Where:  

* 0 <= X  Position  
* 0 <= Y  Position  
* D as of Direction IN (N, S, E, W)  

### Move Rover

The rover will be moved by an action of a set of 3 different movements based on the Rover current position.  

> < R | L | M >

Where Movement may be:  

* R as in rotate Right  
* L as in rotate Light  
* M as Move forward  
