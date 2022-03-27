const schoolName = document.title.slice("0", "-10");
setTimeout(function() {
    document.title = schoolName + " - Pronote+";
    console.log("[Pronote+] : Loaded")

    // Light Theme
    function setLightTheme() {
        // Bandeau TOP
        document.getElementsByClassName("ObjetBandeauEspace")[0].style.backgroundColor = "white";
        document.getElementsByClassName("ObjetBandeauEspace")[0].style.color = "black";
        
        // 2e Bandeau
        document.getElementsByClassName("objetBandeauEntete_menu")[0].style.backgroundColor = "#46484d";

        // 3e Bandeau
        document.getElementsByClassName("objetBandeauEntete_secondmenu")[0].style.backgroundColor = "#d9d9d9";
        document.getElementsByClassName("objetBandeauEntete_secondmenu")[0].style.color = "black";

        // label-menu_niveau0
        document.getElementsByClassName("label-menu_niveau0")[0].style.color = "var(--theme-foncee)";
        document.getElementsByClassName("label-menu_niveau0")[0].style.backgroundColor = "#ececec";
    }

    // Dark Theme
    function setDarkTheme() {
        // Bandeau TOP
        document.getElementsByClassName("ObjetBandeauEspace")[0].style.backgroundColor = "#050505";
        document.getElementsByClassName("ObjetBandeauEspace")[0].style.color = "white";

        // 2e Bandeau
        document.getElementsByClassName("objetBandeauEntete_menu")[0].style.backgroundColor = "#202020";

        // 3e Bandeau
        document.getElementsByClassName("objetBandeauEntete_secondmenu")[0].style.backgroundColor = "#404040";
        document.getElementsByClassName("objetBandeauEntete_secondmenu")[0].style.color = "gray";

        // label-menu_niveau0
        document.getElementsByClassName("label-menu_niveau0")[0].style.color = "var(--theme-foncee)";
        document.getElementsByClassName("label-menu_niveau0")[0].style.backgroundColor = "#404040";
    }

    // FORKAWESOME
    let forkAwesome = document.createElement("link");
    forkAwesome.rel = "stylesheet";
    forkAwesome.href = "https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css";
    // forkAwesome.integrity = "sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY=";
    forkAwesome.crossorigin = "anonymous";

    document.body.appendChild(forkAwesome);

    let separateBtn = document.createElement("hr");
    separateBtn.className = "objetBandeauEntete_sep_boutons";
    let themeToggle = document.createElement("i")
    themeToggle.style.fontSize = "23px";
    themeToggle.style.cursor = "pointer";
    themeToggle.innerText = "🌓";

    if(localStorage.theme === "light"){
        console.log("Light Theme")
        themeToggle.innerText = "🌚";
        setLightTheme();
    }
    if (localStorage.theme === "dark"){
        console.log("Dark Theme")
        themeToggle.innerText = "🌝";
        setDarkTheme();
    }
    if(!localStorage.theme){
        localStorage.theme = "light"
        console.log("No theme. Resetting to Light")
        setLightTheme();
    }

    themeToggle.title = "Changer de thème (Clair / Sombre)";
    themeToggle.addEventListener("click", function() {
        // Toggle Dark and Light Theme
        if (document.body.classList.contains("theme-dark")) {
            localStorage.setItem("theme", "light");
            document.body.classList.remove("theme-dark");
            document.body.classList.add("theme-light");
            themeToggle.innerText = "🌚";
            setLightTheme();
        } else {
            localStorage.setItem("theme", "dark");
            document.body.classList.remove("theme-light");
            document.body.classList.add("theme-dark");
            themeToggle.innerText = "🌝";
            setDarkTheme();
        }
    })
    separateBtn.appendChild(themeToggle);

    document.getElementsByClassName("objetBandeauEntete_boutons")[0].appendChild(separateBtn);
    document.getElementsByClassName("objetBandeauEntete_boutons")[0].appendChild(themeToggle);
    function patch(){
        setInterval(function() {
            // Homepage patch
            if(document.getElementsByClassName('precedenteConnexion').length > 0) {
                console.info("Homepage Patch");
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
                            } else if (noteDonnee < 13 > 10) {
                                note.style.backgroundColor = '#ffd061'; // Average
                                note.style.color = 'white';
                            }
                        }
                    }
                });
            }

            // Account patch
            if (document.getElementsByClassName('compte-conteneur').length > 0) {
                console.info("Account Patch")
            }

            // Settings patch
            if (document.getElementsByClassName('icon_mobile_phone').length > 0) {
                console.info("Settings Patch")
            }

            // Resources patch
            if (document.getElementsByClassName('conteneur-ressourcePeda').length > 0) {
              if (!document.getElementsByClassName('icon_time').length > 0) {
                console.info("Resources Patch")
              }
            }

            // Homework patch
            if (document.getElementsByClassName('icon_time').length > 0) {
                if (!document.getElementsByClassName('icon_asterisk').length > 0) {
                    console.info("Homework Patch")
                }
            }

            // EDT/Calendar patch
            if (document.getElementsByClassName('Calendrier_Boutons').length > 0) {
                console.info("EDT/Calendar Patch")
            }

            // Messages patch
            if (document.getElementsByClassName('ilm-listeEtiqu-deploiement').length > 0) {
                console.info("Messages Patch")
            }

            // Recap patch
            if (document.getElementsByClassName('icon_time').length > 0) {
                if(document.getElementsByClassName('icon_asterisk').length > 0) {
                    console.info("Recap Patch")
                }
            }

            // Notes patch //! Dégeulasse, ne pas utiliser pour le moment

            if(document.getElementsByClassName('DonneesListe_DernieresNotes').length > 0) {
                console.info("Notes Patch")
                document.querySelectorAll('.Espace').forEach((note) => {
                    if(document.getElementsByClassName("AlignementHaut")[1].style.borderRadius != "1rem") { // Checking if it is already patched
                        let matière = "Matière"
                        let noteDonnee = note.innerHTML.split('>  <')[0].replace('<div style=\"float: right;\">', '').replace('</div', '').replace('  ', '')
                        if(noteDonnee.includes("AlignementDroit")){
                            // let noteA = noteDonnee.replace("<div class=\"AlignementDroit\">", "").split("<span class=\"Texte9\">")[0];
                            // let bareme = noteDonnee.replace("<div class=\"AlignementDroit\">", "").split("<span class=\"Texte9\">")[1];
                            // note.innerHTML = `${noteA} <span class="bareme">${bareme}</span>`;
                            // note.style.borderRadius = '5px';
                            // note.style.backgroundColor = "gray"
                        }else{
                            // let type = "Moyenne"
                            let moyenne = noteDonnee
                            note.innerHTML = `<matiere>${matière}</matiere><span class="noted">${note.innerHTML.slice(0, -moyenne.length)} ${moyenne}</span>`;
                            // parentN.style.borderRadius = '5px';
                            // parentN.style.backgroundColor = "gray"
                            document.getElementsByClassName("AlignementHaut")[2].style.borderRadius = "1rem";
                            document.getElementsByClassName("AlignementHaut")[1].style.borderRadius = "1rem";
                            document.getElementsByClassName("AlignementHaut")[0].style.borderRadius = "1rem";
                            let C1style = document.createElement("style");
                            C1style.innerText = ".noted { float: right; } .matiere { float: left; }";
                            document.head.appendChild(C1style);
                        }
                    }
                });
            }

            // Comp patch
            if(document.getElementsByClassName('icon_competence_absent').length > 0) {
                console.info("Comp Patch")
            }
        }, 1000);
    }
    patch();
}, 2000);