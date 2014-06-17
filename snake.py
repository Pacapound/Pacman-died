import turtle
import time
t = turtle.Pen()

def myjk(size):
	for x in range (1, 16):
		t.forward(20)
		t.left(18)
		t.up()
		t.forward(20)
		t.down()
		t.left(3)
		t.forward(5)

def mycircle(size):
	for x in range (1, 101):
		t.forward(2)
		t.right(3.6)


for x in range (1, 9):
	t.color(0.9, 0.75, 0)
	t.begin_fill()
	myjk(1)
	t.up()
	t.forward(100)
	t.down()
	t.end_fill()

t.backward(50)
t.right(168)
t.color(1, 0, 0)
t.begin_fill()
mycircle(1)
t.end_fill()
print("PRETTY! :D")

while 1:
	time.sleep(1)

	


	
