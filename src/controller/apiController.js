import loginRegisterService from '../service/loginRegisterService';


const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "test api"
    })
}

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'missing required params', // error message
                EC: '1', // error code
                DT: '' // data
            })
        }

        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'The password must be at least 4 characters',
                EC: 1,
                DT: ''
            })
        }

        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: '' // data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '' // data
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);

        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token,
                { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT // data
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '' // data
        })
    }
}

const handleLogout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: 'claer cookies done!', // error message
            EC: 0, // error code
            DT: '' // data
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '' // data
        })
    }
}

module.exports = {
    testApi, handleRegister, handleLogin, handleLogout
}