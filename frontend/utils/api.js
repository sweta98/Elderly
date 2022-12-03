class ApiClient {
  constructor(host, port) {
    this.httpClient = new HTTPClient(host, port);
  }

  fetchAllEvents = () => {
    return this.httpClient.getJsonFromApi("events");
  };

  fetchAllNeeds = () => {
    console.log("fetchallneeds");
    return this.httpClient.getJsonFromApi("manageNeeds");
  };
}
const apiClient = new ApiClient();
visualViewport;
