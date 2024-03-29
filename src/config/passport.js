const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
    // Load User Model
const User = require('../config/models/User')
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            if (!email.includes('@') && !email.includes('admin')) {
                User.findOne({
                    studentID: email
                }).then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered!' })
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password incorrect!' })
                        }
                    })
                }).catch((err => console.log(err)))

            }
            if (email.includes('admin')) {
                User.findOne({
                    email: email
                }).then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered!' })
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password incorrect!' })
                        }
                    })
                }).catch((err => console.log(err)))

            } else {
                User.findOne({
                    email: email
                }).then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered!' })
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password incorrect!' })
                        }
                    })
                }).catch((err => console.log(err)))
            }
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })

    })
}