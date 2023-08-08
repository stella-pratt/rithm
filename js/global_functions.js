export function menu_btns(e) {
    if (e.target.classList.contains("menu_click_detect")){
        // if the menu button is clicked, toggle the menu
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
}
