/* jshint browser: true */
/* globals $: false */

//Array for objects in game
var options = ['triangle', 'circle;', 'square'];
//Multidimensional array for object names, icons and text
var optionsAndValues = [
    ['triangle', '&#9651;', 'Three'],
    ['circle', '&#9711;', 'One'],
    ['square', '&#9723;', 'Four']
];
//Array for correct order of objects
var answers = ['circle', 'triangle', 'square'];

//Button for submitting answers
var submitButton = $("#submitButton");
submitButton.click(checkAnswer);

$(document).ready(function () {

    //Shuffles objects array when page is loaded
    shuffle(optionsAndValues);

    //Creates objects when page is loaded
    for (x in optionsAndValues) {
        options[x] = optionsAndValues[x][0];
        $(".drag_box_main").append('<div ondrop="drop(event)" ondragover="allowDrop(event)" class="drag_box_c"><div id="box_' + optionsAndValues[x][0] + '" draggable="true" ondragstart="drag(event)" class="drag_box"><div class="drag_box_icon"><div class="icon icon_' + optionsAndValues[x][0] + '">' + optionsAndValues[x][1] + '</div></div><div class="drag_box_text">' + optionsAndValues[x][2] + '</div><div class="drag_box_feedback drag_box_feedback_' + optionsAndValues[x][0] + '"></div></div></div>');
    }
});

/*
Fisher-Yates shuffle algorithm
https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
Shuffles array in place.
@param {Array} a items An array containing the items.
*/
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    //Gets value of dragged object to be transfered
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    //Dragged object
    var origin = document.getElementById(ev.dataTransfer.getData("text"));

    //Parent of dragged object
    var originParent = origin.parentNode;

    //Drop target object
    var target = ev.currentTarget.firstElementChild;

    //Index values of swapped objects
    var oldValueIndex = options.indexOf(origin.getAttribute('id').replace("box_", ""));
    var newValueIndex = options.indexOf(target.getAttribute('id').replace("box_", ""));

    //console.log(origin);
    //console.log(target);

    //Resets animations for swapped objects
    origin.setAttribute('data-aos', '');
    origin.classList.remove('aos-init');
    origin.classList.remove('aos-animate');
    origin.setAttribute('data-aos', 'flip-up');

    target.setAttribute('data-aos', '');
    target.classList.remove('aos-init');
    target.classList.remove('aos-animate');
    target.setAttribute('data-aos', 'flip-up');

    //Swap origin and target objects
    ev.currentTarget.replaceChild(origin, target);
    originParent.appendChild(target);

    //Swap elements in array
    var temp = options[oldValueIndex];
    options[oldValueIndex] = options[newValueIndex];
    options[newValueIndex] = temp;

}

function checkAnswer() {
    //console.log(options);
    //console.log(answers);

    //Displays feedback boxes
    $(".draganddrop_c ").css("width", "65%");
    $(".drag_box_icon").css("width", "15%");
    $(".drag_box_text").css("width", "65%");
    $(".drag_box_feedback").css("display", "flex");


    if (options.toString() !== answers.toString()) {
        //Checks which answers match and change feedback to ticks, if it doesn't, change feedback to crosses
        for (x in options) {
            let currentBox = $(".drag_box_feedback_" + options[x]);
            if (options[x] == answers[x]) {
                currentBox.html('<i class="fas fa-check"></i>');
            } else {
                currentBox.html('<i class="fas fa-times"></i>');
            }
        }
    } else {
        for (x in options) {

            //If all answers match, change all feedback to ticks
            let currentBox = $(".drag_box_feedback_" + options[x]);
            currentBox.html('<i class="fas fa-check"></i>');
            submitButton.off("click").html("Correct!").css("cursor", "default").attr("disabled", "disabled");

            //Disable button
            submitButton.hover(function () {
                $(this).css("background-color", "white");
            }, function () {
                $(this).css("background-color", "white");
            });
        }

        //Disable dragging
        $(".drag_box").removeAttr("draggable");
        $(".drag_box").css("cursor", "default");
        $(".drag_box").css("-webkit-user-select", "none");
        $(".drag_box").css("-moz-user-select", "none");
        $(".drag_box").css("user-select", "none");

    }
}
