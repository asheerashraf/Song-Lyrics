import LwcBootstrap  from '../../lib/lwcBootstrap';

export default class SearchBar extends LwcBootstrap {

    options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cee9ca05bbmshe62ecd3c0743c0ap1d71f2jsne1f43769e63c',
            'X-RapidAPI-Host': 'lyrics-plus.p.rapidapi.com'
        }
    };

        song = '';
        songname = '';
        artistname = '';
        artist = '';
        lyrics = '';
        lyricSearched = false;
        lyricFound;
        errorMessage;
    
    searchHandler(){
        const url = `https://lyrics-plus.p.rapidapi.com/lyrics/${this.song}/${this.artist}`

        fetch(url, this.options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.lyrics){
                this.lyrics = (data.lyrics)
                this.lyricFound = true;
            } else{
                this.lyricFound = false;
                this.errorMessage = 'LYRICS NOT FOUND!\nCheck your spelling or try another search...'
            }
        })
        .catch(err => {
            console.error(err);
            this.lyricFound = false;
            this.errorMessage = 'LYRICS NOT FOUND!\nCheck your spelling or try another search...'
        });  

        this.lyricSearched = true;

        //Set song and artist to be used in title after search
        this.songname = this.song;
        this.artistname = this.artist;
    }

    changeHandler(event){
        const {name, value,} = event.target

        if (name === 'song'){
            this.song = value;
        } else if (name === 'artist'){
            this.artist = value;
        }
    }

    get title(){
        return `Lyrics for ${this.songname} by ${this.artistname}`
    }
}
