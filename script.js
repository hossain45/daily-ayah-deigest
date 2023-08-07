// getting Element
let verse = document.getElementById("verse");
let verseNumber = document.getElementById("verse-number");
let translation = document.getElementById("translation");
// let twitterBtn = document.getElementById("twitter-btn");
let generateBtn = document.getElementById("generate-btn");
let playBtn = document.getElementById("play-btn");

// Fetch the data from the API
let getAyahArabic = () => {
    //getting random verse
    let randomChapter = Math.floor(Math.random() * 114) + 1;
    let randomVerse = Math.floor(Math.random() * 286) + 1; // The highest verse count in any chapter is 286

    //setting arabic text endpoints api
    let arabicTextUrl = `https://api.alquran.cloud/v1/ayah/${randomChapter}:${randomVerse}`;

    fetch(arabicTextUrl)
        .then(response => response.json())
        .then(data => {
            const verseText = data.data.text;
            if(verseText !== undefined) {
                verse.innerHTML = `${verseText}`;
                verseNumber.innerHTML = `Chapter ${randomChapter}, Verse ${randomVerse}`
            } else {
                setTimeout(getAyahArabic, 500); // Adjust the delay as needed (e.g., 500ms)
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });

    //setting translation endpoints api
    let translationUrl = `https://api.alquran.cloud/v1/ayah/${randomChapter}:${randomVerse}/bn.bengali`;

    fetch(translationUrl)
        .then(response => response.json())
        .then(data => {
            const translationText = data.data.text;
            translation.innerHTML = `${translationText}`;    
        })
        .catch(error => {
            console.log('Error:', error);
        });
    //setting audio endpoints api
    let audioUrl = `https://api.alquran.cloud/v1/ayah/${randomChapter}:${randomVerse}/ar.alafasy`;

    fetch(audioUrl)
        .then(response => response.json())
        .then(data => {
            const playAudio = data.data.audio;
            playBtn.addEventListener('click', () => {
                // Create an audio element and play the audio
                const audioElement = new Audio(playAudio);
                audioElement.play();
            });
            // playBtn.innerHTML = `${playAudio}`;    
        })
        .catch(error => {
            console.log('Error:', error);
        });
}
getAyahArabic();

generateBtn.addEventListener('click', getAyahArabic);
//set a timeout... work on it
