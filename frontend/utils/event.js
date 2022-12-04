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




function update(eventId) {
  let username = localStorage.getItem("username");
  console.log(eventId, username);
  apiClient.updateEvent(eventId, username).then(async (httpRes) => {
    const status = httpRes.status;
    const res = await httpRes.json();
    if (status === 201) {
      console.log(res);
    }
  }
  );
}

fetchEvents();

const socket = io('/');
socket.on('createEvent', data => {
    console.log(data)
})

