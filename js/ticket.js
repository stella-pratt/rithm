import {menu_btns, mouse_move_updates, mouse_window} from "./global_functions.js";

let seat_hover = document.querySelector(".seat_hover");
let cursor = document.querySelector(".mouse_follow");
let SPACE_ROWS = 12;
let PRICES = {"1": 100, "2": 100, "3": 100, "4": 90, "5": 90, "6": 90, "7": 80, "8": 80, "9": 80};

// define row names
const rows = ['just to make "A" have an index of 1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ']


function mySplice(num_remove, array_remove) {
    // remove the elements from the array if they are in it
    if (array_remove.includes(num_remove)){
        array_remove.splice(array_remove.indexOf(num_remove), 1);
    }
    return array_remove;
}


document.addEventListener("mousemove", function(e) {
    mouse_move_updates(e)
    // add delay because mouse follow function has delay
    setTimeout(()=>{
        // make seat hover follow cursor
        const cursor_info = cursor.getBoundingClientRect();
        seat_hover.style.left = cursor_info["left"] + (cursor_info["width"]/2) + "px";
        seat_hover.style.top = cursor_info["top"]+(cursor_info["height"]/2) + "px";
    }, 20)
    // show the popup
    if (document.querySelector(".seat:hover") != null){
        document.querySelector(".seat_hover").classList.add("seatpop_show");
        // get row
        let row_num = (e.target.style.gridRow.replace(/\D/g, ''));
        //change the elements to current hover
        seat_hover.children[0].children[1].innerHTML = e.target.style.gridColumn.replace(/\D/g, '')
        seat_hover.children[1].children[1].innerHTML = rows[row_num];
        let seat_section = e.target.parentElement.classList;
        if (seat_section.contains("space")){
            seat_hover.children[3].children[1].innerHTML = "Accessible";
        } else if (seat_section.contains("standard")){
            seat_hover.children[3].children[1].innerHTML = "Standard";
        }
        let sections = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        // keep 3 sections based on sect
        if (seat_section.contains("sect1")){
            sections = sections.splice(0,3);
        } else if (seat_section.contains("sect2")){
            sections = sections.splice(3,3);
        } else if (seat_section.contains("sect3")){
            sections = sections.splice(6,3);
        }
        // remove the sections that seat cannot be in
        if (seat_section.contains("standard")){
            sections = mySplice("1", sections);
            sections = mySplice("3", sections);
            sections = mySplice("4", sections);
            sections = mySplice("6", sections);
            sections = mySplice("7", sections);
            sections = mySplice("9", sections);
        } else {
            // if accessible seat
            sections = mySplice("2", sections);
            sections = mySplice("5", sections);
            sections = mySplice("8", sections);
            if (seat_section.contains("left_space")){
                // remove right sections
                sections = mySplice("3", sections);
                sections = mySplice("6", sections);
                sections = mySplice("9", sections);
            } else if (seat_section.contains("right_space")){
                // remove left sections
                sections = mySplice("1", sections);
                sections = mySplice("4", sections);
                sections = mySplice("7", sections);
            }
        }
        seat_hover.children[2].children[1].innerHTML = sections[0];
        seat_hover.children[4].children[1].innerHTML = "$" + PRICES[sections[0]];

    } else {
         document.querySelector(".seat_hover").classList.remove("seatpop_show");
    }
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
    for (let r = 0; r < SPACE_ROWS; r++) { // repeat for rows
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