// DELAY
setTimeout(() => {
  /* CSS and JS patching : injects the required files */
  let link = document.createElement("link");
  let pglink = document.createElement("link");
  let tailwind = document.createElement("script");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.id = "theme-link";
  pglink.type = "text/css";
  pglink.rel = "stylesheet";
  pglink.id = "pagetheme-link";

  localStorage.setItem("pplus-current-version", "0.2.4")

  document.getElementsByTagName("head")[0].appendChild(link);

  let link_rel = document.getElementById("theme-link");

  /**
   * Changes the CSS file to the one that matches the theme.
   * @param theme - The name of the theme to apply.
   */
  function patchCSS(theme) {
    if (theme === "light") {
      // Light Theme
      localStorage.setItem("plus-theme", "light");
      link_rel.href = browser.runtime.getURL("css/light.css");
    } else if (theme === "dark") {
      // Dark Theme
      localStorage.setItem("plus-theme", "dark");
      link_rel.href = browser.runtime.getURL("css/dark.css");
    } else if (theme === "abyss") {
      localStorage.setItem("plus-theme", "abyss")
      link_rel.href = browser.runtime.getURL("css/abyss.css")
    }
  }

  function patchColor(bool) {
    if (bool === 'true') {
      // Enabled
      localStorage.setItem("colorimetrie", 'true');
      
    } else if (bool === 'false') {
      // Disabled
      localStorage.setItem("colorimetrie", 'false');
    }
  }

  /**
   * Links a CSS file to add a custom css to the page.
   * @param pagename - The name of the page you want to patch
   */
  function patchPageCSS(pagename) {
    if (
      (localStorage.getItem("plus-theme") === null) &
        (localStorage.getItem("plus-theme") !== "dark") &&
      localStorage.getItem("plus-theme") !== "light"
    ) {
      // No theme has been set, we set the default one
    } else if (localStorage.getItem("plus-theme") === "dark") {
      if (pagename === "nopage") {
        pglink.href = "";
      } else {
        pglink.href = browser.runtime.getURL(`css/pages/${pagename}.css`);
      }
    } else if (localStorage.getItem("plus-theme") === "light") {
      pglink.href = browser.runtime.getURL("css/light.css");
    }
  }

  // Retrieves the theme from localStorage
  if (
    (localStorage.getItem("plus-theme") === null) &
      (localStorage.getItem("plus-theme") !== "dark") &&
    localStorage.getItem("plus-theme") !== "light" && localStorage.getItem("plus-theme" !== "abyss")
  ) {
    // No theme has been set, we set the default one
    console.log("Pas de thème trouvé ! Le thème clair est appliqué.");
    patchCSS("light");
  } else if (localStorage.getItem("plus-theme") === "light") {
    // Light Theme
    patchCSS("light");
  } else if (localStorage.getItem("plus-theme") === "dark") {
    // Dark Theme
    patchCSS("dark");
  } else if (localStorage.getItem ("plus-theme") === "abyss") {
    patchCSS("abyss")
  }

  // Creating the theme switcher button element
  let themeSwitcher = document.createElement("a");
  themeSwitcher.id = "theme-switcher";
  themeSwitcher.href = "#theme-switched";
  themeSwitcher.title = "Changer de thème";
  themeSwitcher.innerHTML =
    '<svg id="tsSVG"xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 576 512"><path style="color: #8a8a8a;" d="M342.7 352.7c5.75-9.625 9.25-20.75 9.25-32.75c0-35.25-28.75-64-63.1-64c-17.25 0-32.75 6.875-44.25 17.87C227.4 244.2 196.2 223.1 159.1 223.1c-53 0-96 43.06-96 96.06c0 2 .5029 3.687 .6279 5.687c-37.5 13-64.62 48.38-64.62 90.25C-.0048 468.1 42.99 512 95.99 512h239.1c44.25 0 79.1-35.75 79.1-80C415.1 390.1 383.7 356.2 342.7 352.7zM565.2 298.4c-93 17.75-178.5-53.62-178.5-147.6c0-54.25 28.1-104 76.12-130.9c7.375-4.125 5.375-15.12-2.75-16.63C448.4 1.125 436.7 0 424.1 0c-105.9 0-191.9 85.88-191.9 192c0 8.5 .625 16.75 1.75 25c5.875 4.25 11.62 8.875 16.75 14.25C262.1 226.5 275.2 224 287.1 224c52.88 0 95.1 43.13 95.1 96c0 3.625-.25 7.25-.625 10.75c23.62 10.75 42.37 29.5 53.5 52.5c54.38-3.375 103.7-29.25 137.1-70.37C579.2 306.4 573.5 296.8 565.2 298.4z"/></svg>';
  
  // Creating the colorimetry of the notes button element
  let colorSwitcher = document.createElement("a");
  colorSwitcher.id = "color-switcher";
  colorSwitcher.href = "#color-switched";
  colorSwitcher.title = "Activer / Désactiver la colorimétrie des notes";
  colorSwitcher.innerHTML =
    '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#8a8a8a" stroke="none"><path d="M1951 5109 c-46 -18 -84 -53 -102 -93 -18 -40 -19 -122 -19 -2456 0 -2351 1 -2416 19 -2457 12 -26 35 -52 62 -70 l43 -28 606 0 606 0 41 27 c24 16 49 44 62 70 l21 44 0 2415 c0 2350 -1 2415 -19 2456 -12 26 -35 52 -62 70 l-43 28 -595 2 c-361 1 -605 -2 -620 -8z"/><path d="M3794 3650 c-47 -11 -92 -47 -114 -90 -20 -39 -20 -65 -20 -1730 0 -1663 0 -1691 20 -1729 23 -47 60 -77 109 -92 24 -7 233 -9 622 -7 l585 3 41 27 c24 16 49 44 62 70 l21 44 0 1682 c0 1391 -2 1688 -14 1715 -17 43 -76 93 -123 106 -44 13 -1139 14 -1189 1z"/><path d="M125 3099 c-38 -11 -94 -64 -111 -106 -12 -27 -14 -280 -14 -1440 l0 -1407 21 -44 c13 -26 38 -54 62 -70 l41 -27 585 -3 c389 -2 598 0 622 7 49 15 86 45 109 92 20 37 20 65 20 1454 0 1370 -1 1417 -19 1453 -23 46 -46 67 -94 87 -31 13 -115 15 -614 14 -318 0 -592 -5 -608 -10z"/></g></svg>';
  
  // Listening for a "click" event
  themeSwitcher.addEventListener("click", function (e) {
    e.preventDefault();
    if (localStorage.getItem("plus-theme") === "light") {
      patchCSS("dark");
    } else if (localStorage.getItem("plus-theme") === "dark") {
      patchCSS("abyss");
    } else if (localStorage.getItem("plus-theme") === "abyss"){
      patchCSS("light");
    }else{
      patchCSS("light")
    }
  });

  colorSwitcher.addEventListener('click', function (e) {
    e.preventDefault();
    if(localStorage.getItem("colorimetrie") === 'true') {
      patchColor('false')
    }else if(localStorage.getItem("colorimetrie") === 'false') {
      patchColor('true')
    }else {
      patchColor('false')
    }
  })

  // Append the button. Patched the double button bug
  if(!document.getElementById("theme-switcher")){
    document
    .getElementsByClassName("menu-commandes")[0]
    .appendChild(themeSwitcher);
  }

  if(!document.getElementById("color-switcher")){
    document
    .getElementsByClassName("menu-commandes")[0]
    .appendChild(colorSwitcher);
  }

  // * Part 2 of init : Loop page patching.
  setInterval(function () {
    /**
     * Global patches to pronote
     */
    function patch() {
      // Homepage Patching
      if (document.getElementsByClassName("precedenteConnexion").length > 0) {
        document.querySelectorAll(`[id*="_date_"]`).forEach((date) => {
          date.style.color = "purple";
        });

        // Note patching
        document.querySelectorAll(".as-info").forEach((note) => {
          if(localStorage.getItem("colorimetrie") === 'false') {
            if (note.style.borderRadius !== "5px") {
              // Checking if it is already patched
              if (note.innerText.includes("/")) {
                const noteDonnee = parseFloat(note.innerText.replace(",", ".").split("/")[0], 10);
                const bareme = parseFloat(note.innerText.split("/")[1], 10);
                const convertedNote = parseFloat((noteDonnee / bareme) * 20);
                note.style.borderRadius = "5px";
                note.style.fontSize = "12px";
  
                if (convertedNote < 10) {
                  note.style.backgroundColor = "var(--notebg-red)";
                  note.style.border = "var(--noteborder-red)"
                  note.style.color = "var(--notetext)";
                } else if (convertedNote >= 15) {
                  note.style.backgroundColor = "var(--notebg-dg)";
                  note.style.border = "var(--noteborder-dg)"
                  note.style.color = "var(--notetext)";
                } else if (convertedNote > 13) {
                  ote.style.backgroundColor = "var(--notebg-lg)";
                  note.style.border = "var(--noteborder-lg)"
                  note.style.color = "var(--notetext)";
                } else if (convertedNote < 13) {
                  note.style.backgroundColor = "var(--notebg-y)";
                  note.style.border = "var(--noteborder-y)"
                  note.style.color = "var(--notetext)";
                }
                if(!note.innerHTML.includes("<br>")) {
                  note.innerHTML = `${note.innerHTML}<br>( ${convertedNote}<span class="bareme"> /20</span> )`;
                }
              } else {
                note.style.borderRadius = "5px";
                note.style.fontSize = "12px";
                const noteDonnee = parseFloat(note.innerText, 10);
                if(isNaN(noteDonnee)) {
                  note.style.backgroundColor = "var(--notebg-gray)";
                  note.style.border = "var(--noteborder-gray)"
                  note.style.color = "var(--notetext)";
                }
                if(note.innerHTML.includes("bareme")) {
                  note.innerHTML = `${note.innerText}<span class="bareme"> /20</span>`;
                }
                if (noteDonnee < 10) {
                  note.style.color = "#ff6161";
                } else if (noteDonnee >= 15) {
                  note.style.backgroundColor = "var(--notebg-dg)";
                  note.style.border = "var(--noteborder-dg)"
                  note.style.color = "var(--notetext)";
                } else if (noteDonnee > 13) {
                  note.style.backgroundColor = "var(--notebg-lg)";
                  note.style.border = "var(--noteborder-lg)"
                  note.style.color = "var(--notetext)";
                } else if (noteDonnee < 13) {
                  note.style.backgroundColor = "var(--notebg-y)";
                  note.style.border = "var(--noteborder-y)"
                  note.style.color = "var(--notetext)";
                }
              }
          } 
          }else{
            note.style = ""
            note.innerText = note.innerText
          }
        });
      }

      // Account patch
      if (document.getElementsByClassName("compte-conteneur").length > 0) {
        patchPageCSS("nopage");
      }

      // Settings patch
      if (document.getElementsByClassName("icon_mobile_phone").length > 0) {
        patchPageCSS("nopage");
        if (document.querySelectorAll("#useful-info").length < 1) {
          // Adding useful info in the bottom of the settings page
          console.log("Patching useful info");
          const usefulInfo = document.createElement("div");
          usefulInfo.id = "useful-info";
          usefulInfo.class = ".pu_zone";
          usefulInfo.innerHTML = /*html*/ `
                        <div class="WhiteSpaceNormal InlineBlock Gras AlignementHaut" id="useful-info" style="color:black; padding: 10px; margin-top: 20px;">
                            <span class="GrandEspaceDroit CarteCompteZoneGenerique_Title">Informations pratiques</span>
                        </div>
                        <div class="InlineBlock" style="color:black; padding: 10px; border-radius: 1rem !important; margin-bottom: 10px">
                            <span>
                                <strong>Contacter Index Education :</strong>
                                <br>
                                - Adresse Postale : Index Éducation CS 90001 13388 Marseille CEDEX 13
                                <br>
                                - Téléphone : <a href="tel:"+33496152170">+33 (0)4 96 15 21 70</a> (Appel non surtaxé)
                                <br>
                                - Contacter par <a href="https://www.index-education.com/fr/assistance-email.php" target="_BLANK">Email</a>
                            </span>
                        </div>
                        <br>
                        <br>
                        <div class="InlineBlock" style="color:black; padding: 10px; border-radius: 1rem !important; margin-bottom: 10px">
                        <span>
                            <strong>Victime de harcèlement ?</strong>
                            <br>
                            - Numéro d'écoute confidentiel (harcèlement / cyberharcèlement) : <a href="tel:"3020">30 20</a> <strong>(Service et appel gratuits)</strong>
                            <br>
                            - Application d'aide contre le cyberharcèlement : <a href="https://apps.apple.com/us/app/3018/id1602242493" target="_BLANK">IOS</a> | <a href="https://play.google.com/store/apps/details?id=org.eenfance.android.app3018" target="_BLANK">ANDROID</a>
                            <br>
                            - En cas de pensées suicidaires ou autodestructrices, des numéros peuvent vous aider : (SOS Amitié) : <a href="tel:"0972394050">09 72 39 40 50</a> <strong>(Prix d'un appel local)</strong>
                        </span>
                        <br>
                    </div>
                    <br>
                    <br>
                    <div class="InlineBlock" style="color:black; padding: 10px; border-radius: 1rem !important; margin-bottom: 10px">
                        <span>
                            <strong>A propos de Pronote+ (Firefox)</strong>
                            <br>
                            -👨‍💻Développé et maintenu par <strong><a href="https://github.com/Adloya" target="_BLANK">Adloya</a> </strong> et <strong><a href="https://github.com/Malolamgo" target="_BLANK">Malolam21</a> </strong>
                            <br>
                            - 🖇 Liens : <a href="https://github.com/Adloya/PronotePlus">Github</a> | <a href="https://addons.mozilla.org/fr/firefox/addon/pronoteplus/">Firefox page</a>
                            <br>
                            - ℹ️ Version ${localStorage.getItem("pplus-current-version")}
                        </span>
                        <br>
                    </div>
                    `;
          document.getElementsByClassName("bloc-identite")[0].innerHTML +=
            usefulInfo.innerHTML;
          const image = document.getElementsByClassName("ie-imgviewer")[0];

          console.log(image.getAttribute("data-src"));

          image.src = image.getAttribute("data-src") + "&reload=" + Date.now();
        }
      }

      // Documents patch
      if (
        document.getElementsByClassName("objetBandeauEntete_thirdmenu")[0]
          .children[0].innerText === "Je télécharge mes documents"
      ) {
        patchPageCSS("nopage");
      }

      // Resources patch
      if (
        document.getElementsByClassName("conteneur-ressourcePeda").length > 0
      ) {
        if (!document.getElementsByClassName("icon_time").length > 0) {
          patchPageCSS("nopage");
        }
      }

      // Homework patch
      if (document.getElementsByClassName("icon_time").length > 0) {
        if (!document.getElementsByClassName("icon_asterisk").length > 0) {
          patchPageCSS("nopage");
        }
      }

      // EDT/Calendar patch
      if (document.getElementsByClassName("Calendrier_Boutons").length > 0) {
        patchPageCSS("nopage");

        let pasts = document.getElementsByClassName("PastilleRessource");
        // let etiq = document.getElementsByClassName("EtiquetteCours");

        // for (let i = 0; i < etiq.length; i++) {
        //   if(!etiq.length === 0) {
        //     let e = etiq[i].style
        //     console.log(e)
        //     if(toString(etiq[i].style).includes("blue")) {
        //       etiq[i].style = "color: blue !important;"
        //     }else if(toString(etiq[i].style).includes("rgb(192, 0, 0)")) {
        //       etiq[i].style.color = "color: rgb(192, 0, 0) !important;"
        //     }
        //   }
        // }

        for (let i = 0; i < pasts.length; i++) {
          pasts[i].style = "" 
        }
      }

      // Messages patch
      if (
        document.getElementsByClassName("ilm-listeEtiqu-deploiement").length > 0
      ) {
        patchPageCSS("nopage");
      }

      // Recap patch
      if (document.getElementsByClassName("icon_time").length > 0) {
        if (document.getElementsByClassName("icon_asterisk").length > 0) {
          patchPageCSS("nopage");
        }
      }

      // Notes patch
      if (
        document.getElementsByClassName("DonneesListe_DernieresNotes").length >
        0
      ) {
        patchPageCSS("nopage");
        
      }

      // Comp patch
      if (
        document.getElementsByClassName("icon_competence_absent").length > 0
      ) {
        patchPageCSS("nopage");
      }
    }

    patch();
  }, 10);
}, 1500);
