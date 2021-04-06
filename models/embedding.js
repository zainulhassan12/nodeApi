import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({

    name: {
        type: String,
        minlength: 5,
        maxlength: 100,
        trim: true,
        required: true
    },
    bio: {
        type: String,
        maxlength: 500,
        trim: true,
        required: true
    },
    website: {
        type: String,
        required: true,
        match: /www..*(.com|.edu|.ie|.net)/i
    }

});

export const ECourse = mongoose.model('EmbededCource', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 35,
        lowercase: true,
        // match:/pattern/
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ["web", "asp"],
        lowercase: true
    },
    code: Number,

    author: authorSchema,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(value, callback) {
                console.log("Validating please wait!")
                setTimeout(() => {
                    const result = value && value.length > 0;
                    callback(result);
                }, 3000)

            },
            message: "Tags should have atleast 1 value",
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: val => Math.round(val),
        set: val => Math.round(val)
    }
}));

export const ECourselist = mongoose.model('EmbededCourceList', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 35,
        lowercase: true,
        // match:/pattern/
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ["web", "asp"],
        lowercase: true
    },
    code: Number,

    authors: [authorSchema],
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(value, callback) {
                console.log("Validating please wait!")
                setTimeout(() => {
                    const result = value && value.length > 0;
                    callback(result);
                }, 3000)

            },
            message: "Tags should have atleast 1 value",
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: val => Math.round(val),
        set: val => Math.round(val)
    }
}));