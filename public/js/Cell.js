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
        this.gravity = {
            k: 10
        }
        this.repultion = {
            k: 300000, // amount of power then repulsing     
            margin: this.r + 60
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
            v.x = this.x + (Math.random() * 20) - (Math.random() * 20)
            v.y = this.y + (Math.random() * 20) - (Math.random() * 20)
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

        let dx = Math.abs(x - this.x)
        let dy = Math.abs(y - this.y)

        let fx = this.gravity.k * dx
        let fy = this.gravity.k * dy

        let force = {
            dx: Math.round((x > this.x ? -fx : fx) * 6) / 6,
            dy: Math.round((y > this.y ? -fy : fy) * 6) / 6
        }

        return force

    }

    repulse(x, y) {

        let dx = Math.abs(x - this.x)
        let dy = Math.abs(y - this.y)

        if (this.repultion.margin > Math.abs(dx) && this.repultion.margin > Math.abs(dy)) { // in range
            let distance = Math.abs(Math.sqrt((dx * dx) + (dy * dy))) - this.r * .6
            let F = this.repultion.k / (distance * distance)

            let fx = (dx / distance) * F
            let fy = (dy / distance) * F

            let force = {
                dx: Math.round((x > this.x ? fx : -fx) * 6) / 6,
                dy: Math.round((y > this.y ? fy : -fy) * 6) / 6
            }

            return force
        }
        return false

    }

}

export default Cell