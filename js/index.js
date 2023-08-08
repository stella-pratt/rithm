import {menu_btns, mouse_move_updates} from "./global_functions.js";

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
        if (slide.style.transform === "translateX(100%)"){
            slide.classList.remove("artist_slide_faded");
        } else {
            slide.classList.add("artist_slide_faded");
        }
    });
}


// define all variable and constants
let site_pink = "#ff0090"
let site_purple = "#c113f1"
let num_circles = 15
let circ_diameter;
let circ_x;
let circ_y;
let grad_angle;
let grad_percent;
let vh_diameter;
let MAX_CIRCLE_DIAMETER = window.innerWidth/4;
let MIN_CIRCLE_DIAMETER = window.innerWidth/15;
const circles = []
const circle_heights = []
let MAX_SPEED = 5
let MIN_SPEED = 1.1
let SHADOW_MULT = 50


const ARTIST_INFO = {
    tame: ["TAME IMPALA", "Tame Impala (Kevin Parker) has officially released his fourth studio album, The Slow Rush. Featuring the tracks Lost In Yesterday, Borderline & It Might Be Time. The Slow Rush was recorded between Los Angeles and Parker’s studio in his hometown of Fremantle, Australia. The twelve tracks were written, recorded, produced and mixed by Parker. The Slow Rush is Parker’s deep dive into the oceans of time, conjuring the feeling of a lifetime in a lightning bolt, of major milestones whizzing by while you’re looking at your phone, it’s a paean to creation and destruction and the unending cycle of life. In support of The Slow Rush, Tame Impala will tour across North America, Australia & New Zealand, and the UK in the coming months. Thanks to the ravenous demand of fans for a transcendent live performance, Tame Impala has headlined festivals and theatres around the world and released three full length albums - Innerspeaker, Lonerism and Currents. As a writer and producer Parker has collaborated with Travis Scott, SZA, Lady Gaga, Mark Ronson, Kanye West, Kali Uchis, Theophilus London, Miguel, A$AP Rocky and more."],
    weekend: ["THE WEEKND", "The Weeknd took over pop music & culture on his own terms filtering R&B, Pop,& hip-hop through an ambitious widescreen lens. The multi-platinum 3X GRAMMY Award winner has emerged as one of the most successful & significant artists of the modern era. 2012’s 3X platinum Trilogy collated 3 breakout mixtapes—House of Balloons, Thursday & Echoes of Silence—into his 1st chart-topping collection followed by his debut LP Kiss Land in 2013. Two years later, “Earned It (Fifty Shades of Grey)” won “Best R&B Performance” & received an Academy Award nod for “Best Original Song” & 4X Platinum Beauty Behind The Madness won a GRAMMY for “Best Urban Contemporary Album.” In 2018, Starboy won the same award, making him the 1st artist ever to win twice. His 6-track project My Dear Melancholy marked his 3rd consecutive #1 bow on the Billboard Top 200, & “Pray For Me” with Kendrick Lamar was featured in the trailer for the Academy Award winning Marvel film Black Panther. In 2020 the 80’s-nostalgic track Blinding Lights became a worldwide sensation, igniting viral dance challenges across social media, peaking at #1 in 30+ countries & headlining Mercedes Benz EQC campaign. After Hours held the #1 spot on Billboard 200 for 4 consecutive weeks, marking his 4th #1 album & becoming the first to ever rank #1 on the Billboard 200, Hot 100, and Artist 100 simultaneously. After Hours is the #1 R&B streaming album of all time (followed by  at #2)."],
    tv: ["TV GIRL", "TV Girl is an American indie pop band from San Diego, California, consisting of Brad Petering, Jason Wyman, and Wyatt Harmon. As of 2023, the group is now based in Los Angeles. TV Girl's 2012 mixtape The Wild, The Innocent, The TV Shuffle was released and given away for free with an accompanying downloadable coloring book. This mixtape would have been their debut album, but the duo expressed that this work didn't feel official enough to be their first album and felt that the term mixtape was more appropriate. TV Girl's 2014 debut album French Exit was called 'remarkably solid' by Bandwagon Magazine and 'one of the most focused indie-pop albums of the 2010s' by The Daily Targum."],
    arctic: ["ARCTIC MONKEYS", "Arctic Monkeys are an English rock band formed in Sheffield in 2002. The group consists of Alex Turner (lead vocals, guitar, keyboards), Jamie Cook (guitar, keyboards), Nick O'Malley (bass guitar, backing vocals), and Matt Helders (drums, backing vocals). Former band member Andy Nicholson (bass guitar, backing vocals) left the band in 2006 shortly after their debut album was released. Arctic Monkeys were heralded as one of the first bands to come to public attention via the Internet, with commentators suggesting they represented the possibility of a change in the way in which new bands are promoted and marketed. Their debut album, Whatever People Say I Am, That's What I'm Not (2006), became the fastest-selling debut album in UK chart history at the time of its release, and has been hailed as one of the greatest debut albums. It won Best British Album at the 2007 Brit Awards. The band's second album, Favourite Worst Nightmare (2007), was also acclaimed by critics and won Best British Album at the 2008 Brit Awards. They went on to release Humbug (2009) and Suck It and See (2011). The band's wider international fame came with the success of their critically acclaimed fifth album AM (2013), which was supported by the global hit 'Do I Wanna Know?'. It topped four Billboard charts and was certified platinum in the US. At the 2014 Brit Awards, the album became their third to win British Album of the Year. Their sixth album, Tranquility Base Hotel & Casino (2018), was a major departure from the band's previous guitar-heavy work, instead being piano-oriented. It received a Best Alternative Music Album nomination at the 2019 Grammy Awards, their second to do so after Whatever People Say I Am, That's What I'm Not. Their seventh album, The Car, was released in 2022, and received nominations for the Ivor Novello Awards and the Mercury Prize in 2023."],
    hozier: ["HOZIER", "In September 2013, when Irish solo artist Andrew Hozier-Byrne released his debut single - a song called ‘Take Me To Church’ - which he had mostly recorded in the attic of his parent’s house in Wicklow (his father a blues musician, his mother an artist), little did he know about the hurricane-strength surge in public interest that the song would spark, carrying him to international stardom. A full ten years and billions of streams later, Hozier still calls Wicklow home. While his music takes him all over the world, it is Ireland and its people and places, the weather and landscape; where a stream is still something that runs down at the bottom of the garden, that calls him back to where he feels he naturally belongs. The last decade has brought both public and critical acclaim. Multi-platinum album sales, number one records on both sides of the Atlantic, multiple awards including a Grammy-nomination, film and video game soundtracks and countless sold-out live shows all over the world. But as Hozier prepares to release his third album - ‘Unreal Unearth’ - his passion for his art is undimmed, and his curiosity about our world - and all that is good and bad about it - remains undiminished."],
    neighbourhood: ["THE NEIGHBOURHOOD", "The Neighbourhood (also known as 'THE NBHD') is an American rock band formed in Newbury Park, California, in 2011. The band is composed of vocalist Jesse Rutherford, guitarists Jeremy Freedman and Zach Abels, and bassist Mikey Margott. Drummer Brandon Fried was also part of the band from 2014 until 2022. After releasing two EPs, I'm Sorry... and Thank You, the Neighbourhood released its debut album I Love You. in 2013 via Columbia Records. The album was preceded by their 2012 single 'Sweater Weather' - their only single to chart on the Billboard Hot 100, peaking at number 14 in 2013 and re-surging in popularity nearly a decade later on radio airplay and Spotify from becoming a viral phenomenon on TikTok. Lead singer Jesse Rutherford has dabbled with a solo career since 2016, and eventually signed a solo contract with Atlantic Records in March 2023. The band has been called a one-hit wonder for their biggest hit song, 'Sweater Weather'."],
    girl: ["GIRL IN RED", "Marie Ulven Ringheim (born 16 February 1999) is a Norwegian singer-songwriter and record producer, known for her indie pop project Girl in Red (stylized in all lowercase). Her first EPs Chapter 1 (2018) and Chapter 2 (2019) were recorded in her bedroom and feature songs about romance and mental health. Released through AWAL, her debut studio album If I Could Make It Go Quiet (2021) was a critical and commercial success, and won three Norwegian Grammy Awards, including Album of the Year. Girl in Red has been cited as a queer icon by Paper, and \"one of the most astute and exciting singer-songwriters working in the world of guitar music\" by The New York Times.[2] In January 2021, her singles \"I Wanna Be Your Girlfriend\" (2017) and \"We Fell in Love in October\" (2018) were certified gold in the US"],
    florence: ["FLORENCE + THE MACHINE", "Florence and the Machine (styled as Florence + the Machine) are an English indie rock band that formed in London in 2007, consisting of lead vocalist Florence Welch, keyboardist Isabella Summers, guitarist Rob Ackroyd, harpist Tom Monger, and a collaboration of other musicians. The band's music has received acclaim across the media, especially from the BBC, which played a large part in their rise to prominence by promoting Florence and the Machine as part of BBC Music Introducing. At the 2009 Brit Awards they received the Brit Awards \"Critics' Choice\" award. The band's music is renowned for its dramatic, eccentric production and Welch's powerful vocals. Florence and the Machine's sound has been described as a combination of various genres, including rock and soul.[6][7] Lungs (2009) won the Brit Award for Best British Album in 2010. Florence and the Machine have been nominated for six Grammy Awards including Best New Artist and Best Pop Vocal Album. Additionally, the band performed at the 2010 MTV Video Music Awards and the 2010 Nobel Peace Prize Concert."],
    wallows: ["WALLOWS", "Wallows is an American alternative rock[1] band based in Los Angeles composed of Dylan Minnette, Braeden Lemasters, and Cole Preston. The band began releasing songs independently in April 2017 starting with \"Pleaser\", which reached number two on the Spotify Global Viral 50 chart. In 2018, Wallows signed a deal with Atlantic Records and released their major-label debut EP, Spring. The band released their debut studio album, Nothing Happens, in 2019, which featured the single \"Are You Bored Yet?\", followed by their 2020 EP Remote. The band released their second album Tell Me That It's Over in 2022.[2]"],
    mgmt: ["MGMT", "MGMT was formed by Ben Goldwasser and Andrew VanWyngarden in 2001 while students at Wesleyan University. Since their first release, the EP Time To Pretend in 2005, MGMT have released four critically acclaimed albums: Oracular Spectacular (2008), Congratulations (2010), MGMT (2013), and Little Dark Age (2018). In December 2019, the band released the new song “In The Afternoon” followed by “As You Move Through The World” in March 2020. Oracular Spectacular was named album of the year by NME and was one of Rolling Stone’s top 20 albums of the decade, while selling over 2 million copies worldwide and producing the hits “Time To Pretend,” “Electric Feel,” and “Kids”. MGMT have received multiple Grammy Award nominations and have performed at festivals around the world from Glastonbury to Bonnaroo to Fuji Rock; Roskilde to Lollapalooza to Coachella. In 2011, MGMT performed an original piece of music at the Guggenheim Museum in New York City to accompany a retrospective of the artist Maurizio Catalan and in 2012 they performed with the legendary Joshua Light Show at NYU’s Skirball Center. MGMT toured globally throughout 2018 + 2019 in North and South America, Europe, Australia and Japan. Highlights included the Firefly, Mad Cool, Splendour In The Grass, Corona Capital, Just Like Heaven and Summersonic festivals, along with television performances on The Late Show with Stephen Colbert and the outdoor stage at Jimmy Kimmel Live."],
    strokes: ["THE STROKES", ""],
    killers: ["THE KILLERS", ""],
    gizzard: ["KING GIZZARD &amp; THE LIZARD WIZARD", ""],
    talking: ["TALKING HEADS", ""],
    joji: ["JOJI", ""],
    dua: ["DUA LIPA", ""],
    steve: ["STEVE LACY", ""],
    vansire: ["VANSIRE", ""],
    cinema: ["TWO DOOR CINEMA CLUB", ""],
    hotel: ["HOTEL UGLY", ""],
    thundercat: ["THUNDERCAT", ""],
    mac: ["MAC DEMARCO", ""],
    sports: ["SPORTS", ""],
    men: ["MEN I TRUST", ""],
    smiths: ["THE SMITHS", ""],
    ekkstacy: ["EKKSTACY", ""],
}

