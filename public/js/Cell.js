class Cell {


    constructor(id, opts) {
        this.id = id
        this.x = opts.x
        this.y = opts.y
        this.r = opts.r
        this.capacity = opts.capacity
        this.speed = opts.speed
        this.population = opts.population
        this.flag = opts.flag

        this.interval =  false
        
    }

    send(id) {
        this.population /= 2
        Game.cells[id].recieve(this.population, thi)
    }

    recieve(amount, flag) {
        if (flag == this.flag) this.population += amount
        else this.population -= amount
        if (this.population < 0) { // lost the cell
            this.population = -this.population
            this.flag = flag
        }
    }

    timer(secs) {
        window.clearInterval(this.timer)
    }

}

export default Cell