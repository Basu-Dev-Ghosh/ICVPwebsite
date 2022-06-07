require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bcrypt = require("bcryptjs");
require("./db/conn");
const Student = require("./models/students");
const Book = require("./models/books");
const Notice = require("./models/notices");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const {
  cstTeachers,
  ceTeachers,
  meTeachers,
  eeTeachers,
  metTeachers,
  shTeachers,
} = require("../public/teachers");
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(staticPath));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

const authReal = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token=="Admin"){
    res.status(201).render("adminhome");
  }
  else if (!token) {
    res.status(400).render("index");
  } else {
    next();
  }
};
const authReal2 = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token=="Admin"){
    next();
  }
  else if (!token) {
    res.status(400).render("index");
  } else {
    next();
  }
};
// console.log(process.env.SECRET_KEY);
app.get("/", authReal, (req, res) => {
  res.render("home");
});
app.get("/home", authReal, (req, res) => {
  res.render("home");
});
app.get("/departments", authReal, (req, res) => {
  res.render("departments");
});

app.get("/gallery", authReal, (req, res) => {
  res.render("gallery");
});

app.get("/cst", authReal, (req, res) => {
  res.render("trade", { name: "cst" });
});
app.get("/cst/teachers", authReal, (req, res) => {
  res.render("teachers", { name: "teachers of cst", teachers: cstTeachers });
});
app.get("/cst/students", authReal, async (req, res) => {
  const user = await Student.find({ department: "CST" }, { _id: 0 });
  res.render("students", { name: "students of cst", user: user });
});
app.get("/cst/rooms", authReal, (req, res) => {
  res.render("rooms", { name: "Rooms of cst"});
});
app.get("/cst/syllabus", authReal, (req, res) => {
  res.render("syllabus", { name: "Syllabus of cst"});
});
app.get("/me", authReal, (req, res) => {
  res.render("trade", { name: "me" });
});
app.get("/me/teachers", authReal, (req, res) => {
  res.render("teachers", { name: "teachers of me", teachers: meTeachers });
});
app.get("/me/students", authReal, async (req, res) => {
  const user = await Student.find({ department: "ME" }, { _id: 0 });
  res.render("students", { name: "students of me", user: user });
});
app.get("/me/rooms", authReal, (req, res) => {
  res.render("rooms", { name: "Rooms of me"});
});
app.get("/me/syllabus", authReal, (req, res) => {
  res.render("syllabus", { name: "Syllabus of me"});
});
app.get("/ce", authReal, (req, res) => {
  res.render("trade", { name: "ce" });
});
app.get("/ce/teachers", authReal, (req, res) => {
  res.render("teachers", { name: "teachers of ce", teachers: ceTeachers });
});
app.get("/ce/students", authReal, async (req, res) => {
  const user = await Student.find({ department: "CE" }, { _id: 0 });
  res.render("students", { name: "students of ce", user: user });
});
app.get("/ce/rooms", authReal, (req, res) => {
  res.render("rooms", { name: "Rooms of ce"});
});
app.get("/ce/syllabus", authReal, (req, res) => {
  res.render("syllabus", { name: "Syllabus of ce"});
});
app.get("/ee", authReal, (req, res) => {
  res.render("trade", { name: "ee" });
});
app.get("/ee/teachers", authReal, (req, res) => {
  res.render("teachers", { name: "teachers of ee", teachers: eeTeachers });
});
app.get("/ee/students", authReal, async (req, res) => {
  const user = await Student.find({ department: "EE" }, { _id: 0 });
  res.render("students", { name: "students of ee", user: user });
});
app.get("/ee/rooms", authReal, (req, res) => {
  res.render("rooms", { name: "Rooms of ee"});
});
app.get("/ee/syllabus", authReal, (req, res) => {
  res.render("syllabus", { name: "Syllabus of ee"});
});
app.get("/met", authReal, (req, res) => {
  res.render("trade", { name: "met" });
});
app.get("/met/teachers", authReal, (req, res) => {
  res.render("teachers", { name: "teachers of met", teachers: metTeachers });
});
app.get("/met/students", authReal, async (req, res) => {
  const user = await Student.find({ department: "MET" }, { _id: 0 });
  res.render("students", { name: "students of MET", user: user });
});
app.get("/met/rooms", authReal, (req, res) => {
  res.render("rooms", { name: "Rooms of met"});
});
app.get("/me/syllabus", authReal, (req, res) => {
  res.render("syllabus", { name: "Syllabus of me"});
});
app.get("/sh", authReal, (req, res) => {
  res.render("trade", { name: "sh" });
});
app.get("/sh/teachers", authReal, (req, res) => {
  res.render("teachers", { name: "teachers of s&h", teachers: shTeachers });
});
app.get("/sh/students", authReal, async (req, res) => {
  const user = await Student.find({ $or: [{ sem: "1ST" }, { sem: "2ND" }] });
  res.render("students", { name: "students of s&h", user: user });
});
app.get("/sh/rooms", authReal, (req, res) => {
  res.render("rooms", { name: "Rooms of s&h"});
});
app.get("/sh/syllabus", authReal, (req, res) => {
  res.render("syllabus", { name: "Syllabus of sh",bool:true});
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/library",async(req,res)=>{
  const books = await Book.find();
  res.render("books",{book:books})
})
app.get("/notice",async(req,res)=>{
  const notices = await Notice.find();
  res.render("notices",{notice:notices})
})
app.get("/admin/library",(req,res)=>{
  res.render("adminlibrary")
})
app.get("/admin/notice",(req,res)=>{
  res.render("adminnotice")
})
app.get("/adminnotice/addnotice",(req,res)=>{
  res.render("addnotice")
})
app.get("/adminlibrary/addbooks",(req,res)=>{
  res.render("addbooks")
})
app.get("/adminlibrary/showbooks",async(req,res)=>{
  const books = await Book.find();
  res.render("showbooks",{book:books})
})
app.get("/adminnotice/shownotice",async(req,res)=>{
  const notice = await Notice.find();
  res.render("shownotice",{notice:notice})
})
app.get("/adminlibrary/removebooks",async(req,res)=>{
  const books = await Book.find();
  res.render("removebooks",{book:books})
})
app.get("/adminnotice/removenotice",async(req,res)=>{
  const notices = await Notice.find();
  res.render("removenotice",{notice:notices})
})
app.post("/adminlibrary/remove",async(req,res)=>{
  const bookname=req.body.bookname.toUpperCase();
  await Book.deleteOne({bookname:bookname});
  res.send("Deleted Succesfully")
})

