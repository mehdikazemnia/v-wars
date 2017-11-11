import Map from './Map'
import Cell from './Cell'
import Player from './Player'


window.Game = {

    players: {},

    cells: [],

    init: function (map) {
        for (let player of Map.players) {
            this.players[player.id] = {
                id: player.id,
                name: player.name
            }
        }
        for (let i in Map.cells) {
            let cell = new Cell(i, Map.cells[i])
            cell.id = i
            this.cells.push(cell)
        }
        console.log(this.players)
        console.log(this.cells)
    },
    // temporary ;)
    updateBoard: function () {
        for (let cell of this.cells) {
            console.log('the cell' + cell.id + ' has ' + cell.population + ' phages')
        }
    }
}

export default Game