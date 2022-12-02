
const fetchEvents = async () => {
  apiClient.fetchAllEvents().then(async (httpRes) => {
      const status = httpRes.status;
      const res = await httpRes.json();
    if (status === 200) {
          console.log(res);
          return res;
      }
  });
};
fetchEvents();