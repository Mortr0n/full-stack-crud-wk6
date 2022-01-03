const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post("/api/users/register", userController.register);
    app.post("/api/users/login", userController.login);
    // app.post("/api/users/logout", userController.logout);
}