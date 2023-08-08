import {menu_btns, mouse_move_updates} from "./global_functions.js";

document.addEventListener("mousemove", function(e) {
    //
    mouse_move_updates(e)
});

// add a click checker to add buttons to elements
document.addEventListener("click", function(e) {
    menu_btns(e)
})