const $eventstream = document.getElementById("eventstream");
const events = document.getElementById("events").innerHTML;


const fetchEvents = async () => {
  apiClient.fetchAllEvents().then(async (httpRes) => {
      const status = httpRes.status;
      const res = await httpRes.json();
    if (status === 200) {
          console.log(res.events);
          $eventstream.innerHTML = "";
          res.events.forEach((event) => {

            renderMessage(event);
        });
      }
  });
};
const renderMessage = (message) => {

const eventDisplay = {
  title: message.title,
  description: message.description,
  end_time: message.end_time,
      start_time: message.start_time,
      date: message.date,
      location: message.location
  };
console.log($eventstream)
  const messageHtml = Mustache.render(events, eventDisplay);
  $eventstream.insertAdjacentHTML("beforeend", messageHtml);
};

fetchEvents();