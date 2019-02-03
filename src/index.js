import './css/style.styl'

// Hot reload
if(module.hot)
{
    module.hot.accept()

    module.hot.dispose(() =>
    {
        console.log('dispose')
    })
}

// Canvas
const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')
const pos = {}

// Resize
let windowWidth = $canvas.width
let windowHeight = $canvas.height

const resize = () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight

    context.beginPath()      // Commencer un tracé

    context.moveTo(0, 0)   // Placer le tracé
    context.lineTo(windowWidth, 0) // Tracer une ligne
    context.lineTo(windowWidth, windowHeight)  // Tracer autre une ligne
    context.lineTo(0, windowHeight)
    context.closePath()      // Tracer une dernière ligne qui ferme la forme (pas obligatoire)

    context.stroke()         // Faire apparaitre les lignes tracées
}

window.addEventListener('resize',resize)
resize()

const createCirlce = () =>
{
    window.addEventListener(
        'mousemove',
        (e) =>
        {
            pos.x = e.clientX
            pos.y = e.clientY
        }
    )

    context.beginPath()
    context.arc(pos.x, pos.y, 50, 0, Math.PI * 2)
    context.fillStyle = 'black'
    context.fill()
}

// Animation
const loop = () =>
{
    window.requestAnimationFrame(loop) 
    createCirlce()   
}
window.requestAnimationFrame(loop)