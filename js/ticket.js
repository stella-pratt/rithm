import {menu_btns, mouse_move_updates, mouse_window} from "./global_functions.js";
let seat_hover = document.querySelector(".seat_hover")
let cursor = document.querySelector(".mouse_follow");

document.addEventListener("mousemove", function(e) {
    mouse_move_updates(e)
    // add delay because mouse follow function has delay
    setTimeout(()=>{
        // make seat hover follow cursor
        const cursor_info = cursor.getBoundingClientRect();
        seat_hover.style.left = cursor_info["left"] + (cursor_info["width"]/2) + "px";
        seat_hover.style.top = cursor_info["top"]+(cursor_info["height"]/2) + "px";
    }, 20)
});

document.addEventListener("mouseleave", function () {
    mouse_window("leave");
})
document.addEventListener("mouseenter", function () {
    mouse_window("enter");
})

function center_section(section) {
    /*
    Take final distance to container edge and subtract initial distance to container edge
    do this for both top and left
    divide by 500 for 500ms
    add the initial distance to the container edge back for current distance to container edge
    have a loop that increases a variable by the current distance to container edge divided by 500
    */
    // reset the centering of the stage container
    stage_container.style.top = "0";
    stage_container.style.left = "0";
    // get distance from section to edge of .right_side
    let section_top = (parent_stage.getBoundingClientRect()["height"] - section.getBoundingClientRect()["height"])/2;
    let section_left = (parent_stage.getBoundingClientRect()["width"] - section.getBoundingClientRect()["width"])/2;
    // get distances to edge of stage container
    let stage_top = (section.getBoundingClientRect()["top"]-stage_container.getBoundingClientRect()["top"]);
    let stage_left = (section.getBoundingClientRect()["left"]-stage_container.getBoundingClientRect()["left"]);
    // transform the stage container to the new centered position
    stage_container.style.transform = `translate(${section_left - stage_left + "px"}, ${section_top - stage_top + "px"})`;
}

// center the stage container using top and left
let stage_container = document.querySelector(".stage_container");
let parent_stage = document.querySelector(".right_side");
// save for reuse later
let default_stage_top = (parent_stage.getBoundingClientRect()["height"] - stage_container.getBoundingClientRect()["height"])/2 + "px";
let default_stage_left = (parent_stage.getBoundingClientRect()["width"] - stage_container.getBoundingClientRect()["width"])/2 + "px";
stage_container.style.top = default_stage_top;
stage_container.style.left = default_stage_left;

// add a click checker to add buttons to elements
document.addEventListener("click", function(e) {
    menu_btns(e) // check if menu buttons clicked
    if (e.target.classList.contains("space")){
        // when stage area clicked
        let section = e.target;
        const seats = section.querySelectorAll(".seat");
        // fade section
        section.style.background = "var(--bg_black)";
        // show seats
        seats.forEach((seat) => {seat.classList.add("seat_show");})
        // zoom and center section
        stage_container.style.width = "175%";
        center_section(section)
    }
})



const space = document.querySelectorAll(".space")
space.forEach((spacey) => {
    // fill the grid with circles
    for (let r = 0; r < 12; r++) { // repeat for rows
        for (let c = 0; c < 10; c++) { // repeat for columns
            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.style.gridRow = (r + 1).toString();
            seat.style.gridColumn = (c + 1).toString();
            spacey.appendChild(seat);
        }
    }
});

// create seat pop-ups

const seat_parent = document.querySelectorAll(".seat");
seat_parent.forEach((seat) => {
    let pop = document.createElement("div");
    pop.classList.add("pop");
    pop.innerHTML = "yay";
    seat.appendChild(pop);
});