const $eventstream = document.getElementById("eventstream");
const $eventTemplate = document.getElementById("events").innerHTML;
var eventsArray;

const $messages = document.querySelector("#messages");
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

window.onload = () =>{
  if (window.localStorage.getItem("role") == "staff"){
      create_event_btn.style.display = "block";
  } else{
      create_event_btn.style.display = "none";
  }
}


function update(eventId,rsvp) {
  let username = localStorage.getItem("username");
  console.log(eventId, username);
  apiClient.updateEvent(eventId, username,rsvp).then(async (httpRes) => {
    const status = httpRes.status;
    const res = await httpRes.json();
    if (status === 201) {
      if(rsvp)
      {
        $("#successModalRSVP").modal("show");
      }
      else {
        $("#successModalNoRSVP").modal("show");
      }
      
      console.log(res);
    }
  }
  );
}

fetchEvents();


//handle socket event creation
const socket = io('/');
socket.on('createEvent', data => {
  const messageTemplate =
document.querySelector("#message-template").innerHTML;
  const html = Mustache.render(messageTemplate, {
    title: data.title,
    description: data.description,
    start_time: data.start_time,
    end_time: data.end_time,
    location: data.location,
    _id: data._id

  });
  $messages.insertAdjacentHTML("beforeend", html);
  
    console.log(data)
})

//handle create event button based on role type
const create_event_btn = document.getElementById("create_event_btn")
create_event_btn.onclick = () =>{
  window.location.replace("/createEvent");
}

