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
let rect = []


for(const $img of $imgs)
{
    rect.push($img.getBoundingClientRect())
}

window.addEventListener(
    'mousemove',
    (_e) =>
    {
        cursor.x = _e.clientX 
        cursor.y = _e.clientY 
        
        // $mouse.style.top = `${cursor.y - 25}px`
        // $mouse.style.left = `${cursor.x - 25}px`

        // if (cursor.x < rect[0].right && cursor.x > rect[0].left && cursor.y > rect[0].top && cursor.y < rect[0].bottom) 
        // {
        //     $mouse.classList.add('hover')
        // }
    }
)


const createCirlce = () =>
{
    context.clearRect(0,0,$canvas.width,$canvas.height)
    context.beginPath()
    context.arc(cursor.x, cursor.y, 25, 0, Math.PI * 2)
    context.strokeStyle = 'black'
    context.stroke()
}

// Animation
const loop = () =>
{
    createCirlce()

    window.requestAnimationFrame(loop) 
}
window.requestAnimationFrame(loop)

// // Mouse animation
// const mouseAnimation = ($item) =>
// {
//     $item.addEventListener(
//         'mouseenter',
//         () =>
//         {
//             $mouse.classList.toggle('hover')
//         }
//     )
//     $item.addEventListener(
//         'mouseleave',
//         () =>
//         {
//             $mouse.classList.toggle('hover')
//         }
//     )
// }

// Hover
const $nav = document.querySelectorAll('.aside li')


// for(const $item of $nav)
// {
//     mouseAnimation($item)
// }

// Reset active
const resetActive = () =>
{
    let $actives = document.querySelectorAll('.active')
    for(const $active of $actives)
    {
        $active.classList.remove('active')
    }
}

// Aside active
window.addEventListener(
    'scroll',
    (_e) =>
    {
        const $work = document.querySelector('#work')
        const $workMenu = document.querySelector('.work')
        const $aboutMenu = document.querySelector('.about')
        const top = $work.getBoundingClientRect().top - 500

        if(top < 0)
        {
            resetActive()
            $workMenu.classList.add('active')
        }
        else
        {
            resetActive()
            $aboutMenu.classList.add('active')
        }
    }
)