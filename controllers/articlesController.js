var request = require("request");
var cheerio = require("cheerio");

var Comment = require("../models/Note.js");
var Article = require("../models/article.js");

module.exports = db = function (app) {

    app.get('/', function (req, res) {
            res.redirect('/articles');
        });

    app.get("/scrape", function (req, res) {

        request("https://eonline.com/news", function (error, response, html) {

            var $ = cheerio.load(html);

            $(".category-landing__content-item").each(function (i, element) {

                var title = $(this)
                // firstChild.data
                    .children("div")
                    .children("div")
                    .children("h2")
                    .text();
                var link = $(this)
                    .children("div")
                    .attr("href");
                var image= $(this)
                .children("img")
                .attr("src")
console.log(title)
                if (title && link && imgage) {
                   
                    var result = {};


                    result.title = title;
                    result.link = link;
                    result.image = image;

// console.log(result)
                    Article.create(result, function (err, doc) {

                        if (err) {
                            console.log(err);
                        } else {
                            console.log(doc);
                        }
                    });
                }
            });
        });

        res.redirect("/");
    });


    app.get("/articles", function (req, res) {

        Article
            .find({}, function (error, doc) {

                if (error) {
                    console.log(error
                    );
                } else {
                    res.render("index", { doc });
                }

            })
            .sort({ '_id': -1 });
    });


    app.get("/articles/:id", function (req, res) {

        Article.findOne({ "_id": req.params.id })

            .populate("comment")

            .exec(function (error, doc) {

                if (error) {
                    console.log(error
                    );
                } else {
                    res.render("comments", { result: doc });

                }
            });
    });


    app.post("/articles/:id", function (req, res) {

        Comment
            .create(req.body, function (error, doc) {

                if (error) {
                    console.log(error
                    );
                } else {

                    Article.findOneAndUpdate({
                        "_id": req.params.id
                    }, {
                            $push: {
                                "comment": doc._id
                            }
                        }, {
                            safe: true,
                            upsert: true,
                            new: true
                        })

                        .exec(function (err, doc) {

                            if (err) {
                                console.log(err);
                            } else {

                                res.redirect('back');
                            }
                        });
                }
            });
    });

    app.delete("/articles/:id/:commentid", function (req, res) {
        Comment
            .findByIdAndRemove(req.params.commentid, function (error, doc) {

                if (error) {
                    console.log(error
                    );
                } else {
                    console.log(doc);
                    Article.findOneAndUpdate({
                        "_id": req.params.id
                    }, {
                            $pull: {
                                "comment": doc._id
                            }
                        })

                        .exec(function (err, doc) {

                            if (err) {
                                console.log(err);
                            }
                        });
                }
            });
    });

};