app.post("/addbook",async(req,res)=>{
  const registerBook=new Book({
    bookname:req.body.bookname.toUpperCase(),
    authorname:req.body.authorname,
    sub:req.body.sub
  })
  await registerBook.save();
  res.send("Succesfully Added")
})

app.post("/addnotice",async(req,res)=>{
  const registernotice=new Notice({
    title:req.body.title.toUpperCase(),
    subject:req.body.subject
  })
  await registernotice.save();
  res.send("Succesfully Added")
})
app.post("/adminnotice/removent",async(req,res)=>{
  const title=req.body.title.toUpperCase();
  await Notice.deleteOne({title:title});
  res.send("Succesfully Added")
})
app.post("/signup", async (req, res) => {
  try {
    const toke = req.cookies.jwt;
    if (toke == null) {
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      const name = req.body.name.toUpperCase();
      if (password === cpassword) {
        const registerStudent = new Student({
          name,
          email: req.body.email,
          phone: req.body.phone,
          department: req.body.department.toUpperCase(),
          sem: req.body.sem.toUpperCase(),
          link: req.body.social_link,
          password,
        });
        const token = await registerStudent.generateAuthToken();
        await registerStudent.save();
        console.log(token);
        if (token) {
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 500000),
            httpOnly: true,
          });
          res.status(201).render("home");
        } else {
          res.status(201).render("signup");
        }
      } else {
        res.status(400).send("Password dose not match");
      }
    } else {
      res.render("home");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/search", async (req, res) => {
  try {
    const search_name = req.body.search_name.toUpperCase();
    const user = await Student.find({ name: search_name }, { _id: 0 });
    // const newuser=user.toArray();
    res.render("search", { user: user });
  } catch (e) {
    // res.status(400).send("Student Not Found");
  }
});
app.post("/login", async (req, res) => {
  try {
    const toke = req.cookies.jwt;
    if(toke==="Admin"){
       res.render("adminhome")
    }
    else if (toke == null || toke == undefined) {
      const email = req.body.email;
      const password = req.body.password;
      if(email==="Basu@admin.com" && password==="@Admin"){
        const token="Admin";
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 500000),
          httpOnly: true,
        });
        res.status(200).render("adminhome");
      }else{
      const userEmail = await Student.findOne({ email: email });
      const token = await userEmail.generateAuthToken();
      const isMatch = await bcrypt.compare(password, userEmail.password);
      if (isMatch) {
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 500000),
          httpOnly: true,
        });
        res.status(200).render("home");
      } else {
        res.status(201).send("Wrong Input");
      }
    }}
     else {
      res.render("home");
      console.log("JEy");
    }
  }catch (e) {
    res.status(400).send("Invalid User");
  }
});
app.get("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwt");
    req.user.tokens = [];
    await req.user.save();
    res.status(201).render("index");
  } catch (e) {
    res.status(201).render("index");
  }
});
app.listen(port, () => {
  console.log(`Server Running at port no ${port}`);
});
