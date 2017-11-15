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
        this.radius = 100 * this.scale,


        this.timer = false

        this.ring = false
        this.el = false
        this.line = false

        // visual stuff
        fabric.loadSVGFromURL('../img/cell.svg', (objects) => {
            objects[13].set({ // font size control
                fontSize: Math.round(Math.max(45, 25 / this.scale)),
                text: this.population + ''
            })
            this.el = new fabric.PathGroup(objects, {
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

            this.ring = new fabric.Circle({
                radius: 100 * this.scale + 5,
                left: this.x,
                top: this.y,
                stroke: '#aaa',
                strokeWidth: 2,
                fill: false,
                opacity: 0,
                perPixelTargetFind: true,
            })

            this.line = new fabric.Line([this.x, this.y, this.x, this.y], {
                opacity: 0,
                strokeWidth: 2,
                stroke: '#aaa'
            })

            Game.canvas.add(this.line)
            Game.canvas.add(this.ring)
            Game.canvas.add(this.el)
        })

        this.settimer()

    }

    // phage transportation

    send(id) {
        let tobesent = Math.floor(this.population / 2)
        this.population -= tobesent
        this.el.paths[13].set({
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
            this.el.set({
                fill: Game.players[this.owner].color
            })
        }
        if (this.population > this.capacity) this.population = this.capacity
        this.el.paths[13].set({
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
            this.el.paths[13].set({
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
        this.ring.set({
            opacity: 1
        })
        Game.canvas.renderAll()                
    }

    unhover() {
        this.ring.set({
            opacity: 0
        })
        Game.canvas.renderAll()                
    }

    // line stuff

    showline() {
        this.line.set({
            opacity: 1
        })
        Game.canvas.renderAll()        
    }

    hideline() {
        this.line.set({
            opacity: 0
        })
        Game.canvas.renderAll()        
    }

    updateline(cell, x, y) {
        // if (cell !== null) {}

        let m = (y - this.y) / (x - this.x)
        let r = this.radius + 5

        let dx = Math.sqrt((r * r) / ((m * m) + 1))
        if (x <= this.x) dx = -dx
        let dy = (dx != 0) ? dx * m : (y > this.y) ? r : -r

        this.line.set({
            opacity: (Math.abs(x - this.x) < r && Math.abs(y - this.y) < r) ? 0 : 1,
            x1: this.x + dx,
            y1: this.y + dy,
            x2: x,
            y2: y
        })

        Game.canvas.renderAll()

    }

}

export default Cell