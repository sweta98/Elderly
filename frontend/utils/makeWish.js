function autoFill(value) {
    document.getElementById('wish-input').value = "I need " + value
}

const mapStatusToClassName = {
    'New': 'list-group-item-danger',
    'In Progress': 'list-group-item-warning',
    'Completed': 'list-group-item-success',
}


const getWishesAndDisplay = async (username) => {
    apiClient.getWishesByUser(username).then(async (httpRes) => {
      const status = httpRes.status;
      const res = await httpRes.json();
      if (status === 200) {
        console.log(res)
        const wishes = res.wishes
        displayWishes(wishes)
        return res;
      }
    });
  };

const displayWishes = (wishes) => {
    let displayHTML = "";
    for (let i = 0; i < wishes.length; i++) {
        date = new Date(wishes[i].timestamp)
        displayHTML = displayHTML +
                        `
                        <div class="card">
                            <div class="card-header ${mapStatusToClassName[wishes[i].status]}">
                                <div class="d-flex justify-content-between" data-toggle="collapse" data-target="#collapse${i}">
                                    <a class="wish-item-content">${wishes[i].content.slice(0, 4)}...</a>
                                    <a class="wish-item-time">${date.toLocaleDateString("en-US")}</a>
                                    <a class="wish-item-status">${wishes[i].status}</a>
                                </div>
                            </div>
                    
                            <div id="collapse${i}" class="collapse"  data-parent="#accordion">
                                <div class="card-body">
                                ${wishes[i].content}
                                </div>
                            </div>
                        </div>
                        `
    }
    document.querySelector(".wishes-container").innerHTML = displayHTML;
}

const postWish = async () => {
    const body = {
        //TODO: Get Username
        username: 'Boe',
        //TODO: Check null input
        content: document.querySelector("#wish-input").value,
    }

    apiClient.postWish(body).then( async (httpRes) => {
        const status = httpRes.status;
        const res = await httpRes.json();
        if (status === 200) {
            $("#successModal").modal("show");
            return res;
        }
      })
}

// getWishesAndDisplay('Boe');