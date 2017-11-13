class Player {

    constructor(info) {

        this.id = info.id
        this.name = info.name
        this.color = info.color

        this.selecting = false
        this.selectedCells = {}
        this.target = false


        // click down
        Game.canvas.on('mouse:down', (ev) => {
            if (ev.target && ev.target._id && this.id === Game.cells[ev.target._id].owner) {
                Game.cells[ev.target._id].ringElement.set({
                    opacity: 1
                })
                Game.canvas.renderAll()
                this.selecting = true
                this.selectedCells['cell' + ev.target._id] = ev.target._id
            }
        })

        // mouse hover
        Game.canvas.on('mouse:over', (ev) => {
            if (ev.target && ev.target._id ) {
                if (this.selecting && this.id === Game.cells[ev.target._id].owner) {
                    this.selectedCells['cell' + ev.target._id] = ev.target._id
                }
                Game.cells[ev.target._id].ringElement.set({
                    opacity: 1
                })
                Game.canvas.renderAll()
            }
        })

        // mouse unhover
        Game.canvas.on('mouse:out', (ev) => {
            if (ev.target && ev.target._id && !this.selectedCells['cell' + ev.target._id]) {
                Game.cells[ev.target._id].ringElement.set({
                    opacity: 0
                })
                Game.canvas.renderAll()
            }
        })


        // click up
        Game.canvas.on('mouse:up', (ev) => {
            if (ev.target && ev.target._id && this.selecting) {
                for(let cellId in this.selectedCells){
                    Game.cells[this.selectedCells[cellId]].send(ev.target._id)
                }
            }
            for(let cellId in this.selectedCells){
                Game.cells[this.selectedCells[cellId]].ringElement.set({
                    opacity: 0
                })
                this.selectedCells[cellId] = null
            }

            this.selecting = false
        })
    }
}


export default Player