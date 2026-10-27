
const form = document.getElementById("destination-form");
const countryDropdown = document.getElementById("country");
const results = document.getElementById("results");

// Country codes and capital city coordinates


const countries = {
    "spain": {
        code: "ES", lat: 40.42, lon: -3.70,
        immigration: "https://www.exteriores.gob.es/",
        work: "https://www.exteriores.gob.es/"
    },
    "portugal": {
        code: "PT", lat: 38.72, lon: -9.14,
        immigration: "https://aima.gov.pt/",
        work: "https://aima.gov.pt/"
    },
    "france": {
        code: "FR", lat: 48.86, lon: 2.35,
        immigration: "https://www.france-visas.gouv.fr/en/",
        work: "https://www.france-visas.gouv.fr/en/activite-salariee"
    },
    "italy": {
        code: "IT", lat: 41.90, lon: 12.50,
        immigration: "https://vistoperitalia.esteri.it/home/en",
        work: "https://vistoperitalia.esteri.it/home/en"
    },
    "germany": {
        code: "DE", lat: 52.52, lon: 13.41,
        immigration: "https://www.make-it-in-germany.com/en/",
        work: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
    },
    "netherlands": {
        code: "NL", lat: 52.37, lon: 4.90,
        immigration: "https://ind.nl/en",
        work: "https://ind.nl/en/residence-permits/work"
    },
    "greece": {
        code: "GR", lat: 37.98, lon: 23.73,
        immigration: "https://migration.gov.gr/",
        work: "https://migration.gov.gr/"
    },
    "ireland": {
        code: "IE", lat: 53.35, lon: -6.26,
        immigration: "https://www.irishimmigration.ie/",
        work: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/"
    },
    "sweden": {
        code: "SE", lat: 59.33, lon: 18.07,
        immigration: "https://www.migrationsverket.se/English.html",
        work: "https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden.html"
    },
    "switzerland": {
        code: "CH", lat: 46.95, lon: 7.45,
        immigration: "https://www.sem.admin.ch/sem/en/home.html",
        work: "https://www.sem.admin.ch/sem/en/home/themen/arbeit.html"
    },
    "thailand": {
        code: "TH", lat: 13.76, lon: 100.50,
        immigration: "https://www.immigration.go.th/",
        work: "https://www.thaievisa.go.th/"
    },
    "japan": {
        code: "JP", lat: 35.68, lon: 139.69,
        immigration: "https://www.moj.go.jp/isa/",
        work: "https://www.moj.go.jp/isa/"
    },
    "south-korea": {
        code: "KR", lat: 37.57, lon: 126.98,
        immigration: "https://www.immigration.go.kr/",
        work: "https://www.immigration.go.kr/"
    },
    "malaysia": {
        code: "MY", lat: 3.14, lon: 101.69,
        immigration: "https://www.imi.gov.my/",
        work: "https://www.imi.gov.my/"
    },
    "singapore": {
        code: "SG", lat: 1.35, lon: 103.82,
        immigration: "https://www.ica.gov.sg/",
        work: "https://www.mom.gov.sg/passes-and-permits"
    },
    "united-arab-emirates": {
        code: "AE", lat: 24.45, lon: 54.38,
        immigration: "https://icp.gov.ae/",
        work: "https://u.ae/en/information-and-services/jobs"
    },
    "canada": {
        code: "CA", lat: 45.42, lon: -75.70,
        immigration: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
        work: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html"
    },
    "usa": {
        code: "US", lat: 38.90, lon: -77.04,
        immigration: "https://travel.state.gov/content/travel/en/us-visas.html",
        work: "https://www.uscis.gov/working-in-the-united-states"
    },
    "mexico": {
        code: "MX", lat: 19.43, lon: -99.13,
        immigration: "https://www.inm.gob.mx/",
        work: "https://www.inm.gob.mx/"
    },
    "costa-rica": {
        code: "CR", lat: 9.93, lon: -84.08,
        immigration: "https://www.migracion.go.cr/",
        work: "https://www.migracion.go.cr/"
    },
    "australia": {
        code: "AU", lat: -35.28, lon: 149.13,
        immigration: "https://immi.homeaffairs.gov.au/",
        work: "https://immi.homeaffairs.gov.au/visas/working-in-australia"
    },
    "new-zealand": {
        code: "NZ", lat: -41.29, lon: 174.78,
        immigration: "https://www.immigration.govt.nz/new-zealand-visas",
        work: "https://www.immigration.govt.nz/new-zealand-visas/options/work"
    },
    "south-africa": {
        code: "ZA", lat: -25.75, lon: 28.19,
        immigration: "https://www.dha.gov.za/",
        work: "https://www.dha.gov.za/"
    }
};

