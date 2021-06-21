const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path");



const connectDB = require('./config/db');
connectDB();



app.use("/images", express.static(path.join(__dirname,"public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});




const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
  try{
    return res.status(200).json("File uploaded sucessfully.")
  }catch(err){
      console.log(err);
  }
  
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
const PORT = process.env.PORT || 2266;

app.listen(PORT, () => {
  console.log("Backend server is running!");
});

