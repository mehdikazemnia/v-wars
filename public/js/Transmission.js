
class Transmission {
    constructor(origin, viruses, destination) {
        
        // origin(cell object)
        // viruses(an array of virus objects)
        // destination(cell object)

        // viruses will be sent in an invisible cloud holding them
        this.viruses = viruses
        this.origin = origin
        this.destination = destination
        this.cloud = {
            x: origin.x,
            y: origin.y
        }

        this.speed = 1 // pixels per second
        this.x1 = origin.x
        this.y1 = origin.y
        this.x2 = destination.x
        this.y2 = destination.y
        this.m = (this.y2 - this.y1) / (this.x2 - this.x1)

        this.dx = Math.sqrt(Math.pow(this.speed, 2) / (1 + Math.pow(this.m, 2)))
        if (this.x1 > this.x2) this.dx = -this.dx
        this.dy = (this.dx != 0) ? this.dx * this.m : (this.y1 > this.y2) ? this.speed : -this.speed


        for (let v in this.viruses) {
            v = this.viruses[v]
            v.show()
        }

        this.timer()
    }

    timer() {




        setTimeout(() => {

            this.cloud.x += this.dx
            this.cloud.y += this.dy

            this.render()

            if (Math.abs(this.cloud.x - this.x2) > Math.abs(this.dx)) {
                this.cloud.x += this.dx
                this.cloud.y += this.dy
                this.render()
                this.timer()
            } else {
                this.hit()
            }

            Game.canvas.renderAll()


        }, 30);
    }

    render() {
        for (let v in this.viruses) {
            v = this.viruses[v]
            v.setpos(this.cloud.x + Math.random() * 10, this.cloud.y + Math.random() * 10)
        }
    }

    hit() {
        while (this.viruses.length > 0) {
            let v = this.viruses.pop()
            v.setpos(this.cloud.x + Math.random() * 10, this.cloud.y + Math.random() * 10)
            v.hit(this.destination.id)
        }

    }


}

export default Transmission