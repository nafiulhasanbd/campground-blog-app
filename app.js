var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var User = require("./models/comment");

mongoose.connect("mongodb://localhost/yelpcamp", function(err, db){
    if(err){
        console.log(err);
    }else{
        console.log("DB connected");
    }
   
});
app.use(bodyParser.urlencoded({extended :true}));
app.set("view engine", "ejs");
app.use(express.static("public"));



app.get("/", function(req, res){
    res.render("home")
})
//
//Campground.create(
//    {name:"Nafiul hasan", image:"https://ak.picdn.net/assets/cms/97e1dd3f8a3ecb81356fe754a1a113f31b6dbfd4-stock-photo-photo-of-a-common-kingfisher-alcedo-atthis-adult-male-perched-on-a-lichen-covered-branch-107647640.jpg",
//    description:"this is a huge gratekaldfjl lakjsclk jal;skjl;aks jdf;lkajds;lfkja;l dsjkf;lakjd sf;lakjdsfl"},
//    function(err, campground){
//        if(err){
//            console.log(err);
//        }else{
//            console.log("All created");
//            console.log(campground);
//        }
//    }
//)


//var Campgrounds = [
//    {name:"Nafiul hasan", image:"https://ak.picdn.net/assets/cms/97e1dd3f8a3ecb81356fe754a1a113f31b6dbfd4-stock-photo-photo-of-a-common-kingfisher-alcedo-atthis-adult-male-perched-on-a-lichen-covered-branch-107647640.jpg"},
//     {name:"Another hasan", image:"https://ak.picdn.net/assets/cms/97e1dd3f8a3ecb81356fe754a1a113f31b6dbfd4-stock-photo-photo-of-a-common-kingfisher-alcedo-atthis-adult-male-perched-on-a-lichen-covered-branch-107647640.jpg"},
//     {name:"3rd Camgrounds", image:"https://ak.picdn.net/assets/cms/97e1dd3f8a3ecb81356fe754a1a113f31b6dbfd4-stock-photo-photo-of-a-common-kingfisher-alcedo-atthis-adult-male-perched-on-a-lichen-covered-branch-107647640.jpg"},
//    
//]

app.get("/campgrounds", function(req, res){
    // get all campogroud from DB
    Campground.find(function(err, allcampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds",{campgrounds:allcampground});
        }
    });
      // 
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description= req.body.description;
    newCamground = {name:name, image:image, description:description};
    //create a new campground and save to database
    Campground.create(newCamground, function(err, newlyCreated){
        if(err){
            console.log(err);
            
        }else{
            res.redirect("/campgrounds")
        }
    })
    // back to campgrounds
   
});


app.get("/campgrounds/new", function(req, res){
    res.render("new")
})

// show more function for all campgrounds
app.get("/campgrounds/:id", function(req, res){
    // Find the campground with provided id
    Campground.findById(req.params.id).populate("comment").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("article", {campground:foundCampground});
        }
    });
    // Render show tamplate with that campground
  
});


// Comment ROUTES

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("newcomment", {campground:campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment, function(err, foundComment){
                            if(err){
                            console.log("err")
                           }else{
                            campground.comments.push(foundComment);
                            campground.save();
                            
            res.redirect("/campgrounds/" + campground._id)
                           }
                            
                           })
        }
    })
    //create new campgrounds
    //connect new commnet to campground
    // redirect campground show page
})













































const port = 3000;

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})