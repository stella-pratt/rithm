import {menu_btns} from "./global_functions";


// add custom cursor
let circle = document.querySelector(".mouse_follow")


document.addEventListener("mousemove", function(mousemovement) {
    // change cursor to hover style
    if (document.querySelector(".menu_click_detect:hover") || document.querySelector(".menu_dropdown:hover") != null){
        circle.classList.add("mouse_follow_hover2")
    } else {
        circle.classList.remove("mouse_follow_hover2")
    }
    // update the circles location with delay for smoothing.
    setTimeout(() => {
        // update the circles location with delay for smoothing.
        circle.style.left = mousemovement.clientX - circle.offsetWidth/2 + "px";
        circle.style.top = mousemovement.clientY - circle.offsetHeight/2 + "px";
    }, 20)
});


// add a click checker to add buttons to elements
document.addEventListener("click", function(e) {
    menu_btns(e)
})