import turtle
t = turtle.Pen()


def myweird(size):
   for x in range (1, 52):
            t.forward(10)
            t.left(90)
            t.up()
            t.left(90)
            t.forward(5)
            t.down()
            t.left(90)
            t.forward(100)
            t.up()
            t.left(270)
            t.forward(100)
            t.left(270)
            t.down()
            t.forward(10)
            t.left(3.6)
t.color(0, 0, 1)
t.begin_fill()
myweird(1)
t.end_fill()

while 1:
	time_sleep(1)