// dynamically create  carousel
for (let i = 0; i < Object.keys(ARTIST_INFO).length; i++){
    // create text slides
    let slide = document.createElement("div");
    slide.className = "artist_slide";
    slide.innerHTML = Object.values(ARTIST_INFO)[i][0]
    document.querySelector(".artist_container").appendChild(slide)
    // create image slides
    let img_slide = document.createElement("img")
    img_slide.className = "artist_img";
    img_slide.src = "images/artist_imgs/" + Object.keys(ARTIST_INFO)[i] + ".jpg";
    img_slide.alt = "temporary"
    document.querySelector(".image_container").appendChild(img_slide)
    //create artist list
    let artist_name = document.createElement("a");
    artist_name.className = "artist_name";
    artist_name.innerHTML = Object.values(ARTIST_INFO)[i][0];
    document.querySelector(".artist_box").appendChild(artist_name)
    // add slash between artists
    let slash = document.createElement("a");
    slash.className = "slash";
    slash.innerHTML = "/";
    document.querySelector(".artist_box").appendChild(slash);
}

// get hieght after element creation for correct number
let body_height_vh = 100*(document.body.scrollHeight/window.innerHeight)

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
// define menu's gradient angle
document.querySelector(".menu_drop").style.backgroundImage = 'linear-gradient(' + GenerateRandomInt(0, 360) + 'deg, var(--site_purple), var(--site_pink)';


