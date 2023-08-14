// getting Element
let verse = document.getElementById("verse");
let verseNumber = document.getElementById("verse-number");
let translation = document.getElementById("translation");
let loadingText = document.getElementById("loading-text");
let audioElement = document.getElementById("audioElement");
let twitterBtn = document.getElementById("twitter-btn");
let generateBtn = document.getElementById("generate-btn");
let playBtn = document.getElementById("play-btn");
let nextBtn = document.getElementById("next-btn");
let previousBtn = document.getElementById("previous-btn");
let searchBtn = document.getElementById("search-btn");
let searchNumber = document.getElementById("search");

//deeclaring global var for verse and chapter
let pVerseGlobal;
let chapterGlobal;

// Fetch the data from the API and main function
// pVerse = parameter verse
let getAyah = (chapter, pVerse) => {
    //hiding loading text
    verse.style.display = "none";
    translation.style.display = "none";
    verseNumber.style.display = "none";
    loadingText.style.display = "block";

    //setting arabic text endpoints api
    let arabicTextUrl = `https://api.alquran.cloud/v1/ayah/${chapter}:${pVerse}`;

    fetch(arabicTextUrl)
        .then(response => response.json())
        .then(data => {
            const verseText = data.data.text;
            if(verseText !== undefined) {
                // Hide the loading message and show the verse, translation, and play button
                loadingText.style.display = "none";
                verse.style.display = "block";
                translation.style.display = "block";
                verseNumber.style.display = "block"; 
                
                verse.innerHTML = `${verseText}`;
                verseNumber.innerHTML = `Chapter ${chapter}, Verse ${pVerse}` 
            }           
             else {
                 setTimeout(getVerse, 100); // Adjust the delay as needed (e.g., 500ms)
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });

    //setting translation endpoints api
    let translationUrl = `https://api.alquran.cloud/v1/ayah/${chapter}:${pVerse}/bn.bengali`;

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
    let audioUrl = `https://api.alquran.cloud/v1/ayah/${chapter}:${pVerse}/ar.alafasy`;
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
}

//calling functions 

// generating random verse
function getVerse() {
    //getting random verse
    let generateChapter = Math.floor(Math.random() * 114) + 1;
    let generateVerse = Math.floor(Math.random() * 286) + 1; // The highest verse count in any chapter is 286
    getAyah(generateChapter, generateVerse)
    //updating global variables
    pVerseGlobal = generateVerse;
    chapterGlobal = generateChapter;
};

getVerse();

// function for generate button 
generateBtn.addEventListener('click', getVerse);

//searching verses using search button
searchBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    let searchArray = searchNumber.value.split(":");
    let searchChapter = searchArray[0];
    let searchVerse = searchArray[1];

    // input validation 
    if (searchChapter && searchVerse) {
        getAyah(searchChapter, searchVerse);
        //updating global variables
        pVerseGlobal = parseInt(searchVerse)
        chapterGlobal = searchChapter
        searchNumber.value = '';
    } else {
        // Display an error message or take appropriate action
        alert("Please enter a valid search input.");
    }
});

//accessing next verse
let nextAyah = () => {
    let nextVerse = pVerseGlobal + 1;
    getAyah(chapterGlobal, nextVerse);
    pVerseGlobal++;
};
nextBtn.addEventListener('click', nextAyah); 

//accessing previous verse
let previousAyah = () => {
    let previousVerse = pVerseGlobal - 1;
    getAyah(chapterGlobal, previousVerse);
    pVerseGlobal--;
};
previousBtn.addEventListener('click', previousAyah); 

// Add event listener to the twitter button
twitterBtn.addEventListener("click", () => {
    let translationText = document.getElementById("translation").textContent;
    // Create the Twitter share URL with the text as a parameter
    let tweetText = `কুরআনের এই আয়াতটি দেখুন: \n${translationText}`;
    let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    // Open the Twitter compose window
    window.open(tweetUrl, "_blank");
});