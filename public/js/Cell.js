import Line from './Line'
import Virus from './Virus'
import Transmission from './Transmission'

class Cell {


    constructor(id, opts) {

        this.id = id
        this.x = Game.canvas.width * opts.x / 100
        this.y = Game.canvas.height * opts.y / 100

        this.capacity = opts.capacity
        this.viruses = []
        this.playerid = opts.playerid || false

        for (let i = 0; i < opts.population; i++) {
            let p = new Virus(this.x, this.y, this.id, this.playerid)
            this.viruses.push(p)
        }

        this.scale = (this.capacity > 150) ? 200 : (this.capacity > 100) ? 150 : (this.capacity > 50) ? 100 : (this.capacity > 0) ? 50 : null;
        this.scale = this.scale / 200
        this.r = 100 * this.scale

        this.timer = false

        // an object to store visual objects  (fab -> fabric.js)
        this.fab = {}
        this.fab.ring = false
        this.fab.cell = false
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
                radius: 100 * this.scale + 5,
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

        this.line = new Line(this.x, this.y, this.r)

        this.settimer()
    }

    // virus transportation

    send(id) {
        if (this.id == id) return false // cell's can't be able to send to themselves
        let viruses = this.viruses.splice(0, Math.floor(this.viruses.length / 2))
        let transmission = new Transmission(this, viruses, Game.cells[id])


        this.fab.cell.paths[13].set({
            text: this.viruses.length + ''
        })
        if (!this.timer) this.settimer()
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
            }
            this.viruses.pop()
        }
        this.fab.cell.paths[13].set({
            text: this.viruses.length + ''
        })
        this.resettimer()
    }

    // timing 

    settimer() {
        if (!this.playerid) return false
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

}

export default Cell