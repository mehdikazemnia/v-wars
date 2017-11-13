class Cell {


    constructor(id, opts) {
        this.id = id
        this.x = opts.x
        this.y = opts.y
        this.capacity = opts.capacity
        this.population = opts.population
        this.flag = opts.flag
        this.scale = Math.ceil(Math.sqrt(this.capacity * 16 * Math.PI) * 2 * 10 / 300) / 10


        this.interval = false
        this.timer()

        // visual stuff
        fabric.loadSVGFromURL('../img/cell.svg', (objects) => {
            console.log(this.scale)
            objects[13].set({fontSize: 50})
            this.cellElement = new fabric.PathGroup(objects, {
                width: 300,
                height: 300,
                scaleX: this.scale,
                scaleY: this.scale,
                left: Game.canvas.width * this.x / 100,
                top: Game.canvas.height * this.y / 100,
                originX: 'center',
                originY: 'center',
                hoverCursor: 'pointer',
                perPixelTargetFind: true,
                fill: Game.players[this.flag] ? Game.players[this.flag].color : '#888',
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
        Game.cells[id].recieve(tobesent, this.flag)
    }

    recieve(amount, flag) {
        if (flag == this.flag) this.population += amount
        else this.population -= amount
        if (this.population < 0) { // lost the cell
            this.population = -this.population
            this.flag = flag
            this.cellElement.set({
                fill: Game.players[this.flag].color
            })
            this.cellElement.paths[13].set({
                text: this.population + ''
            })
            Game.canvas.renderAll()
        }
    }

    timer() {
        window.clearInterval(this.interval)
        this.interval = false
        this.interval = window.setInterval(() => {
            if (!!this.flag && this.capacity > this.population) {
                this.population++
                    this.cellElement.paths[13].set({
                        text: this.population + ''
                    })
                Game.canvas.renderAll()
            }
        },1000)
    }

}

export default Cell