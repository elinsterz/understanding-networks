
window.addEventListener('load', init);


function init() {
    //set up var
    let traceDiv = document.getElementById('trace-div');
    // let dropDownTriangle = document.getElementsByClassName('drop-down-triangle');

    //if dropdown bar is clicked, display show class
    let dropDownButton = document.getElementById('destination-button');
    dropDownButton.addEventListener('click', dropDownMenu);

    //if clicked outside dropdown menu (window), show/don't show menu
    window.addEventListener('click', showMenuContent);


    //if x link is clicked, perform function that shows x traceroute
    let youtubeLink = document.getElementById('home-youtube');
    let youtubeHomeDir = document.getElementById('youtube-direction-div');

    let gmailLink = document.getElementById('home-gmail');
    let gmailHomeDir = document.getElementById('gmail-direction-div');

    let itsNiceLink = document.getElementById('home-itsnice');
    let itsNiceHomeDir = document.getElementById('itsnice-direction-div');

    let homeYoutubeMap = document.getElementById('map-home-youtube');
    

    console.log(youtubeLink);
    console.log(youtubeHomeDir);

    youtubeLink.addEventListener('click', ()=> {
        youtubeVisibility();
        updateDestination();
        homeYoutubeMap.style.display = 'block';
    });

    gmailLink.addEventListener('click', ()=> {
        gmailVisibility();
        updateDestination();
    });

    itsNiceLink.addEventListener('click', ()=> {
        itsNiceVisibility();
        updateDestination();
    });

}

/* when button is clicked, toggle between show and hide dropdown content*/
function dropDownMenu() {
    let dropMenu = document.getElementById('dropdown-menu');
    dropMenu.classList.toggle('show');
    console.log('show drop down!!');
}

/* close the dropdown if mouse click outside of dropdown menu*/
function showMenuContent() {
    if (!event.target.matches('.dropdown-button')) {
        let dropDownContent = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropDownContent.length; i++) {
            let openDropDown = dropDownContent[i];
            if (openDropDown.classList.contains('show')) {
                openDropDown.classList.remove('show');
            }
        }
    }
}


function youtubeVisibility() {
    let youtube = document.getElementById('youtube-direction-div');
    let gmail = document.getElementById('gmail-direction-div');
    let itsnice = document.getElementById('itsnice-direction-div');

    youtube.style.display = 'block';
    gmail.style.display = 'none';
    itsnice.style.display = 'none';
}

function gmailVisibility() {
    let youtube = document.getElementById('youtube-direction-div');
    let gmail = document.getElementById('gmail-direction-div');
    let itsnice = document.getElementById('itsnice-direction-div');

    youtube.style.display = 'none';
    gmail.style.display = 'block';
    itsnice.style.display = 'none';
}

function itsNiceVisibility() {
    let youtube = document.getElementById('youtube-direction-div');
    let gmail = document.getElementById('gmail-direction-div');
    let itsnice = document.getElementById('itsnice-direction-div');

    youtube.style.display = 'none';
    gmail.style.display = 'none';
    itsnice.style.display = 'block';
}


function updateDestination() {
    //update the destination to be link selected
    let div = document.getElementsByClassName('dropdown-content');

    for (let i = 0; i < div.length; i++) {
        for (let j = 0; j < div[i].children.length; j++) {
            div[i].children[j].addEventListener('click', function () {
                this.parentNode.previousElementSibling.innerHTML = this.innerHTML;
            });
        }
    }
}


//////* DUMPSTER CODE */////////////
// function clearBox(){
//     document.getElementById("youtube-direction-div").innerHTML = "";
//     document.getElementById("gmail-direction-div").innerHTML = "";
// }

// *show youtube traceroute*/
// function showYoutubeTrace() {
//     let youtubeDiv = document.getElementById('youtube-direction-div');

//     youtubeDiv.style.visibility = 'visible';
//     console.log('show youtube trace routes!');

//     // if (youtubeDiv.style.display = 'none') {
//     //     youtubeDiv.style.display = 'block';
//     // } else {
//     //     youtubeDiv.style.display = 'none';
//     // }
// }

    // let youtubeLink = document.getElementById('home-youtube');
    // let homeYoutubeDiv = document.getElementById('youtube-direction-div');
    // youtubeLink.addEventListener('click', show(homeYoutubeDiv));


    // //if gmail is clicked, perform function that shows youtube traceroute
    // gmailLink.addEventListener('click', () => {
    //     showGmailTrace();
    //     updateDestination();
    // });

    // function show(elementId) {
    //     document.getElementById("gmail-direction-div").style.display = "none";
    //     document.getElementById(elementId).style.display = "block";
    // }