const express=require("express");
const app=express();
const port=5500;
const path=require("path");
const methodOverride=require("method-override"); 
const ejsMate=require("ejs-mate");
const mongoose=require("mongoose");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user");
const { saveRedirectUrl } = require("./middleware");
const data=require("./init/data")

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/routeShield');
}

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());

const sessionOptions={
    secret:"minorProjectSecret",
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httponly: true,
    },
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/loginUser",async(req,res)=>{
    res.render("login.ejs");
})

app.get("/loginEngineer",async(req,res)=>{
    res.render("loginEn.ejs");
})

app.post("/loginUser",saveRedirectUrl, passport.authenticate("local",{failureRedirect: "/login",failureFlash:true}),async(req,res)=>{
    try{
        req.flash('success', 'Login successful!');
        let redirectUrl=res.locals.redirectUrl || "/locations";
        res.redirect(redirectUrl);
   }
   catch(err){
      res.redirect("/signup");
   }


});

app.post("/loginEngineer",saveRedirectUrl, passport.authenticate("local",{failureRedirect: "/loginEngineer",failureFlash:true}),async(req,res)=>{
    try{
        req.flash('success', 'Login successful!');
        let redirectUrl=res.locals.redirectUrl || "/engineerMap";
        res.redirect(redirectUrl);
   }
   catch(err){
      res.redirect("/signup");
   }


})

app.get("/engineerMap",async(req,res)=>{
    res.render("engineerMap.ejs");
})

app.get("/geocode", async (req, res) => {
    const location = req.query.q;
    if (!location) return res.status(400).json({ error: "Missing location query" });

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'AccidentMap/1.0 (your@email.com)'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Error fetching geocode:", err.message);
        res.status(500).json({ error: "Geocode fetch failed" });
    }
});


app.get("/demouser",async(req,res)=>{
    let fakeUser=new User({
        email: "studentManit@gmail.com",
        username: "anshika",
    });

    let registeredUser=await User.register(fakeUser,"helloworld");
    res.send(registeredUser);
})

app.get("/signup",async(req,res)=>{
    res.render("signup.ejs");
})

app.post("/signup",async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
          if(err){
            return next(err);
          }
          req.flash("success","Welcome to Dwellio");
          res.redirect("/locations");
        })
      } catch(err){
         req.flash("error",err.message);
         res.redirect("/signup");
      }
})
app.get("/locations",async(req,res)=>{
    res.render("locDes.ejs")
})




app.post("/locations", async (req, res) => {
    const { curr, dest } = req.body;
  
    // Sample accident data if not using DB
    const data = [
      { name: "Politechnic Chauraha Bhopal", lat: 23.241, lon: 77.401, count: 18 },
      { name: "Karond Chauraha Bhopal", lat: 23.313, lon: 77.393, count: 8 },
      { name: "Koh-e-Fiza (Balaghat Chauraha) Bhopal", lat: 23.292, lon: 77.402, count: 7 },
      { name: "Misrod (Near Danish Nagar) Bhopal", lat: 23.1663, lon: 77.4666, count: 5 },
      { name: "JP Nagar Bhopal", lat: 23.2737, lon: 77.4083, count: 5 },
      { name: "ISBT Bus Stand", lat: 23.2599, lon: 77.4126, count: 29 },
 
    ];
  
    if (!curr || !dest) {
      return res.status(400).send("Current and destination coordinates required.");
    }
   console.log(`${curr},${dest}`);
    res.render("map.ejs", {curr, dest, data}  );
  });
  

app.get("/",async(req,res)=>{
    res.render("home.ejs");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})