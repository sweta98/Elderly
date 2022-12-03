const updateNeed = () => {
  const wishPriority = document.getElementById("need-priority").value;
  const wishStatus = document.getElementById("need-status").value;
  const modal = document.getElementById("exampleModalLabel").innerHTML;
  const myArray = modal.split("'s ");
  const url = `manageNeeds/${myArray[0]}/${myArray[1]}`;
  const body = {
    priority: wishPriority,
    status: wishStatus,
  };
  updateResidentNeed(url, body);
};

const displayModal = (button) => {
  const resident = button.dataset.resident;
  const need = button.dataset.need;
  const modal = document.getElementById("exampleModalLabel");
  modal.innerHTML = resident + "'s " + need;
};

const displayNewNeeds = (newNeeds) => {
  let displayHTML = "";
  for (let i = 0; i < newNeeds.length; i++) {
    displayHTML =
      displayHTML +
      `<tr>
    <td>${newNeeds[i].resident}</td>
    <td>${newNeeds[i].need}</td>
    <td>
      <button class="edit-button" data-toggle="modal" data-target="#exampleModal" data-resident="${newNeeds[i].resident}" data-need="${newNeeds[i].need}" onclick = displayModal(this)>
        <img id="edit-image" src="img/edit.png" />
      </button>
    </td>
  </tr>`;
  }

  if (displayHTML) {
    displayHTML =
      `<tr>
    <th>Resident</th>
    <th>Request</th>
    <th>Edit</th>
  </tr>` + displayHTML;
  }

  document.querySelector(".new-needs-table").innerHTML = displayHTML;
};

const displayInProgressNeeds = (inProgressNeeds) => {
  let displayHTML = "";
  for (let i = 0; i < inProgressNeeds.length; i++) {
    displayHTML =
      displayHTML +
      `<tr>
      <td>${inProgressNeeds[i].resident}</td>
      <td>${inProgressNeeds[i].need}</td>
      <td>
        <button class="edit-button" data-toggle="modal" data-target="#exampleModal" data-resident="${inProgressNeeds[i].resident}" data-need="${inProgressNeeds[i].need}" onclick = displayModal(this)>
          <img id="edit-image" src="img/edit.png" />
        </button>
      </td>
    </tr>`;
  }

  if (displayHTML) {
    displayHTML =
      `<tr>
    <th>Resident</th>
    <th>Request</th>
    <th>Edit</th>
  </tr>` + displayHTML;
  }

  document.querySelector(".in-progress-needs-table").innerHTML = displayHTML;
};

const displayCompletedNeeds = (completedNeeds) => {
  let displayHTML = "";
  for (let i = 0; i < completedNeeds.length; i++) {
    displayHTML =
      displayHTML +
      `<tr>
        <td>${completedNeeds[i].resident}</td>
        <td>${completedNeeds[i].need}</td>
        <td>
          <button class="edit-button" data-toggle="modal" data-target="#exampleModal" data-resident="${completedNeeds[i].resident}" data-need="${completedNeeds[i].need}" onclick = displayModal(this)>
            <img id="edit-image" src="img/edit.png" />
          </button>
        </td>
      </tr>`;
  }
  if (displayHTML) {
    displayHTML =
      `<tr>
    <th>Resident</th>
    <th>Request</th>
    <th>Edit</th>
  </tr>` + displayHTML;
  }

  document.querySelector(".completed-needs-table").innerHTML = displayHTML;
};

const updateResidentNeed = async (url, body) => {
  apiClient.updateNeed(url, body).then(async (httpRes) => {
    const status = httpRes.status;
    const res = await httpRes.json();
    if (status === 200) {
      window.location.reload();
      return res;
    }
  });
};

const fetchNeeds = async () => {
  apiClient.fetchAllNeeds().then(async (httpRes) => {
    const status = httpRes.status;
    const res = await httpRes.json();
    if (status === 200) {
      const newNeeds = res.needs.filter((need) => need.status === "New");
      const inProgressNeeds = res.needs.filter(
        (need) => need.status === "In Progress"
      );
      const completedNeeds = res.needs.filter(
        (need) => need.status === "Completed"
      );
      displayNewNeeds(newNeeds);
      displayInProgressNeeds(inProgressNeeds);
      displayCompletedNeeds(completedNeeds);
      return res;
    }
  });
};

fetchNeeds();
