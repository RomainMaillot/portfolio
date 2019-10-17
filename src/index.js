import './css/style.styl'

import Project from './js/projects'
import * as data from './js/infos.json'

import {Curtains} from 'curtainsjs'

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
const $body = document.querySelector('body')
const $imgs = document.querySelectorAll('img')
const imgsLoad = []
let index = 0, load = false

// Check if all images are load
for (const $img of $imgs) {
    $img.addEventListener('load',() => {
        imgsLoad.push($img)
        if ((imgsLoad.length + 1) === $imgs.length) {
            createShaders()
        }
    })
}

window.addEventListener(
    'load',
    () =>
    {
        load = true
        window.scrollTo(0, 0);
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

let posX = 0, posY = 0, arc1 = 0, arc2 = 1*Math.PI, arc3 = 0.5 * Math.PI, arc4 = 1.5 * Math.PI, radius = 0,end = false, circleWidth = $canvas.width*20/100, ratio = $canvas.width/50
const $content = document.querySelector('.content')
const $aside = document.querySelector('.aside')
console.log(ratio)

const moveCircle = () =>
{
    context.clearRect(0,0,$canvas.width,$canvas.height)
    context.beginPath()
    // context.arc(cursor.x, cursor.y, 25, 0, Math.PI * 2)
    context.arc($canvas.width/2, $canvas.height/2, circleWidth, arc1, arc1 * 1.1)
    context.strokeStyle = 'black'
    context.stroke()
    context.beginPath()
    context.arc($canvas.width/2, $canvas.height/2, circleWidth - ratio, arc2, arc2 * 1.2)
    context.strokeStyle = 'purple'
    context.stroke()
    context.beginPath()
    context.arc($canvas.width/2, $canvas.height/2, circleWidth - (ratio*2), arc3, arc3 * 1.3)
    context.strokeStyle = 'black'
    context.stroke()
    context.beginPath()
    context.arc($canvas.width/2, $canvas.height/2, circleWidth - (ratio*3), arc4, arc4 * 1.4)
    context.strokeStyle = 'purple'
    context.stroke()
    context.beginPath()
    context.arc($canvas.width/2, $canvas.height/2, circleWidth - (ratio*4), arc2 / 0.8, arc2 * 1.5)
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
const $projectIdea = document.querySelector('.project_idea')
const $techno = document.querySelector('.techno')
const $job = document.querySelector('.job')
const $description = document.querySelector('.description')
const $link = document.querySelector('.project_link')
const titles = []

for(const $caseToggle of $caseToggles)
{
    if(!titles.includes($caseToggle.getAttribute('infos')))
    {
        titles.push($caseToggle.getAttribute('infos'))
    }
    $caseToggle.addEventListener(
        'click',
        (_e) =>
        {
            _e.preventDefault()
            openCase()
            for(let i = 0;i < data.datas.length;i++)
            {
                if($caseToggle.getAttribute('infos') == titles[i])
                {
                    $projectIdea.innerHTML = data.datas[i].project
                    $techno.innerHTML = data.datas[i].techno
                    $job.innerHTML = data.datas[i].job
                    $description.innerHTML = data.datas[i].description
                    $link.setAttribute('href', data.datas[i].link)
                }
            }
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

// wait for everything to be ready (images) and make some curtains
const createShaders = () => {
    // track the mouse positions to send it to the shaders
    let mousePosition = {
        x: 0,
        y: 0,
    };
    // we will keep track of the last position in order to calculate the movement strength/delta
    let mouseLastPosition = {
        x: 0,
        y: 0,
    };
    let mouseDelta = 0

    // set up our WebGL context and append the canvas to our wrapper
    let curtains = new Curtains({
        container: "canvas"
    })

    // get our plane element
    let planeElements = document.querySelectorAll(".img")
    let planesCurtains = []

    // could be useful to get pixel ratio
    let pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1.0

    // set our initial parameters (basic uniforms)
    let params = {
        vertexShaderID: "plane-vs", // our vertex shader ID
        fragmentShaderID: "plane-fs", // our fragment shader ID
        widthSegments: 20,
        heightSegments: 20,
        uniforms: {
            resolution: { // resolution of our plane
                name: "uResolution",
                type: "2f", // notice this is an length 2 array of floats
                value: [2.0, 2.0],
            },
            time: { // time uniform that will be updated at each draw call
                name: "uTime",
                type: "1f",
                value: 0,
            },
            mousePosition: { // our mouse position
                name: "uMousePosition",
                type: "2f", // again an array of floats
                value: [1.0, 1.0],
            },
            mouseMoveStrength: { // the mouse move strength
                name: "uMouseMoveStrength",
                type: "1f",
                value: 0,
            }
        },
    }

    // create our plane
    // let plane = curtains.addPlane(planeElement, params)

    // create our planes
    planeElements.forEach((plane, index) => {
        planesCurtains.push(curtains.addPlane(plane, params))

        // if our plane has been successfully created
        if(planesCurtains[index]) {
            planesCurtains[index].onReady(function() {
                // set a fov of 35 to exagerate perspective
                planesCurtains[index].setPerspective(35);
        
                // now that our plane is ready we can listen to mouse move event
                var wrapper = document.querySelector("main")
        
                wrapper.addEventListener("mousemove", function(e) {
                    handleMovement(e, planesCurtains[index]);
                });
        
                wrapper.addEventListener("touchmove", function(e) {
                    handleMovement(e, planesCurtains[index]);
                });
        
                // on resize, update the resolution uniform
                window.addEventListener("resize", function() {
                    planesCurtains[index].uniforms.resolution.value = [pixelRatio * planeElements[0].clientWidth, pixelRatio * planeElements[0].clientHeight];
                });
        
            }).onRender(function() {
                // use the onRender method of our plane fired at each requestAnimationFrame call
                planesCurtains[index].uniforms.time.value++; // update our time uniform value

                // send the new mouse move strength value
                planesCurtains[index].uniforms.mouseMoveStrength.value = mouseDelta

                // decrease the mouse move strenght a bit : if the user doesn't move the mouse, effect will fade away
                mouseDelta = Math.max(0, mouseDelta * 0.995)
                planesCurtains[index].updatePosition()
            })
        }
    })
    // handle the mouse move event
    function handleMovement(e, plane) {

        if(mousePosition.x != -100000 && mousePosition.y != -100000) {
            // if mouse position is defined, set mouse last position
            mouseLastPosition.x = mousePosition.x;
            mouseLastPosition.y = mousePosition.y;
        }

        // touch event
        if(e.targetTouches) {

            mousePosition.x = e.targetTouches[0].clientX;
            mousePosition.y = e.targetTouches[0].clientY;
        }
        // mouse event
        else {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        }

        // convert our mouse/touch position to coordinates relative to the vertices of the plane
        var mouseCoords = plane.mouseToPlaneCoords(mousePosition.x, mousePosition.y);
        // update our mouse position uniform
        plane.uniforms.mousePosition.value = [mouseCoords.x, mouseCoords.y];

        // calculate the mouse move strength
        if(mouseLastPosition.x && mouseLastPosition.y) {
            var delta = Math.sqrt(Math.pow(mousePosition.x - mouseLastPosition.x, 2) + Math.pow(mousePosition.y - mouseLastPosition.y, 2)) / 30;
            delta = Math.min(4, delta);
            // update mouseDelta only if it increased
            if(delta >= mouseDelta) {
                mouseDelta = delta;
                // reset our time uniform
                plane.uniforms.time.value = 0;
            }
        }
    }
}