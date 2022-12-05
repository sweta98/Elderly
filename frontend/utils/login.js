var username = "";

function loginAsResident(username){
  localStorage.setItem("username", username);
  localStorage.setItem("role", "resident");

  let res = apiClient.updateOnlineStatus("users/" + username + "/online", {});
  window.location.replace("/home");
}

function loginAsStaff(username){
  localStorage.setItem("username", username);
  localStorage.setItem("role", "staff");

  let res = apiClient.updateOnlineStatus("users/" + username + "/online",{});
  window.location.replace("/home");
}

function logout() {
  let res = this.apiClient.updateOfflineStatus("users/" + localStorage.getItem(username)+ "/offline",{});
  localStorage.clear();
  window.location.replace("/");
}
