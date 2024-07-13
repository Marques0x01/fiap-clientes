const { ClientRepository } = require("../repository/ClientRepository.js").default;

class ClientService {
    async create(client) {
        let clientRepository = new ClientRepository();
        let clientId = await clientRepository.save(client).then(resp => resp);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: (`client created: ${clientId}`),
                statusCode: 201,
                clientId: clientId
            })
        }
    }

    async delete(clientId) {
        let clientRepository = new ClientRepository();
        await clientRepository.delete(clientId).then(resp => resp);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: (`client deleted: ${clientId}`),
                statusCode: 200,
                clientId: clientId
            })
        }
    }

    async get(clientId) {
        let clientRepository = new ClientRepository();
        let response = await clientRepository.get(clientId).then(resp => resp);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: (`client recovered`),
                statusCode: 200,
                client: response
            })
        }
    }

}

exports.default = { ClientService }