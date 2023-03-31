const express = require("express");
const app = express();

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.listen(3000, () => {
  console.log("서버실행");
});

const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://jeong0214:as970214@cluster0.uoktuey.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    const postCollection = client.db("project3").collection("post");
    const counterCollection = client.db("project3").collection("counter");
    console.log("서버에 연결됬다");

    //GET
    app.get("/", async (req, res) => {
      // const query = {};
      const cursor = postCollection.find({});
      const result = (await cursor.toArray()).sort().reverse();
      res.render("list.ejs", { post: result });
    });

    app.get("/write", (req, res) => {
      res.render("write.ejs");
    });

    app.get("/detail/:id", async function (req, res) {
      const result = await postCollection.findOne({
        _id: parseInt(req.params.id),
      });
      console.log(result);
      res.render("detail.ejs", { data: result });
    });

    app.get("/edit/:id", async function (req, res) {
      const result = await postCollection.findOne({
        _id: parseInt(req.params.id),
      });
      res.render("edit.ejs", { post: result });
    });

    //POST
    app.post("/add", async function (req, res) {
      const { title, date, Post_url, genre, comment } = req.body;
      const { totalcounter } = await counterCollection.findOne({
        name: "count",
      });
      await postCollection.insertOne({
        _id: totalcounter + 1,
        url: Post_url,
        title: title,
        date: date,
        genre: genre,
        comment: comment,
      });
      await counterCollection.updateOne(
        { name: "count" },
        { $inc: { totalcounter: 1 } }
      );
      res.redirect("/");
    });

    // DELETE
    app.delete("/delete", async function (req, res) {
      req.body._id = parseInt(req.body._id);
      await postCollection.deleteOne(req.body);
      res.status(200).send({ message: "성공" });
      console.log("삭제완료");
    });

    //PUT
    app.put("/edit", async (req, res) => {
      const { id, title, date, Post_url, comment, genre } = req.body;
      await postCollection.updateOne(
        { _id: parseInt(id) },
        {
          $set: {
            url: Post_url,
            title: title,
            date: date,
            comment: comment,
            genre: genre,
          },
        }
      );
      console.log("수정완료");
      res.redirect("/");
    });
  } finally {
    console.log("마무리");
  }
}

main().catch(console.dir);

// npm사이트에서 제시한 mongoDB 활용
// async function main() {
//   await client.connect();
//   console.log("서버실행");
//   const db = client.db(dbName);
//   const collection = db.collection("post");
//   console.log(이 영역에 코드 추가);
//   return "완료";
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
