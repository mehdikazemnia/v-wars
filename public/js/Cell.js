import Line from './Line'
import Virus from './Virus'

class Cell {


    constructor(id, opts) {

        // identity 
        this.id = id
        this.playerid = opts.playerid || false

        // position
        this.x = Game.canvas.width * opts.x / 100
        this.y = Game.canvas.height * opts.y / 100

        // capacity ...
        this.capacity = opts.capacity
        this.viruses = []

        // appending viruses
        for (let i = 0; i < opts.population; i++) {
            let p = new Virus(this.x, this.y, this.id, this.playerid)
            this.viruses.push(p)
        }

        // size
        this.scale = (this.capacity > 150) ? 200 : (this.capacity > 100) ? 150 : (this.capacity > 50) ? 100 : (this.capacity > 0) ? 50 : null;
        this.scale = this.scale / 200
        this.r = 100 * this.scale

        // gravity and repultion
        this.gravity = {
            k: 10
        }
        this.repultion = {
            k: 4000000, // amount of power then repulsing 
            margin: this.r * 1.4
        }

        // timer (virus creation)
        this.timer = false

        // an object to store visual objects  (fab -> fabric.js)
        this.fab = {}
        this.fab.ring = false
        this.fab.cell = false
        this.fab.margin = false
        this.line = false

        // visual stuff
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

            this.fab.margin = new fabric.Circle({// test
                radius: this.repultion.margin,
                left: this.x,
                top: this.y,
                fill: '#aaa',
                stroke: '#000',
                opacity: 0.05
            })

            Game.canvas.add(this.fab.margin)
            Game.canvas.add(this.fab.ring)
            Game.canvas.add(this.fab.cell)
        })
        this.line = new Line(this.x, this.y, this.r)

        // start creating
        this.settimer()
    }

    // virus transportation

    send(id) {
        if (this.id == id) return false // cell's can't be able to send to themselves
        let viruses = this.viruses.splice(0, Math.floor(this.viruses.length / 2))
        for (let v in viruses) {
            v = viruses[v]
            v.x = this.x + (Math.random() * 20) - (Math.random() * 20)
            v.y = this.y + (Math.random() * 20) - (Math.random() * 20)
            v.march(id)
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

    // timing 

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

    // hover effects

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

    // line stuff
    showline() {
        return this.line.show()
    }

    hideline() {
        return this.line.hide()
    }

    updateline(cell, x, y) {
        return this.line.update(cell, x, y)
    }

    // gravity and repultion
    attract(virus) {
        let dx = Math.abs(virus.x - this.x)
        let dy = Math.abs(virus.y - this.y)
        let modifyx = this.gravity.k * dx
        let modifyy = this.gravity.k * dy
        virus.equations.push({
            dx: virus.x > this.x ? -modifyx : modifyx,
            dy: virus.y > this.y ? -modifyy : modifyy
        })
    }

    repulse(virus) {

        let dx = virus.x - this.x
        let dy = virus.y - this.y

        if (this.repultion.margin > Math.abs(dx) && this.repultion.margin > Math.abs(dy)) { // in range

            let distance = Math.sqrt((dx * dx) + (dy * dy))
            let F = this.repultion.k / (distance * distance)

            let equation = {
                x: (dx / distance) * F,
                y: (dy / distance) * F
            }

            virus.equations.push({
                dx: equation.x,
                dy: equation.y
            })
        }

    }

}

export default Cell