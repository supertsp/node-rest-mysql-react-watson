import axios from 'axios';
import Validator from './Validator';

//https://www.npmjs.com/package/axios
//JS Documentation: https://dev.to/paulasantamaria/document-your-javascript-code-with-jsdoc-2fbf
//Create by: Tiago Penha Pedroso 2020-02-29

export default class AxiosRest {

    static connections = [];
    static connectionsName = [];

    /**
     * Returns the number of active connections.
     * @returns {number} 
     */
    static lengthOfConnections() {
        if (Validator.isArray(AxiosRest.connections)) {
            return AxiosRest.connections.length;
        }
        
        return 0;
    }

    /**
     * Create and add a new connection to a Rest API.
     * @param {string} baseUrl Example: 'https://mywebsite.com/api/shop'
     * @param {string} connectionName The name of connection
     */
    static addApiConnection(baseUrl, connectionName) {
        if (Validator.isUndefined(AxiosRest.connections)) {
            AxiosRest.connections = [];
            AxiosRest.connectionsName = [];
        }

        if (Validator.isString(baseUrl) && Validator.isString(connectionName)) {
            const newCon = axios.create({
                baseURL: baseUrl
            });

            AxiosRest.connections.push(newCon);
            AxiosRest.connectionsName.push(connectionName);

            return true;
        }

        return false;
    }

    /**
     * Returns the created connection.
     * @param {number | string} connectionIdentifier The `name` or `index` of the created connection
     * @returns {AxiosInstance} A Axios instance
     */
    static getApiConnection(connectionIdentifier) {
        if (Validator.isIntegerBetweenInterval(connectionIdentifier, 0, AxiosRest.lengthOfConnections())) {
            return AxiosRest.connections[connectionIdentifier];
        }

        if (Validator.isString(connectionIdentifier)) {
            for (let index = 0; index < AxiosRest.lengthOfConnections(); index++) {
                if (AxiosRest.connectionsName[index] === connectionIdentifier) {
                    return AxiosRest.connections[index];
                }
            }
        }

        return null;
    }

    /**
     * Execute the HTTP protocol GET method passing the name or index of the connection.
     *
     * @example const response = await
     *                       AxiosRest.executeGET('myApi', `products/${idProduct}`);
     * if (response.status === 200 && response.data) {
     *        console.log(response.data)
     * }
     *
     * @param {number|string} connectionIdentifier The `name` or `index` of the created connection
     * @param {string} pathToEndpoint The path to the desired endpoint
     * @param {JSON} configs A JSON of extra Axios settings
     * @returns {Response|null} A Promise containing an JSON with `Response` format or `null`
     * @example Response {
     *             data: { },
     *             status: number,
     *             statusText: string,
     *             headers: { },
     *             config: { },
     *             request: { }
     * }
     */
    static async executeGET(connectionIdentifier, pathToEndpoint, configs) {
        if ((Validator.isIntegerBetweenInterval(connectionIdentifier, 0, AxiosRest.lengthOfConnections())
            || Validator.isString(connectionIdentifier))
            && Validator.isString(pathToEndpoint)) {

            try {
                let response = await AxiosRest.getApiConnection(connectionIdentifier).get(pathToEndpoint, configs);
                return response;
            } catch (error) {
                const subresponse = error.response;
                return subresponse;
            }
        }

        return null;
    }


    /**
     * Execute the HTTP protocol POST method passing the name or index of the connection.
     *
     * @example const response = await
     *                       AxiosRest.executePOST('myApi', `product/`, {
     *            name: 'bag',
     *            color: 'blue'
     * });
     * if (response.status === 200 && response.data) {
     *         console.log(response.data)
     * }
     *
     * @param {number|string} connectionIdentifier The `name` or `index` of the created connection
     * @param {string} pathToEndpoint The path to the desired endpoint
     * @param {JSON} data A JSON of the request body
     * @param {JSON} configs A JSON of extra Axios settings
     * @returns {Response|null} A Promise containing an JSON with `Response` format or `null`
     * @example Response {
     *             data: { },
     *             status: number,
     *             statusText: string,
     *             headers: { },
     *             config: { },
     *             request: { }
     * }
     */
    static async executePOST(connectionIdentifier, pathToEndpoint, data, configs) {
        if ((Validator.isIntegerBetweenInterval(connectionIdentifier, 0, AxiosRest.lengthOfConnections())
            || Validator.isString(connectionIdentifier))
            && Validator.isString(pathToEndpoint)) {

            try {
                let response = await AxiosRest.getApiConnection(connectionIdentifier).post(pathToEndpoint, data, configs);
                return response;
            } catch (error) {
                const subresponse = error.response;
                return subresponse;
            }
        }

        return null;
    }

