export default class Project
{
    constructor(container, index)
    {
        this.container = container
        this.index = index

        this.createElement()
    }

    createElement()
    {
        if(this.index % 2 === 0)
        {
            this.createContentDiv()
            this.createImgDiv()
        }
        else
        {
            this.createImgDiv()
            this.createContentDiv()
        }
    }

    createImgDiv()
    {
        // Create div img
        this.imgDiv = document.createElement('div')
        this.imgDiv.classList.add('img')
        this.imgDiv.setAttribute('infos', this.container.dataset.title)
        this.imgDiv.setAttribute('data-vs-id', "image-plane-vs")
        this.imgDiv.setAttribute('data-fs-id', "image-plane-fs")
        this.container.appendChild(this.imgDiv)

        //Create link
        if (this.container.dataset.link) {
            this.link = document.createElement('a')
            this.link.classList.add('caselink')
            this.link.setAttribute('href', this.container.dataset.link)
            this.link.setAttribute('target', "_blank")
            this.imgDiv.appendChild(this.link)

            // Create img inside of the div
            this.img = this.container.querySelector('img')
            this.container.removeChild(this.img)
            this.link.appendChild(this.img)
        } else {
            // Create img inside of the div
            this.img = this.container.querySelector('img')
            this.container.removeChild(this.img)
            this.imgDiv.appendChild(this.img)
        }


        // Create div for imgHover text inside of the div
        // this.imgTextDiv = document.createElement('div')
        // this.imgTextDiv.classList.add('imgTextDiv')
        // this.imgDiv.appendChild(this.imgTextDiv)

        // Create imgHover text inside of the div
        // this.imgText = document.createElement('p')
        // this.imgText.innerHTML = `see case study`
        // this.imgText.classList.add('imgText')
        // this.imgTextDiv.appendChild(this.imgText)

    }

    createContentDiv()
    {
        // Create content
        this.contentDiv = document.createElement('div')
        this.contentDiv.classList.add('content')
        this.container.appendChild(this.contentDiv)

        // Create TopContainer
        this.topContainer = document.createElement('div')
        this.topContainer.classList.add('top-container')
        this.contentDiv.appendChild(this.topContainer)

        // Create index in TopContainer
        this.indexText = document.createElement('h3')
        this.indexText.innerText = `0${this.index}`
        this.topContainer.appendChild(this.indexText)

        if (this.container.dataset.tech)
        {
            // Create tech div in TopContainer
            this.techDiv = document.createElement('div')
            this.techDiv.classList.add('tech')
            this.topContainer.appendChild(this.techDiv)
    
            // Create techInfos in techDiv
            const techs = JSON.parse(this.container.dataset.tech)
            for (const tech of techs) {
                this.techInfos = document.createElement('img')
                this.techInfos.classList.add('tech-logo')
                this.techInfos.setAttribute('src', `./techs/${tech}.png`)
                this.techDiv.appendChild(this.techInfos)
            }
        }


        // Create textdiv
        this.textDiv = document.createElement('div')
        this.textDiv.classList.add('text')
        this.contentDiv.appendChild(this.textDiv)

        // Create title
        this.title = document.createElement('h2')
        this.title.innerText = this.container.dataset.title
        this.textDiv.appendChild(this.title)

        // Create text
        this.title = document.createElement('p')
        this.title.innerText = this.container.dataset.text
        this.textDiv.appendChild(this.title)

        if(this.container.dataset.link) {
            // Create link
            this.link = document.createElement('a')
            this.link.classList.add('link')
            this.link.classList.add('caselink')
            this.link.setAttribute('href', this.container.dataset.link)
            this.link.setAttribute('target', "_blank")
            this.link.setAttribute('infos', this.container.dataset.title)
            this.link.innerText = 'Go to website'
            this.textDiv.appendChild(this.link)
        }

    }
}