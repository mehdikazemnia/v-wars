class Phage {


    constructor(x, y, cellid, playerid) {

        this.destination = false
        this.speed = 1
        this.timer = false

        this.x = x
        this.y = y
        this.cellid = cellid
        this.playerid = playerid
        this.color = Game.players[this.playerid].color

        this.fab = {}
        this.fab.phage = new fabric.Circle({
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

    send(cellid) {
        let c = Game.cells[cellid]
        this.destination = {
            x: c.x,
            y: c.y,
            id: c.id
        }
        this.timer = setInterval(() => {
            console.log('running')
            this.x += (this.x < this.destination.x) ? this.speed : -this.speed
            this.y += (this.y < this.destination.y) ? this.speed : -this.speed
            if(this.destination.x - this.x < 2 && this.destination.y - this.y < 2 ){
                clearInterval(this.timer)
                this.timer = false
                this.destination = false
            }
            this.setpos()
        }, 10)
    }




}

export default Phage