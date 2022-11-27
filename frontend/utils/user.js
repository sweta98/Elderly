/* Methods for retrieving the current user of thie session 

Dependencies : Axios

*/
var user = null;

async function retrieveSessionUser(){
    var username;
    await axios.get(`/api/auth`)
            .then((response) =>{
                username = response.data.username;
            })
            .catch((err) =>{
                window.location.replace("/");
            });

    console.log("Current User: "+username)
    await axios.get(`/api/users/${username}`)
            .then((response) =>{
                user = response.data;
            })
            .catch((err) =>{
                window.location.replace("/");
            });


    console.log(user)
}