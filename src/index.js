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
const $body = document.querySelector('body')
const $projects = $body.querySelectorAll('.js-project')
const $imgs = $body.querySelectorAll('img')
const imgsLoad = []
let index = 0
const $loadingContainer = $body.querySelector('.loading-container')
const $loading = $body.querySelector('.loading')
const $loader = $loadingContainer.querySelector('.loading .loader')
const $moveCanvas = $body.querySelector('.curtain')

// Check if all images are load
for (const $img of $imgs) {
    $img.addEventListener('load',() => {
        imgsLoad.push($img)
        $loader.style.transform = `scaleX(${(imgsLoad.length + 2) / $imgs.length})`
        if ((imgsLoad.length + 1) / $imgs.length === 1) {
            createShaders()
            initCurtains()
            setTimeout(() => {
                $loading.classList.add('leave')
                $loadingContainer.classList.add('disapear')
                $moveCanvas.classList.add('appear')
                $loader.classList.add('disapear')
                $loader.style.transform = `scaleX(0)`
            }, 500);
            setTimeout(() => {
                $content.classList.add('appear')
                $aside.classList.add('appear')
                $body.classList.add('appear')
            }, 2000);
        }
    })
}

// window.addEventListener(
//     'load',
//     () =>
//     {
//         window.scrollTo(0, 0)
//     }
// )

for(const $project of $projects)
{
    index++
    const project = new Project($project, index)
}

// Canvas
const $header = $body.querySelector('header')
const $canvas = $body.querySelector('canvas')
const context = $canvas.getContext('2d')
const $content = $body.querySelector('.content')
const $aside = $body.querySelector('.aside')

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
// const cursor = {}
// const $mouse = $body.querySelector('.mouse')
// let mouseIsHover = false
// let rect = []


// for(const $img of $imgs)
// {
//     rect.push($img.getBoundingClientRect())
// }

// window.addEventListener(
//     'mousemove',
//     (_e) =>
//     {
//         cursor.x = _e.clientX 
//         cursor.y = _e.clientY 
        
//         // $mouse.style.top = `${cursor.y - 25}px`
//         // $mouse.style.left = `${cursor.x - 25}px`

//         // if (cursor.x < rect[0].right && cursor.x > rect[0].left && cursor.y > rect[0].top && cursor.y < rect[0].bottom) 
//         // {
//         //     $mouse.classList.add('hover')
//         // }
//     }
// )

// Circle animation on canvas
// let posX = 0, posY = 0, arc1 = 0, arc2 = 1*Math.PI, arc3 = 0.5 * Math.PI, arc4 = 1.5 * Math.PI, radius = 0,end = false, circleWidth = $canvas.width*20/100, ratio = $canvas.width/50
// const $content = $body.querySelector('.content')
// const $aside = $body.querySelector('.aside')
// console.log(ratio)

