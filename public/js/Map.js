// x : horizontal position (%)
// y : vertical position (%)
// r : radius (px)
// capacity : how many phages maximum
// population : !!!
// owner : conquerer's id (false if unconquerd)
const Map = {
    players: [{
            id: 'p11111',
            name: 'mehdi',
            color: '#aa0000'
        },
        {
            currentPlayer : true,
            id: 'p22222',
            name: 'akbar',
            color: '#009900'
        }
    ],
    cells: [{
            x: 20,
            y: 50,
            capacity: 100,
            population: 50,
            owner: 'p11111'
        },
        {
            x: 35,
            y: 50,
            capacity: 50,
            population: 5,
            owner: false            
        },
        {
            x: 55,
            y: 50,
            capacity: 150,
            population: 20,
            owner: 'p22222' 
        },
        {
            x: 80,
            y: 50,
            capacity: 200,
            population: 20,
            owner: 'p22222' 
        }
    ]
}
export default Map 