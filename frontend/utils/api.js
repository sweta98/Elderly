class ApiClient {
  constructor(host, port) {
    this.httpClient = new HTTPClient(host, port);
  }

  fetchAllEvents = () => {
    return this.httpClient.getJsonFromApi("events");
  };

  fetchAllWishes = () => {
    console.log("fetchallwishes");
    return this.httpClient.getJsonFromApi("manageWishes");
  };
  updateWish = (url, body) => {
    return this.httpClient.putJsonToApi(url, body);
  };
}
const apiClient = new ApiClient();
visualViewport;
