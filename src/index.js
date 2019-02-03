import './css/style.styl'

import Project from './js/projects'

// Hot reload
if(module.hot)
{
    module.hot.accept()

    module.hot.dispose(() =>
    {
        console.log('dispose')
    })
}

// Create dom
const $projects = document.querySelectorAll('.js-project')
let index = 0

for(const $project of $projects)
{
    index++
    const project = new Project($project, index)
}



// Canvas
const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')

// Resize
let windowWidth = $canvas.width
let windowHeight = $canvas.height

const resize = () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
}

window.addEventListener('resize',resize)
resize()

// Cursor
const cursor = {}
window.addEventListener(
    'mousemove',
    (_e) =>
    {
        cursor.x = _e.clientX 
        cursor.y = _e.clientY 
    }
)

const createCirlce = () =>
{
    context.beginPath()
    context.arc(cursor.x, cursor.y, 50, 0, Math.PI * 2)
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