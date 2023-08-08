
// add custom cursor
circle = document.querySelector(".mouse_follow")


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
    if (e.target.classList.contains("menu_click_detect")){
        document.querySelector(".nav_icon").classList.toggle("open")
        let drops = document.querySelectorAll(".menu_dropdown")
        drops.forEach((drop) => {
            drop.classList.toggle("open")
        })
    } else if (e.target.classList.contains("menu_dropdown") || e.target.classList.contains("menu_dropdown_img")){
        // using the source from the image inside the dropdown or the image, log the dropdown name
        let new_page = ""
        if (e.target.classList.contains("menu_dropdown_img")){
            // get the button if img clicked
            new_page = e.target.src.split("/").pop().split(".")[0]
        } else if (e.target.classList.contains("menu_dropdown")){
            // get the button if button clicked
            new_page = e.target.querySelector("img").src.split("/").pop().split(".")[0]
        }
        // change the page
        window.location.href = new_page + ".html"
    }
})