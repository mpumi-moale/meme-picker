import { catsData } from './data'

const emotionsRadio = document.getElementById('emotion-radios')

// gets an array of the cats emotiontags
function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            emotionsArray.push(emotion)
        }
    }
    return emotionsArray
}

// shows the array of emotiontags on the browser
function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `<p>${emotion}</p>`
    }
    emotionsRadio.innerHTML = radioItems
}

console.log(renderEmotionsRadios(catsData))