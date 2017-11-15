class Line {

    constructor(x, y, r) { // x and y are cell's

        this.x = x
        this.y = y
        this.r = r

        // an object to store visual objects  (fab -> fabric.js)
        this.fab = {}
        this.fab.line = new fabric.Line([this.x, this.y, this.x, this.y], {
            opacity: 0,
            strokeWidth: 2,
            stroke: '#aaa'
        })
        Game.canvas.add(this.fab.line)

    }


    show() {
        this.fab.line.set({
            opacity: 1
        })
        Game.canvas.renderAll()        
    }

    hide() {
        this.fab.line.set({
            opacity: 0
        })
        Game.canvas.renderAll()        
    }

    update(cell, x, y) {
        // if (cell !== null) {}

        let m = (y - this.y) / (x - this.x)
        let r = this.r + 5

        let dx = Math.sqrt((r * r) / ((m * m) + 1))
        if (x <= this.x) dx = -dx
        let dy = (dx != 0) ? dx * m : (y > this.y) ? r : -r

        this.fab.line.set({
            opacity: (Math.abs(x - this.x) < r && Math.abs(y - this.y) < r) ? 0 : 1,
            x1: this.x + dx,
            y1: this.y + dy,
            x2: x,
            y2: y
        })

        Game.canvas.renderAll()

    }

}

export default Line