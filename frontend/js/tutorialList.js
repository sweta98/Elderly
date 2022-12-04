const socket = io('/');

socket.on("tutorial-enabled", appName => {
    document.getElementById(appName).setAttribute("style", "display:block");
});

socket.on("tutorial-disabled", appName => {
    document.getElementById(appName).setAttribute("style", "display:none");
});