// getting Element
let verse = document.getElementById("verse");
let verseNumber = document.getElementById("verse-number");
let translation = document.getElementById("translation");
let loadingText = document.getElementById("loading-text");
let audioElement = document.getElementById("audioElement");
// let twitterBtn = document.getElementById("twitter-btn");
let generateBtn = document.getElementById("generate-btn");
let playBtn = document.getElementById("play-btn");

// Fetch the data from the API
let getAyahArabic = () => {
    //hiding loading text
    verse.style.display = "none";
    translation.style.display = "none";
    verseNumber.style.display = "none";
    loadingText.style.display = "block";

    setTimeout(() => {
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
            // Hide the loading message and show the verse, translation, and play button
            loadingText.style.display = "none";
            verse.style.display = "block";
            translation.style.display = "block";
            verseNumber.style.display = "block"; 
        })
        .catch(error => {
            console.log('Error:', error);
        });
    //setting audio endpoints api
    let audioUrl = `https://api.alquran.cloud/v1/ayah/${randomChapter}:${randomVerse}/ar.alafasy`;
    //removing previous audio url
    audioElement.removeAttribute("src");

    fetch(audioUrl)
        .then(response => response.json())
        .then(data => {
            const playAudio = data.data.audio;
            playBtn.addEventListener('click', () => {
                //settinng audio url to html audio element 
                audioElement.setAttribute("src", playAudio);
                audioElement.play();
            });
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }, 500);
}
//calling functions 
getAyahArabic();
generateBtn.addEventListener('click', getAyahArabic);
//set a timeout... work on it--- keeps refreshing need to work on it
