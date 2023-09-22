const connectToMongo = require('./db')
var cors = require('cors')

connectToMongo();
const express = require('express')
const app = express()
const port = 5000


app.use(cors())

app.use(express.json())

//Available Routers
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


// app.get('/', (req, res) => {
//   res.send('Hello World to all my friends !')
// })

app.listen(port, () => {
  console.log(`Daily Notes backend listening at http://localhost:${port}`)
})