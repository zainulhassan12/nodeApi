import moongose from 'mongoose';
import Joi from 'joi';
import objectid from 'joi-objectid';
import _ from 'lodash';
import config from 'config';
import jwt from 'jsonwebtoken';

const objectId = objectid(Joi);

const userSchema = new moongose.Schema({
    name: {
        type: String,
        min: 4,
        max: 255,
        required: true
    },
    email: {
        type: String,
        min: 5,
        max: 255,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        min: 6,
        required: true,
        trim: true,

    }
})
userSchema.methods.generateKey = function() {
    return jwt.sign({ _id: this._id, name: this.name }, config.get('key_to_auth'))
}

export const User = moongose.model('User', userSchema)
export const validateUser = (body) => {
    const Schema = Joi.object({
        name: Joi.string().min(4).max(255).required(),
        email: Joi.string().min(5).max(255).email().required().strict(),
        password: Joi.string().min(6).required()

    })
    return Schema.validate(body)

}