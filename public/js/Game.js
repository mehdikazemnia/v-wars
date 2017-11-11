import Map from './Map'
import Cell from './Cell'
import Player from './Player'

window.Game = {

    player: false,

    map: Map,

    cells: [],

    init: function (map) {
        for (let i in this.map.cells) {
            let cell = new Cell(this.map.cells[i])
            cell.id = i
            this.cells.push(cell)
        }
        console.log(this.cells)        
    }

}

export default Game