// const moveCircle = () =>
// {
//     context.clearRect(0,0,$canvas.width,$canvas.height)
//     context.beginPath()
//     // context.arc(cursor.x, cursor.y, 25, 0, Math.PI * 2)
//     context.arc($canvas.width/2, $canvas.height/2, circleWidth, arc1, arc1 * 1.1)
//     context.strokeStyle = 'black'
//     context.stroke()
//     context.beginPath()
//     context.arc($canvas.width/2, $canvas.height/2, circleWidth - ratio, arc2, arc2 * 1.2)
//     context.strokeStyle = 'purple'
//     context.stroke()
//     context.beginPath()
//     context.arc($canvas.width/2, $canvas.height/2, circleWidth - (ratio*2), arc3, arc3 * 1.3)
//     context.strokeStyle = 'black'
//     context.stroke()
//     context.beginPath()
//     context.arc($canvas.width/2, $canvas.height/2, circleWidth - (ratio*3), arc4, arc4 * 1.4)
//     context.strokeStyle = 'purple'
//     context.stroke()
//     context.beginPath()
//     context.arc($canvas.width/2, $canvas.height/2, circleWidth - (ratio*4), arc2 / 0.8, arc2 * 1.5)
//     context.strokeStyle = 'black'
//     context.stroke()
//     arc1 += 0.02
//     arc2 += 0.01
//     arc3 += 0.015
//     arc4 += 0.006
//     if (load == true) 
//     {
//         end = true
//         context.beginPath()
//         context.arc($canvas.width/2, $canvas.height/2, radius, 0, Math.PI * 2)
//         context.fillStyle = 'white'
//         context.fill()
//     }
//     if(end == true && radius <= circleWidth)
//     {
//         radius += 3
//     }
//     if (radius > circleWidth) 
//     {
//         $canvas.classList.remove('visible')
//         $content.classList.add('appear')
//         $aside.classList.add('appear')
//         $body.classList.add('appear')
//         createShaders()
//         initCurtains()
//     }
//     // $imgs[2].addEventListener(
//     //     'load',
//     //     () =>
//     //     {
//     //         console.log($imgs)
//     //     }
//     // )
// }
// moveCircle()

// Animation
// const loop = () =>
// {
//     moveCircle()
//     window.requestAnimationFrame(loop) 
// }
// window.requestAnimationFrame(loop)

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
const $nav = $body.querySelectorAll('.aside li')


// for(const $item of $nav)
// {
//     mouseAnimation($item)
// }

// Reset active
const resetActive = () =>
{
    let $actives = $body.querySelectorAll('.active')
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
        const $work = $body.querySelector('#work')
        const $workMenu = $body.querySelector('.work')
        const $contact = $body.querySelector('#contact')
        const $contactMenu = $body.querySelector('.contact')
        const $aboutMenu = $body.querySelector('.about')
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

        for(const $project of $projects) {
            const projectTop = $project.getBoundingClientRect().top - 500
            if (projectTop < 0) {
                $project.classList.add('appear')
            }
        }
    }
)

// Toggle case study
// const $caseToggles = $body.querySelectorAll('.caselink')
// const $caseStudy = $body.querySelector('.casestudy')
// const $close = $body.querySelector('.close')
// const $projectIdea = $body.querySelector('.project_idea')
// const $techno = $body.querySelector('.techno')
// const $job = $body.querySelector('.job')
// const $description = $body.querySelector('.description')
// const $link = $body.querySelector('.project_link')
// const titles = []

// for(const $caseToggle of $caseToggles)
// {
//     if(!titles.includes($caseToggle.getAttribute('infos')))
//     {
//         titles.push($caseToggle.getAttribute('infos'))
//     }
//     $caseToggle.addEventListener(
//         'click',
//         (_e) =>
//         {
//             _e.preventDefault()
//             openCase()
//             for(let i = 0; i < data.datas.length; i++)
//             {
//                 if($caseToggle.getAttribute('infos') == titles[i])
//                 {
//                     $projectIdea.innerHTML = data.datas[i].project
//                     $techno.innerHTML = data.datas[i].techno
//                     $job.innerHTML = data.datas[i].job
//                     $description.innerHTML = data.datas[i].description
//                     $link.setAttribute('href', data.datas[i].link)
//                 }
//             }
//         }
//     )
// }

// $close.addEventListener(
//     'click',
//     () =>
//     {
//         openCase()
//     }
// )

// // Toggle case study function
// const openCase = () =>
// {
//     $caseStudy.classList.toggle('open')
// }

// set up our WebGL context and append the canvas to our wrapper
let curtains = new Curtains({
    container: "canvas"
})

