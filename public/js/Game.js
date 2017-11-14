import Map from './Map'
import Cell from './Cell'
import Player from './Player'
import Fabric from 'fabric'

const fabric = Fabric.fabric


window.Game = {

    currentPlayer: false,
    canvas: false,
    players: {},
    cells: [],

    init: function (map) {

        // canvas and fabric settings
        fabric.Object.prototype.hasControls = false
        fabric.Object.prototype.hasBorders = false
        fabric.Object.prototype.selectable = false
        fabric.Object.prototype.originX = 'center'
        fabric.Object.prototype.originY = 'center'

        this.canvas = new fabric.Canvas('canvas', {
            selection: false
        })

        for (let player of Map.players) {
            this.players[player.id] = player
            if (!!player.currentPlayer) this.currentPlayer = new Player(player)
        }
        for (let i in Map.cells) {
            let cell = new Cell(i, Map.cells[i])
            cell.id = i
            this.cells.push(cell)
        }


    }
}

export default Game