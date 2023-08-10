import {menu_btns, mouse_move_updates, mouse_window} from "./global_functions.js";

document.addEventListener("mousemove", function(e) {
    mouse_move_updates(e)
});

// add a click checker to add buttons to elements
document.addEventListener("click", function(e) {
    menu_btns(e)
})

document.addEventListener("mouseleave", function () {
    mouse_window("leave");
})
document.addEventListener("mouseenter", function () {
    mouse_window("enter");
})


const space = document.querySelectorAll(".space")
const space_section = []
space.forEach((spacey, index) => {
    space_section.push([])
    // fill the grid with circles
    for (let r = 0; r < 12; r++) { // repeat for 14 rows
        for (let c = 0; c < 17; c++) { // repeat for 20 columns
            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.style.gridRow = (r + 1).toString();
            seat.style.gridColumn = (c + 1).toString();
            console.log(seat.style.gridRow)
            console.log(seat.style.gridColumn)
            spacey.appendChild(seat);
        }
    }
})