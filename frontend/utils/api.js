class ApiClient {
    constructor(host, port) {
        this.httpClient = new HTTPClient(host, port);
    }



    fetchAllEvents = () => {
        
        return this.httpClient.getJsonFromApi("events");
    };

   
}
const apiClient = new ApiClient();
visualViewport;
