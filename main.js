// Just for showing the list of hidden elements in real time
let isHidden = []
let isHiddenElement = document.querySelector('#hidden-list')

const updateList = () => {
    isHiddenElement.innerHTML = isHidden.map(i => `<li>${i.textContent}</li>`)
}

// The relevant code
let options = {
    root: document.querySelector('.container'), // boundingBox defining element
    rootMargin: "0px",                          // how much margin to pretend on the root element
    threshold: 0.01                             // threshold for setting isIntersecting flag
}

// Explained:
// This code simply creates an observer that has a callback for processing things it should "observe".
// We can read the .isIntersecting property to see if a given element is within the boundingBox
// of the root element defined in options, the threshold is an approximate value for how much of
// the element should be intersecting the boundingBox before having "isIntersecting" set to true.

let observer = new IntersectionObserver((entries, _) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            isHidden.push(entry.target)
        } else {
            isHidden = isHidden.filter(i => i.textContent !== entry.target.textContent)
        }
    })
    updateList()
}, options)

// Observe all elements with the class "item"
let items = document.querySelectorAll('.item')
items.forEach(i => observer.observe(i))
