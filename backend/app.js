const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.dir(post);
  res.status(201).json({
    message: 'Post successfully added'
  });
});

app.get('/api/posts', (req, res, next) => {
  // res.send("Hello from Express!");
  const posts = [
    {
      id: 1,
      title: 'First Pre-Generated Post',
      body: "I'm baby four loko stumptown craft beer taiyaki, fixie beard post-ironic. Helvetica ennui pok pok vice, normcore crucifix flexitarian pickled franzen 90's knausgaard. Fingerstache fam small batch XOXO twee cloud bread humblebrag helvetica +1 pickled selvage paleo truffaut. Truffaut seitan shabby chic, meh irony pickled mustache iPhone semiotics 8-bit cred. Plaid keffiyeh twee, cronut pop-up salvia disrupt flexitarian blog ugh direct trade adaptogen subway tile umami chartreuse."
    },
    {
      id: 2,
      title: 'Second Pre-Generated Post',
      body: "Sriracha shabby chic offal ennui XOXO, coloring book brunch stumptown hot chicken meggings flannel vaporware. Ethical jianbing chartreuse viral, kogi deep v jean shorts roof party messenger bag readymade sartorial wayfarers. Selfies four loko plaid etsy post-ironic. Ramps salvia narwhal tumblr, 8-bit umami selfies DIY franzen roof party. Small batch synth edison bulb art party biodiesel tattooed thundercats jean shorts meh 90's scenester. Green juice poutine try-hard VHS. Cronut knausgaard iPhone trust fund swag put a bird on it DIY succulents cold-pressed bicycle rights migas typewriter."
    },
    {
      id: 3,
      title: 'Third Pre-Generated Post',
      body: "Vice stumptown fam kinfolk selfies tumeric. Pork belly cloud bread vice taxidermy woke organic kombucha. Lyft forage fingerstache seitan williamsburg, poutine knausgaard shaman. Neutra vegan hashtag farm-to-table slow-carb butcher."
    }
  ];

  res
    .status(200)
    .json({
      message: 'Posts fetched successfully',
      posts: posts
    });
});

module.exports = app;
