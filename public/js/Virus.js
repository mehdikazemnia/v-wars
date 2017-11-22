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
            step: 2,
            time: .01
        }
        this.target = {
            x: 0,
            y: 0,
            r: 0
        }

        // visual stuff
        this.fab = {}
        this.fab.virus = new fabric.Circle({
            opacity: 0,
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
            opacity: 1,
            radius: 3
        })
    }

    hide() {
        this.fab.virus.set({
            opacity: 0,
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

    hit(cellid) {
        this.cellid = cellid
        let c = Game.cells[cellid]
        this.x = c.x
        this.y = c.y
        this.renderpos()
        this.hide()
        c.recieve(this)
    }

    // movement calculations

    march(targetid) {
        this.show()
        let target = Game.cells[targetid]
        this.target.x = target.x
        this.target.y = target.y
        this.target.r = target.r

        target.attract(this)

        for (let cell in Game.cells) {
            if (cell == targetid || cell == this.cellid) continue
            cell = Game.cells[cell]
            cell.repulse(this)
        }

        for (let eq in this.equations) {
            eq = this.equations[eq]
            this.equation.dx += eq.dx
            this.equation.dy += eq.dy
        }

        let m = this.equation.dy / this.equation.dx
        let dx = Math.sqrt((this.movement.step * this.movement.step) / ((m * m) + 1))
        if (this.equation.dx < 0) dx = -dx
        let dy = (dx != 0) ? dx * m : (this.y < this.target.y) ? this.movement.step : -this.movement.step

        this.movement.animation = new TweenMax(this, this.movement.time, {
            x: this.x + dx,
            y: this.y + dy,
            ease: Power0.easeNone,
            onUpdate: () => {
                if (Math.abs(this.x - this.target.x) > this.target.r || Math.abs(this.y - this.target.y) > this.target.r) {
                    this.renderpos()
                } else {
                    this.movement.animation.pause()
                    this.hit(targetid)
                }
            },
            onComplete: () => {
                if (Math.abs(this.x - this.target.x) > this.target.r || Math.abs(this.y - this.target.y) > this.target.r) {
                    this.equations = []
                    this.equation = {
                        dx: 0,
                        dy: 0
                    }
                    this.march(targetid)
                }
            }
        })
    }




}

export default Virus