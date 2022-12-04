function autoFill(value) {
    document.getElementById('wish-input').value = value
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
    var mapStatusToValue = {
        "New": 0,
        "In Progress": 5,
        "Completed": 10,
    }
    wishes.sort((a, b) => {
        return mapStatusToValue[a.status] - mapStatusToValue[b.status]
    });

    for (let i = 0; i < wishes.length; i++) {
        date = new Date(wishes[i].timestamp)
        displayHTML = displayHTML +
                        `
                        <div class="card">
                            <div class="card-header ${mapStatusToClassName[wishes[i].status]}">
                                <div class="d-flex justify-content-between" data-toggle="collapse" data-target="#collapse${i}">
                                    <a class="wish-item-time">${date.toLocaleDateString("en-US")}</a>
                                    <a class="wish-item-status">${wishes[i].status}</a>
                                </div>
                            </div>
                    
                            <div id="collapse${i}" class="collapsed"  data-parent="#accordion">
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
    let content = document.querySelector("#wish-input").value;
    if (content.length === 0) {
        $('.alert').addClass('show')
        return ;
    }
    const body = {
        username: localStorage.getItem("username"),
        content: content,
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
getWishesAndDisplay(localStorage.getItem("username"));

const socket = io('/');
socket.on('updateWish', data => {
    getWishesAndDisplay(localStorage.getItem("username"));
})