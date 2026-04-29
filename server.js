const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let payments = [];

// Create payment
app.post("/pay", (req, res) => {
  const { product, phone } = req.body;

  const payment = {
    id: Date.now(),
    product,
    phone,
    status: "Pending",
    link: "https://your-download-link.com"
  };

  payments.push(payment);
  res.json(payment);
});

// Get all payments
app.get("/payments", (req, res) => {
  res.json(payments);
});

// Approve payment
app.post("/approve/:id", (req, res) => {
  const id = parseInt(req.params.id);

  payments = payments.map(p => {
    if (p.id === id) {
      return { ...p, status: "Approved" };
    }
    return p;
  });

  res.json({ message: "Approved" });
});

app.listen(3000, () => console.log("Server running"));
