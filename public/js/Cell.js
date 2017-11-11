class Cell {


    constructor(id, opts) {
        this.id = id
        this.x = opts.x
        this.y = opts.y
        this.r = opts.r
        this.capacity = opts.capacity
        this.population = opts.population
        this.flag = opts.flag

        this.interval = false
        this.timer()
    }

    send(id) {
        let tosend = Math.floor(this.population / 2)
        this.population -= tosend
        Game.cells[id].recieve(tosend, this.flag)
    }

    recieve(amount, flag) {
        if (flag == this.flag) this.population += amount
        else this.population -= amount
        if (this.population < 0) { // lost the cell
            this.population = -this.population
            this.flag = flag
        }
    }

    timer() {
        window.clearInterval(this.interval)
        this.interval = false
        this.interval = window.setInterval(() => {
            if (!!this.flag) {
                this.population++
                Game.updateBoard()
            }
        }, 1000)
    }

}

export default Cell