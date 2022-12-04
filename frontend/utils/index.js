window.onload = function() {
  let currentRole = localStorage.getItem("role");
  if (currentRole === "resident") {
    document.getElementById("main-page-container").innerHTML =
        "    <div id=\"userinfo-container\">\n" +
        "        <img id=\"user-image\" src=\"img/resident.png\">\n" +
        "        <h2 id=\"iconUsername\"></h2>\n" +
        "    </div>\n" +
        "    <div id=\"home-buttons-container\">\n" +
        "        <div class=\"btn-group-vertical center\">\n" +
        "            <button type=\"button\" class=\"btn btn-lg btn-block\" onclick=\"window.location.replace('/wishes')\">My WishBoard</button>\n" +
        "        </div>\n" +
        "        <div class=\"btn-group-vertical center\">\n" +
        "            <button type=\"button\" class=\"btn btn-lg btn-block\" onclick=\"window.location.replace('/tutorials')\">Tutorials</button>\n" +
        "        </div>\n" +
        "        <div class=\"btn-group-vertical center\">\n" +
        "            <button type=\"button\" class=\"btn btn-lg btn-block\" onclick=\"window.location.replace('/events')\">Events</button>\n" +
        "        </div>\n" +
        "    </div>"
  } else if (currentRole === "staff") {
    document.getElementById("main-page-container").innerHTML =
        "        <div id=\"userinfo-container\">\n" +
        "            <img id=\"user-image\" src=\"img/staff.png\">\n" +
        "            <h2 id=\"iconUsername\"></h2>\n" +
        "        </div>\n" +
        "        <div id=\"home-buttons-container\">\n" +
        "            <div class=\"btn-group-vertical center\">\n" +
        "                <button type=\"button\" class=\"btn btn-lg btn-block\" onclick=\"window.location.replace('/manageWishes')\">Manage Wishes</button>\n" +
        "            </div>\n" +
        "            <div class=\"btn-group-vertical center\">\n" +
        "                <button type=\"button\" class=\"btn btn-lg btn-block\" onclick=\"window.location.replace('/tutorials')\">Manage Events</button>\n" +
        "            </div>\n" +
        "            <div class=\"btn-group-vertical center\">\n" +
        "                <button type=\"button\" class=\"btn btn-lg btn-block\" onclick=\"window.location.replace('/events')\">Manage Tutorials</button>\n" +
        "            </div>\n" +
        "        </div>"
  }

  document.getElementById("iconUsername").innerHTML = localStorage.getItem("username");
}

function logout() {
  localStorage.clear();
  window.location.replace("/login");
}