document.addEventListener("scroll", function() {
    // parallax scroll the circles
    for (let i = 0; i < num_circles; i++) {
        circles[i].style.top = circle_heights[i][0] - (100*(window.scrollY/window.innerHeight))*circle_heights[i][1] + "vh";
    }
});





document.addEventListener("mousemove", function(e) {
    shadow_update(e)
    mouse_move_updates(e)
});

function shadow_update(mousemovement) {
    // update the shadows for all circles
    for (let i = 0; i < num_circles; i++) {
        // calculate offset for the width of the circle
        let x_circle= circles[i].offsetLeft + circles[i].offsetWidth/2;
        let y_circle= circles[i].offsetTop + circles[i].offsetHeight/2;
        // take the distances and divide them for small shadows
        let shadowx = (x_circle - mousemovement.clientX)/SHADOW_MULT;
        let shadowy = (y_circle - mousemovement.clientY)/SHADOW_MULT;
        // change the style
        circles[i].style.boxShadow = shadowx+"px "+shadowy+"px 50px var(--bg_black)";
    }
    let menu_circ = document.querySelector(".menu_drop")
    // calculate offset for the width of the circle
    let x_circle= menu_circ.getBoundingClientRect()["x"] + menu_circ.offsetWidth/2; // getBoundingClientRect() returns the position relative to the viewport, better than offsetleft
    let y_circle= menu_circ.offsetTop + menu_circ.offsetHeight/2;
    // take the distances and divide them for small shadows
    let shadowx = (x_circle - mousemovement.clientX)/(SHADOW_MULT*1.6);
    let shadowy = (y_circle - mousemovement.clientY)/(SHADOW_MULT*1.6);
    // change the style

    menu_circ.style.boxShadow = shadowx+"px "+shadowy+"px 50px var(--bg_black)";
}


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

