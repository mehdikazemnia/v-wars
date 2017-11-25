// dependencies
import Fabric from 'fabric'
const fabric = Fabric.fabric

// code :)
import Map from './Map'
import Cell from './Cell'
import Player from './Player'

window.Game = {

    canvas: false,
    players: {},
    player: false,
    cells: [],

    render() {
        requestAnimationFrame(() => {
            this.canvas.renderAll()
            this.render()
        })
    },

    init: function () {

        // default fabric object settings
        fabric.Object.prototype.hasControls = false
        fabric.Object.prototype.hasBorders = false
        fabric.Object.prototype.selectable = false
        fabric.Object.prototype.originX = 'center'
        fabric.Object.prototype.originY = 'center'

        // fetching the canvas for fabric js
        this.canvas = new fabric.Canvas('canvas', {
            renderOnAddRemove: false,
            preserveObjectStacking: true,
            targetFindTolerance: 4,
            perPixelTargetFind: true,
            skipOffscreen: true,
            selection: false,
            stateful: false, 
            skipTargetFind: false
        })

    

        // fetching players
        for (let p of Map.players) {
            this.players[p.id] = p
            if (!!p.current) this.player = new Player(p)
        }

        // fetching cells
        for (let i in Map.cells) {
            let c = new Cell(i, Map.cells[i])
            this.cells.push(c)
        }


        // start the render loop
        this.render()

    }

}

export default Game