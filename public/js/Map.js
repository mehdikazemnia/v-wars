// x : horizontal position (%)
// y : vertical position (%)
// r : radius (px)
// capacity : how many phages maximum
// speed : time per seconds to create a new phage
// population : !!!
// flag : conquerer's color (false if unconquerd)
const Map = {
    players: [{
            id: 'u11111',
            name: 'mehdi'
        },
        {
            id: 'u22222',
            name: 'akbar'
        }
    ],
    cells: [{
            x: 25,
            y: 50,
            r: 100,
            capacity: 100,
            population: 0,
            flag: 'u11111'
        },
        {
            x: 75,
            y: 50,
            r: 100,
            capacity: 100,
            population: 0,
            flag: 'u22222'
        }
    ]
}
export default Map 