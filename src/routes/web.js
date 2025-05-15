import express from "express";
import homeController from "../controller/homeController.js";
const router = express.Router();

const initWebRoutes = (app) => {
    // path, handler
    router.get("/", homeController.handleHelloWorld)
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.get("/delete-user/:id", homeController.handleDeleteUser);
    return app.use("/", router);
}

export default initWebRoutes;