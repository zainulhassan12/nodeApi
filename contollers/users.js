import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import { Course } from '../models/models.js'





let users = []

export const getUsers = async(req, res) => {
    const cources = await Course.find({}).sort("name").populate("author", "name -_id")
    res.send(cources)

}

export const createUser = async(req, res) => {

    const data = validateCourseJoi(req.body)
    if (data.error) return res.send(data.error.details[0].message)
    const course = new Course(req.body)
    try {
        const result = await course.save()
        console.log(result)
            // await course.validate();
        res.send(`User => ${result} is Created successfully.`)

    } catch (exc) {
        console.log(exc)
            // console.log(exc.message)
        res.send(`Error => ${exc.message}`)
    }

}





export const deleteUser = (req, res) => {
    const { id } = req.params;
    const userdel = users.find((user) => user.id === id)
    users = users.filter((user) => user.id !== id)

    res.send(`user id=> ${userdel.id} firstName => ${userdel.firstname} lastName => ${userdel.lastName} is deleted `)

}


export const getUser = (req, res) => {
    const { id } = req.params;
    const fuser = users.find((user) => user.id === id);
    res.send(fuser);
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, age } = req.body;
    const user = users.find(user => user.id === id)
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (age) user.age = age;
    res.send(`user id => ${id} is updated!`)

}

function validateCourseJoi(body) {
    const choices = ['web', 'asp', 'pyhton']
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        code: Joi.number().positive(),
        author: Joi.string().min(5).max(100).required(),
        tags: Joi.array().min(1).required(),
        isPublished: Joi.boolean().required(),
        price: Joi.number().positive().min(10).required(),
        category: Joi.string().valid(...choices).required(),
    })
    const result = schema.validate(body)
    return result
}




///get user validation

// const id = '60630639e03a7d1e2c1d1e1d';
// find and remove
// const course = await Course.findByIdAndRemove(id)

//remove many 
// const course = await Course.deleteMany({ isPublished: false })

//remove  one
// const course = await Course.deleteOne({ _id: id })


//update diectly

// const course = await Course.findByIdAndUpdate({ _id: id }, {
//     $set: {
//         name: "pyhton/django",
//         isPublished: true,
//         author: "sanwal"
//     }
// }, { new: true });

//query first approach
// const id = '60630600e03a7d1e2c1d1e1c'
// const course = await Course.findById(id);
// course.name = "mongo";
// await course.save()


// filter methods.... 
// const cources = await Course
// .find({ name: "testing course" })
// .skip(2 - 1, 3)
// .limit(3)
// .sort({ name: -1 }) //sort("name"), sort("-name"),sort({ name: 1 })
// .select({ name: 1, tags: 1, code: 1, author: 1 });//select("name tags code author")
// cources
//     .then(res.send(cources))
//     .catch(err => console.log(err)) code: { $in: [4, 5] }, code:{$eq,$gt,$gte,$lt,$lte,$eq,$nin, $in[], .or([{any},{any}....])}
// .find(name: /^mmm/i)
// .find(name: /mmm$/ i)
// .find(name: /.*mmm.*/i)