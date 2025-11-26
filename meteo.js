// clé pour weatherstack //
const API_KEY = "7c5cfcd883e2d1be2f589128ee43ff1e";

// information demandé dans le HTML //
const meteoForm = document.getElementById("meteo-form"); // lancement du formulaire //

const cityInput = document.getElementById("city"); // utilisation de la ville demandé // 


// information demandé au sites pour remplir le tableaux //

const climatCell = document.getElementById("climat");

const temperatureCell = document.getElementById("temperature");

const humiditeCell = document.getElementById("humidite");

const ventCell = document.getElementById("vent");




//chargement des information aupres de weatherstack + ajout d'un message d'erreur si la ville est introuvable //
function chargerMeteo(ville) {
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(ville)}&units=m`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Ville introuvable.");
                return;
            }

            // demande l'information du temps//
            climatCell.textContent = data.current.weather_descriptions[0];
            //  demande l'information de la temperature //
            temperatureCell.textContent = data.current.temperature + " °C";
            // demande l'information de taux d'humidité //
            humiditeCell.textContent = data.current.humidity + " %";
            // demande l'information la vitesse des vents //
            ventCell.textContent = data.current.wind_speed + " km/h";
        })
        // Indiqué
        .catch(error => {
            alert("Erreur réseau !");
            console.error(error);
        });
}
//constante pour les mises à jours//
let derniereVille = null;

// lancement du formulaire après appuis sur le bouton//
meteoForm.addEventListener("submit", function (event) {
    //emêcher la mise a jour de la page automatique //
    event.preventDefault(); 
    //recuperation de la ville tapé//
    const ville = cityInput.value.trim(); 

    if (ville === "") {
        alert("Quelle est ta ville ?");
        return; 
        //si non remplis ne pas mettre a jours//
    }

    // besoin pour mise à jour automatique d'une constante//
    derniereVille = ville;

    
    chargerMeteo(ville);
});



// mise à jour toute les heure //
setInterval(function() {
    if (derniereVille !== null) {
        // utilise la derniere ville utilisé si à été remplis //
        chargerMeteo(derniereVille); 
    }
}, 3600 * 1000); 
//temps en seconde//