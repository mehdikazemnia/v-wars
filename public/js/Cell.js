import Line from './Line'
import Virus from './Virus'

class Cell {

    constructor(id, info) {

        // identity 
        this.id = id
        this.playerid = info.playerid || false

        // position
        this.x = Game.canvas.width * info.x / 100
        this.y = Game.canvas.height * info.y / 100

        // capacity & storage ...
        this.capacity = info.capacity
        this.viruses = []

        // size
        this.scale = (this.capacity > 150) ? 200 : (this.capacity > 100) ? 150 : (this.capacity > 50) ? 100 : (this.capacity > 0) ? 50 : null;
        this.scale = this.scale / 200
        this.r = 100 * this.scale

        // appending viruses
        for (let i = 0; i < info.population; i++) {
            let p = new Virus(this.x, this.y, this.id, this.playerid)
            this.viruses.push(p)
        }

        // gravity and repultion
        this.gravity = 10
        this.repultion = {
            k: 50, // amount of power then repulsing     
            margin1: this.r + 10,
            margin2: Math.max(this.r * 1.5, this.r + 20)
        }

        // timer (virus creation)
        this.timer = false

        // an object to store visual objects (fabric.js)
        this.fab = {}
        this.fab.ring = false
        this.fab.cell = false

        // line
        this.line = false
        this.line = new Line(this.x, this.y, this.r)

        // fabric js visual stuff
        fabric.loadSVGFromURL('../img/cell.svg', (objects) => {
            objects[13].set({ // font size control
                fontSize: Math.round(Math.max(40, 20 / this.scale)),
                text: this.viruses.length + ''
            })
            this.fab.cell = new fabric.PathGroup(objects, {
                _id: this.id,
                width: 200,
                height: 200,
                scaleX: this.scale,
                scaleY: this.scale,
                left: this.x,
                top: this.y,
                hoverCursor: 'pointer',
                perPixelTargetFind: true,
                fill: Game.players[this.playerid] ? Game.players[this.playerid].color : '#888',
            })

            this.fab.ring = new fabric.Circle({
                radius: this.r + 5,
                left: this.x,
                top: this.y,
                stroke: '#aaa',
                strokeWidth: 2,
                fill: false,
                opacity: 0,
                perPixelTargetFind: true,
            })

            Game.canvas.add(this.fab.ring)
            Game.canvas.add(this.fab.cell)

        })

        // start creating
        this.settimer()
    }

    //
    // virus transportation
    //

    send(id) {
        if (this.id == id) return false // cell's can't be able to send to themselves
        let viruses = this.viruses.splice(0, Math.floor(this.viruses.length / 2))
        for (let v in viruses) {
            v = viruses[v]
            v.x = this.x + (Math.random() * this.r) - (Math.random() * this.r)
            v.y = this.y + (Math.random() * this.r) - (Math.random() * this.r)
            v.launch(id)
        }
        this.fab.cell.paths[13].set({
            text: this.viruses.length + ''
        })
    }

    recieve(virus) {
        virus.cellid = this.id
        if (virus.playerid == this.playerid) {
            this.viruses.push(virus)
        } else {
            if (this.viruses.length === 0) { // empty ?
                this.playerid = virus.playerid
                this.fab.cell.set({
                    fill: Game.players[this.playerid].color
                })
                this.viruses.push(virus)
                this.resettimer()
            } else {
                this.viruses.pop()
            }
        }
        this.fab.cell.paths[13].set({
            text: this.viruses.length + ''
        })
    }

    // 
    // timing 
    //

    settimer() {
        if (!this.playerid) return false // only owned cells produce viruses
        this.timer = window.setInterval(() => {
            if (this.capacity < this.viruses.length) {
                this.viruses.pop()
                this.fab.cell.paths[13].set({
                    text: this.viruses.length + ''
                })
            } else if (this.capacity > this.viruses.length) {
                let p = new Virus(this.x, this.y, this.id, this.playerid)
                this.viruses.push(p)
                this.fab.cell.paths[13].set({
                    text: this.viruses.length + ''
                })
            }
        }, 1000)
    }

    unsettimer() {
        window.clearInterval(this.timer)
        this.timer = false
    }

    resettimer() {
        this.unsettimer()
        this.settimer()
    }

    //
    // hover effects
    //

    hover() {
        this.fab.ring.set({
            opacity: 1
        })
    }

    unhover() {
        this.fab.ring.set({
            opacity: 0
        })
    }

    //
    // gravity and repultion
    //

    attract(x, y) {

        let m = (y - this.y) / (x - this.x)

        let dx = Math.sqrt((this.gravity * this.gravity) / ((m * m) + 1))
        if (this.x < x) dx = -dx
        let dy = (dx != 0) ? dx * m : (this.y < y) ? this.gravity : -this.gravity

        let force = {
            dx: dx.toFixed(5) / 1,
            dy: dy.toFixed(5) / 1
        }

        return force

    }

    repulse(x, y, m) {

        let dx = x - this.x
        let dy = y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)

        if (this.repultion.margin2 > distance) { // in danger range

            let m2 = -1 / m

            // the closest point virus is going to get to cell
            let xp = (this.x - (m * y) + (m * m * x) + (m * this.y)) / ((m * m) + 1)
            let dxp = xp - this.x
            let dyp = dxp * (-1 / m)
            let yp = this.y + dyp
            let p = Math.sqrt((dxp * dxp) + (dyp * dyp))

            if (p < this.repultion.margin1) {

                // the edge on cell we want the virus to be
                let dxe = Math.sqrt((this.repultion.margin1 * this.repultion.margin1) / (1 + m2 * m2))
                dxe = (xp < this.x) ? -dxe : dxe
                let dye = dxe * m2
                let xe = this.x + dxe
                let ye = this.y + dye

                // the force
                let xf = xe - xp
                let yf = ye - yp

                let force = {
                    dx: ((xf * this.repultion.k) / distance).toFixed(5) / 1,
                    dy: ((yf * this.repultion.k) / distance).toFixed(5) / 1
                }
                // console.log(force)

                return force
            }
        }
        return false
    }

}

export default Cell