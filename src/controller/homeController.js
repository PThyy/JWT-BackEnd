import mysql from "mysql2"

const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    database: 'jwt'
})

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    connection.query(
        "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
        [email, password, username],
        (err, results) => {
            if (err) {
                console.error("Error inserting data: ", err);
                return res.status(500).send("Error inserting data");
            }
            console.log("Data inserted successfully: ", results);
        }
    );
    return res.send("User created successfully");
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}