var username = "";

function loginAsResident(username){
  localStorage.setItem("username", username);
  localStorage.setItem("role", "resident");
  window.location.replace("/");
}

function loginAsStaff(username){
  localStorage.setItem("username", username);
  localStorage.setItem("role", "staff");
  window.location.replace("/");
}

function logout() {
  localStorage.clear();
  window.location.replace("/login");
}
