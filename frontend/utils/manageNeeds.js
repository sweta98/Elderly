const displayNewNeeds = (newNeeds) => {
  let displayHTML = `<tr>
    <th>Resident</th>
    <th>Request</th>
    <th>Edit</th>
  </tr>`;
  for (let i = 0; i < newNeeds.length; i++) {
    displayHTML =
      displayHTML +
      `<tr>
    <td>${newNeeds[i].resident}</td>
    <td>${newNeeds[i].need}</td>
    <td>
      <button class="edit-button">
        <img id="edit-image" src="img/edit.png" />
      </button>
    </td>
  </tr>`;
  }

  document.querySelector(".new-needs-table").innerHTML = displayHTML;
};

const displayInProgressNeeds = (inProgressNeeds) => {
  let displayHTML = `<tr>
      <th>Resident</th>
      <th>Request</th>
      <th>Edit</th>
    </tr>`;
  for (let i = 0; i < inProgressNeeds.length; i++) {
    displayHTML =
      displayHTML +
      `<tr>
      <td>${inProgressNeeds[i].resident}</td>
      <td>${inProgressNeeds[i].need}</td>
      <td>
        <button class="edit-button">
          <img id="edit-image" src="img/edit.png" />
        </button>
      </td>
    </tr>`;
  }

  document.querySelector(".in-progress-needs-table").innerHTML = displayHTML;
};

const displayCompletedNeeds = (completedNeeds) => {
  let displayHTML = `<tr>
        <th>Resident</th>
        <th>Request</th>
        <th>Edit</th>
      </tr>`;
  for (let i = 0; i < completedNeeds.length; i++) {
    displayHTML =
      displayHTML +
      `<tr>
        <td>${completedNeeds[i].resident}</td>
        <td>${completedNeeds[i].need}</td>
        <td>
          <button class="edit-button">
            <img id="edit-image" src="img/edit.png" />
          </button>
        </td>
      </tr>`;
  }

  document.querySelector(".completed-needs-table").innerHTML = displayHTML;
};

const fetchNeeds = async () => {
  apiClient.fetchAllNeeds().then(async (httpRes) => {
    const status = httpRes.status;
    const res = await httpRes.json();
    if (status === 200) {
      const newNeeds = res.needs.filter((need) => need.status === "New");
      const inProgressNeeds = res.needs.filter(
        (need) => need.status === "in-progress"
      );
      const completedNeeds = res.needs.filter(
        (need) => need.status === "completed"
      );
      displayNewNeeds(newNeeds);
      displayInProgressNeeds(inProgressNeeds);
      displayCompletedNeeds(completedNeeds);
      return res;
    }
  });
};
fetchNeeds();
