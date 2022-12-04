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
    if(pair[0] == "start_time" || pair[0] == "end_time"){
        var time_split = pair[1].split(':');
        let hour = time_split[0];
        let minute = time_split[1];
        let end = ""
        if (hour > 12) {
            end = 'PM';
            hour -= 12;
        } else if (hour < 12) {
            end = 'AM';
            if (hour == 0) {
              hour = 12;
            }
        } else {
            end = 'PM';
        }
        post_body[pair[0]] = hour + ':' + minute + ' ' + end;
    }else{
      post_body[pair[0]] = pair[1];
    }
  }
  return post_body
};

const submitEvent = async(e) => {
  e.preventDefault();
  let post_body = getData(e.target);
  console.log(post_body);
  let res = await apiClient.createEvent(post_body);
  if (res.ok) {
        $("#successModal").modal("show");
    }

}

//submit form  
event_form.addEventListener("submit", submitEvent);

//calendar
date_input.datepicker(options)