// Run when the user submits the form
form.addEventListener("submit", async function(event) {

    event.preventDefault();

    let country = countryDropdown.value;
    let countryName = countryDropdown.options[countryDropdown.selectedIndex].text;

    results.style.display = "block";
    results.textContent = "Loading information about " + countryName + "...";

    try {

        // Get general country information
        let countryResponse = await fetch(
            "https://countries.dev/alpha/" + countries[country].code
        );

        if (!countryResponse.ok) {
            throw new Error("Country information is unavailable");
        }

        let countryData = await countryResponse.json();

        // Get historical climate information for the capital
        let weatherAddress =
            "https://archive-api.open-meteo.com/v1/archive" +
            "?latitude=" + countries[country].lat +
            "&longitude=" + countries[country].lon +
            "&start_date=2025-01-01" +
            "&end_date=2025-12-31" +
            "&daily=temperature_2m_mean,precipitation_sum" +
            "&timezone=auto";

        let weatherResponse = await fetch(weatherAddress);
        let weatherData = null;

        if (weatherResponse.ok) {
            weatherData = await weatherResponse.json();
        }

        // Clear the loading message
        results.textContent = "";

        // Show the country flag
        let flag = document.createElement("img");

        // Use the country's two-letter code to show its flag
        flag.src = "https://flagcdn.com/w160/" +
        countries[country].code.toLowerCase() + ".png";

        flag.alt = "Flag of " + countryData.name;
        flag.width = 90;

        results.appendChild(flag);

        // Show the country name
        let heading = document.createElement("h2");
        heading.textContent = countryData.name;
        results.appendChild(heading);

        // Heading for country facts
        let factsHeading = document.createElement("h3");
        factsHeading.textContent = "Country facts ✏️";
        results.appendChild(factsHeading);

        // Show the capital city
        let capital = document.createElement("p");
        capital.textContent = "Capital: " + countryData.capital;
        results.appendChild(capital);

        // Show the currency
        let currency = document.createElement("p");

        if (countryData.currencies.length > 0) {
            currency.textContent =
                "Currency: " + countryData.currencies[0].name +
                " (" + countryData.currencies[0].code + ")";
        } else {
            currency.textContent = "Currency information unavailable.";
        }

        results.appendChild(currency);

        // Show the languages
        let languages = document.createElement("p");
        let languageNames = [];

        for (let i = 0; i < countryData.languages.length; i++) {
            languageNames.push(countryData.languages[i].name);
        }

        languages.textContent = "Languages: " + languageNames.join(", ");
        results.appendChild(languages);

        // Show the population
        let population = document.createElement("p");
        population.textContent =
            "Population: " + countryData.population.toLocaleString();
        results.appendChild(population);

        // Heading for climate information
        let climateHeading = document.createElement("h3");
        climateHeading.textContent = "Climate 🌤️";
        results.appendChild(climateHeading);

        // Show the capital city for the climate figures
        let climateCity = document.createElement("p");
        climateCity.textContent = "Climate in " + countryData.capital;
        results.appendChild(climateCity);

        if (weatherData && weatherData.daily) {

            let temperatures = weatherData.daily.temperature_2m_mean;
            let rainfall = weatherData.daily.precipitation_sum;

            let totalTemperature = 0;
            let temperatureDays = 0;
            let totalRainfall = 0;

            for (let i = 0; i < temperatures.length; i++) {
                if (temperatures[i] !== null) {
                    totalTemperature = totalTemperature + temperatures[i];
                    temperatureDays++;
                }
            }

            for (let i = 0; i < rainfall.length; i++) {
                if (rainfall[i] !== null) {
                    totalRainfall = totalRainfall + rainfall[i];
                }
            }

            if (temperatureDays > 0) {
                let averageTemperature = totalTemperature / temperatureDays;
                let temperatureText = document.createElement("p");

                temperatureText.textContent =
                    "Average temperature in 2025: " +
                    averageTemperature.toFixed(1) + " °C";

                results.appendChild(temperatureText);
            }

            let rainfallText = document.createElement("p");
            rainfallText.textContent =
                "Total rainfall in 2025: " + totalRainfall.toFixed(0) + " mm";

            results.appendChild(rainfallText);

        } else {
            let noClimate = document.createElement("p");
            noClimate.textContent = "Climate information is currently unavailable.";
            results.appendChild(noClimate);
        }

        // Add a section about safety
        let safetyHeading = document.createElement("h3");
        safetyHeading.textContent = "Is it safe?🔒";
        results.appendChild(safetyHeading);

        let safetyText = document.createElement("p");
        safetyText.textContent =
            "Read the latest UK government advice about safety, security and travel risks.";
        results.appendChild(safetyText);

        // Link to official UK travel advice
        let adviceLink = document.createElement("a");
        adviceLink.href =
            "https://www.gov.uk/foreign-travel-advice/" + country;
        adviceLink.textContent = "Read UK government travel advice";
        adviceLink.target = "_blank";
        adviceLink.rel = "noopener noreferrer";
        results.appendChild(adviceLink);

        // Add a note about the data
        let sourceNote = document.createElement("p");
        sourceNote.textContent =
            "Country facts: countries.dev. Climate: Open-Meteo historical data for 2025. " +
            "Climate figures describe the capital city, not the whole country.";

        results.appendChild(sourceNote);

        

        // Add a heading about moving to the country
        let movingHeading = document.createElement("h3");
        movingHeading.textContent = "Can I live there? 🏡";
        results.appendChild(movingHeading);

        // Add the immigration sentence
let movingText = document.createElement("p");

movingText.append("Check the official immigration rules ");

// Create a link called "here"
let immigrationLink = document.createElement("a");
immigrationLink.href = countries[country].immigration;
immigrationLink.textContent = "here";
immigrationLink.target = "_blank";
immigrationLink.rel = "noopener noreferrer";

movingText.appendChild(immigrationLink);

movingText.append(" to find out about visas and residency requirements.");

results.appendChild(movingText);

        // Add a section about working in the country
        let workHeading = document.createElement("h3");
        workHeading.textContent = "Can I work there? 💼";
        results.appendChild(workHeading);

        let workText = document.createElement("p");
        workText.textContent =
            "Check whether you need a work visa or permit to work in this country.";
        results.appendChild(workText);

        let workLink = document.createElement("a");
        workLink.href = countries[country].work;
        workLink.textContent = "Check work visa requirements";
        workLink.target = "_blank";
        workLink.rel = "noopener noreferrer";
        results.appendChild(workLink);

               
        // Show the cost of living compared with the UK
        let costHeading = document.createElement("h3");
        costHeading.textContent = "Cost of living compared with the UK 💷";
        results.appendChild(costHeading);

        let costLink = document.createElement("a");
        costLink.href =
            "https://getwherenext.com/embed/col?from=gb&to=" +
            countries[country].code.toLowerCase();
        costLink.textContent = "Compare costs with the UK";
        costLink.target = "_blank";
        costLink.rel = "noopener noreferrer";
        results.appendChild(costLink);



    } catch (error) {
        results.textContent = "Sorry, we couldn't load the information. Please try again.";
    }

});