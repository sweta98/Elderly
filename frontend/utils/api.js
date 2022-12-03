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
  updateNeed = (url, body) => {
    return this.httpClient.putJsonToApi(url, body);
  };
}
const apiClient = new ApiClient();
visualViewport;
