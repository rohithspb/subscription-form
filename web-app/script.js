$(document).ready(function(){
//mobile number validation 
$("#mobile").on("input",function(){
phone = this.value;
if(phone =='' || !phone.match(/^\d{10}$/) )
        {  
            $("#mobile").css({'background' : 'red'});
            $("#demo").text("please enter the valid mobile number");
            return false;  
        }  
      else  
        {  
            $("#mobile").css({'background' : 'rgb(250, 255, 189)'}); 
            $("#demo").text("");        
            return true;  
        }  
});



// ajax call



function bindEvent(){

  $("#subscribe").click(function(e){

    e.preventDefault();
    var data = {
      username: $('#uname').val(),
      email: $('#email').val(),
      mobile_number: $('#mobile').val(),
      city: $('#city').val()
    }

    $.ajax({
      url : 'http://localhost:3000/user',
      type : 'post',
      data : data,
      success : function(result) {
        $("#demo").text(result).css({"color":"green"});
        $('#myform')[0].reset();
        $("#mobile").css({'background' : '#ffffff'});
      }

    });

  });

};

bindEvent();

});



//mobile number validation 
// $("#mobile").on("input",function(){
// phone = this.value;
// if(phone =='' || !phone.match(/^\d{10}$/) )
//         {  
//             $("#mobile").css({'background' : 'red'});
//             $("#demo").text("please enter the valid mobile number");
//             return false;  
//         }  
//       else  
//         {  
//             $("#mobile").css({'background' : 'rgb(250, 255, 189)'}); 
//             $("#demo").text("");        
//             return true;  
//         }  
// });






