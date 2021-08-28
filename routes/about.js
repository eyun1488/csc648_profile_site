var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let person = [
        {
            name : "Adele Wu",
            image: "Smiley_Face.JPG",
            github: "adele-wu",
            information: ""
        },
        {
            name : "Jeffrey Fulmer Gardner",
            image: "Smiley_Face.JPG",
            github: "",
            information: ""
        },
        {
            name : "Kris Byington",
            image: "Smiley_Face.JPG",
            github: "krisbyington",
            information: ""
        },
        {
            name : "Jeffrey Friedrich",
            image: "Smiley_Face.JPG",
            github: "jeffreyfriedrich",
            information: ""
        },
        {
            name : "Eddy Yun",
            image: "Smiley_Face.JPG",
            github: "eyun1988",
            information: ""
        },
        {
            name : "Jose Quintero",
            image: "Smiley_Face.JPG",
            github: "",
            information: ""
        }
    ];
    res.locals.logged = true;
    res.render('about_us', { title: "About Page", person }); // can only pass an array
});

module.exports = router;
