import { Author, } from '../models/models.js';
import { ECourse, ECourselist } from '../models/embedding.js'
import mongoose from 'mongoose';
export const createAuthor = async(req, res) => {
    try {
        const author = new Author(req.body);
        const result = await author.save();
        res.send(result);
    } catch (ex) {
        res.send(ex.message);

    }
    res.send(author);

}
export const getAuthors = async(req, res) => {
    const authors = await Author.find();
    res.send(authors);
}
export const getAuthor = async(req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.find({ _id: id });
        res.send(author);

    } catch (exc) {
        res.send(exc.message);

    }

}

export const createAuthorEmbeded = async(req, res) => {

    try {
        const embededCourse = new ECourse(req.body)
        const result = await embededCourse.save();
        res.send(result);
    } catch (ex) {
        res.send(ex.message);

    }


}

export const listAuthorEmbeded = async(req, res) => {

    try {
        const result = await ECourse.find({}).select("author").select("-author._id");
        res.send(result)
    } catch (exc) {
        res.send(exc.message)

    }
}
export const updateAuthorEmbeded = async(req, res) => {
    const { id } = req.params;

    try {
        const result = await ECourse.updateOne({ _id: id }, {
            $set: {
                "author.name": req.body.name,
                "author.bio": req.body.bio
            }
        }, );
        res.send(result)

    } catch (exc) {
        res.send(exc.message)

    }

    //update query first approach
    // const course = await ECourse.findById(id);
    // course.author.name = req.body.name;
    // try {
    //     const result = await course.save()
    //     res.send(result)
    // } catch (exc) {
    //     res.send(exc.message)
    // }

    // update direct approach
    //findandupdateapproach
    // const authorId = await ECourse.find({ _id: id }).select("author._id");
    // const subId = new mongoose.Schema.Types.ObjectId(authorId[0].author._id)
    // try {
    //     const result = await ECourse.findOneAndUpdate({
    //         _id: id,
    //         authors: { $elemMatch: { _id: subId } }
    //     }, {
    //         $set: {
    //             authors: {
    //                 name: req.body.name,
    //                 bio: req.body.bio
    //             }
    //         }
    //     }, { $new: true });
    //     res.send(result)

    // }
    // catch (exc) {
    //     res.send(exc.message)

    // }
}

export const deleteAuthorEmbeded = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await ECourse.updateOne({ _id: id }, {
            $unset: {
                'author': ''
            }
        });
    } catch (exc) {
        res.send(exc.message)
    }


}



export const createAuthorListEmbeded = async(req, res) => {

    try {
        const embededCourselist = new ECourselist(req.body)
        const result = await embededCourselist.save();
        res.send(result);
    } catch (ex) {
        res.send(ex.message);

    }


}
export const addAuthorListEmbeded = async(req, res) => {
    const { id } = req.params

    try {
        const embededCourselist = await ECourselist.findById(id);
        embededCourselist.authors.push(req.body);
        const result = await embededCourselist.save();
        res.send(result);
    } catch (ex) {
        res.send(ex.message);

    }

}
export const removeAuthorListEmbeded = async(req, res) => {
    const { id } = req.params
    const { ida } = req.params
    try {
        const embededCourselist = await ECourselist.findById(id);
        const author = embededCourselist.authors.id(ida);
        const result = author.remove();
        await embededCourselist.save();
        res.send(result);
    } catch (ex) {
        res.send(ex.message);

    }

}