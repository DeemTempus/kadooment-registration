const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sectionLimits = {
    Masqueraders: 5,
    Dancers: 5,
    Drummers: 5
};

let registrations = [];

app.get("/sections", (req, res) => {
    const counts = {};

    registrations.forEach(r => {
        counts[r.section] = (counts[r.section] || 0) + 1;
    });

    const available = Object.keys(sectionLimits).filter(sec => {
        return (counts[sec] || 0) < sectionLimits[sec];
    });

    res.json(available);
});

app.post("/register", (req, res) => {
    const data = req.body;

    const count = registrations.filter(r => r.section === data.section).length;

    if (count >= sectionLimits[data.section]) {
        return res.status(400).json({ message: "Section full" });
    }

    registrations.push(data);
    res.json({ message: "Registered successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
