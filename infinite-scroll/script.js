// ELEMENTS
const imgContainer = document.getElementById("img-container")
const loader = document.getElementById("loader")

let isInitialLoad = true

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photos = []

// Unsplash API
let initialCount = 5
const apiKey = "B6B_GyOgFrV8bHfgevbD-OFd6jOMoXdIg6nt5ZXTick"

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`

const updateAPIRULWithNewCount = (picCount) => {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`
}

// check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

// Helper function to set attributes on DOM elements

const setAttributes = (elem, attr) => {
  for (const key in attr) {
    elem.setAttribute(key, attr[key])
  }
}

//Create elements for links & photos

const displayPhotos = () => {
  //reset imagesloaded variable
  imagesLoaded = 0

  totalImages = photos.length
  console.log("total Images:" + totalImages)
  photos.forEach((photo) => {
    const item = document.createElement("a")
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    })

    // create <img> for photo
    const img = document.createElement("img")
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded)

    // put img inside <a></a> then put both inside container element

    item.appendChild(img)
    imgContainer.appendChild(item)
  })
}

const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl)
    photos = await res.json()
    displayPhotos()
    if (isInitialLoad) {
      updateAPIRULWithNewCount(30)
      isInitialLoad = false
    }
  } catch (err) {
    console.log(err.message)
  }
}

// Check to see if scrolling near bottom of page , Load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotos()
  }
})

// On Load
getPhotos()
