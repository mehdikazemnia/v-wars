class Player {

    constructor(info) {

        this.id = info.id
        this.name = info.name
        this.color = info.color

        this.selecting = false
        this.selectedcells = {}


        // click down
        Game.canvas.on('mouse:down', (ev) => {
            if (this.iscell(ev)) {
                let cell = Game.cells[ev.target._id]
                if (this.isfriend(cell)) {
                    this.selecting = true
                    this.select(cell)
                    this.updatelines(ev)
                }
            }
        })

        // hover
        Game.canvas.on('mouse:over', (ev) => {
            if (this.iscell(ev)) {
                let cell = Game.cells[ev.target._id]
                cell.hover()
                if (this.selecting && this.isfriend(cell)) {
                    this.select(cell)
                }
            }
        })

        // unhover
        Game.canvas.on('mouse:out', (ev) => {
            if (this.iscell(ev)) {
                let cell = Game.cells[ev.target._id]
                if (!this.isselected(cell)) {
                    cell.unhover()
                }
            }
        })

        // click up
        Game.canvas.on('mouse:up', (ev) => {
            // destination ??
            if (this.iscell(ev) && this.selecting) {
                for (let cellId in this.selectedcells) {
                    !this.isselected(Game.cells[this.selectedcells[cellId]]) || Game.cells[this.selectedcells[cellId]].send(ev.target._id)
                }
            }
            this.deselectall()
            this.selecting = false
        })

        Game.canvas.on('mouse:move', (ev) => {
            this.updatelines(ev)
        })

    }

    // check if the given event belongs to a cell
    iscell(ev) {
        return !!(ev.target && ev.target._id)
    }


    // check if the cell's owner is current player
    isfriend(cell) {
        return !!(this.id === cell.owner)
    }

    // check if the cell is selected already
    isselected(cell) {
        return !!(this.selectedcells['cell' + cell.id])
    }




    // select the given cell
    select(cell) {
        if (this.selecting && !this.isselected(cell)) {
            this.selectedcells['cell' + cell.id] = cell.id
        }
    }

    // deselect all cells
    deselectall() {
        for (let cellId in this.selectedcells) {
            if (this.selectedcells[cellId] !== null) {
                // hide the ring
                let cell = Game.cells[this.selectedcells[cellId]]
                cell.unhover()
                cell.hideline()
            }
        }
        this.selectedcells = {}
    }

    // update lines :)
    updatelines(ev) {
        let x = ev.e.layerX
        let y = ev.e.layerY
        let target = null // by default we assume it not a cell
        if (this.iscell(ev)) {
            let c = Game.cells[ev.target._id]
            target = {
                x: c.x,
                y: c.y,
                r: c.r
            }
        }
        if (!this.selecting) return false
        for (let cpid in this.selectedcells) {
            if (!this.selectedcells[cpid]) continue
            let cell = Game.cells[this.selectedcells[cpid]]
            cell.updateline(target, x, y)
        }
    }


}


export default Player