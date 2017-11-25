import {
    TweenMax
} from 'gsap'

class Virus {


    constructor(x, y, cellid, playerid) {

        // positions
        this.x = x
        this.y = y

        // place and owner
        this.cellid = cellid
        this.playerid = playerid
        this.color = Game.players[this.playerid] ? Game.players[this.playerid].color : '#888'

        // equations and movements
        this.equations = [] // equations[i] = { dx, dy }
        this.equation = {
            dx: 0,
            dy: 0
        }
        this.movement = {
            animation: false,
            step: 3,
            time: .02
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
            fill: this.color
        })
        Game.canvas.add(this.fab.virus)

    }

    // visibility

    show() {
        this.fab.virus.set({
            radius: 4
        })
    }

    hide() {
        this.fab.virus.set({
            radius: 0
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

        this.step()
    }

    step() {

        // resetting the equations
        this.equations = []
        this.equation = {
            dx: 0,
            dy: 0
        }

        // attract equation
        this.target.attract(this)

        // repulse equations
        for (let o in this.obstacles) {
            this.obstacles[o].repulse(this)
        }

        // calculating the final equation
        for (let e in this.equations) {
            e = this.equations[e]
            this.equation.dx += e.dx
            this.equation.dy += e.dy
        }

        // modify the equation by step
        let m = this.equation.dy / this.equation.dx
        let dx = Math.sqrt((this.movement.step * this.movement.step) / ((m * m) + 1))
        if (this.equation.dx < 0) dx = -dx
        let dy = (dx != 0) ? dx * m : (this.y < this.target.y) ? this.movement.step : -this.movement.step

        // step animation
        this.movement.animation = new TweenMax(this, this.movement.time, {
            x: this.x + dx,
            y: this.y + dy,
            ease: Power0.easeNone,
            onUpdate: () => {
                if (Math.abs(this.x - this.target.x) > this.target.r || Math.abs(this.y - this.target.y) > this.target.r) {
                    this.renderpos()
                } else {
                    this.movement.animation.pause()
                    this.land()
                }
            },
            onComplete: () => {
                if (Math.abs(this.x - this.target.x) > this.target.r || Math.abs(this.y - this.target.y) > this.target.r) {
                    this.step()
                }
            }
        })

    }



}

export default Virus