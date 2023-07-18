const express = require("express");
const mongoose = require("mongoose");
const BlogData = require("./model");
const userEmails = require("./email")
const Resume = require("./resume")
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    "mongodb+srv://Abhijeet:Abhijeet@abhijeetcluster0.z41evds.mongodb.net/?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err));

app.post("/addProject", async (req, res) => {
  const {
    blogImage,
    bloghead,
    blogContent,
    blogDate,
    likes,
    blogLongDescription
  } = req.body;
  try {
    const newData = new BlogData({
      blogImage: blogImage,
      bloghead: bloghead,
      blogContent: blogContent,
      blogDate: blogDate,
      likes: likes,
      blogLongDescription: blogLongDescription,
    });
    await newData.save();
    return res.json(await BlogData.find());
  } catch (err) {
    console.log(err.message);
  }
});



app.put("/updateProject", async (req, res) => {
  const updatingData = ({
    _id,
    projectName,
    projectType,
    displayImage,
    descrption,
    usedTechnologies,
    LiveUrl,
    gitHubUrl,
  } = req.body);
  try {
    // const newData = new BlogData({
    //   projectName: projectName,
    //   projectType: projectType,
    //   displayImage: displayImage,
    //   descrption: descrption,
    //   usedTechnologies: usedTechnologies,
    //   LiveUrl: LiveUrl,
    //   gitHubUrl: gitHubUrl,
    // });
    const project = await BlogData.findById(_id);
    await BlogData.replaceOne(project, updatingData);
    return res.json(await BlogData.find());
  } catch (error) {
    console.log(error);
  }
});

app.get("/allProjects", async (req, res) => {
  try {
    const allProjects = await BlogData.find();
    return res.send(allProjects);
  } catch (error) {
    console.log(error);
  }
});

app.get("/allProjects/:id", async (req, res) => {
  try {
    const project = await BlogData.findById(req.params.id);
    return res.send(project);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteProject/:id", async (req, res) => {
  try {
    await BlogData.findByIdAndDelete(req.params.id);
    return res.json(await BlogData.find());
  } catch (error) {
    console.log(error);
  }
});

app.post("/subscribedEmails", async (req, res) => {
  const {
    userEmail,
    date,
  } = req.body;
  try {
    const newData = new userEmails({
      userEmail: userEmail,
      date: date,
    });
    await newData.save();
    return res.json(await userEmails.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/subscribedEmails", async (req, res) => {
  try {
    const allEmails = await userEmails.find();
    return res.send(allEmails);
  } catch (error) {
    console.log(error);
  }
});

// resume backend
app.post("/resume", async (req, res) => {
  const {
    resume,
  } = req.body;
  try {
    const newData = new Resume({
      resume: resume,
    });
    await newData.save();
    return res.json(await Resume.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/resume", async (req, res) => {
  try {
    const allResumes = await Resume.find();
    return res.send(allResumes);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/resume/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    return res.json(await Resume.find());
  } catch (error) {
    console.log(error);
  }
});



app.listen(3005, () => console.log("surver runnig"));
