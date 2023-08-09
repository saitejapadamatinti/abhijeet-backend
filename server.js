const express = require("express");
const mongoose = require("mongoose");
const BlogData = require("./model");
const userEmails = require("./email");
const Resume = require("./resume");
const cors = require("cors");
const UserContact = require("./userContact");

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
    bloghead,
    blogImage,
    blogContent,
    blogDate,
    readTime,
    blogLongDescription,
  } = req.body;
  try {
    const newData = new BlogData({
      blogImage: blogImage,
      bloghead: bloghead,
      blogContent: blogContent,
      blogDate: blogDate,
      readTime: readTime,
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
    blogImage,
    bloghead,
    blogContent,
    blogDate,
    readTime,
    blogLongDescription,
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

app.get("/allBlogs", async (req, res) => {
  try {
    const allProjects = await BlogData.find();
    return res.send(allProjects);
  } catch (error) {
    console.log(error);
  }
});

app.get("/allBlogs/:id", async (req, res) => {
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
  const { userEmail, date } = req.body;
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

app.delete("/subscribedEmails/:id", async (req, res) => {
  try {
    await userEmails.findByIdAndDelete(req.params.id);
    return res.json(await userEmails.find());
  } catch (error) {
    console.log(error);
  }
});

// resume backend
// app.post("/resume", async (req, res) => {
//   const {
//     resume,
//   } = req.body;
//   try {
//     const newData = new Resume({
//       resume: resume,
//     });
//     await newData.save();
//     return res.json(await Resume.find());
//   } catch (err) {
//     console.log(err.message);
//   }
// });

app.get("/resume", async (req, res) => {
  try {
    const allResumes = await Resume.find();
    return res.send(allResumes);
  } catch (error) {
    console.log(error);
  }
});

// app.delete("/resume/:id", async (req, res) => {
//   try {
//     await Resume.findByIdAndDelete(req.params.id);
//     return res.json(await Resume.find());
//   } catch (error) {
//     console.log(error);
//   }
// });

app.put("/resume", async (req, res) => {
  const updatingData = ({ _id, resume } = req.body);
  try {
    const oldResume = await Resume.findById(_id);
    await Resume.replaceOne(oldResume, updatingData);
    return res.json(await Resume.find());
  } catch (error) {
    console.log(error);
  }
});

// user contact details

app.post("/usercontact", async (req, res) => {
  const { firstname, lastname, mobile, email, message } = req.body;
  try {
    const newData = new UserContact({
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
      email: email,
      message: message,
    });
    await newData.save();
    return res.json(await UserContact.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/usercontact", async (req, res) => {
  try {
    const userContactData = await UserContact.find();
    return res.send(userContactData);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/usercontact/:id", async (req, res) => {
  try {
    await UserContact.findByIdAndDelete(req.params.id);
    return res.json(await UserContact.find());
  } catch (error) {
    console.log(error);
  }
});

app.listen(3005, () => console.log("surver runnig"));