// wait for everything to be ready (images) and make some curtains
const createShaders = () => {
    // track the mouse positions to send it to the shaders
    let mousePosition = {
        x: 0,
        y: 0,
    }
    // we will keep track of the last position in order to calculate the movement strength/delta
    let mouseLastPosition = {
        x: 0,
        y: 0,
    }
    let mouseDelta = 0

    // get our plane element
    let planeElements = $body.querySelectorAll(".img")
    let planesCurtains = []

    // could be useful to get pixel ratio
    let pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1.0

    // set our initial parameters (basic uniforms)
    let params = {
        widthSegments: 20,
        heightSegments: 20,
        uniforms: {
            time: { // time uniform that will be updated at each draw call
                name: "uTime",
                type: "1f",
                value: 0,
            },
        },
    }

    // create our plane
    // let plane = curtains.addPlane(planeElement, params)

    // create our planes
    planeElements.forEach((plane, index) => {
        planesCurtains.push(curtains.addPlane(plane, params))

        // if our plane has been successfully created
        if(planesCurtains[index]) {
            createImagesShaders(index)
        }
    })

    function createImagesShaders(index) {
        let plane = planesCurtains[index]

        // if there has been an error during init, plane will be null
        if(plane) {
            plane.onReady(function() {

                plane.mouseOver = false

                planeElements[index].addEventListener("mouseenter", function(e) {
                    plane.mouseOver = true
                })

                planeElements[index].addEventListener("mouseleave", function(e) {
                    plane.mouseOver = false
                })

            }).onRender(function() {
                if(plane.mouseOver) {
                    plane.uniforms.time.value = Math.min(45, plane.uniforms.time.value + 1)
                }
                else {
                    plane.uniforms.time.value = Math.max(0, plane.uniforms.time.value - 1)
                }

                plane.updatePosition()
            }).onLeaveView(function() {
                //console.log("leaving view", plane.index)
            }).onReEnterView(function() {
                //console.log("entering view", plane.index)
            })
        } else {
            plane.classList.add('no-curtain')
        }

    }
}

