const express = require('express');
const app = express();
const path = require('path');
const upload = require('./multer-config');
const userModel = require('./models/user-model');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.render("index");
})

app.get('/create', async function (req, res) {
  try {
    const user = await userModel.create({
      username: "priya",
      email: "p@.com",
    });
    res.send(user);
  }
  catch (err) {
    console.error(err);
    res.send(err.message);
  };
})



app.post('/upload', upload.single("image"), async function (req, res) {
  const user = await userModel.findOne({ username: "priya" });
  user.profilePic = req.file.filename;
 
  console.log(req.file.filename);
  await user.save();
  res.send(user)
})

app.get('/show',async function(req,res){
  const user=await userModel.findOne({username:"priya"});
  // console.log(user);
  res.render("show", { profilePic:user.profilePic})
});
app.listen(process.env.PORT || 3000)