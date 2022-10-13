module.exports = app => {
    const controller = app.controllers.controllerUsers;

    app.route('/list/users').get(controller.listdataUser);
    app.route('/create/users').post(controller.storeUser);
    app.route('/update/users/:userId').put(controller.updateUser);
    app.route('/delete/users/:userId').delete(controller.destroyUser);
}