class HTTPClient {
  SUCCESS_CODES = [201, 200];

  constructor() {
    this.apiUrl = `/api`;
  }

  // ------ HELPER METHODS ------
  handleErrors = (res, errorCode) => {
    console.error(`API returned ${errorCode} with body: ${res}`);
  };

  ensureResponse = async (httpRes) => {
    const res = await httpRes.json();
    if (!this.SUCCESS_CODES.includes(httpRes.status)) {
      this.handleErrors(res, httpRes.status);
    }
    return res;
  };

  getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  });

  getUrl = (endpoint) => {
    return `${this.apiUrl}/${endpoint}`;
  };

  // ------ HTTP METHODS ------
  async postJsonToApi(endpoint, body) {
    const url = this.getUrl(endpoint);
    const httpRes = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    return httpRes;
  }

  async putJsonToApi(endpoint, body) {
    const url = this.getUrl(endpoint);
    const httpRes = await fetch(url, {
      method: "PUT",
      credentials: "same-origin",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    return httpRes;
  }

  async getJsonFromApi(endpoint) {
    const url = this.getUrl(endpoint);
    console.log("http");
    console.log(url);
    const httpRes = await fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: this.getHeaders(),
    });

    return httpRes;
  }
  async patchJsonToApi(endpoint, body) {
    const url = this.getUrl(endpoint);
    const httpRes = await fetch(url, {
      method: "PATCH",
      credentials: "same-origin",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    return httpRes;
  }
}
