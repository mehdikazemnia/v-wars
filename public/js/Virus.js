class Virus {


    constructor(x, y, cellid, playerid) {

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

    setpos(x, y) {
        this.x = x
        this.y = y
        this.fab.virus.set({
            left: this.x,
            top: this.y
        })
    }

    show() {
        this.fab.virus.set({
            opacity: 1
        })
    }

    hide() {
        this.fab.virus.set({
            opacity: 0
        })
    }

    hit(cellid) {
        this.cellid = cellid
        let c = Game.cells[cellid]
        this.hide()
        c.recieve(this)
    }




}

export default Virus