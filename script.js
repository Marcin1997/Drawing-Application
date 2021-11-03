
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let size = 10;
let eraserSize = 20;
let isPressed = false
let eraserPressed = false;
let color = 'black'
let eraserColor = 'white'
let x
let y
let x4
let y4

let eraserClicked = false;
let brushPaintClicked = false

function isPaintOn(e) {
    canvas.addEventListener('mousedown', (e) => {
        isPressed = true
        eraserPressed = null
        x = e.offsetX
        y = e.offsetY


    })
    canvas.addEventListener('mouseup', (e) => {
        isPressed = false
        eraserPressed = null
        x = undefined
        y = undefined


    })
    canvas.addEventListener('mousemove', (e) => {
        if (isPressed) {
            const x2 = e.offsetX
            const y2 = e.offsetY

            drawCircle(x2, y2)
            drawLine(x, y, x2, y2)

            x = x2
            y = y2
            eraserPressed = false
        }


    }
    )
    function drawCircle(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color
        ctx.fill()

    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = color
        ctx.lineWidth = size * 2
        ctx.stroke()

    }

}

function isEraserOn(e) {
    canvas.addEventListener('mousedown', (e) => {
        eraserPressed = true
        isPressed = null
        x4 = e.offsetX
        y4 = e.offsetY


    })
    canvas.addEventListener('mouseup', (e) => {
        eraserPressed = false
        isPressed = null
        x4 = undefined
        y4 = undefined


    })


    canvas.addEventListener('mousemove', (e) => {
        if (eraserPressed) {

            const x3 = e.offsetX
            const y3 = e.offsetY
            drawCircleErase(x3, y3)
            drawLineEraser(x4, y4, x3, y3)
            x4 = x3
            y4 = y3

        }
    })
    function drawCircleErase(x4, y4) {
        ctx.beginPath();
        ctx.arc(x4, y4, eraserSize, 0, Math.PI * 2);
        ctx.fillStyle = color
        ctx.fill()

    }

    function drawLineEraser(x1, y1, x2, y2) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = color
        ctx.lineWidth = eraserSize * 2
        ctx.stroke()
    }


}


const sizeNumber = document.getElementById('size')

sizeNumber.innerHTML = size

const decrease = document.getElementById('decrease')
const increase = document.getElementById('increase')
const colorPick = document.getElementById('color')
const clearElements = document.getElementById('clear')




colorPick.addEventListener('change', (e) => {
    color = e.target.value
    brushPaint.classList.add('brushClass')

})

increase.addEventListener('click', (e) => {

    if (size > 9) {
        size += 5
    }

    if (size <= 10) {
        size += 1
    }
    if (size > 50) {
        size = 50
    }

    sizeNumber.innerHTML = size
})
decrease.addEventListener('click', (e) => {

    if (size > 10) {
        size -= 5
    }

    if (size <= 10) {
        size -= 1
    }
    if (size < 1) {
        size = 1
    }
    sizeNumber.innerHTML = size
})

clearElements.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

})


const eraser = document.getElementById('eraser')
const decEra = document.getElementById('decreaseEraser')
const incEra = document.getElementById('increaseEraser')
const sizeEraser = document.getElementById('sizeEraser')


eraser.addEventListener('click', (e) => {
    brushPaint.classList.remove('brushClass')
    color = 'white'
    brushPaintClicked = false;
    eraser.classList.add('eraserClass')
    document.body.style.cursor = 'cell'


    eraserClicked = true;
    if (eraserClicked) {
        isEraserOn()
    }
})


incEra.addEventListener('click', (e) => {
    eraserSize += 5;

    if (eraserSize > 50) {
        eraserSize = 50
    }
    sizeEraser.innerHTML = eraserSize
})

decEra.addEventListener('click', (e) => {
    eraserSize -= 5;

    if (eraserSize < 5) {
        eraserSize = 5
    }
    sizeEraser.innerHTML = eraserSize
})

const brushPaint = document.getElementById('brush')
brushPaint.addEventListener('click', (e) => {
    eraserClicked = false;
    eraser.classList.remove('eraserClass')

    color = colorPick.value
    brushPaintClicked = true

    document.body.style.cursor = 'auto'
    brushPaint.classList.add('brushClass')
    if (brushPaintClicked) {
        isPaintOn()
    }
})

const backgroundColorSelect = document.getElementById('background-change')
backgroundColorSelect.addEventListener('change', () => {
    ctx.fillStyle = `${backgroundColorSelect.value}`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
})

/* DOWNLOAD BUTTON FUNCTIONALITY */

const downloadImageButton = document.getElementById('download')
function downloadImage() {
    var canvas = document.getElementById("canvas");
    image = canvas.toDataURL("image/png")
    var link = document.createElement('a');
    link.download = "drawing.png";
    link.href = image;
    link.click();
}

downloadImageButton.addEventListener('click', () => {
    downloadImage()
})

