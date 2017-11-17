class Virus {


    constructor(x, y, cellid, playerid) {

        this.destination = false
        this.step = 10
        this.timer = false

        this.x = x
        this.y = y
        this.cellid = cellid
        this.playerid = playerid
        this.color = Game.players[this.playerid] ? Game.players[this.playerid].color : '#888'

        this.fab = {}
        this.fab.virus = new fabric.Circle({
            opacity: 0,
            left: this.x,
            top: this.y,
            radius: 5,
            fill: this.color
        })

        Game.canvas.add(this.fab.virus)

    }

    setpos() {
        this.fab.virus.set({
            left: this.x,
            top: this.y
        })
        Game.canvas.renderAll()
    }

    setcell(cellid) {
        this.cellid = cellid
        this.setpos()
    }

    march(cellid) {
        this.fab.virus.set({
            opacity: 1
        })
        Game.canvas.renderAll()
        let c = Game.cells[cellid]
        this.destination = {
            x: c.x,
            y: c.y,
            id: c.id
        }
        this.timer = setInterval(() => {
            this.x += (this.x < this.destination.x) ? this.step : -this.step
            this.y += (this.y < this.destination.y) ? this.step : -this.step
            if (Math.abs(this.destination.x - this.x) <= this.step && Math.abs(this.destination.y - this.y) <= this.step) {
                this.hit(cellid)
            }
            this.setpos()
        }, 20)
    }

    hit(cellid) {
        clearInterval(this.timer)
        this.timer = false
        this.destination = false
        let c = Game.cells[cellid]
        this.fab.virus.set({
            opacity: 0
        })
        Game.canvas.renderAll()
        c.recieve(this)
    }




}

export default Virus