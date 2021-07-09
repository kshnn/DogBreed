var timer
var delay

async function start() {
    try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await res.json();
        breedlist(data.message)
    } catch (error) {
        console.log("There was some problem")
    }
}
start()

function breedlist(breedlist) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadBreed(this.value)" >
    <option>Select a breed</option>
    ${Object.keys(breedlist).map(function (breed) {
        return `<option>${breed}</option>`
    }).join(' ')}
    </select>`

}

async function loadBreed(breed) {
    if (breed != "Select a breed") {
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await res.json()
        loadImg(data.message)
    }

}

function loadImg(img) {

    var currentpos = 0
    clearInterval(timer)
    clearTimeout(delay)

    if (img.length > 1) {
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image:url('${img[0]}') ;"></div>
    <div class="slide" style="background-image:url('${img[1]}') ;"></div>
    `
        currentpos += 2
        if (img.length == 2) currentpos = 0
        timer = setInterval(nextslide, 3000);
    }
    else {
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image:url('${img[0]}') ;"></div>
    <div class="slide" ></div>
    `

    }

    function nextslide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image:url('${img[currentpos]}') ;"></div>`)

        delay = setTimeout(function () {
            document.querySelector(".slide").remove()
        }, 1000)
        if (currentpos + 1 >= img.length) {
            currentpos = 0

        } else {
            currentpos++
        }
    }

}