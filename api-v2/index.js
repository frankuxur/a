const express = require('express')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const connectDB = require('./db')
const multer = require('multer')
const fs = require('fs')
const User = require('./models/User')
const Place = require('./models/Place')
const Booking = require('./models/Booking')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = process.env.JWT_SECRET

const app = express()

app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

// database connection
connectDB()

// register
app.post('/register', async (req, res) => {
    const {email, password, fname,
        lname, dob, phone, accountType} = req.body
    try {
        const userDoc = await User.create({
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            fname, 
            lname,
            dob,
            phone,
            accountType,
        })
    
        jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
            if (err) throw err
            res.cookie('token', token).json(userDoc)
        })

    } catch (e) {
        res.status(422).json(e)
    }
})

// login
app.post('/login', async (req, res) => {
    const {email, password} = req.body
    const userDoc = await User.findOne({email})
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
                if (err) throw err
                res.cookie('token', token).json(userDoc)
            })
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.json(null)
    }
})

// get user doc when home page loads
app.get('/profile', (req, res) => {
    // const token = req.rawHeaders[req.rawHeaders.length - 1].split('token=')[1]
    const token = req.headers.cookie.split('token=')[1]
    // console.log(token);
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const userDoc = await User.findById(userData.id)
            res.json(userDoc)
        })
    } else {
        res.json(null)
    }
})

// logout
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

// update user account type
app.put('/user-account-type', (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    const {accountType} = req.body
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const userDoc = await User.findById(userData.id)
            if (userData.id === userDoc.id) {
                const filter = { email: userData.email }
                const update = { accountType }
                const updatedUserDoc = await User.findOneAndUpdate(filter, update, {
                    new: true
                })
                res.json(updatedUserDoc)
            } 
        })
    } else {
        res.json('could not update')
    }
})

// get a user
app.get('/users/:id', async (req, res) => {
    const {id} = req.params
    const userDoc = await User.findById(id)
    const { fname, lname, photo } = userDoc
    res.json({ fname, lname, photo })
})

// upload photos
const photosMiddleware = multer({dest: 'uploads'})
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = []
    for(let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }

    res.json(uploadedFiles)
})

// publish a place
app.post('/places', (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    const {type, area, address,
        stats, perks, photos,
        title, highlights, description,
        guestType, price, discounts,
        lastStep} = req.body
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const placeDoc = await Place.create({
                owner: userData.id,
                type, area, address,
                stats, perks, photos,
                title, highlights, description,
                guestType, price, discounts,
                lastStep
            })  
            res.json(placeDoc)
        })
    } else {
        res.json('could not update')
    }
})

// update edited place
app.put('/places', (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    const place = req.body
    console.log(place)
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const userDoc = await User.findById(userData.id)
            if (userData.id === userDoc.id) {
                const updatedPlaceDoc = await Place.findByIdAndUpdate(place._id, place, {
                    new: true
                })
                res.json(updatedPlaceDoc)
            } 
        })
    } else {
        res.json('could not update')
    }
})

// get all places
app.get('/places', async (req, res) => {
    res.json(await Place.find())
})

// get a place
app.get('/places/:id', async (req, res) => {
    const {id} = req.params
    res.json( await Place.findById(id) )
})

// get all places for a host
app.get('/host-places/:id', async (req, res) => {
    const {id} = req.params
    console.log(id);
    res.json( await Place.find({ owner: id }) )
    // res.json({})
})

// get host
app.get('/host/:id', async (req, res) => {
    const {id} = req.params
    res.json( await User.findById(id) )
})

// update user's about
app.put('/about-user', (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    const {about} = req.body
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const userDoc = await User.findById(userData.id)
            if (userData.id === userDoc.id) {
                const filter = { email: userData.email }
                const update = { about }
                const updatedUserDoc = await User.findOneAndUpdate(filter, update, {
                    new: true
                })
                res.json(updatedUserDoc.about)
            } 
        })
    } else {
        res.json('could not update')
    }
})

// upload user's photo
// const photosMiddleware = multer({dest: 'uploads'})
app.post('/user-photo', photosMiddleware.array('photos', 1), (req, res) => {
    // upload pic
    const uploadedFiles = []
    for(let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }

    // save pic in db and delete old pic from uploads folder
    const pic = uploadedFiles[0]
    console.log(pic);
    const token = req.headers.cookie.split('token=')[1]
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const userDoc = await User.findById(userData.id)
            // console.log(userDoc.photo);
            if (userData.id === userDoc.id) {
                const filter = { email: userData.email }
                const update = { photo: pic }
                const updatedUserDoc = await User.findOneAndUpdate(filter, update, {
                    new: true
                })
                res.json(updatedUserDoc.photo)
            } 

            // delete old photo
            const pathToFile = __dirname + '/uploads/' + userDoc.photo
            try {
                fs.unlinkSync(pathToFile)
                console.log("Successfully deleted the file.")
            } catch(err) {
                console.log('Couln\'t delete the file');
            }
        })
    } else {
        res.json('could not update')
    }
})


// book
app.post('/book', async (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    const bookingData = req.body
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const bookingDoc = await Booking.create(bookingData)
            const placeDoc = await Place.findById(bookingData.place)
            const { price, nights, serviceFee } = bookingData
            const amount = price * nights + serviceFee

            // stripe
            const session = await stripe.checkout.sessions.create({
                line_items: [{
                    price_data: {
                      currency: 'inr',
                      unit_amount: amount * 100,
                      product_data: {
                        name: placeDoc.title,
                      },
                    },
                    quantity: 1,
                  }],
                mode: 'payment',
                success_url: `http://localhost:5173/payment-successful/${bookingDoc._id}`,
                // pass booking_id in the below url, extract id from the url and then delete that booking from the database
                cancel_url: 'http://localhost:5173/'
            })

            res.send(JSON.stringify({
                url: session.url
            }))

        })
    } else {
        res.json('server err')
    }
})

// get a booking
app.get('/book/:id', async (req, res) => {
    const {id} = req.params
    res.json( await Booking.findById(id) )
})

// get all bookings
app.get('/book', async (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const userDoc = await User.findById(userData.id)
            if (userData.id === userDoc.id) {
                const filter = { user: userDoc.id }
                res.json( await Booking.find(filter) )
            }
        })
    }
})

// get all bookings by host
app.get('/bookingsByHost', async (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const userDoc = await User.findById(userData.id)
            if (userData.id === userDoc.id) {
                
                const bookings = await Booking.find()

                const place = await Place.find({ owner: userDoc.id }) 
                const placeIds = place.map(place => place.id)
                const hostBookings = bookings.filter(booking => placeIds.includes(booking.place.toString()))
                // console.log(hostBookings)
                res.json(hostBookings)
            }
        })
    }
})

// update feedback
app.put('/book', (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    const {feedback, bookingId} = req.body
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const userDoc = await User.findById(userData.id)
            if (userData.id === userDoc.id) {
                // const filter = { email: userData.email }
                const update = { feedback }
                const updatedBookingDoc = await Booking.findByIdAndUpdate(bookingId, update, {
                    new: true
                })
                res.json(updatedBookingDoc)
            } 
        })
    } else {
        res.json('could not update')
    }
})

// get bookings by placeId
app.get('/book/place/:id', async (req, res) => {
    const {id} = req.params
    res.json( await Booking.find({ place: id }) )
})


app.listen(process.env.PORT, () => {
    console.log('app listening on port 8000');
})