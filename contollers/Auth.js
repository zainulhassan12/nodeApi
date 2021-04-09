import express from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { User, validateUser } from '../models/auth.js';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'config';
import { token } from 'morgan';
import { asyncMiddleware } from '../contollers/middlewares/asyncMiddleware.js'



export const getUsers = asyncMiddleware(async(req, res) => {

    const users = await User.find().select("-password").sort('name');
    if (!users.length) return res.status(404).send("Not any User available!")
    res.send(users)
})

export const createAuthUser = async(req, res) => {
    try {
        //_.pick(req.body, ['name', 'email', 'password'])
        const validUser = validateUser(req.body)
        if (validUser.error) return res.send(validUser.error.details[0].message)
        const newUser = new User(req.body)
        const salt = await bcrypt.genSalt(14)
        newUser.password = await bcrypt.hash(newUser.password, salt)
        const user = await newUser.save()
        console.log(user)
        const tokken = user.generateKey()
        res.header('x-auth-tokken', tokken).send(_.pick(user, ['name', 'email']))

    } catch (exc) {
        res.status(400).send(exc.message)
    }
}

export const authenticateUser = async(req, res) => {

    const validUser = validateIncommingUser(_.pick(req.body, ['email', 'password']))
    if (validUser.error) return res.status(400).send(validUser.error.details[0].message)
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (!user) return res.status(400).send("Eaither email or password is invalid!")
        const authStatus = await bcrypt.compare(req.body.password, user.password);
        if (!authStatus) return res.status(400).send(authStatus)
            //with my encrypted way. look index.js
            // const tok = jwt.sign({ _id: user._id, name: user.name }, process.env.env_token_key)
        const tok = user.generateKey()
            // console.log(tok)
        res.status(200).send(tok)

    } catch (exc) {
        res.send(exc.message)
    }
}

function validateIncommingUser(body) {

    const schema = Joi.object({
        email: Joi.string().min(5).email().required().strict(),
        password: Joi.string().required(),
    })
    return schema.validate(body);

}