class Phage {


    constructor(x, y, cellid, playerid) {

        this.destination = false
        this.step = 30
        this.timer = false

        this.x = x
        this.y = y
        this.cellid = cellid
        this.playerid = playerid
        this.color = Game.players[this.playerid] ? Game.players[this.playerid].color : '#888'

        this.fab = {}
        this.fab.phage = new fabric.Circle({
            opacity: 0,
            left: this.x,
            top: this.y,
            radius: 5,
            fill: this.color
        })

        Game.canvas.add(this.fab.phage)

    }

    setpos() {
        this.fab.phage.set({
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
        this.fab.phage.set({
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
        this.fab.phage.set({
            opacity: 0
        })
        Game.canvas.renderAll()
        c.recieve(this)
    }




}

export default Phage