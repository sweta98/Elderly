function toggleTutorial(app) {
    let toggleButton = document.getElementById(`toggle-${app}`);
    let enable = toggleButton.checked;
    if (enable) {
        const url = `tutorials/enabled/${app}`;
        const body = {};
        apiClient.enableTutorial(url, body).then(async (httpRes) => {
            const status = httpRes.status;
            const res = await httpRes.json();
            if (status === 200) {
                console.log(`${app} was enabled!`);
                showButtonEnabled(app);
            }
        });
    } else {
        const url = `tutorials/disabled/${app}`;
        const body = {};
        apiClient.disableTutorial(url, body).then(async (httpRes) => {
            const status = httpRes.status;
            const res = await httpRes.json();
            if (status === 200) {
                console.log(`${app} was disabled!`);
                showButtonDisabled(app);
            }
        });
    }
}

function showButtonEnabled(app) {}

function showButtonDisabled(app) {}