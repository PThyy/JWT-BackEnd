import bcrypt from 'bcryptjs';
import mysql from "mysql2/promise";
import bluebird from 'bluebird';
import db from '../models/index.js';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    // Hash the password
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    try {
        await db.User.create({
            email: email,
            password: hashPassword,
            username: username
        })
    } catch (error) {
        console.error("Error creating user: ", error);
    }
}

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
    // const connection = await mysql.createConnection({
    //     host: "localhost",
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute("SELECT * FROM user");
    //     return rows;
    // } catch (error) {
    //     console.error("Error fetching data: ", error);
    // }
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })
    // const connection = await mysql.createConnection({
    //     host: "localhost",
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         "DELETE FROM user WHERE id = ?",
    //         [id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.error("Error deleting user: ", error);
    // }
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    })
    return user.get({ plain: true });
    // const connection = await mysql.createConnection({
    //     host: "localhost",
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         "SELECT * FROM user WHERE id = ?",
    //         [id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.error("Error deleting user: ", error);
    // }
}

const updateUserInfor = async (email, username, id) => {
    await db.User.update({ email: email, username: username }, {
        where: { id: id }
    })
    // const connection = await mysql.createConnection({
    //     host: "localhost",
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         "UPDATE user SET email = ?, username = ? WHERE id = ?",
    //         [email, username, id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.error("Error deleting user: ", error);
    // }
}

module.exports = {
    createNewUser,
    hashUserPassword,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor
}