function initCurtains() {
    // track the mouse positions to send it to the shaders
    let mousePosition = {
        x: 0,
        y: 0,
    }
    // we will keep track of the last position in order to calculate the movement strength/delta
    let mouseLastPosition = {
        x: 0,
        y: 0,
    }
    let mouseDelta = 0

    // get our plane element
    let planeElement = $body.querySelector(".curtain")


    // handling errors
    curtains.onError(function() {
        // we will add a class to the $body body to display original canvas
        $canvas.classList.add('no-curtains')

        // handle canvas here
        function animate() {
            // animate our texture canvas
            animateTextureCanvas()

            window.requestAnimationFrame(animate)
        }

        animate()
    })

    function getColor() {
        let letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        color += '80'
        return color
    }

    const colors = []
    for (let index = 0; index < 10; index++) {
        colors.push(getColor())
    }

    function animateTextureCanvas() {
        // here we will handle our canvas texture animation

        // clear scene
        simpleCanvasContext.clearRect(0, 0, simpleCanvas.width, simpleCanvas.height)
        // const randomValues = [50, 200, 300, 600]

        // continuously rotate the canvas
        // simpleCanvasContext.translate(simpleCanvas.width / 2, simpleCanvas.height / 2)
        // simpleCanvasContext.rotate(Math.PI / 360)
        // simpleCanvasContext.translate(-simpleCanvas.width / 2, -simpleCanvas.height / 2)

        // draw a red rectangle
        // simpleCanvasContext.fillStyle = getColor()
        // simpleCanvasContext.arc(simpleCanvas.width / 2, simpleCanvas.height / 2, simpleCanvas.width / 8, 0, 2 * Math.PI, true)
        // simpleCanvasContext.fill()
        // simpleCanvasContext.fillRect(simpleCanvas.width / 2 - simpleCanvas.width / 8, simpleCanvas.height / 2 - simpleCanvas.height / 8, simpleCanvas.width / 4, simpleCanvas.height / 4)
        // simpleCanvasContext.fillRect(simpleCanvas.width / 8, simpleCanvas.height / 8, simpleCanvas.width / 4, simpleCanvas.height / 4)
        // simpleCanvasContext.fillRect(simpleCanvas.width / 2 + simpleCanvas.width / 8, simpleCanvas.height / 2 + simpleCanvas.height / 8, simpleCanvas.width / 4, simpleCanvas.height / 4)

        // Multiple canvas
        // Rectangle width
        // const rectWidth = simpleCanvas.width / 12
        // const rectHeight = simpleCanvas.height / 12
        for (let i = 0; i < 4;  i++) {
            simpleCanvasContext.strokeStyle = colors[i]
            simpleCanvasContext.lineWidth = 50
            // simpleCanvasContext.fillRect(simpleCanvas.width / 12 + (rectWidth * i), simpleCanvas.height / 8 + (rectHeight * i), rectWidth, rectHeight)
            // simpleCanvasContext.fillRect(simpleCanvas.width / 12 + (rectWidth * (i + 2)), simpleCanvas.height / 8 + (rectHeight * i), rectWidth, rectHeight)
            // simpleCanvasContext.fillRect(simpleCanvas.width / 12 + (rectWidth * (i + 4)), simpleCanvas.height / 8 + (rectHeight * i), rectWidth, rectHeight)
            // simpleCanvasContext.fillRect(simpleCanvas.width / 12 + (rectWidth * (i + 6)), simpleCanvas.height / 8 + (rectHeight * i), rectWidth, rectHeight)

            // Create chessplate
            // if (i % 2 === 0) {
            //     simpleCanvasContext.fillRect(0, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 2, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 4, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 6, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 8, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 10, rectHeight * i, rectWidth, rectHeight)
            // } else {
            //     simpleCanvasContext.fillRect(rectWidth, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 3, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 5, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 7, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 9, rectHeight * i, rectWidth, rectHeight)
            //     simpleCanvasContext.fillRect(rectWidth * 11, rectHeight * i, rectWidth, rectHeight)
            // }
            switch (i) {
                case 0:
                    simpleCanvasContext.beginPath()
                    simpleCanvasContext.moveTo(0, windowHeight / 5)
                    simpleCanvasContext.lineTo(windowWidth - (windowWidth / 2.5), windowHeight - (windowHeight / 5))
                    simpleCanvasContext.stroke()
                    break;
                case 1:
                    simpleCanvasContext.beginPath()
                    simpleCanvasContext.moveTo(0, 0)
                    simpleCanvasContext.lineTo(windowWidth - (windowWidth / 8), windowHeight - (windowHeight / 8))
                    simpleCanvasContext.stroke()
                    break;
                case 2:
                    simpleCanvasContext.beginPath()
                    simpleCanvasContext.moveTo(0, -(windowHeight / 5))
                    simpleCanvasContext.lineTo(windowWidth - (windowWidth / 3), windowHeight - (windowHeight / 1.8))
                    simpleCanvasContext.stroke()
                    break;
                case 3:
                    simpleCanvasContext.beginPath()
                    simpleCanvasContext.moveTo(0, -(windowHeight / 3))
                    simpleCanvasContext.lineTo(windowWidth - (windowWidth / 12), windowHeight - (windowHeight / 1.8))
                    simpleCanvasContext.stroke()
                    break;
            
            }

            // create line
            // simpleCanvasContext.beginPath()
            // simpleCanvasContext.moveTo(-10, randomValues[i])
            // simpleCanvasContext.lineTo(windowWidth, windowHeight)
            // simpleCanvasContext.stroke()
        }
    }


    // could be useful to get pixel ratio
    let pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1.0

    // some basic parameters
    // we don't need to specifiate vertexShaderID and fragmentShaderID because we already passed it via the data attributes of the plane HTML element
    let params = {
        widthSegments: 100,
        heightSegments: 100,
        uniforms: {
            resolution: { // resolution of our plane
                name: "uResolution",
                type: "2f", // notice this is an length 2 array of floats
                value: [pixelRatio * planeElement.clientWidth, pixelRatio * planeElement.clientHeight],
            },
            time: { // time uniform that will be updated at each draw call
                name: "uTime",
                type: "1f",
                value: 0,
            },
            mousePosition: { // our mouse position
                name: "uMousePosition",
                type: "2f", // again an array of floats
                value: [mousePosition.x, mousePosition.y],
            },
            mouseMoveStrength: { // the mouse move strength
                name: "uMouseMoveStrength",
                type: "1f",
                value: 0,
            }
        }
    }

    // create our plane
    let simplePlane = curtains.addPlane(planeElement, params)

    // i our plane has been successfully created
    if(simplePlane) {
        // our texture canvas
        var simpleCanvas = $canvas
        var simpleCanvasContext = context

        // get our plane dimensions
        let planeBoundingRect = simplePlane.getBoundingRect()

        // size our canvas
        // we are dividing it by the pixel ratio value to gain performance
        simpleCanvas.width = planeBoundingRect.width / curtains.pixelRatio
        simpleCanvas.height = planeBoundingRect.height / curtains.pixelRatio

        simplePlane.onReady(function() {
            // display the button
            $body.classList.add("curtains-ready")

            // set a fov of 35 to exagerate perspective
            simplePlane.setPerspective(35)

            // now that our plane is ready we can listen to mouse move event
            let wrapper = $body.querySelector("header")

            wrapper.addEventListener("mousemove", function(e) {
                handleMovement(e, simplePlane)
            })

            wrapper.addEventListener("touchmove", function(e) {
                handleMovement(e, simplePlane)
            })

            // on resize, update the resolution uniform
            window.addEventListener("resize", function() {
                // get our plane dimensions
                let planeBoundingRect = simplePlane.getBoundingRect()

                simplePlane.uniforms.resolution.value = [planeBoundingRect.width * curtains.pixelRatio, planeBoundingRect.height * curtains.pixelRatio]

                // size our canvas
                // we are dividing it by the pixel ratio value to gain performance
                simpleCanvas.width = planeBoundingRect.width / curtains.pixelRatio
                simpleCanvas.height = planeBoundingRect.height / curtains.pixelRatio
            })

        }).onRender(function() {
            // increment our time uniform
            simplePlane.uniforms.time.value++

            // send the new mouse move strength value
            simplePlane.uniforms.mouseMoveStrength.value = mouseDelta
            // decrease the mouse move strenght a bit : if the user doesn't move the mouse, effect will fade away
            // mouseDelta = Math.max(0, mouseDelta * 0.995)

            // animate our texture canvas
            animateTextureCanvas()
        })
    }

    // handle the mouse move event
    function handleMovement(e, plane) {

        if(mousePosition.x != -100000 && mousePosition.y != -100000) {
            // if mouse position is defined, set mouse last position
            mouseLastPosition.x = mousePosition.x
            mouseLastPosition.y = mousePosition.y
        }

        // touch event
        if(e.targetTouches) {

            mousePosition.x = e.targetTouches[0].clientX
            mousePosition.y = e.targetTouches[0].clientY
        }
        // mouse event
        else {
            mousePosition.x = e.clientX
            mousePosition.y = e.clientY
        }

        // convert our mouse/touch position to coordinates relative to the vertices of the plane
        let mouseCoords = plane.mouseToPlaneCoords(mousePosition.x, mousePosition.y)
        // update our mouse position uniform
        plane.uniforms.mousePosition.value = [mouseCoords.x, mouseCoords.y]

        // calculate the mouse move strength
        if(mouseLastPosition.x && mouseLastPosition.y) {
            let delta = Math.sqrt(Math.pow(mousePosition.x - mouseLastPosition.x, 2) + Math.pow(mousePosition.y - mouseLastPosition.y, 2)) / 30
            delta = Math.min(4, delta)
            // update mouseDelta only if it increased
            if(delta >= mouseDelta) {
                mouseDelta = delta
                // reset our time uniform
                plane.uniforms.time.value = 0
            }
        }
    }
}