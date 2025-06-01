import express from "express";
import apiController from '../controller/apiController.js';
import userController from '../controller/userController.js';
import groupController from '../controller/groupController.js'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction.js'
import roleController from '../controller/roleController.js';

const router = express.Router();

const initApiRoutes = (app) => {
    // GET - R
    // POST - C
    // PUT - U
    // DELETE - D
    router.all('*', checkUserJWT, checkUserPermission);

    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);

    router.get("/account", userController.getUserAccount);

    // user routes
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    // roles routes
    router.get("/role/read", roleController.readFunc);
    router.post("/role/create", roleController.createFunc);
    router.put("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    router.get("/role/by-group/:groupid", roleController.getRoleByGroup);
    router.post("/role/assign-to-group", roleController.assignRoleToGroup);

    // group routes
    router.get("/group/read", groupController.readFunc);

    return app.use("/api/v1/", router);
}

export default initApiRoutes;