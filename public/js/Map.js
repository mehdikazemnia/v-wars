// x : horizontal position (%)
// y : vertical position (%)
// r : radius (px)
// capacity : how many phages maximum
// speed : time per seconds to create a new phage
// population : !!!
// flag : conquerer's color (false if unconquerd)

const Map = {
    cells: [{
            x: 25,
            y: 50,
            r: 100,
            capacity: 100,
            speed: 1,
            population: 0,
            flag : false
        },
        {
            x: 75,
            y: 50,
            r: 100,
            capacity: 100,
            speed: 1,
            population: 0,
            flag : false
        }
    ]
}


export default Map