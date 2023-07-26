
site_pink = "#ff0090"
site_purple = "#c113f1"

// random number gen with min and max parameters
function GenerateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function change_artist(curSlide) {
    //move all the elements to their new location
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - curSlide) * 100}%)`;
        images_slide[index].style.transform = `translateX(${(index - curSlide-1) * 100}%)`;
        // change the look of the words if not the central one
        if (slide.style.transform.replace(/\D/g, '') === "100"){
            slide.classList.remove("artist_slide_faded");
        } else {
            slide.classList.add("artist_slide_faded");
        }
    });
}

// define all variable and constants
num_circles = 15
let circ_diameter;
let circ_x;
let circ_y;
let grad_angle;
let grad_percent;
let vh_diameter;
MAX_CIRCLE_DIAMETER = window.innerWidth/4;
MIN_CIRCLE_DIAMETER = window.innerWidth/15;
const circles = []
const circle_heights = []
MAX_SPEED = 5
MIN_SPEED = 1.1
body_height_vh = 100*(document.body.scrollHeight/window.innerHeight)
const ARTISTS = ["TAME IMPALA", "THE WEEKEND", "TV GIRL", "ARCTIC MONKEYS", "HOZIER", "THE NEIGHBOURHOOD", "GIRL IN RED", "FLORENCE + THE MACHINE", "WALLOWS", "MGMT", "THE STROKES", "THE KILLERS", "KING GIZZARD &amp; THE LIZARD WIZARD", "TALKING HEADS", "JOJI", "DUA LIPA", "STEVE LACY", "VANSIRE", "TWO DOOR CINEMA CLUB", "HOTEL UGLY", "THUNDERCAT", "MAC DEMARCO", "SPORTS", "MEN I TRUST", "THE SMITHS", "EKKSTACY"]


for (let i = 0; i < num_circles; i++) {
    // create all the gradient circles
    // add elements to a list
    circles.push(document.createElement("div"))

    //randomly generate all aspects of the circles
    grad_angle = GenerateRandomInt(0, 360);
    grad_percent = GenerateRandomInt(50, 100);
    circ_diameter = GenerateRandomInt(MIN_CIRCLE_DIAMETER, MAX_CIRCLE_DIAMETER);
    vh_diameter = (100*(circ_diameter/window.innerHeight))
    circ_x = GenerateRandomInt(57, 95);
    circ_y = GenerateRandomInt(0, body_height_vh*2.5+vh_diameter);

    // define element properties
    circles[i].className = "circle_graphic";
    circles[i].style.backgroundImage = 'linear-gradient(' + grad_angle + 'deg, ' + site_purple + ' 0%, ' + site_pink + ' ' + grad_percent + '%)';
    circles[i].style.height = circ_diameter + "px";
    circles[i].style.width = circ_diameter + "px";
    circles[i].style.left = circ_x + "vw";
    circles[i].style.top = circ_y-vh_diameter + "vh";
    // store extra info in another list
    circle_heights.push([circ_y-vh_diameter, Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED]);
    // add element to site
    document.body.insertBefore(circles[i], document.getElementById("first_div"));
}


document.addEventListener("scroll", function() {
    // parallax scroll the circles
    for (let i = 0; i < num_circles; i++) {
        circles[i].style.top = circle_heights[i][0] - (100*(window.scrollY/window.innerHeight))*circle_heights[i][1] + "vh";
    }
});


// add custom cursor
circle = document.querySelector(".mouse_follow")


document.addEventListener("mousemove", function(mousemovement) {
    shadow_update(mousemovement)
    // change cursor to hover style
    if (document.querySelector(".artist_name:hover") || document.querySelector(".artist_slide_faded:hover") != null) {
        circle.classList.add("mouse_follow_hover")
    } else {
        circle.classList.remove("mouse_follow_hover")
    }

    setTimeout(() => {
        // update the circles location with delay for smoothing.
        circle.style.left = mousemovement.clientX - circle.offsetWidth/2 + "px";
        circle.style.top = mousemovement.clientY - circle.offsetHeight/2 + "px";
    }, 20)
});

function shadow_update(mousemovement) {
    // update the shadows for all circles
    for (let i = 0; i < num_circles; i++) {
        // calculate offset for the width of the circle
        x_circle = circles[i].offsetLeft + circles[i].offsetWidth/2;
        y_circle = circles[i].offsetTop + circles[i].offsetHeight/2;
        // take the distances and divide them for small shadows
        shadowx = (x_circle - mousemovement.clientX)/30;
        shadowy = (y_circle - mousemovement.clientY)/30;
        // change the style
        circles[i].style.boxShadow = shadowx+"px "+shadowy+"px 50px var(--bg_black)";
    }
}

// artist pop out
artist_names = document.querySelectorAll(".artist_name")

// collect all slides
const slides = document.querySelectorAll(".artist_slide");
const images_slide = document.querySelectorAll(".artist_img");
let current_slide = 0;
slides.forEach((slide, index) => {
    // transform the slides
    slide.style.transform = `translateX(${index * 100}%)`;
    images_slide[index].style.transform = `translateX(${index*100}%)`
    // change the style of the current name
    if (slide.style.transform.replace(/\D/g, '') / 100 === 1){
        slide.classList.remove("artist_slide_faded")
    } else {
        slide.classList.add("artist_slide_faded")
    }
});

document.addEventListener("click", function(e) {
    if (e.target.className === "artist_name"){
        document.querySelector(".fade").style.pointerEvents = "all";
        document.querySelector(".fade").style.opacity = "80%";
        document.querySelector(".artist_pop_out").style.width = "40vw";
        circle.classList.remove("mouse_follow_hover")
        current_slide = ARTISTS.indexOf(e.target.innerHTML) - 1;
        change_artist(current_slide);


    } else if (e.target.className === "fade") {
        document.querySelector(".fade").style.pointerEvents = "none";
        document.querySelector(".fade").style.opacity = "0%";
        document.querySelector(".artist_pop_out").style.width = "0vw";
    } else if (e.target.classList.contains("artist_slide")) {
        let click_index = e.target.style.transform.replace(/\D/g, '') / 100; // removes all non-numeric characters
        if (click_index < 1){
            current_slide--;
        } else if (click_index > 1){
            current_slide++;
        }
        change_artist(current_slide);
    }
})

//set height of container to same as elements
document.querySelector(".image_container").style.height = document.querySelector(".artist_img").height + "px"

window.onscroll = function() {
    if (document.querySelector(".artist_slide:hover")){
        console.log("working")
    }
};