    /**
     * Execute the HTTP protocol PUT method passing the name or index of the connection.
     *
     * @example const response = await
     *                       AxiosRest.executePUT('myApi', `product/${idProduct}`, {
     *            name: 'bag style',
     *            color: 'white'
     * });
     * if (response.status === 200 && response.data) {
     *         console.log(response.data)
     * }
     *
     * @param {number|string} connectionIdentifier The `name` or `index` of the created connection
     * @param {string} pathToEndpoint The path to the desired endpoint
     * @param {JSON} data A JSON of the request body
     * @param {JSON} configs A JSON of extra Axios settings
     * @returns {Response|null} A Promise containing an JSON with `Response` format or `null`
     * @example Response {
     *             data: { },
     *             status: number,
     *             statusText: string,
     *             headers: { },
     *             config: { },
     *             request: { }
     * }
     */
    static async executePUT(connectionIdentifier, pathToEndpoint, data, configs) {
        if ((Validator.isIntegerBetweenInterval(connectionIdentifier, 0, AxiosRest.lengthOfConnections())
            || Validator.isString(connectionIdentifier))
            && Validator.isString(pathToEndpoint)) {

            try {
                let response = await AxiosRest.getApiConnection(connectionIdentifier).put(pathToEndpoint, data, configs);
                return response;
            } catch (error) {
                const subresponse = error.response;
                return subresponse;
            }
        }

        return null;
    }

    /**
     * Execute the HTTP protocol DELETE method passing the name or index of the connection.
     *
     * @example const response = await
     *                       AxiosRest.executeDELETE('myApi', `product/${idProduct}`);
     * if (response.status === 200 && response.data) {
     *         console.log(response.data)
     * }
     *
     * @param {number|string} connectionIdentifier The `name` or `index` of the created connection
     * @param {string} pathToEndpoint The path to the desired endpoint
     * @param {JSON} configs A JSON of extra Axios settings
     * @returns {Response|null} A Promise containing an JSON with `Response` format or `null`
     * @example Response {
     *             data: { },
     *             status: number,
     *             statusText: string,
     *             headers: { },
     *             config: { },
     *             request: { }
     * }
     */
    static async executeDELETE(connectionIdentifier, pathToEndpoint, configs) {
        if ((Validator.isIntegerBetweenInterval(connectionIdentifier, 0, AxiosRest.lengthOfConnections())
            || Validator.isString(connectionIdentifier))
            && Validator.isString(pathToEndpoint)) {

            try {
                let response = await AxiosRest.getApiConnection(connectionIdentifier).delete(pathToEndpoint, configs);
                return response;
            } catch (error) {
                const subresponse = error.response;
                return subresponse;
            }
        }

        return null;
    }

    /**
     * Execute the HTTP protocol PATCH method passing the name or index of the connection.
     *
     * @example const response = await
     *                       AxiosRest.executePATCH('myApi', `product/${idProduct}`, {            
     *            color: 'white'
     * });
     * if (response.status === 200 && response.data) {
     *         console.log(response.data)
     * }
     *
     * @param {number|string} connectionIdentifier The `name` or `index` of the created connection
     * @param {string} pathToEndpoint The path to the desired endpoint
     * @param {JSON} data A JSON of the request body
     * @param {JSON} configs A JSON of extra Axios settings
     * @returns {Response|null} A Promise containing an JSON with `Response` format or `null`
     * @example Response {
     *             data: { },
     *             status: number,
     *             statusText: string,
     *             headers: { },
     *             config: { },
     *             request: { }
     * }
     */
    static async executePATCH(connectionIdentifier, pathToEndpoint, data, configs) {
        if ((Validator.isIntegerBetweenInterval(connectionIdentifier, 0, AxiosRest.lengthOfConnections())
            || Validator.isString(connectionIdentifier))
            && Validator.isString(pathToEndpoint)) {

            try {
                let response = await AxiosRest.getApiConnection(connectionIdentifier).patch(pathToEndpoint, data, configs);
                return response;
            } catch (error) {
                const subresponse = error.response;
                return subresponse;
            }
        }

        return null;
    }

}