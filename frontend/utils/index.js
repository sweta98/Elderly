window.onload = function() {
  let currentRole = localStorage.getItem("role");
  let currentUsername = localStorage.getItem("username");

  // avoid access the application through "/" without login
  if (currentRole === null || currentUsername === null) {
    window.location.replace("/login");
  }

  if (currentRole === "resident") {
    document.getElementById("home-buttons-container-resident").style.display = "";
    document.getElementById("home-buttons-container-staff").style.display = "none";
    let iconDiv = document.getElementById("userinfo-container");
    let iconImage = document.createElement("img");
    iconImage.src = "img/resident.png";
    iconDiv.appendChild(iconImage);
    let h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(currentUsername));
    iconDiv.appendChild(h2);
  } else if (currentRole === "staff") {
    document.getElementById("home-buttons-container-staff").style.display = "";
    document.getElementById("home-buttons-container-resident").style.display = "none";
    let iconDiv = document.getElementById("userinfo-container");
    let iconImage = document.createElement("img");
    iconImage.src = "img/staff.png";
    iconDiv.appendChild(iconImage);
    let h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(currentUsername));
    iconDiv.appendChild(h2);
  }
}