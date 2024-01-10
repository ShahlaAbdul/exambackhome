import express from "express";
const app = express();
const port = 3300;
import cors from "cors";
import mongoose, { Schema } from "mongoose";

app.use(express.json());
app.use(cors());
const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
});
const productModel = mongoose.model("product", productSchema);

app.get("/", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.send(products);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.send(product);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const newProduct = new productModel({
      name,
      price,
      category,
      description,
    });
    await newProduct.save();
    res.send(newProduct);
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description } = req.body;
    await productModel.findByIdAndUpdate(id, {
      name,
      price,
      category,
      description,
    });
    res.send("put methodu ugurlu");
  } catch (error) {
    res.send(error.message);
  }
});

app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id)
        res.send("Got a DELETE request at /user");
    } catch (error) {
       res.send(error.message) 
    }
});

mongoose
  .connect("mongodb+srv://Shahla:sehla200415@mycluster.vpdzf3b.mongodb.net/")
  .then(() => console.log("Connected!"))
  .catch(() => console.log("not connected"));

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
