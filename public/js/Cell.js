import Line from './Line'

class Cell {


    constructor(id, opts) {

        this.id = id
        this.x = Game.canvas.width * opts.x / 100
        this.y = Game.canvas.height * opts.y / 100

        this.capacity = opts.capacity
        this.population = opts.population
        this.owner = opts.owner || false

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
                text: this.population + ''
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
                fill: Game.players[this.owner] ? Game.players[this.owner].color : '#888',
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

    // phage transportation

    send(id) {
        let tobesent = Math.floor(this.population / 2)
        this.population -= tobesent
        this.fab.cell.paths[13].set({
            text: this.population + ''
        })
        if (!this.timer) this.settimer()
        Game.cells[id].recieve(tobesent, this.owner)
    }

    recieve(amount, owner) {
        if (owner == this.owner) this.population += amount
        else this.population -= amount
        if (this.population < 0) { // lost the cell
            this.population = -this.population
            this.owner = owner
            this.fab.cell.set({
                fill: Game.players[this.owner].color
            })
        }
        if (this.population > this.capacity) this.population = this.capacity
        this.fab.cell.paths[13].set({
            text: this.population + ''
        })
        this.resettimer()
        Game.canvas.renderAll()
    }

    // timing 

    settimer() {
        if (!this.owner || this.capacity <= this.population) return false
        this.timer = window.setInterval(() => {
            if (!this.owner || this.capacity <= this.population) return this.unsettimer()
            this.population += 1 // to be changed based on phage grow speed
            this.fab.cell.paths[13].set({
                text: this.population + ''
            })
            Game.canvas.renderAll()
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
        Game.canvas.renderAll()
    }

    unhover() {
        this.fab.ring.set({
            opacity: 0
        })
        Game.canvas.renderAll()
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