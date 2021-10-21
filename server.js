const express = require('express')
const app = express()
const PORT = 4000

app.get('/index', (req, res) => {
    res.send('Hello from server')
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})