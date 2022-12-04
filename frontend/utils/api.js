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

  getWishesByUser = (username) => {
    return this.httpClient.getJsonFromApi("wishes/" + username);
  };

  postWish = (body) => {
    return this.httpClient.postJsonToApi("wishes/", body);
  };

}
const apiClient = new ApiClient();
visualViewport;
