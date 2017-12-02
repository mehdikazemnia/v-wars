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

        for (let c in Game.cells) {
            if (c == targetid || c == this.cellid) continue
            this.obstacles.push(Game.cells[c])
        }

        this.stepper()
    }

    stepper() {
        let i = 0
        let steps = []

        while (Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2) > Math.pow(this.target.r, 2) && i < this.pace) {

            i++

            // attract equation
            let eq = this.target.attract(this.x, this.y) // the new  equation

            // repulse forces
            for (let o in this.obstacles) {
                let f = this.obstacles[o].repulse(this.x, this.y, this.equation.dy / this.equation.dx)
                if (f) {
                    eq.dx += f.dx
                    eq.dy += f.dy
                }
            }

            // turncate sudden changes in the final equation

            let diff = {
                dx: eq.dx - this.equation.dx,
                dy: eq.dy - this.equation.dy
            }
            if (Math.abs(diff.dx) > 200) diff.dx = diff.dx > 0 ? 200 : -200
            if (Math.abs(diff.dy) > 200) diff.dx = diff.dx > 0 ? 200 : -200

            this.equation.dx += diff.dx
            this.equation.dy += diff.dy


            // calculate the final dx and dy normalized by pace
            let m = this.equation.dy / this.equation.dx
            let dx = Math.sqrt((3 / ((m * m) + 1)))
            if (this.equation.dx < 0) dx = -dx
            let dy = (dx != 0) ? dx * m : (this.y < this.target.y) ? this.pace : -this.pace

            this.x += dx
            this.y += dy
            steps.push([this.x, this.y])

        }

        let counter = {
            i: 0
        }
        let len = steps.length

        if (len > 5) { // not close enough
            TweenLite.to(counter, len / this.pace, {
                ease: Power1.easeOut,
                i: len - 1,
                onUpdate: () => {
                    let s = steps[Math.round(counter.i)]
                    this.x = s[0]
                    this.y = s[1]
                    this.renderpos()
                },
                onComplete: () => {
                    this.stepper()
                }
            })
        } else { // close enough
            this.land()
        }
        
    }


}

export default Virus