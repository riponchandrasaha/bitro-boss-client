const express = require('express');
const cors = require('cors');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
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

        const usersCollection = db.collection("users");
        const menuCollection = db.collection("menu");
        const reviewCollection = db.collection("reviews");
        const cartCollection = db.collection("carts");


        app.post('/jwt', async(req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ token });
            console.log('🔐 JWT Token:', token);
        })



        const verifyToken = (req, res, next) => {
            console.log('inside verify Tokens', req.headers.authorization);

            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'forbidden access' });
            }

            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: "forbidden access" });
                }
                console.log('🧾 Decoded Token:', decoded);
                req.decoded = decoded;
                next();
            });
        }






        // ========== USERS ==========
        app.get('/users', verifyToken, async(req, res) => {
            console.log(req.headers);
            const result = await usersCollection.find().toArray();
            res.send(result);
        });
        app.get('/users/admin/:email', verifyToken, async(req, res) => {
            const email = req.params.email;
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'unauthorized access' });
            }

            const query = { email: email };
            const user = await usersCollection.findOne(query);

            let admin = false;
            if (user && user.role === 'admin') {
                admin = true;
            }

            res.send({ admin });



        });

        app.post('/users', async(req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'User already exists', insertedId: null });
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });


        app.patch('/users/admin/:id', async(req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc)
            res.send(result);
        })

        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        });

        // ========== MENU ==========
        app.get('/menu', async(req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        });

        // ========== REVIEWS ==========
        app.get('/reviews', async(req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result);
        });

        // ========== CART ==========
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

        app.post('/carts', async(req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
        });

        app.delete('/carts/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        });

        console.log("✅ Connected to MongoDB successfully!");
    } finally {
        // Do not close connection to keep server alive
    }
}

run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
    res.send('🚀 Server is running...');
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});