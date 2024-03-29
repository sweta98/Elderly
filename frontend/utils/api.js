class ApiClient {
    constructor(host, port) {
        this.httpClient = new HTTPClient(host, port);
    }

    fetchAllEvents = () => {   
        return this.httpClient.getJsonFromApi("events");
    };

    createEvent = (post_body) => {   
        return this.httpClient.postJsonToApi("events", post_body);
    };

    updateEvent = (eventID, username,rsvp) => {
        const post_body = { "username": username,"add": rsvp };
        return this.httpClient.patchJsonToApi(`events/${eventID}`, post_body);        
    };

    fetchAllNeeds = () => {
        console.log("fetchallneeds");
        return this.httpClient.getJsonFromApi("manageNeeds");
    };

    updateNeed = (url, body) => {
        return this.httpClient.putJsonToApi(url, body);
    };

    fetchAllWishes = () => {
        return this.httpClient.getJsonFromApi("wishes");
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

  fetchWish = (url) => {
    return this.httpClient.getJsonFromApi(url);
  };
  enableTutorial = (url, body) => {
    return this.httpClient.patchJsonToApi(url, body);
  };
  disableTutorial = (url, body) => {
    return this.httpClient.patchJsonToApi(url, body);
  };
}

const apiClient = new ApiClient();
visualViewport;

