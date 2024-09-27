import fs from "fs";
import path from "path";
import admin from "firebase-admin";
import express from "express";
import "dotenv/config";
import { db, connectToDb } from "./db.js";
import mongoose from "mongoose";
import sendSubscriptionEmail from "./utils/Mailer.js";
import Subscription from "./models/Subscription.js";
import cors from "cors";
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
const corsOptions = {
  origin: "https://www.comicconfessions.com/", // Replace with your allowed origin
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
mongoose.connect(
  `mongodb+srv://${process.env.REACT_APP_MONGO_USERNAME}:${process.env.REACT_APP_MONGO_PASSWORD}@organichomeappcluster.r2ywg.mongodb.net/organic-home-app-db?retryWrites=true&w=majority&appName=OrganicHomeAppCluster`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }

  req.user = req.user || {};

  next();
});

app.get("/isSubscribed", async (req, res) => {
  const { email } = req.query;

  try {
    const subscription = await Subscription.findOne({ email });
    res.json({ isSubscribed: !!subscription });
  } catch (error) {
    res.json("Server error");
  }
});

app.post("/subscribe", async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).send({ message: "Email is already subscribed" });
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();
    sendSubscriptionEmail(email);
    res.status(200).send("Subscription successful");
  } catch (error) {
    next(error);
  }
});

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    article.canUpvote = uid && !upvoteIds.includes(uid);
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (canUpvote) {
      await db.collection("articles").updateOne(
        { name },
        {
          $inc: { upvotes: 1 },
          $push: { upvoteIds: uid },
        }
      );
    }

    const updatedArticle = await db.collection("articles").findOne({ name });
    res.json(updatedArticle);
  } else {
    res.send("That article doesn't exist");
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const { email } = req.user;

  await db.collection("articles").updateOne(
    { name },
    {
      $push: { comments: { postedBy: email, text } },
    }
  );
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.send("That article doesn't exist!");
  }
});

const PORT = process.env.PORT || 8000;

connectToDb(() => {
  console.log("Successfully connected to database!");
  app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
  });
});
