class ApiClient {
  constructor(host, port) {
    this.httpClient = new HTTPClient(host, port);
  }

  fetchAllEvents = () => {
    return this.httpClient.getJsonFromApi("events");
  };

  fetchAllNeeds = () => {
    return this.httpClient.getJsonFromApi("manageNeeds");
  };

  fetchNeed = (url) => {
    return this.httpClient.getJsonFromApi(url);
  };

  updateNeed = (url, body) => {
    return this.httpClient.putJsonToApi(url, body);
  };
}
const apiClient = new ApiClient();
visualViewport;
