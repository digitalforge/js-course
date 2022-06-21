// ELEMENTS
const imgContainer = document.getElementById("img-container")
const loader = document.getElementById("loader")

let photos = []

// Unsplash API
const count = 10
const apiKey = "B6B_GyOgFrV8bHfgevbD-OFd6jOMoXdIg6nt5ZXTick"

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// get photos from unsplash API
// async function getPhotos() {
//   try {
//     const response = await fetch(apiUrl)
//     const data = await response.json()
//     console.log(data)
//   } catch (err) {
//     console.log(err.message)
//   }
// }

// Helper function to set attributes on DOM elements

const setAttributes = (elem, attr) => {
  for (const key in attr) {
    elem.setAttribute(key, attr[key])
  }
}

//Create elements for links & photos

const displayPhotos = () => {
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
  } catch (err) {
    console.log(err.message)
  }
}

// On Load

getPhotos()
