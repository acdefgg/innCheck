const fetch = require('node-fetch');
const { validationResult }  = require('express-validator/check');
const { Inn } = require('../model.js');

class indexController {

    async get(req, res) {
        res.render('index');
    }

    async post(req, res) {

        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            let mappedValidationErrors = validationError.mapped()
            return res.send(mappedValidationErrors.query.msg);
        }

        const innQuery = req.body.query
        let innFromDB = await Inn.findOne({
            where: {
                inn_number: innQuery
            },
            attributes: ['name'],
        });

        if (innFromDB) {
            return res.send(innFromDB.name);
        }

        const innFetchResponse = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token d53dd4b4ead74ca00a6e3fc1ab0c24d7b7bff670'
            },
            body: JSON.stringify({
                'query': innQuery,
                'branch_type': 'MAIN'
            })
        });


        const innJSON = await innFetchResponse.json();

        if (!innJSON.suggestions[0]) {
            return res.send('Такого ИНН не существует!')
        }

        const innName = innJSON.suggestions[0].value;

        await Inn.create({
            name: innName,
            inn_number: innQuery
        });

        return res.send(innName);
    }
}

module.exports = new indexController();