var username = "";

function loginAsResident(username){
  localStorage.setItem("username", username);
  localStorage.setItem("role", "resident");
  window.location.replace("/home");
}

function loginAsStaff(username){
  localStorage.setItem("username", username);
  localStorage.setItem("role", "staff");
  window.location.replace("/home");
}

function logout() {
  localStorage.clear();
  window.location.replace("/");
}
