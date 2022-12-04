const $eventstream = document.getElementById("eventstream");
const $eventTemplate = document.getElementById("events").innerHTML;
var eventsArray;
const fetchEvents = async () => {
  apiClient.fetchAllEvents().then(async (httpRes) => {
      const status = httpRes.status;
      const res = await httpRes.json();
    if (status === 200) {
          console.log(res.events);
          eventsArray = res.events;
      }
  });
};




function func(vartest) {
  console.log(vartest);
}
fetchEvents();

const socket = io('/');
socket.on('createEvent', data => {
    console.log(data)
})

