import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

//get request posts array from API
app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/posts");
    res.render("index.ejs", { posts: result.data });
  } catch (error) {
    res.status(500).json("Error fetching posts :3");
  }
});
//post NEW post
app.post("/new", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/posts", req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json("Error creating Post :3");
  }
});
//redirect to edit page after clicking edit
app.get("/edit/:id", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: result.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post :3" });
  }
});
// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  try {
    const result = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(result.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post :3" });
  }
});
// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
    try {
      await axios.delete(`${API_URL}/posts/${req.params.id}`);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  });

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
