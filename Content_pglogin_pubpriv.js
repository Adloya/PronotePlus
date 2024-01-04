setTimeout(() => {
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "theme-link";

    // document.addEventListener('contextmenu', event => event.preventDefault());
    /**
     * Changes the CSS file to the one that matches the theme.
     * @param theme - The name of the theme to apply.
     */
     function patchCSS(theme) {
        if(theme === "light"){
            // Light Theme
            console.log("light")
            localStorage.setItem("plus-theme", "light")
            link.href = browser.runtime.getURL("css/pubpriv/light.css")
        }else if(theme === "dark"){
            // Dark Theme
            console.log("dark")
            localStorage.setItem("plus-theme", "dark")
            link.href = browser.runtime.getURL("css/pubpriv/dark.css")
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

    // Theme switcher
    let themeSwitcher = document.createElement("a");
    themeSwitcher.id = "theme-switcher";
    themeSwitcher.href = "#";
    themeSwitcher.title = "Changer de thème";
    themeSwitcher.innerHTML = "Changer de thème (Educonnect)";
    themeSwitcher.addEventListener("click", function(e){
        e.preventDefault();
        if(localStorage.getItem("plus-theme") === "light"){
            patchCSS("dark")
        }else if(localStorage.getItem("plus-theme") === "dark"){
            patchCSS("light")
        }else{
            patchCSS("light")
        }
    });

    document.body.appendChild(themeSwitcher);
}, 50);