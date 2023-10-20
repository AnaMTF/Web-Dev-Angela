document.query;
document.getElementsByTagName("li")[2].innerHTML = "Ana";

document.getElementsByTagName("li")[1].style.color = "purple";
document.getElementById("title").innerHTML = "Good bye";
document.querySelector("#title").style.color = "green";
document.querySelector("li a").style.color = "red";
document.querySelector("button").style.backgroundColor = "yellow";
document.querySelectorAll("#list .item")[2].style.color = "blue"; //not working

document.querySelector("button").classList;
document.querySelector("button").classList.add("invisible");
document.querySelector("button").classList.remove("invisible");
document.querySelector("button").classList.toggle("invisible");

document.querySelector("a").attributes;
document.querySelector("a").getAttribute("href");
document.querySelector("a").setAttribute("href", "www.bing.com");
