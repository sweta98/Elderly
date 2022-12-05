function logout() {
  localStorage.clear();
  window.location.replace("/");
}

function home() {
  const type = localStorage.getItem("role");
  window.location.replace("/home");
}

function wishboard() {
  const type = localStorage.getItem("role");
  if (type === "resident") {
    window.location.replace("/wishes");
  } else {
    window.location.replace("/manageWishes");
  }
}

function tutorials() {
  const type = localStorage.getItem("role");
  if (type === "resident") {
    window.location.replace("/tutorials");
  } else {
    window.location.replace("/manageTutorials");
  }
}

function events() {
  const username = localStorage.getItem("username");
  window.location.replace(`/events/${username}`); 
}
