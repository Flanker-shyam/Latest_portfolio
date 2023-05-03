const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const cors = require("cors")
require('dotenv').config()
const helmet = require('helmet')
const path = require('path')
const User = require('./databaseConnect/userModel')
const getData = require('./githubData.js')
const connectDB = require('./databaseConnect/mongo')
const middleware = require('./middleware')
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(middleware.setHeaders);
app.use(helmet());

app.get("/", async (req, res) => {
    let data = await User.find({});
    res.render('index', { data, data });
});

app.get("/gitDataFlanker", (req, res) => {
    try {
        User.deleteMany({ stargazers_count: { $gte: 1 } }).then(async () => {
            let data = await getData('https://api.github.com/users/Flanker-shyam/repos');
            for (let i = 0; i < data.length; i++) {
                const newuser = new User({
                    name: data[i].name,
                    description: data[i].description,
                    topics: data[i].topics,
                    forks: data[i].forks,
                    stargazers_count: data[i].stargazers_count,
                    html_url:data[i].html_url
                });
                await newuser.save();
            }
        })
        res.send({ status: "success" });
    }
    catch(exp)
    {
        res.send(exp.message);
    }
})

connectDB();

const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) {
        console.log("Error occurred during connection", err);
    }
    else {
        console.log("Connection established successfully at:", port);
    }
});