const express = require('express')
const router = express.Router()
const Room = require('../database/models/room')
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('room add');
    const username = req.body.username
    const name = req.body.name
    // ADD VALIDATION
    // User.findOne({ username: username }, (err, user) => {
    //     if (err) {
    //         console.log('User.js post error: ', err)
    //     } else if (user) {
    //         res.json({
    //             error: `Sorry, already a user with the username: ${username}`
    //         })
    //     }
    //     else {
            const newRoom = new Room({
                username: username,
                name:name,
                users: [username]
            })
            newRoom.save((err, savedRoom) => {
                if (err) return res.json(err)
                res.json(savedRoom)
            })
        // }
    // })
})

router.post('/login', function (req, res, next) {
        console.log('routes/room.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)
router.post('/findroom', (req, res) => {
    Room.findOne({ name: req.body.name }, (err, result) => {
        if (err) {
            console.log('no such room error: ', err)
            res.status(404).json({ success: false, msg: `No such room.` });
        } else if (result) {
            res.json(result);
        }
        // .then((result) => {
        // })
        // .catch((err) => {
        // });
    });
});
// router.get('/', (req, res, next) => {
//     console.log('===== user!!======')
//     console.log(req.user)
//     if (req.user) {
//         res.json({ user: req.user })
//     } else {
//         res.json({ user: null })
//     }
// })

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router