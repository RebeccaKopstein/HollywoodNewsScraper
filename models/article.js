var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true

    },

    link: {
        type: String,
        required: true

    },
// ***image from the website to appear with the article link***
    // image: {
    //     type: img,
    //     required: true

    // },

    note:[ {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Note"
    }]

});


var Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;