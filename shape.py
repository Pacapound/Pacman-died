import turtle
t = turtle.Pen()

def myobject(size, points):
	for x in range(0, points):
		t.forward(size)
		t.left(points)
		t.backward(size/2)
	if points >= 10:
		for x in range(0, points):
			t.forward(size)
			t.left(175)
	if points <= 10:
		for x in range(0, points):
			t.forward(size)
			t.left(225)
	if points == 10:
		for x in range(0, points):
			t.forward(size)
			t.left(200)

myobject(50, 50)
t.color(1, 1, 1)
t.up()
t.forward(500)
for x in range(0, 360):
	t.left(5)
