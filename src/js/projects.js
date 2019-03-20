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
        if (this.container.dataset.hover == 'see case study') 
        {
            this.imgDiv = document.createElement('div')
            this.imgDiv.classList.add('caselink')
        }
        else
        {
            this.imgDiv = document.createElement('a')
            this.imgDiv.setAttribute('href',`${this.container.dataset.link}`)
            this.imgDiv.setAttribute('target','_blank')
        }
        this.imgDiv.classList.add('img')
        this.container.appendChild(this.imgDiv)

        // Create img inside of the div
        this.img = this.container.querySelector('img')
        this.container.removeChild(this.img)
        this.imgDiv.appendChild(this.img)

        // Create imgHover text inside of the div
        this.imgText = document.createElement('p')
        this.imgText.innerHTML = `${this.container.dataset.hover}`
        this.imgText.classList.add('imgText')
        this.imgDiv.appendChild(this.imgText)

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

        // Create link
        this.link = document.createElement('a')
        this.link.classList.add('link')
        this.link.classList.add('caselink')
        this.link.setAttribute('href', '#')
        this.link.innerText = 'case study'
        this.textDiv.appendChild(this.link)
    }
}