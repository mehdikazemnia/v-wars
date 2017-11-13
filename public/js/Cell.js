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

        this.interval = false

        this.resetTimer()

        // visual stuff
        fabric.loadSVGFromURL('../img/cell.svg', (objects) => {
            objects[13].set({ // font size  control
                fontSize: Math.round(Math.max(45, 25 / this.scale)),
                text: this.population + ''
            })
            this.cellElement = new fabric.PathGroup(objects, {
                width: 200,
                height: 200,
                scaleX: this.scale,
                scaleY: this.scale,
                left: Game.canvas.width * this.x / 100,
                top: Game.canvas.height * this.y / 100,
                originX: 'center',
                originY: 'center',
                hoverCursor: 'pointer',
                perPixelTargetFind: true,
                fill: Game.players[this.owner] ? Game.players[this.owner].color : '#888',
            })
            Game.canvas.add(this.cellElement)

        })
    }

    send(id) {
        let tobesent = Math.floor(this.population / 2)
        this.population -= tobesent
        console.log(this.cellElement)
        this.cellElement.paths[13].set({
            text: this.population + ''
        })
        Game.canvas.renderAll()
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
        this.cellElement.paths[13].set({
            text: this.population + ''
        })
        this.resetTimer()
        Game.canvas.renderAll()
    }

    resetTimer() {
        window.clearInterval(this.interval)
        this.interval = false
        if (!!this.owner && this.capacity > this.population) {
            this.interval = window.setInterval(() => {
                if (!this.owner && this.capacity <= this.population) {
                    window.clearInterval(this.interval)
                    this.interval = false
                }
                this.population++
                    this.cellElement.paths[13].set({
                        text: this.population + ''
                    })
                Game.canvas.renderAll()
            }, 4000)
        }

    }

}

export default Cell