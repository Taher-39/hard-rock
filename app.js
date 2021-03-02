/* Search Song
api link: https://api.lyrics.ovh/suggest/:searchText

example: https://api.lyrics.ovh/suggest/hello

Lyric
lyric link: https://api.lyrics.ovh/v1/:artist/:title

example: https://api.lyrics.ovh/v1/Adele/Hello

 */

document.getElementById('inputValue').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('inputButton').click();
    }
}) 

document.getElementById('inputButton').addEventListener('click', function(){
    const inputValue = document.getElementById('inputValue').value;
    const url = `https://api.lyrics.ovh/suggest/${inputValue}`;
    sniperLoading(true);
    fetch(url)
        .then(res => res.json())
        .then(data => getResult(data.data))
        .catch(error => errorDisplay('tryAgain'))
})

const getResult = songs =>{
    const mainDiv = document.getElementById('mainDiv');
    mainDiv.innerHTML = '';
    document.getElementById('showLyrics').innerText = '';
    songs.forEach(song => {
        // console.log(song.title)
        const div = document.createElement('div');
        div.className = "single-result row align-items-center my-3 p-3";
        div.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        mainDiv.appendChild(div);
        sniperLoading(false);
    })
}
const getLyric = (artist, title) =>{

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        findLyric(data.lyrics)
    })
}

const findLyric = (lyrics) =>{
    const showLyrics = document.getElementById('showLyrics');
    showLyrics.innerText = lyrics;
}

const errorDisplay = msg => {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.innerText = msg;
}

const sniperLoading = (value) => {
    const sniper =  document.getElementById('sniper-loading');
    const mainDiv = document.getElementById('mainDiv');
    sniper.classList.toggle('d-none');
    mainDiv.classList.toggle('d-none');
}