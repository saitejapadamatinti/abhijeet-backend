const express = require("express");
const mongoose = require("mongoose");
const BlogData = require("./model");
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
      blogLongDescription : blogLongDescription,
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

app.listen(3005, () => console.log("surver runnig"));
