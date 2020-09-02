const express = require('express')
const cors = require('cors')
// const session = require('express-session')
const dbConnection = require('./database') 
// const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');

const app = express()
const PORT = process.env.PORT || 8081
// Route requires
// MIDDLEWARE
app.use(cors())
app.use(express.json())
// app.use(bodyParser.json())

// // Sessions
// app.use(
// 	session({
// 		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
// 		store: new MongoStore({ mongooseConnection: dbConnection }),
// 		resave: false, //required
// 		saveUninitialized: false //required
// 	})
// )

// Passport
// app.use(passport.initialize())
// app.use(passport.session()) // calls the deserializeUser


// Routes
const user = require('./database/models/user')
const playlist = require('./database/models/playlists')
app.use('/user', user)
app.use('/playlist', playlist)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
