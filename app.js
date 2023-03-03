const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent =
  "Welcome to our blog! We are thrilled to share our latest posts with you on a wide variety of topics. Our team of talented writers and experts is passionate about creating content that informs, entertains, and inspires From fashion and beauty to technology and lifestyle, our blog covers a wide range of topics that are sure to pique your interest. We are constantly updating our site with new articles, so be sure to check back often to stay up-to-date on the latest trends and insights Our blog is a place for you to engage with our community and share your thoughts and opinions. We value your feedback and encourage you to leave comments on our posts to let us know what you think.";
const aboutContent =
  "Welcome to our About Us page! We are a team of dedicated professionals who are passionate about creating content that informs, entertains, and inspires. Our mission is to provide our readers with the highest quality journalism and insights on a wide range of topics. We are committed to being fair, balanced, and objective in our reporting, and we take pride in our ability to deliver content that is both engaging and informative. At our core, we believe that everyone's voice deserves to be heard. That's why we strive to create a community that is inclusive, diverse, and welcoming to all..";
const contactContent =
  "Welcome to our Contact Us page! We are thrilled to hear from our readers and value your feedback, comments, and questions. Whether you have a suggestion for a future article or simply want to say hello, we would love to hear from you. Our team is dedicated to responding to all inquiries in a timely manner and providing you with the information you need. To get in touch with us, simply fill out the contact form on this page, and we will get back to you as soon as possible. Alternatively, you can reach out to us via email or social media, and we will be happy to assist you.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var Title = " The Pros and Cons of 5G Technology";

var Content =
  "5G technology is the latest wireless communication standard that promises to revolutionize the way we connect to the internet. Here are some pros and cons of this technology: -> Pros: Faster internet speeds, Reduced latency for quicker response times, Improved network capacity to support more devices, Greater reliability and connectivity, Enables new technologies such as augmented and virtual reality -> Cons: High costs for implementation and infrastructure upgrades, Potential health risks from increased exposure to electromagnetic radiation, Limited coverage areas in some regions, Increased energy consumption and environmental impact, Potential for security vulnerabilities and hacking risks -> In conclusion, 5G technology offers numerous benefits in terms of faster internet speeds, improved network capacity, and new technologies. However, it also comes with potential drawbacks such as high costs, health risks, limited coverage, and security vulnerabilities. As with any new technology, it's important to weigh the pros and cons carefully and consider the long-term implications before fully embracing it.";

let posts = [{ Title: Title, Content: Content }];

app.get("/", function (req, res) {
  res.render("home", { homeContent: homeStartingContent, posts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    Title: req.body.postTitle,
    Content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach((post) => {
    const startedTitle = _.lowerCase(post.Title);

    if (startedTitle == requestedTitle) {
      var Title = post.Title;
      var Content= post.Content;
      res.render("post", { Title: Title, Content: Content });
    }
  });
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
