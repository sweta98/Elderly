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

    fetchAllNeeds = () => {
        console.log("fetchallneeds");
        return this.httpClient.getJsonFromApi("manageNeeds");
    };

    updateNeed = (url, body) => {
        return this.httpClient.putJsonToApi(url, body);
    };
}

const apiClient = new ApiClient();
visualViewport;
