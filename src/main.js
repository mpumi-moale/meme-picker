import { catsData } from './data'

const emotionsRadio = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModel = document.getElementById('meme-modal')
const memeModelInner = document.getElementById('meme-modal-inner')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')



// listens to and change of radio inputs and calls the highlight function
emotionsRadio.addEventListener('change', highlightCheckedOption)

// btn to get all matching arrays
getImageBtn.addEventListener('click', renderCat)


memeModalCloseBtn.addEventListener('click', closeModel)


// close the model
function closeModel() {
    memeModel.style = 'none'
}

// adds css to the selected radio input
function highlightCheckedOption(e) {

    // removes highlight when radio is not selected
    const radios = document.getElementsByClassName('radio')

    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

// get the selected emotions
function getMatchingCatsArray() {
    // checks if a radio button has been checked
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        // matching cats with the same emotion tags
        const matchingCatsArray = catsData.filter(function(cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            } 
        })

        return matchingCatsArray
    }
    
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if(catsArray.length === 1) {
         return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
   
}


function renderCat() {
    const catObject = getSingleCatObject()

    memeModelInner.innerHTML = `
            <img 
                class="cat-img" 
                src="./src/assets/${catObject.image}"
                alt="${catObject.alt}"
                >
    
    `
    memeModel.style.display = 'flex'
}

// gets an array of the cats emotiontags
function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            // remove duplicates from the array
            if(!emotionsArray.includes(emotion)) {
               emotionsArray.push(emotion)
            } 
        }
    }
    return emotionsArray
}

// shows the array of emotiontags on the browser
function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        
      radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
                >
        </div>
        `  
        
    }
    emotionsRadio.innerHTML = radioItems
}

console.log(renderEmotionsRadios(catsData))