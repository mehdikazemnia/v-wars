// x : horizontal position (%)
// y : vertical position (%)
// r : radius (px)
// capacity : how many viruses maximum
// population : !!!
// playerid : conquerer's id (false if unconquerd)
const Map = {
    players: [{
            id: 'p11111',
            name: 'mehdi',
            color: '#aa0000'
        },
        {
            current : true,
            id: 'p22222',
            name: 'akbar',
            color: '#009900'
        }
    ],
    cells: [{
            x: 20,
            y: 50,
            capacity: 100,
            population: 1,
            playerid: 'p11111'
        },
        {
            x: 35,
            y: 60,
            capacity: 50,
            population: 1,
            playerid: false            
        },
        {
            x: 35,
            y: 30,
            capacity: 50,
            population: 1,
            playerid: false            
        },
        {
            x: 55,
            y: 50,
            capacity: 150,
            population: 1,
            playerid: 'p22222' 
        },
        {
            x: 80,
            y: 50,
            capacity: 200,
            population: 1,
            playerid: 'p22222' 
        },
        {
            x: 10,
            y: 70,
            capacity: 50,
            population: 1,
            playerid: false            
        },
        {
            x: 10,
            y: 35,
            capacity: 50,
            population: 1,
            playerid: false            
        },
        {
            x: 20,
            y: 85,
            capacity: 50,
            population: 1,
            playerid: false            
        },
        {
            x: 75,
            y: 80,
            capacity: 50,
            population: 1,
            playerid: false            
        },
    ]
}
export default Map 