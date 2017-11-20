class Virus {


    constructor(x, y, cellid, playerid) {

        // positions
        this.x = x
        this.y = y

        // place and owner
        this.cellid = cellid
        this.playerid = playerid
        this.color = Game.players[this.playerid] ? Game.players[this.playerid].color : '#888'

        // equations and movements
        this.equations = [] // equations[i] = { dx, dy }
        this.equation = {
            dx: 0,
            dy: 0
        }

        // visual stuff
        this.fab = {}
        this.fab.virus = new fabric.Circle({
            opacity: 0,
            left: this.x,
            top: this.y,
            radius: 3,
            fill: this.color
        })
        Game.canvas.add(this.fab.virus)

    }

    // visibility
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

    // position

    setpos(x, y) {
        this.x = x
        this.y = y
        this.fab.virus.set({
            left: this.x,
            top: this.y
        })
    }

    hit(cellid) {
        this.cellid = cellid
        let c = Game.cells[cellid]
        this.setpos(c.x, c.y)
        this.hide()
        c.recieve(this)
    }

    // movement calculations

    nextmove() {

        for (let cell in Game.cells) {
            cell = Game.cells[cell]
            cell.repulse(this)
        }
        for (let eq in this.equations) {
            eq = this.equations[eq]
            this.equation.dx += eq.dx
            this.equation.dy += eq.dy
        }

        this.equation.dx /= this.equations.length
        this.equation.dy /= this.equations.length

    }




}

export default Virus