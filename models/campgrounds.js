var mongoose = require("mongoose");


var CampgroundSchema = new mongoose.Schema({
    image:String,
    name:String,
    description:String,
    comments : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});
var Campground = mongoose.model("Campgrounds", CampgroundSchema);

module.exports = Campground;