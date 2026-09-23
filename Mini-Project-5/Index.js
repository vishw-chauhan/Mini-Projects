const express = require("express");
const app = express();

const port = 3000;

const { Pool } = require("pg");
const methodOverride = require("method-override");


// =======================
// Middleware
// =======================

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));


// =======================
// PostgreSQL Connection
// =======================

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "new_training",
    password: "vishesh123@",
    port: 5432
});


// =======================
// HOME PAGE
// =======================

app.get("/", (req, res) => {

    const q = `SELECT COUNT(*) FROM users`;

    pool.query(q, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }

        const count = result.rows[0].count;

        res.render("home", { count });
    });
});


// =======================
// SHOW ALL USERS
// =======================

app.get("/show", (req, res) => {

    const q = `SELECT * FROM users`;

    pool.query(q, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }

        const users = result.rows;

        res.render("show", { users });
    });
});


// =======================
// EDIT PAGE
// =======================

app.get("/show/:id/edit", (req, res) => {

    const { id } = req.params;

    const q = `SELECT * FROM users WHERE id = $1`;

    pool.query(q, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }

        if (result.rows.length === 0) {
            return res.status(404).send("User Not Found");
        }

        const user = result.rows[0];

        res.render("edit", { user });
    });
});


// =======================
// UPDATE USER
// =======================

app.patch("/show/:id/edit", (req, res) => {

    const { id } = req.params;

    const { username, password } = req.body;

    const q = `
        UPDATE users
        SET username = $1,
            password = $2
        WHERE id = $3
    `;

    pool.query(q, [username, password, id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }

        console.log("User Updated Successfully");

        res.redirect("/show");
    });
});


// =======================
// START SERVER
// =======================

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});