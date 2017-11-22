class Line {

    _edge(x, y, xc, yc, r) {
        let m = (y - yc) / (x - xc)
        r += 5
        let dx = Math.sqrt((r * r) / ((m * m) + 1))
        if (x <= xc) dx = -dx
        let dy = (dx != 0) ? dx * m : (y > yc) ? r : -r
        return {
            x: xc + dx,
            y: yc + dy
        }
    }


    constructor(x, y, r) { // x and y are cell's

        this.x = x
        this.y = y
        this.r = r

        // an object to store visual objects  (fab -> fabric.js)
        this.fab = {}
        this.fab.line = new fabric.Line([this.x, this.y, this.x, this.y], {
            strokeWidth: 2,
            stroke: '#aaa'
        })
        Game.canvas.add(this.fab.line)

    }


    show() {
        this.fab.line.set({
            strokeWidth: 2
        })
        
    }

    hide() {
        this.fab.line.set({
            strokeWidth: 0
        })
        
    }

    update(cell, x, y) {

        let p1 = false,
            p2 = false

        if (cell == null) {
            p1 = this._edge(x, y, this.x, this.y, this.r)
        } else {
            p1 = this._edge(cell.x, cell.y, this.x, this.y, this.r)
            p2 = this._edge(this.x, this.y, cell.x, cell.y, cell.r)
        }
        this.fab.line.set({
            x1: p1.x,
            y1: p1.y,
            x2: p2 ? p2.x : x,
            y2: p2 ? p2.y : y
        })
        

    }

}

export default Line