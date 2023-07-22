
site_pink = "#ff0090"
site_purple = "#c113f1"

function GenerateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}




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



for (let i = 0; i < num_circles; i++) {
    circles.push(document.createElement("div"))


    grad_angle = GenerateRandomInt(0, 360);
    grad_percent = GenerateRandomInt(50, 100);
    circ_diameter = GenerateRandomInt(MIN_CIRCLE_DIAMETER, MAX_CIRCLE_DIAMETER);
    vh_diameter = (100*(circ_diameter/window.innerHeight))
    circ_x = GenerateRandomInt(57, 95);
    circ_y = GenerateRandomInt(0, body_height_vh*2.5+vh_diameter);

    circles[i].className = "circle_graphic";
    circles[i].style.backgroundImage = 'linear-gradient(' + grad_angle + 'deg, ' + site_purple + ' 0%, ' + site_pink + ' ' + grad_percent + '%)';
    circles[i].style.height = circ_diameter + "px";
    circles[i].style.width = circ_diameter + "px";
    circles[i].style.left = circ_x + "vw";
    circles[i].style.top = circ_y-vh_diameter + "vh";
    circle_heights.push([circ_y-vh_diameter, Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED]);

    document.body.insertBefore(circles[i], document.getElementById("first_div"));


}
document.addEventListener("scroll", function() {
    for (let i = 0; i < num_circles; i++) {
        circles[i].style.top = circle_heights[i][0] - (100*(window.scrollY/window.innerHeight))*circle_heights[i][1] + "vh";
    }
});

circle = document.querySelector(".mouse_follow")


document.addEventListener("mousemove", function(mousemovement) {
    shadow_update(mousemovement)
    if (document.querySelector(".artist_name:hover") != null) {
        circle.classList.add("mouse_follow_hover")
    } else {
        circle.classList.remove("mouse_follow_hover")
    }

    setTimeout(() => {
        circle.style.left = mousemovement.clientX - circle.offsetWidth/2 + "px";
        circle.style.top = mousemovement.clientY - circle.offsetHeight/2 + "px";
    }, 20)
});

function shadow_update(mousemovement) {
        for (let i = 0; i < num_circles; i++) {
        x_circle = circles[i].offsetLeft + circles[i].offsetWidth/2;
        y_circle = circles[i].offsetTop + circles[i].offsetHeight/2;
        shadowx = (x_circle - mousemovement.clientX)/30;
        shadowy = (y_circle - mousemovement.clientY)/30;

        circles[i].style.boxShadow = shadowx+"px "+shadowy+"px 50px var(--bg_black)";
    }
}



