function selectImage(objectSelected) {
    if (objectSelected == "animal") {
        pic = furniture
        objectDetector.detect(pic, gotResult)

    }
    else if (objectSelected == "vehicles") {
        pic = car
        objectDetector.detect(pic, gotResult)

    }
    else if (objectSelected == "food") {
        pic = food
        objectDetector.detect(pic, gotResult)

    }
}
car = ""
furniture = ""
pic = ""

function preload() {
    pic = loadImage("car.jpg")
    furniture = loadImage("furniture.png")
    food = loadImage("food.avif")
    car = loadImage("car.jpg")
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()

    objectDetector = ml5.objectDetector("cocossd", modelLoaded)

}
status=""
object=[]
function draw() {
    image(pic, 0, 0, 600, 500)

    if (status) {
        for (i = 0; i < object.length; i++) {
            fill("red")
            percent=floor(object[i].confidence*100)+"%"
            text(object[i].label +" "+percent, object[i].x +10, object[i].y +10)
            noFill()
            stroke("red")
            rect(object[i].x, object[i].y, object[i].width, object[i].height)

        }
    }
}


function modelLoaded() {
    console.log("model Loaded");
    objectDetector.detect(pic, gotResult)
    status = true
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        object = result

    }
}