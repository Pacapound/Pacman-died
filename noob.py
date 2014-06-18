import turtle
t = turtle.Pen()

def circle(size):
	for x in range(1, 100):
		t.forward(size)
		t.up()
		t.left(69)
		t.backward(size/2)
		t.right(193)
		t.down()
		t.forward(size*3)

t.color(0, 1, 0)
t.begin_fill()
circle(100)
t.end_fill
t.up()
t.color(1, 1, 1)
t.forward(500)
t.circle(500)
