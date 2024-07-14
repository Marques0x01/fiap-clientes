const { ClientService } = require("./service/ClientService.js").default;

exports.handler = async (event) => {

  const method = event.path + "-" + event.httpMethod;
  const clientService = new ClientService();

  try {
    let response;
    switch (method) {
      case "/fiap-lanches/client-POST":
        response = await clientService.create(JSON.parse(event.body));
        break;

      case "/fiap-lanches/client-DELETE":
        response = await clientService.delete(event.queryStringParameters.id);
        break;

      case "/fiap-lanches/client-GET":
        response = await clientService.get();
        break;

        case "/fiap-lanches/client/client_id-GET":
          response = await clientService.getById(event.queryStringParameters.id);
          break;

      default:
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: `Resource not found: ${event.path}`,
            statusCode: 404
          })
        };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ resp: response })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};