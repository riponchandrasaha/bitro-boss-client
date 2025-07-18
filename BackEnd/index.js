const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // ✅ ObjectId included

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u3gm4ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const db = client.db("bistroDb");
        const menuCollection = db.collection("menu");
        const reviewCollection = db.collection("reviews");
        const cartCollection = db.collection("carts");

        // Get menu
        app.get('/menu', async(req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        });

        // Get reviews
        app.get('/reviews', async(req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result);
        });

        // ✅ Get carts (all or by email)
        app.get('/carts', async(req, res) => {
            const email = req.query.email;
            let query = {};

            if (email) {
                query = { email: email };
            }

            try {
                const result = await cartCollection.find(query).toArray();
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Failed to fetch carts" });
            }
        });

        // ✅ Add to cart
        app.post('/carts', async(req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
        });

        // ✅ Delete from cart
        app.delete('/carts/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close(); // keep connection alive
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});