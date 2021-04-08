import express from 'express';
import { User, validateUser } from '../models/auth.js'


export const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        if (!users.length) return res.status(404).send("Not any User available!")
        res.send(users)
    } catch (exc) {
        res.status(400).send(exc.message)
    }
}

export const createAuthUser = async(req, res) => {
    try {
        const validUser = validateUser(req.body)
        if (validUser.error) return res.send(validUser.error.details[0].message)
        const newUser = new User(req.body)
        const user = await newUser.save()
        res.send(user)

    } catch (exc) {
        res.status(400).send(exc.message)
    }
}