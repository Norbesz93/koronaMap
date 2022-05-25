const { downloadAndParse } = require('./data')
const express = require('express')


const run = async () => {
    let locations = await downloadAndParse()
    
    setInterval( async () => {
        locations = await downloadAndParse()
    }, 1000 * 60 * 60 * 4);

    const app = express()
    
    app.get('/', (req, res) => {
        res.send
    })

    app.get('/data', (req, res) => {
        res.json(locations)
    })

    app.listen(8000, () => {
        console.log("server is running!")
    })
}

run()