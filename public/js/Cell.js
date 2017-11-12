class Cell {


    constructor(id, opts) {
        this.id = id
        this.x = opts.x
        this.y = opts.y
        this.r = opts.r
        this.capacity = opts.capacity
        this.population = opts.population
        this.flag = opts.flag
        this.txt = false


        this.interval = false
        this.timer()

        // visual stuff
        fabric.loadSVGFromURL('../img/cell.svg', (objects) => {
            var group = new fabric.PathGroup(objects, {
                left: 125,
                top: 125,
                width: 500,
                height: 500,
                scaleX: .5,
                scaleY: .5,
                originX: 'center',
                originY: 'center',
                hoverCursor: false
            })
            this.txt = new fabric.Text(this.population + '', {
                left: 118,
                top: 120,
                fontSize: 50,
                fontFamily: 'tahoma',
                fontWeight: 100,
                textAlign: 'center',
                originX: 'center',
                originY: 'center',
                opacity: .7
            })
            this.cellElement = new fabric.Group([group, this.txt], {
                left: Game.canvas.width * this.x / 100,
                top: Game.canvas.height * this.y / 100,
                width: 250,
                height: 250,
                originX: 'center',
                originY: 'center',
                fill: Game.players[this.flag] ? Game.players[this.flag].color : '#000000'
            })
            Game.canvas.add(this.cellElement)

        })
    }

    send(id) {
        let tosend = Math.floor(this.population / 2)
        this.population -= tosend
        this.txt.setText(this.population + '')
        Game.canvas.renderAll()
        Game.cells[id].recieve(tosend, this.flag)
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

            this.txt.setText(this.population + '')
            Game.canvas.renderAll()
        }
    }

    timer() {
        window.clearInterval(this.interval)
        this.interval = false
        this.interval = window.setInterval(() => {
            if (!!this.flag && this.capacity > this.population) {
                this.population++
                    this.txt.setText(this.population + '')
                Game.canvas.renderAll()
            }
        }, 1000)
    }

}

export default Cell