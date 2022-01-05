var modalBtn = document.querySelector("#modalbtn");
var modalBg = document.querySelector(".modal-bg");
var youtubeModalBg = document.querySelector(".youtube-modal-bg")
var closeBtn = document.querySelector("#search-genre");
var checkboxes = document.querySelectorAll(".checkbox");
var youtubeEL = document.querySelector("#youtube");
var youtubeBtn = document.querySelector("#youtubebtn");
var searchYoutubeBtn = document.querySelector("#search-youtube");
var inputOne = document.querySelector("#input-1")

var str = "";

var resetCheckboxes = function() {
    str = "";
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

modalBtn.addEventListener('click', function() {
    modalBg.classList.add("bg-active")
}); 

closeBtn.addEventListener('click', function(){
    modalBg.classList.remove("bg-active");

    for ( i = 0; i < checkboxes.length; i++)  {
        if ( checkboxes[i].checked === true ){
            str += checkboxes[i].value + ","
        }
    };

    // let checkbox = document.querySelector('input[type="checkbox"]:checked'); 
    // var genre = checkbox.value
    movieAPI (str);
    resetCheckboxes();
})

youtubeBtn.addEventListener("click", function() {
    youtubeModalBg.classList.add("bg-active")
});

searchYoutubeBtn.addEventListener("click", function(){
    event.preventDefault();
    var keyword = inputOne.value.trim();
    youtubeAPI(keyword);
    youtubeModalBg.classList.remove("bg-active");
})


var movieAPI = function (genre) {
    var apiUrl = "https://imdb-api.com/API/AdvancedSearch/k_0m8x9src/?genres=" + genre + "&count=10"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
        
        })} else {
            window.alert('not valid')
        }
    });
};



var youtubeAPI = function (keyword) {
    console.log(keyword);
    //var apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + keyword + '&videoEmbeddable=true&videoLicense=youtube&key=AIzaSyCqv1-wCJ6ZsvLMDOpmxtMGoR-VPFEhraY'
    var apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + keyword + '&type=video&videoDuration=short&videoEmbeddable=true&key=AIzaSyCqv1-wCJ6ZsvLMDOpmxtMGoR-VPFEhraY'
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                for(i=0; i < 5; i++) {
                var x = data.items[i].id.videoId
                var title = data.items[i].snippet.title
                addVidLink(x, title)
            }
        
        })} else {
            window.alert('not valid')
        }
    });
};


var addVidLink = function(youtubeID, vidtitle) {
    var vidTitleEl = document.createElement("h3");
    vidTitleEl.textContent = vidtitle;
    youtubeEL.appendChild(vidTitleEl);

    var addLink = document.createElement("iframe");
    addLink.src = "https://www.youtube.com/embed/" + youtubeID 
    addLink.allowfullscreen
    youtubeEL.appendChild(addLink)
}


// youtubeAPI();