// add a click checker to add buttons to elements
document.addEventListener("click", function(e) {
    if (e.target.className === "artist_name"){
        // opens the menu
        document.querySelector(".fade").style.pointerEvents = "all";
        document.querySelector(".fade").style.opacity = "80%";
        // set width dependent on veritcal or horizontal display
        if(window.innerHeight < window.innerWidth){
            document.querySelector(".artist_pop_out").style.width = "40vw";
        } else {
            document.querySelector(".artist_pop_out").style.width = "100vw";
        }
        //create a list of the artist names
        const artist_slide_checker = [];
        for (let i= 0; i < Object.keys(ARTIST_INFO).length; i++){
            // push the name of the artist
            artist_slide_checker.push(ARTIST_INFO[Object.keys(ARTIST_INFO)[i]][0])
        }

        // set the carousel to the correct slide
        current_slide = artist_slide_checker.indexOf(e.target.innerHTML) - 1;
        change_artist(current_slide);

    } else if (e.target.className === "fade") {
        // close the menu
        document.querySelector(".fade").style.pointerEvents = "none";
        document.querySelector(".fade").style.opacity = "0%";
        document.querySelector(".artist_pop_out").style.width = "0vw";
    } else if (e.target.classList.contains("artist_slide")) {
        // rotate the carousel
        let click_index = e.target.style.transform.replace(/\D/g, '') / 100; // removes all non-numeric characters
        if (click_index < 1){
            current_slide--;
        } else if (click_index > 1){
            current_slide++;
        }
        change_artist(current_slide);
    } else {
        menu_btns(e)
    }
})


// change the pop out width if the window resizes
window.addEventListener("resize", function (){
    // check if menu is already open
    if(document.querySelector(".fade").style.pointerEvents === "all"){
        // set width dependent on veritcal or horizontal display
        if(window.innerHeight < window.innerWidth){
            document.querySelector(".artist_pop_out").style.width = "40vw";
        } else {
            document.querySelector(".artist_pop_out").style.width = "100vw";
        }
    }
    //change height of image container regardless
    document.querySelector(".image_container").style.height = document.querySelector(".artist_img").height + "px"
})

