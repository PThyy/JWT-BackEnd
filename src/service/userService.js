import bcrypt from 'bcryptjs';
import mysql from "mysql2/promise";
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    // Hash the password
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    connection.query(
        "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
        [email, hashPassword, username],
        (err, results) => {
            if (err) {
                console.error("Error inserting data: ", err);
                return res.status(500).send("Error inserting data");
            }
            console.log("Data inserted successfully: ", results);
        }
    );
}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let users = [];
    try {
        const [rows, fields] = await connection.execute("SELECT * FROM users");
        console.log("User list: ", rows);
        return rows;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return users;
    }
}

module.exports = {
    createNewUser,
    hashUserPassword,
    getUserList
}