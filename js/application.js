$(document).ready(function(){
  console.log("Ready");

  // Hide profile photo and add resume image and new buttons
  $("#resumeImage").on("click", function(e){
    e.preventDefault();
    $(".wrap-right-side").hide();

    $("#right-side-bar").prepend(Parse.resume);
    $("#right-side-bar").append(Parse.linksButtons);
  })

// bring back the profile photo and remove resume with back button
  $("#right-side-bar").on("click", "#back", function(e){
    e.preventDefault();

    $("#imageResume").remove();
    $(".downloadToRemove").remove();
    $(".wrap-right-side").show();
  })

// Hide the elements that contains profile image and add projects
  $("#project-image").on("click", function(e){
    e.preventDefault();
    if($('.wrap-right-side:visible').length == 0){
      console.log("visible");
      $(".wrap-right-side").css("display","block");
      $(".projects-container").css("display","none");
    }else {
      console.log("hidden");
      $(".wrap-right-side").css("display","none");
      $(".projects-container").css("display","block");
    }

  })

// makes the light bulb yellow`
  // $(".links").on("click", ".lightAnimation", function(e){
  //   e.preventDefault();
  //   $(".removeProject").remove();
  //   $(".projects").remove();
  //   $(".wrap-right-side").show();
  //   $(".lightAnimation").remove();
  //   $(".send-message-align").removeClass("send-message-align").addClass("send-message");
  // })

//description box on mouseover
  var e = document.getElementById('parent');
  e.onmouseover = function() {
    document.getElementById('popup').style.display = 'block';
  }
  e.onmouseout = function() {
    document.getElementById('popup').style.display = 'none';
  }


  var Parse = {

    linksButtons: "<div class='downloadToRemove'> <a class='button' href='/images/Renan-Souza-ResumeVersion8.31.2016.pdf' download='RenanSouza'>Download Resume</a><a id='back' class='button' href='index.html'>Back</a></div>",

    resume: "<img id='imageResume' src='images/resumeImage.png' alt='Resume'>",

    lightAnimation: "<div class='lightAnimation'></div>"

  }

})
