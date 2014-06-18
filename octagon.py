import turtle
t = turtle.Pen()

def myoctagon(size):
	for x in range(0, 8):
		t.forward(size)
		t.right(45)

t.color(0.9, 0.75, 0)
t.begin_fill()
myoctagon(100)
t.end_fill()
t.color(0, 0, 0)
myoctagon(100)
t.up()
t.color(1, 1, 1)
t.forward(200)

for x in range(0, 100):
	t.left(7.2)
