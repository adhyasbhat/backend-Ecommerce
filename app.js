const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware setup
app.use(express.json());
const corsOptions = { origin: "http://localhost:5174" };

const productRoutes = require('./src/Routes/productlistRoutes');
const userRoutes = require('./src/Routes/userRoutes');

app.use(cors(corsOptions));
app.use('/api', productRoutes);
app.use('/api', userRoutes);

mongoose.connect("mongodb+srv://adhyacsg:4q8fCgU29ttYNWpi@cluster0.ywnnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust as necessary
    socketTimeoutMS: 45000 // Adjust as necessary
  }).then(() => {
    console.log("Connected to the server");
  }).catch((error) => {
    console.error("Error in connecting to the server:", error);
  });
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

