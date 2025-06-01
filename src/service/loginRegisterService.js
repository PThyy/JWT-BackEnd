require('dotenv').config();
import db from '../models/index.js';
import { getGroupWithRoles } from './JWTService.js'
import { createJWT } from '../middleware/JWTAction.js'
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    // Hash the password
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    });

    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    });

    if (user) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {
    try {
        // check email, phone exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email already exists',
                EC: 1
            }
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist) {
            return {
                EM: 'The phone already exists',
                EC: 1
            }
        }

        // hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPassword,
            groupId: 4
        })

        return {
            EM: 'A user is created successfully',
            EC: 0
        }
    } catch (e) {
        console.log('>>> check error: ', e);
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawUserData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawUserData.valueLogin },
                    { phone: rawUserData.valueLogin }
                ]
            }
        });

        if (user) {
            let isCorrectPassword = checkPassword(rawUserData.password, user.password);
            if (isCorrectPassword) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    username: user.username
                }
                let token = createJWT(payload)

                return {
                    EM: 'ok',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }

            return {
                EM: 'Your email/phone number or password is incorrect',
                EC: 1,
                DT: ''

            }
        }
        else {
            console.log('>>> check user not found', rawUserData.valueLogin, rawUserData.password);
            return {
                EM: 'Your email/phone number or password is incorrect',
                EC: 1,
                DT: ''
            }
        }
    } catch (e) {
        console.log('>>> check error: ', e);
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, checkPassword, handleUserLogin,
    hashUserPassword, checkEmailExist, checkPhoneExist
}