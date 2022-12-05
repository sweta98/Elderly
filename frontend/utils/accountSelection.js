const socket = io('/');

socket.on("online", (username) => {
    let user_button = "option_" + username;
    document.getElementById(user_button).setAttribute("style", "display:none");
});

socket.on("offline", (username) => {
    let user_button = "option_" + username;
    document.getElementById(user_button).setAttribute("style", "display:''");
});
