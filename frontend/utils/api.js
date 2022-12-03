import {HTTPClient} from "./http.js"

export class ApiClient {
    constructor(host, port) {
        this.httpClient = new HTTPClient(host, port);
    }

    fetchAllEvents = () => {   
        return this.httpClient.getJsonFromApi("events");
    };

    createEvent = (post_body) => {   
        return this.httpClient.postJsonToApi("events", post_body);
    };

   
}
const apiClient = new ApiClient();
visualViewport;
