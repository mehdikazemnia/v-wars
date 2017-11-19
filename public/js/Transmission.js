import {TweenMax} from 'gsap'

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

        this.speed = 100 // pixels per second
        this.x1 = origin.x
        this.y1 = origin.y
        this.x2 = destination.x
        this.y2 = destination.y
        this.m = (this.y2 - this.y1) / (this.x2 - this.x1)

        if (this.x1 != this.x2) {
            this.dx = Math.sqrt(Math.pow(this.speed, 2) / (1 + Math.pow(this.m, 2)))
            if (this.x1 > this.x2) this.dx = -this.dx
            this.dy = (this.dx != 0) ? this.dx * this.m : (this.y1 > this.y2) ? this.speed : -this.speed
        } else {
            this.dx = 0
            this.dy = this.y1 < this.y2 ? this.speed : -this.speed
        }

        for (let v in this.viruses) {
            v = this.viruses[v]
            v.show()
        }

        this.run()
    }

    run() {
        new TweenMax(this.cloud, 0.5, {
            x: this.cloud.x + this.dx,
            y: this.cloud.y + this.dy,
            onUpdate: () => {
                this.render()
            },
            onComplete: () => {
                setTimeout(() => {
                    if (Math.abs(this.cloud.x - this.x2) > Math.abs(this.dx) || Math.abs(this.cloud.y - this.y2) > Math.abs(this.dy)) {
                        this.run()
                    } else {
                        this.hit()
                    }
                }, 50)
            }
        })

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