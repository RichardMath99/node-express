const uuid = require('uuid');

module.exports = app => {
    const dataUserDB = app.data.dataUsers;
    const controller = {};

    controller.listdataUser = (req, res) => res.status(200).json(dataUserDB);

    controller.storeUser = (req, res) => {
        dataUserDB.users.data.push({
          id: uuid.v4(),
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          birthday: req.body.birthday,
          gender: req.body.gender,
          city: req.body.city,
          country: req.body.country
        });
    
        res.status(201).json(dataUserDB.users.data);
    };

    controller.updateUser = (req, res) => {
        const { 
          userId,
        } = req.params;

        dataUserDB.users.data.map(function(item, index){
            console.log('item.id',item.id,userId)
            if (item.id == userId) {
                const newUser = {
                    id: userId,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    birthday: req.body.birthday,
                    gender: req.body.gender,
                    city: req.body.city,
                    country: req.body.country
                };
                  
                dataUserDB.users.data.splice(index, 1, newUser);
                  
                res.status(200).json({
                    message: 'Usuário encontrado e atualizado com sucesso!',
                    success: true,
                    dataUser: dataUserDB.users.data
                });  
            } 
        });

        res.status(404).json({
            message: 'Usuário não encontrado na base.',
            success: false,
            dataUser: dataUserDB.users.data
        });
    
    };

    controller.destroyUser = (req, res) => {
        const {
          userId,
        } = req.params;

        dataUserDB.users.data.map(function(item, index){
            if (item.id == userId) {
                dataUserDB.users.data.splice(index, 1);
                res.status(200).json({
                    message: 'Usuário encontrado e deletado com sucesso!',
                    success: true,
                    dataUser: dataUserDB.users.data,
                });
            }
        });

        res.status(404).json({
            message: 'Usuário não encontrado na base.',
            success: false,
            dataUser: dataUserDB.users.data,
        });
    };
  
    return controller;
}