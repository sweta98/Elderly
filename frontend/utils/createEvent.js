var date_input=$('#date'); 
var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
var options={
  format: 'mm/dd/yyyy',
  container: container,
  todayHighlight: true,
  autoclose: true,
  minDate: 0,
};
let event_form = document.getElementById("event_form");

function getData(form) {
  var formData = new FormData(form);
  let post_body = {}
  for (var pair of formData.entries()) {
    post_body[pair[0]] = pair[1];
  }
  return post_body
};

const submitEvent = (e) => {
  e.preventDefault();
  let post_body = getData(e.target);
  console.log(post_body)
  apiClient.createEvent(post_body).then(async (httpRes) => {
    const status = httpRes.status;
    const res = await httpRes.json();
    if (status === 200) {
          console.log(res);
          return res;
      }
  });
}

//submit form  
event_form.addEventListener("submit", submitEvent);


//calendar
date_input.datepicker(options)