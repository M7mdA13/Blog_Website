import express from "express";
import bodyParser from "body-parser";

//init express and portNumber
const app = express();
const port = 4000;
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//send back posts array to server

app.get("/posts", (req, res) => {
  res.json(posts);
});
// create a post in the posts array
app.post("/posts", (req, res) => {
  posts.push({
    id: lastID + 1,
    title: req.body.title,
    body: req.body.post,
    author: req.body.author,
    date: new Date().toDateString(),
  });
  lastID += 1;
  res.sendStatus(200);
});
// get post by specific id 
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(posts[id]);
});
// patch a post in the array
app.patch('/posts/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    if (req.body.title != posts[id].title) {
      posts[id].title = req.body.title;
    }
    if (req.body.body != posts[id].body) {
      posts[id].body = req.body.body;
    }
    if (req.body.author != posts[id].author) {
      posts[id].author = req.body.author;
    }
    res.sendStatus(200);
});
// delete a post from the array
app.delete("/posts/:id", (req, res) => {
    const id = posts.findIndex((p) => p.id === parseInt(req.params.id));;
    posts.splice(id, 1);
    lastID-=1;
    res.sendStatus(200);
  });
app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});

let posts = [
  {
    // object 1 ss
    id: 0,
    title: "My Trip to Saudi Arabia",
    body: "I have a love/hate feeling with this trip. I loved visiting the holy sites and doing Umrah, but I hated the amount of people there. It was so crowdy and hot (like 40C everyday), that sometimes it was hard to breathe. I wouldn't go again soon, but maybe in like 5-10 years I will visit again and do Hajj. ",
    author: "Mo",
    date: "1/8/2023 8:00 pm",
  },
  {
    // object 2 
    id: 1,
    title: "Jujutsu Kaisen Manga Wrapping Up",
    body: "Latest chapter of the renouned manga (jjk 266) set up the finale of the last fight in the manga. It also anounced a new project will be coming soon. I am excited but wary of the new project since I feel like the manga should take some more time to wrap everything up nicely. However, overall this manga has proved to be one of the best newgen shonen we've seen in a long time, so I'm excited where the author takes it.",
    author: "Manga Reviewer",
    date: "16/8/2024 12:06 pm",
  },
];
let lastID = 1;
