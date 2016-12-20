$(document).ready(function(){
  console.log("Ready");

  $(window).scroll(function(event) {
   $(".links").css("margin-left", $(".links").css("margin-left")-$(document).scrollLeft());
  });

  $("#resumeImage").on("click", function(e){
    e.preventDefault();
    $(".wrap-right-side").hide();

    $("#right-side-bar").prepend(Parse.resume);
    $("#right-side-bar").append(Parse.linksButtons);
  })

  $("#right-side-bar").on("click", "#back", function(e){
    e.preventDefault();

    $("#imageResume").remove();
    $(".downloadToRemove").remove();
    $(".wrap-right-side").show();
  })

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
    // $("#imageResume").remove();
    // $(".downloadToRemove").remove();
    // $(".links").append(Parse.lightAnimation);

    // $(".send-message-align").removeClass("send-message-align").addClass("send-message");

    // $(".wrap-right-side").hide();
    // $("#right-side-bar").append(Parse.checkers + Parse.invisibleT + Parse.walmart + Parse.movieR + Parse.flashC);
  })

  $(".links").on("click", ".lightAnimation", function(e){
    e.preventDefault();

    $(".removeProject").remove();
    $(".projects").remove();
    $(".wrap-right-side").show();
    $(".lightAnimation").remove();
    $(".send-message-align").removeClass("send-message-align").addClass("send-message");
  })

//description box on mouseover
  var e = document.getElementById('parent');
  e.onmouseover = function() {
    document.getElementById('popup').style.display = 'block';
  }
  e.onmouseout = function() {
    document.getElementById('popup').style.display = 'none';
  }






  $("form").on("submit", function(e){
    e.preventDefault();

    console.log($("form").serialize());

    $.ajax({
      url: "https://agile-beach-95456.herokuapp.com",
      method: "GET",
      data: $("form").serialize()
    }).done(function(response){
      console.log(response["status"]);
    })

    // var to = "renanbarbosadesouza@gmail.com";
    // var subject = $('input[name="subject"]').val();
    // var body = $('textarea[name="message"]').val();

    // window.open("mailto:"+ to +"?subject="+ subject +"&body=" + body);
  })



var Parse = {

  linksButtons: "<div class='downloadToRemove'> <a class='button' href='/images/Renan-Souza-ResumeVersion8.31.2016.pdf' download='RenanSouza'>Download Resume</a><a id='back' class='button' href='index.html'>Back</a></div>",

  resume: "<img id='imageResume' src='images/resumeImage.png' alt='Resume'>",

  // checkers: "<a href='checkers/index.html' target='_blank' class='removeProject' ><div class='projects' id='checkers'><img id='checkers-image' src='images/checkers.png' alt='checkers'></div></a>",

  // invisibleT: "<a href='https://github.com/RenanBa/invisible-thread' target='_blank' class='removeProject' > <div class='projects' id='invisibleT'><img id='invisibleT-image' src='images/invisibleThread.png' alt='Invisible Thread'></div></a>",

  // walmart: "<a href='https://search-api-market.herokuapp.com/' target='_blank' class='removeProject' > <div class='projects' id='walmart'><h2 id='walmart-image'>Walmart API search</h2></div></a>",

  // movieR: "<div class='projects' id='movieR'></div>",

  // flashC: "<a href='https://bearflahscard.herokuapp.com/homepage' target='_blank' class='removeProject' > <div class='projects' id='flashC'><img id='flashCard-image' src='images/flashcards.png'></div></a>",

  lightAnimation: "<div class='lightAnimation'></div>"

}















  // $("form").on("submit", function(e){
  //   e.preventDefault();
  //   console.log("Email");
    // var to = $("#input-email").val();
    // var subject = $("#input-subject").val();
    // sendMail(to, subject);
  // })

})


// function getAjax() {
//   console.log("getAjax");
//     try {
//         if (window.XMLHttpRequest) {
//             return new XMLHttpRequest();
//         } else if (window.ActiveXObject) {
//             try {
//                 return new ActiveXObject('Msxml2.XMLHTTP');
//             } catch (try_again) {
//                 return new ActiveXObject('Microsoft.XMLHTTP');
//             }
//         }
//     } catch (fail) {
//         return null;
//     }
// }

// function sendMail(to, subject) {
//   console.log("sendEmail");
//      var rq = getAjax();

//      if (rq) {
//       console.log("if rq");
//          // Success; attempt to use an Ajax request to a PHP script to send the e-mail
//          try {
//              rq.open('GET', 'sendmail.php?to=' + encodeURIComponent(to) + '&subject=' + encodeURIComponent(subject) + '&d=' + new Date().getTime().toString(), true);

//              rq.onreadystatechange = function () {
//                  if (this.readyState === 4) {
//                      if (this.status >= 400) {
//                          // The request failed; fall back to e-mail client
//                          window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
//                      }
//                  }
//              };

//              rq.send(null);
//          } catch (fail) {
//              // Failed to open the request; fall back to e-mail client
//              window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
//          }
//      } else {
//          // Failed to create the request; fall back to e-mail client
//          window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
//      }
// }

