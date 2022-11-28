const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { append } = require("express/lib/response");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.plpenom.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log("db connected");
    const membersCollection = client.db("Smart-field").collection("members");

    app.get("/members", async (req, res) => {
      const cursor = membersCollection.find({});
      const members = await cursor.toArray();
      res.send(members);
    });
    app.get("/members/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const member = await membersCollection.findOne(query);
      res.send(member);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From smart field");
});

app.listen(port, () => {
  console.log(`Smart field listening on port ${port}`);
});
