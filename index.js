import express, { query } from 'express';
import bodyParsers from 'body-parser';
import debug from 'debug';
import config from 'config';
import bcrypt from 'bcrypt';

import userRoutes from './routes/users.js';
import authorsRoutes from './routes/authors.js';
import authRoutes from './routes/auth.js'

import { log, authenticate } from './contollers/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';

import mongoose from 'mongoose'
import _ from 'lodash';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/course")
    .then(sucesss => console.log("database is connected!!"))
    .catch(Error => console.log(Error))


const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParsers.json());
app.use(log);
app.use(authenticate);
app.use(helmet());
if (!config.get('key_to_auth')) {
    console.error("FATAL ERROR: Key for authentication is not defined!")
    process.exit(1)
}
if (app.get('env') === "development") app.use(morgan('tiny'))


// // tokken setting with encryption == bcrypt
// if (app.get('env') === "development") {
//     const salt = await bcrypt.genSalt(14);
//     process.env.env_token_key = await bcrypt.hash(config.get("jwt_key"), salt)
// }

//Routes
app.get('/', (req, res) => {

    res.render('home', {
        title: 'Express APP',
        messsage: { home: "welcome please navigate  to /cources" },
        user: { id: 1, githubUser: "Ali" }

    });
})


app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/authors', authorsRoutes);



console.log(process.env.NODE_ENV)
const port = process.env.PORT || 5000;
console.log("APP =>", config.get("name"))
console.log("mailServer =>", config.get("mail.host"))
    // console.log("mailPassword =>", config.get("mail.password"))


// function getUser(id) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Getting user info please wait.....");
//             resolve({ id: id, githubUser: "zain" });
//         }, 2000)

//     })

// }
// // getUser(2).then(result => getRepository(result).then(repo => getCommits(repo)));

// function getRepository(username) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Getting the User Repositry");
//             resolve(["repo1", "repo2", "repo3"])
//         }, 2000);

//     })
// }

// function getCommits(repository) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(["Commit"]);
//         }, 2000);

//     })
// }

// async function dpAll() {
//     const user = await getUser();
//     const repositiries = await getRepository(user.githubUser)
//     const Commits = await getCommits(repositiries[0])
//     console.log(Commits)
// }

// dpAll()
// consumming promisses
// const userPromise = getUser(1)
// userPromise
//     .then(user => getRepository(user.githubUser))
//     .then(repository => getCommits(repository))
//     .then(commits => console.log("commits =>" + commits))
//     .catch(err => console.log("Error :" + err.messsage))
// const pro = new Promise((resolve, reject) => {
//     let a = 4;
//     let b = 0
//     setTimeout(() => {
//         if (a >= 5) {
//             resolve(a)
//         } else {
//             reject(new Error('Not gretaer than 5'))
//         }


//     }, 2000)
// })


// getUser(1, getUserResult);

// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log("Getting user info please wait.....");
//         callback({ id: id, githubUser: "zain" });
//     }, 2000)
// }

// function getUserResult(result) {
//     console.log("User is ===>" + result.githubUser)
//     repo(result.githubUser, getRepo);
// }

// function repo(username, callback) {

//     setTimeout(() => {
//         callback(["repo1", "repo2", "repo3"])

//     }, 2000);
// }

// function getRepo(repository) {
//     console.log("Getting users repositiries please wait!!")
//     console.log(repository)
// }

// pro
//     .then(result => dp(result))
//     .catch(err => dp(err.message))


function dp(display) {
    console.log(display)
}
app.listen(port, () => console.log(`Server is Running on http://localhost:${port}`));