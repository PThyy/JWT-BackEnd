import bcrypt from 'bcryptjs';
import mysql from "mysql2/promise";
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    // Hash the password
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let hashPassword = hashUserPassword(password);

    try {
        const [rows, fields] = await connection.execute(
            "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
            [email, hashPassword, username]
        );
    } catch (error) {
        console.error("Error creating user: ", error);
    }
}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute("SELECT * FROM users");
        console.log("User list: ", rows);
        return rows;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute(
            "DELETE FROM users WHERE id = ?",
            [id]
        );
    } catch (error) {
        console.error("Error deleting user: ", error);
    }
}

module.exports = {
    createNewUser,
    hashUserPassword,
    getUserList,
    deleteUser
}