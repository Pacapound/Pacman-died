import turtle
import time
j = turtle.Pen()
a = turtle.Pen()

def race(size):
	for x in range(0, size):
		j.forward(size)
		a.forward(size)
		j.forward(size)
		a.forward(size)
	for x in range(0, 2):
		j.left(90)
		a.left(90)
	for x in range(0, size):
		j.forward(size)
		a.forward(size)
		j.forward(size)
		a.forward(size)
j.color(1, 0, 0)
a.color(0, 1, 0)
j.up()
j.left(90)
j.forward(100)
j.right(90)
j.down()
race(50)
print("J WINS!")
a.right(90)
a.forward(100)
a.left(90)
j.circle(100)
for x in range(0,1080):
	for x in range(0, 2):
		j.forward(10)
		j.left(1)
	for x in (0, 2):
		a.forward(10)
		a.left(1)
	

