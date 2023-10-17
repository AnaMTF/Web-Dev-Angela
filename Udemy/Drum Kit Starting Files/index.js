for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document
        .querySelectorAll("button")
        [i].addEventListener("click", handleClick);
}
function handleClick() {
    var buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);
}

//Detecting button press

document.addEventListener("keydown", function (event) {
    makeSound(event.key);

    buttonAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        case "j":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        case "k":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
        case "l":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        default:
            console.log(buttonInnerHTML);
            break;
    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey).classList.add("pressed");

    setTimeout(function () {
        activeButton.classList.remove("pressed");
}, 100);

// dictionary?
var houseKeeper1 = {
    name: "Raj",
    age: 25,
    experience: 5,
    languages: ["English", "Hindi", "Marathi"],
    getSuitcase: function () {
        alert("May I have your suitcase please?");
    },
};

//constructor function
function HouseKeeper(name, age, experience, languages) {
    this.name = name;
    this.age = age;
    this.experience = experience;
    this.languages = languages;
    this.cleanRoom = function () {
        alert("Cleaning in progress");
    }; //method inside a constructor function
}

//creating objects using constructor function
var houseKeeper2 = new HouseKeeper("Petronela", 52, 30, [
    "Spanish",
    "Romanian",
    "Japanese",
]);
houseKeeper2.cleanRoom();
