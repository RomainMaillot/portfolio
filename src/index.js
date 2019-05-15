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
const $main = document.querySelector('main')
let index = 0, load = false

window.addEventListener(
    'load',
    () =>
    {
        load = true
    }
)

for(const $project of $projects)
{
    index++
    const project = new Project($project, index)
}

// Canvas
const $header = document.querySelector('header')
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


// for(const $img of $imgs)
// {
//     rect.push($img.getBoundingClientRect())
// }

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

// const createCirlce = () =>
// {
//     context.clearRect(0,0,$canvas.width,$canvas.height)
//     context.beginPath()
//     context.arc(cursor.x, cursor.y, 25, 0, Math.PI * 2)
//     context.strokeStyle = 'black'
//     context.stroke()
// }

let posX = 0, posY = 0, arc1 = 0, arc2 = 1*Math.PI, arc3 = 0.5 * Math.PI, arc4 = 1.5 * Math.PI, radius = 0,end = false, circleWidth = $canvas.width*20/100
const $content = document.querySelector('.content')
const $aside = document.querySelector('.aside')
const $body = document.querySelector('body')

const moveCircle = () =>
{
    context.clearRect(0,0,$canvas.width,$canvas.height)
    context.beginPath()
    // context.arc(cursor.x, cursor.y, 25, 0, Math.PI * 2)
    context.arc($canvas.width/2, $canvas.height/2, circleWidth, arc1, arc1 * 1.1)
    context.strokeStyle = 'black'
    context.stroke()
    context.beginPath()
    context.arc($canvas.width/2, $canvas.height/2, circleWidth - 20, arc2, arc2 * 1.2)
    context.strokeStyle = 'purple'
    context.stroke()
    context.beginPath()
    context.arc($canvas.width/2, $canvas.height/2, circleWidth - 50, arc3, arc3 * 1.3)
    context.strokeStyle = 'black'
    context.stroke()
    context.beginPath()
    context.arc($canvas.width/2, $canvas.height/2, circleWidth - 80, arc4, arc4 * 1.4)
    context.strokeStyle = 'purple'
    context.stroke()
    context.beginPath()
    context.arc($canvas.width/2, $canvas.height/2, circleWidth - 110, arc2 / 0.8, arc2 * 1.5)
    context.strokeStyle = 'black'
    context.stroke()
    arc1 += 0.02
    arc2 += 0.01
    arc3 += 0.015
    arc4 += 0.006
    if (load == true) 
    {
        end = true
        context.beginPath()
        context.arc($canvas.width/2, $canvas.height/2, radius, 0, Math.PI * 2)
        context.fillStyle = 'white'
        context.fill()
    }
    if(end == true && radius <= circleWidth)
    {
        radius += 3
    }
    if (radius > circleWidth) 
    {
        $content.classList.add('appear')
        $aside.classList.add('appear')
        $body.classList.add('appear')
    }
    // $imgs[2].addEventListener(
    //     'load',
    //     () =>
    //     {
    //         console.log($imgs)
    //     }
    // )
}
moveCircle()

// Animation
const loop = () =>
{
    moveCircle()
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
        const $contact = document.querySelector('#contact')
        const $contactMenu = document.querySelector('.contact')
        const $aboutMenu = document.querySelector('.about')
        const workTop = $work.getBoundingClientRect().top - 500
        const contactTop = $contact.getBoundingClientRect().top - 1000

        if (contactTop < 0)
        {
            resetActive()
            $contactMenu.classList.add('active')
        }
        else if(workTop < 0)
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

// Toggle case study
const $caseToggles = document.querySelectorAll('.caselink')
const $caseStudy = document.querySelector('.casestudy')
const $close = document.querySelector('.close')

for(const $caseToggle of $caseToggles)
{
    $caseToggle.addEventListener(
        'click',
        (_e) =>
        {
            _e.preventDefault()
            openCase()
        }
    )
}

$close.addEventListener(
    'click',
    () =>
    {
        openCase()
    }
)

// Toggle case study function
const openCase = () =>
{
    $caseStudy.classList.toggle('open')
}