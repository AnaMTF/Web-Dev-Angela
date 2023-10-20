//$("h1").css("color", "red");
$("h1").addClass("big-title margin-50");

$("h1").text("Bye");

$("button").html("<em>Hey</em>");

$("img").attr(
    "src",
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
);

$("a").attr("href", "https://www.yahoo.com");

$("h1").click(function () {
    $("h1").css("color", "purple");
});

$("button").click(function () {
    $("h1").css("color", "purple");
});

$(document).keypress(function (event) {
    console.log(event.key);
    $("h1").text(event.key);
});

$("h1").on("mouseover", function () {
    $("h1").css("color", "blue");
});

// $("h1").before("<button>New</button>");
// $("h1").after("<button>New</button>");
// $("h1").prepend("<button>New</button>");
// $("h1").append("<button>New</button>");

// $("button").remove();

$("button").on("click", function () {
    // $("h1").fadeOut();
    // $("h1").fadeIn();
    // $("h1").fadeToggle();
    // $("h1").slideUp();
    // $("h1").slideDown();
    // $("h1").slideToggle();
    $("h1").slideUp().slideDown().animate({ opacity: 0.5, margin: "20%" });
});
