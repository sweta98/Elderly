function logout() {
  localStorage.clear();
  window.location.replace("/login");
}

function home() {
  const type = localStorage.getItem("role");
  if (type === "resident") {
    window.location.replace("/");
  } else {
    window.location.replace("/");
  }
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
  window.location.replace("/events");
}
