// DELAY
setTimeout(() => {
    // * Part 1 of INIT : CSS Patching
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "theme-link";

    /**
     * Changes the CSS file to the one that matches the theme.
     * @param theme - The name of the theme to apply.
     */
    function patchCSS(theme) {
        if(theme === "light"){
            // Light Theme
            localStorage.setItem("plus-theme", "light")
            link.href = browser.runtime.getURL("css/light.css")
        }else if(theme === "dark"){
            // Dark Theme
            localStorage.setItem("plus-theme", "dark")
            link.href = browser.runtime.getURL("css/dark.css")
        }else{
            console.log("Une erreur est survenue, le thème clair sera appliqué")
            patchCSS("light")
        }
    }

    // Retrieves the theme from localStorage
    if(localStorage.getItem("plus-theme") === null & localStorage.getItem("plus-theme") !== "dark" && localStorage.getItem("plus-theme") !== "light"){
        // No theme has been set, we set the default one
        console.log("Pas de thème trouvé ! Le thème clair est appliqué.")
        patchCSS("light")
    }else if(localStorage.getItem("plus-theme") === "light"){
        // Light Theme
        patchCSS("light")
    }else if(localStorage.getItem("plus-theme") === "dark"){
        // Dark Theme
        patchCSS("dark")
    }

    document.getElementsByTagName("head")[0].appendChild(link);

    
    // // FONTAWESOME
    // let fontawesome = document.createElement("link");
    // fontawesome.rel = "stylesheet";
    // fontawesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css";
    // fontawesome.crossorigin = "anonymous";
    // document.getElementsByTagName("head")[0].appendChild(fontawesome);

    // Theme switcher
    let themeSwitcher = document.createElement("a");
    themeSwitcher.id = "theme-switcher";
    themeSwitcher.href = "#";
    themeSwitcher.title = "Changer de thème";
    themeSwitcher.innerHTML = "<svg id=\"tsSVG\"xmlns=\"http://www.w3.org/2000/svg\" height=\"25\" width=\"25\" viewBox=\"0 0 576 512\"><path style=\"color: #8a8a8a;\" d=\"M342.7 352.7c5.75-9.625 9.25-20.75 9.25-32.75c0-35.25-28.75-64-63.1-64c-17.25 0-32.75 6.875-44.25 17.87C227.4 244.2 196.2 223.1 159.1 223.1c-53 0-96 43.06-96 96.06c0 2 .5029 3.687 .6279 5.687c-37.5 13-64.62 48.38-64.62 90.25C-.0048 468.1 42.99 512 95.99 512h239.1c44.25 0 79.1-35.75 79.1-80C415.1 390.1 383.7 356.2 342.7 352.7zM565.2 298.4c-93 17.75-178.5-53.62-178.5-147.6c0-54.25 28.1-104 76.12-130.9c7.375-4.125 5.375-15.12-2.75-16.63C448.4 1.125 436.7 0 424.1 0c-105.9 0-191.9 85.88-191.9 192c0 8.5 .625 16.75 1.75 25c5.875 4.25 11.62 8.875 16.75 14.25C262.1 226.5 275.2 224 287.1 224c52.88 0 95.1 43.13 95.1 96c0 3.625-.25 7.25-.625 10.75c23.62 10.75 42.37 29.5 53.5 52.5c54.38-3.375 103.7-29.25 137.1-70.37C579.2 306.4 573.5 296.8 565.2 298.4z\"/></svg>";
    themeSwitcher.addEventListener("click", function(e){
        e.preventDefault();
        if(localStorage.getItem("plus-theme") === "light"){
            patchCSS("dark")
        }else if(localStorage.getItem("plus-theme") === "dark"){
            patchCSS("light")
        }
    });
    document.getElementsByClassName("menu-commandes")[0].appendChild(themeSwitcher);

    // * Part 2 of init : Loop page patching.
    setInterval(function(){
        function patch(){
            // Homepage Patching
            if(document.getElementsByClassName('precedenteConnexion').length > 0) {
                // Note patching
                document.querySelectorAll('.as-info').forEach((note) => {
                    if(note.style.borderRadius !== "5px") { // Checking if it is already patched
                        note.style.borderRadius = '5px';
                        note.style.fontSize = '12px';
                        if (note.innerText.includes('/')) {
                            const noteDonnee = parseInt(note.innerText.split('/')[0], 10);
                            const bareme = parseInt(note.innerText.split('/')[1], 10);
                            const convertedNote = (noteDonnee / bareme) * 20;
                            if (convertedNote < 10) {
                                note.style.color = '#ff6161'; // Bad
                            } else if (convertedNote >= 15) {
                                note.style.backgroundColor = '#28ad37'; // Very good
                                note.style.color = 'white';
                            } else if (convertedNote > 13) {
                                note.style.backgroundColor = '#55c974'; // Good
                                note.style.color = 'white';
                            } else if (convertedNote < 13) {
                                note.style.backgroundColor = '#ffd061'; // Average
                                note.style.color = 'white';
                            }
                            note.innerHTML = `${note.innerHTML}<br>( ${convertedNote}<span class="bareme"> /20</span> )`;
                        } else {
                            const noteDonnee = parseInt(note.innerText, 10);
                            note.innerHTML = `${note.innerText}<span class="bareme"> /20</span>`;
                            if (noteDonnee < 10) {
                                note.style.color = '#ff6161'; // Bad
                            } else if (noteDonnee >= 15) {
                                note.style.backgroundColor = '#28ad37'; // Very Good
                                note.style.color = 'white';
                            } else if (noteDonnee > 13) {
                                note.style.backgroundColor = '#55c974'; // Good
                                note.style.color = 'white';
                            } else if (noteDonnee < 13) {
                                note.style.backgroundColor = '#ffd061'; // Average
                                note.style.color = 'white';
                            }
                        }
                    }
                });    
            }

            // Account patch
            if (document.getElementsByClassName('compte-conteneur').length > 0) {
                
            }

            // Settings patch
            if (document.getElementsByClassName('icon_mobile_phone').length > 0) {
                
            }

            // Documents patch
            if(document.getElementsByClassName("objetBandeauEntete_thirdmenu")[0].children[0].innerText === "Je télécharge mes documents") {

            }

            // Resources patch
            if (document.getElementsByClassName('conteneur-ressourcePeda').length > 0) {
              if (!document.getElementsByClassName('icon_time').length > 0) {
                
              }
            }

            // Homework patch
            if (document.getElementsByClassName('icon_time').length > 0) {
                if (!document.getElementsByClassName('icon_asterisk').length > 0) {
                    
                }
            }

            // EDT/Calendar patch
            if (document.getElementsByClassName('Calendrier_Boutons').length > 0) {
            }

            // Messages patch
            if (document.getElementsByClassName('ilm-listeEtiqu-deploiement').length > 0) {
            }

            // Recap patch
            if (document.getElementsByClassName('icon_time').length > 0) {
                if(document.getElementsByClassName('icon_asterisk').length > 0) {

                }
            }

            // Notes patch
            if(document.getElementsByClassName('DonneesListe_DernieresNotes').length > 0) {

            }

            // Comp patch
            if(document.getElementsByClassName('icon_competence_absent').length > 0) {

            }
        }


        patch()
    }, 10);

}, 1500)