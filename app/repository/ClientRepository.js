const { Database } = require("../config/DatabaseConfig.js").default;
const { v4: uuidv4 } = require('uuid');

class ClientRepository {

    async save(client) {
        let TABLE = 'public."client"';

        const clientId = uuidv4();

        const connection = new Database();

        const queryOrder = `INSERT INTO ${TABLE} 
        (id, name, address, phone, cpf)
        VALUES ($1, $2, $3, $4, $5)`;

        const clientValues = [
            clientId,
            client.name,
            client.address,
            client.phone,
            client.cpf
        ];


        try {
            const result = await connection.query(queryOrder, clientValues);
            console.log('Client created:', result.rows[0]);
        } catch (err) {
            console.error('Error in create client:', err.stack);
            throw new Error(err)
        } finally {
            await connection.end();
            return clientId;
        }
    }

    async delete(clientId) {
        let TABLE = 'public."client"';
        const connection = new Database();

        const queryClient = `DELETE FROM ${TABLE} WHERE id = '${clientId}' OR cpf = '${clientId}';`;

        let result = null
        try {
            result = await connection.query(queryClient, null);
            console.log('Client deleted');
        } catch (err) {
            console.error('Error in getting deleted:', err.stack);
            throw new Error(err)
        } finally {
            await connection.end();
        }
    }

    async get() {
        let TABLE = 'public."client"';
        const connection = new Database();

        const queryClient = `SELECT * FROM ${TABLE}`;

        let result = null
        try {
            result = await connection.query(queryClient, null);
            console.log('client recovered');
        } catch (err) {
            console.error('Error in getting client:', err.stack);
            throw new Error(err)
        } finally {
            await connection.end();
            return result.rows;
        }
    }


    async getById(clientId) {
        let TABLE = 'public."client"';
        const connection = new Database();
        const queryClient = ""
        
        if(clientId.contains("-")){
            queryClient = `SELECT * FROM ${TABLE} WHERE id = '${clientId}'`;
        } else {
            queryClient = `SELECT * FROM ${TABLE} WHERE cpf = '${clientId}'`;
        }

        let result = null
        try {
            result = await connection.query(queryClient, null);
            console.log('client recovered');
        } catch (err) {
            console.error('Error in getting client:', err.stack);
            throw new Error(err)
        } finally {
            await connection.end();
            if (result){
                return result.rows;
            } 

            return null;
        }
    }

}

exports.default = { ClientRepository }