class Cell {


    constructor(id, opts) {

        this.id = id
        this.x = opts.x
        this.y = opts.y

        this.capacity = opts.capacity
        this.population = opts.population
        this.owner = opts.owner || false

        this.scale = (this.capacity > 150) ? 200 : (this.capacity > 100) ? 150 : (this.capacity > 50) ? 100 : (this.capacity > 0) ? 50 : null;
        this.scale = this.scale / 200

        this.timer = false
        this.ringElement = false
        this.cellElement = false

        // visual stuff
        fabric.loadSVGFromURL('../img/cell.svg', (objects) => {
            objects[13].set({ // font size control
                fontSize: Math.round(Math.max(45, 25 / this.scale)),
                text: this.population + ''
            })
            this.cellElement = new fabric.PathGroup(objects, {
                _id: this.id,
                width: 200,
                height: 200,
                scaleX: this.scale,
                scaleY: this.scale,
                left: Game.canvas.width * this.x / 100,
                top: Game.canvas.height * this.y / 100,
                hoverCursor: 'pointer',
                perPixelTargetFind: true,
                fill: Game.players[this.owner] ? Game.players[this.owner].color : '#888',
            })
            this.ringElement = new fabric.Circle({
                radius: 100 * this.scale + 5,
                left: Game.canvas.width * this.x / 100,
                top: Game.canvas.height * this.y / 100,
                stroke: '#aaa',
                strokeWidth: 2,
                fill: false,
                opacity: 0,
                perPixelTargetFind: true,
            })
            Game.canvas.add(this.ringElement)
            Game.canvas.add(this.cellElement)
        })

        this.setTimer()

    }

    send(id) {
        let tobesent = Math.floor(this.population / 2)
        this.population -= tobesent
        console.log(this.cellElement)
        this.cellElement.paths[13].set({
            text: this.population + ''
        })
        if (!this.timer) this.setTimer()
        Game.cells[id].recieve(tobesent, this.owner)
    }

    recieve(amount, owner) {
        if (owner == this.owner) this.population += amount
        else this.population -= amount
        if (this.population < 0) { // lost the cell
            this.population = -this.population
            this.owner = owner
            this.cellElement.set({
                fill: Game.players[this.owner].color
            })
        }
        if (this.population > this.capacity) this.population = this.capacity
        this.cellElement.paths[13].set({
            text: this.population + ''
        })
        this.resetTimer()
        Game.canvas.renderAll()
    }

    setTimer() {
        if (!this.owner || this.capacity <= this.population) return false
        this.timer = window.setInterval(() => {
            if (!this.owner || this.capacity <= this.population) return this.unsetTimer()
            this.population += 1 // to be changed based on phage grow speed
            this.cellElement.paths[13].set({
                text: this.population + ''
            })
            Game.canvas.renderAll()
        }, 1000)
    }

    unsetTimer() {
        window.clearInterval(this.timer)
        this.timer = false
    }

    resetTimer() {
        this.unsetTimer()
        this.setTimer()
    }

}

export default Cell