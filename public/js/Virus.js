import {
    TweenLite,
} from 'gsap'


class Virus {

    constructor(x, y, cellid, playerid) {

        // place and owner
        this.cellid = cellid
        this.playerid = playerid
        this.color = Game.players[this.playerid] ? Game.players[this.playerid].color : '#888'


        // equation and movements
        this.x = x
        this.y = y
        this.pace = 60 // steps per second
        this.equation = {
            dx: 0,
            dy: 0
        }


        // target and obstacles
        this.target = {}
        this.obstacles = []

        // visual stuff
        this.fab = {}
        this.fab.virus = new fabric.Circle({
            opacity: 0.6,
            left: this.x,
            top: this.y,
            radius: 0,
            fill: this.color,
            // strokeWidth: 3,
            // stroke: 'rgba(0,0,0,.5)'
        })
        Game.canvas.add(this.fab.virus)

    }

    // visibility

    show() {
        this.fab.virus.set({
            radius: 4,
            // strokeWidth: 3
        })
    }

    hide() {
        this.fab.virus.set({
            radius: 0,
            // strokeWidth: 0  
        })
    }

    // position

    renderpos() {
        this.fab.virus.set({
            left: this.x,
            top: this.y
        })
    }

    land() {
        this.cellid = this.target.id
        this.x = this.target.x
        this.y = this.target.y
        this.renderpos()
        this.hide()
        this.target.recieve(this)
    }

    // movement calculations

    launch(targetid) {
        this.show()
        this.target = Game.cells[targetid]
        this.obstacles = []
        this.path = []

        for (let c in Game.cells) {
            if (c == targetid || c == this.cellid) continue
            this.obstacles.push(Game.cells[c])
        }

        this.findpath()
    }

    findpath() {

        while (Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2) > Math.pow(this.target.r, 2)) {

            // attract equation
            this.equation = this.target.attract(this.x, this.y)

            // repulse forces
            for (let o in this.obstacles) {
                let f = this.obstacles[o].repulse(this.x, this.y, this.equation.dy / this.equation.dx)
                if (f) {
                    this.equation.dx += f.dx
                    this.equation.dy += f.dy
                }
            }

            // calculate the final dx and dy normalized by pace
            let m = this.equation.dy / this.equation.dx
            let dx = Math.sqrt((3 / ((m * m) + 1)))
            if (this.equation.dx < 0) dx = -dx
            let dy = (dx != 0) ? dx * m : (this.y < this.target.y) ? this.pace : -this.pace

            this.x += dx
            this.y += dy
            this.path.push([this.x, this.y])
            this.equation = {}

        }

        this.step()

    }

    step() {

        let step = this.path.splice(0, this.pace)

        let counter = {
            i: 0
        }

        TweenLite.to(counter, step.length / this.pace, {
            ease: Power1.easeOut,
            i: step.length - 1,
            onUpdate: () => {
                let s = step[Math.round(counter.i)]
                this.x = s[0]
                this.y = s[1]
                this.renderpos()
            },
            onComplete: () => {
                if (this.path.length > 5) {
                    this.step()
                } else {
                    this.land()
                }
            }
        });
    }



}

export default Virus