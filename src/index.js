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

const $imgs = document.querySelectorAll('.img')


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
const $mouse = document.querySelector('.mouse')
let mouseIsHover = false

window.addEventListener(
    'mousemove',
    (_e) =>
    {
        cursor.x = _e.clientX 
        cursor.y = _e.clientY 

        $mouse.style.top = `${cursor.y - 25}px`
        $mouse.style.left = `${cursor.x - 25}px`

        for(const $img of $imgs)
        {
            let rect = $img.getBoundingClientRect()
            if (cursor.x < rect.right && cursor.x > rect.left && cursor.y > rect.top && cursor.y < rect.bottom) 
            {
                $mouse.classList.toggle('hover')
            }
        }
    }
)


const createCirlce = () =>
{
    context.beginPath()
    context.arc(cursor.x, cursor.y, 50, 0, Math.PI * 2)
    context.strokeStyle = 'black'
    context.stroke()
}

// Animation
const loop = () =>
{
    window.requestAnimationFrame(loop) 
    createCirlce()
}
window.requestAnimationFrame(loop)

// Mouse animation
const mouseAnimation = ($item) =>
{
    $item.addEventListener(
        'mouseenter',
        () =>
        {
            $mouse.classList.toggle('hover')
        }
    )
    $item.addEventListener(
        'mouseleave',
        () =>
        {
            $mouse.classList.toggle('hover')
        }
    )
}

// Hover
const $nav = document.querySelectorAll('.aside li')


for(const $item of $nav)
{
    mouseAnimation($item)
}