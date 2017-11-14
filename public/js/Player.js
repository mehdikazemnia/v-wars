class Player {

    constructor(info) {

        this.id = info.id
        this.name = info.name
        this.color = info.color

        this.selecting = false
        this.selectedCells = {}
        this.connectionLines = {} // 'cell'+cell_id : fabric line object


        // click down
        Game.canvas.on('mouse:down', (ev) => {
            if (this.isCell(ev) && this.isFriend(ev)) {
                this.selecting = true
                this.selectCell(ev)
            }
        })

        // hover
        Game.canvas.on('mouse:over', (ev) => {
            if (this.isCell(ev)) {
                this.hoverCell(ev)
                if (this.selecting && this.isFriend(ev)) {
                    this.selectCell(ev)
                }
            }
        })

        // unhover
        Game.canvas.on('mouse:out', (ev) => {
            if (this.isCell(ev) && !this.isSelected(ev)) {
                this.unhoverCell(ev)
            }
        })

        // click up
        Game.canvas.on('mouse:up', (ev) => {

            // destination ??
            if (this.isCell(ev) && this.selecting) {
                for (let cellId in this.selectedCells) {
                    this.selectedCells[cellId] === null || Game.cells[this.selectedCells[cellId]].send(ev.target._id)
                }
            }

            this.deselectCells()

            this.selectedCells = {}
            this.selecting = false
        })

        Game.canvas.on('mouse:move', (ev) => {
            this.updateLines(ev)
        })

    }

    // check if the given event belongs to a cell
    isCell(ev) {
        return !!(ev.target && ev.target._id)
    }

    // check if the cell's owner is current player
    isFriend(ev) {
        return !!(this.id === Game.cells[ev.target._id].owner)
    }

    // check if the cell is selected already
    isSelected(ev) {
        return !!(this.selectedCells['cell' + ev.target._id])
    }

    // show the ring around cell
    hoverCell(ev) {
        Game.cells[ev.target._id].ringElement.set({
            opacity: 1
        })
        Game.canvas.renderAll()
    }

    // hide the ring around cell
    unhoverCell(ev) {
        Game.cells[ev.target._id].ringElement.set({
            opacity: 0
        })
        Game.canvas.renderAll()
    }

    // select the given cell
    selectCell(ev) {
        if (this.selecting && !this.isSelected(ev)) {
            this.selectedCells['cell' + ev.target._id] = ev.target._id
            // line :)
            let x1 = Game.cells[ev.target._id].cellElement.left
            let y1 = Game.cells[ev.target._id].cellElement.top
            let x2 = ev.e.layerX
            let y2 = ev.e.layerY
            let line = new fabric.Line([x1, y1, x2, y2], {
                strokeWidth: 4,
                stroke: '#aaa'
            })
            Game.canvas.add(line)
            this.connectionLines['cell' + ev.target._id] = line
        }
    }

    // deselect all cells
    deselectCells() {
        for (let cellId in this.selectedCells) {
            if (this.selectedCells[cellId] !== null) {
                // hide the ring
                Game.cells[this.selectedCells[cellId]].ringElement.set({
                    opacity: 0
                })
                // delete the line
                this.connectionLines[cellId].remove()
            }
        }
    }

    // update lines :)
    updateLines(ev) {
        let x2 = ev.e.layerX
        let y2 = ev.e.layerY
        if (!this.selecting) return false
        console.log(this.connectionLines)
        for (let key in this.connectionLines) {
            let line = this.connectionLines[key]
            line.set({
                x2: x2,
                y2: y2
            })
        }
        Game.canvas.renderAll()
    }


}


export default Player