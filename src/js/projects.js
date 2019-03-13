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
        if(this.container.dataset.position === 'right')
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
        this.imgDiv = document.createElement('a')
        this.imgDiv.setAttribute('href',`${this.container.dataset.link}`)
        this.imgDiv.setAttribute('target','_blank')
        this.imgDiv.classList.add('img')
        this.container.appendChild(this.imgDiv)

        // Create img inside of the div
        this.img = this.container.querySelector('img')
        this.container.removeChild(this.img)
        this.imgDiv.appendChild(this.img)
    }

    createContentDiv()
    {
        // Create content
        this.contentDiv = document.createElement('div')
        this.contentDiv.classList.add('content')
        this.container.appendChild(this.contentDiv)

        // Create index
        this.indexText = document.createElement('h3')
        this.indexText.innerText = `0${this.index}`
        this.contentDiv.appendChild(this.indexText)

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
    }
}