const updateWish = () => {
  const wishPriority = document.getElementById("wish-priority").value;
  const wishStatus = document.getElementById("wish-status").value;
  const modal = document.getElementById("exampleModalLabel").innerHTML;
  const myArray = modal.split("'s ");
  const url = `manageWishes/${myArray[0]}/${myArray[1]}`;
  const body = {
    priority: wishPriority,
    status: wishStatus,
  };
  updateResidentWish(url, body);
};

const displayModal = (button) => {
  const username = button.dataset.username;
  const wish = button.dataset.wish;
  const modal = document.getElementById("exampleModalLabel");
  modal.innerHTML = username + "'s " + wish;
};

const displayNewWishes = (newWishes) => {
  let displayHTML = "";
  for (let i = 0; i < newWishes.length; i++) {
    displayHTML =
      displayHTML +
      `<tr>
    <td>${newWishes[i].username}</td>
    <td>${newWishes[i].content}</td>
    <td>
      <button class="edit-button" data-toggle="modal" data-target="#exampleModal" data-resident="${newWishes[i].username}" data-need="${newWishes[i].content}" onclick = displayModal(this)>
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

  document.querySelector(".new-wishes-table").innerHTML = displayHTML;
};

const displayInProgressWishes = (inProgressWishes) => {
  let displayHTML = "";
  for (let i = 0; i < inProgressWishes.length; i++) {
    displayHTML =
      displayHTML +
      `<tr>
      <td>${inProgressWishes[i].username}</td>
      <td>${inProgressWishes[i].content}</td>
      <td>
        <button class="edit-button" data-toggle="modal" data-target="#exampleModal" data-resident="${inProgressWishes[i].username}" data-need="${inProgressWishes[i].content}" onclick = displayModal(this)>
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

  document.querySelector(".in-progress-wishes-table").innerHTML = displayHTML;
};

const displayCompletedWishes = (completedWishes) => {
  let displayHTML = "";
  for (let i = 0; i < completedWishes.length; i++) {
    displayHTML =
      displayHTML +
      `<tr>
        <td>${completedWishes[i].username}</td>
        <td>${completedWishes[i].content}</td>
        <td>
          <button class="edit-button" data-toggle="modal" data-target="#exampleModal" data-resident="${completedWishes[i].username}" data-need="${completedWishes[i].content}" onclick = displayModal(this)>
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

  document.querySelector(".completed-wishes-table").innerHTML = displayHTML;
};

const updateResidentWish = async (url, body) => {
  apiClient.updateWish(url, body).then(async (httpRes) => {
    const status = httpRes.status;
    const res = await httpRes.json();
    if (status === 200) {
      window.location.reload();
      return res;
    }
  });
};

const fetchWishes = async () => {
  apiClient.fetchAllWishes().then(async (httpRes) => {
    const status = httpRes.status;
    const res = await httpRes.json();
    if (status === 200) {
      const newWishes = res.wishes.filter((wish) => wish.status === "New");
      const inProgressWishes = res.wishes.filter(
        (wish) => wish.status === "In Progress"
      );
      const completedWishes = res.wishes.filter(
        (wish) => wish.status === "Completed"
      );
      displayNewWishes(newWishes);
      displayInProgressWishes(inProgressWishes);
      displayCompletedWishes(completedWishes);
      return res;
    }
  });
};

fetchWishes();
