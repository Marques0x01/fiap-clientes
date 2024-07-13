const { ClientRepository } = require("../repository/ClientRepository.js").default;

class ClientService {
    clientRepository;

    constructor() {
        this.clientRepository = new ClientRepository();
    }

    async create(client) {
        let clientId = this.clientRepository.save(client)

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
        this.clientRepository.delete(clientId)

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
        let response = this.clientRepository.get(clientId);

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