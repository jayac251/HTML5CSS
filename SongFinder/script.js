let term = "";
const songContainer = document.getElementById("songs");

const updateTerm = () => {
    term = document.getElementById("searchInput").value;
    console.log(term);
    if (!term || term == "") {
        alert("Please enter a search term")
    } else {
        console.log("total records:", songContainer.childElementCount);

        while (songContainer.firstChild) {
            songContainer.removeChild(songContainer.lastChild);
        }


        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const url = `https://itunes.apple.com/search?limit=10&term=${term}`;
        console.log("url:", url);
        fetch(proxy + url)
            .then((response) => {
                return response.json();
            }).then((data) => {
                //console.log(data);                      
                const artists = data.results;


                return artists.map(result => {


                    const article = document.createElement("article"),
                        artist = document.createElement("p"),
                        song = document.createElement("p"),
                        img = document.createElement("img"),
                        audio = document.createElement("audio"),
                        audioSource = document.createElement("source");

                    artist.innerHTML = result.artistName;
                    song.innerHTML = result.trackName;
                    img.src = result.artworkUrl100;
                    audio.setAttribute("controls", "");
                    audioSource.src = result.previewUrl;

                    //Appending childs to article
                    article.appendChild(artist);
                    article.appendChild(song);
                    article.appendChild(img);
                    article.appendChild(audio);

                    audio.appendChild(audioSource);
                    songContainer.appendChild(article);
                    console.log("result", result);
                })

            }).catch(error => {
                console.log("Request failed: ", error)
            });

    }
}

const searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", updateTerm);

document.addEventListener("play", event => {
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < audio.length; i++) {
        if (audio[i] != event.target) {
            audio[i].pause();
        }

    }
}, true);