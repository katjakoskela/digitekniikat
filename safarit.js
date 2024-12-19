fetch('https://raw.githubusercontent.com/katjakoskela/digitekniikat/refs/heads/main/safarit.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (responseJson) {
    // Kutsutaan funktiota ja välitetään sille JSON-vastaus
    safarit(responseJson)
  })
  .catch(function (error) {
    document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan </p>" + error;
  });

function safarit(data) {
  var teksti = "";

  // Näytetään paikkavalinnan jälkeen safarit
  document.getElementById("vastaus").innerHTML = teksti;

  // Paikkojen napit
  document.getElementById("leviButton").addEventListener("click", function () {
    naytaSafarit(data, "Levi");
  });
  document.getElementById("yllasButton").addEventListener("click", function () {
    naytaSafarit(data, "Ylläs");
  });
  document.getElementById("kilpisjarviButton").addEventListener("click", function () {
    naytaSafarit(data, "Kilpisjärvi");
  });

  function naytaSafarit(data, paikka) {
    var teksti = "";

    // Muodostetaan lista safareista valitun paikan mukaan
    var safarit = data.husky_safaris.filter(function (safari) {
      return safari.location.toLowerCase() === paikka.toLowerCase();
    });

    for (var i = 0; i < safarit.length; i++) {
      teksti = teksti + "<h3>" + safarit[i].name + "</h3>";
      teksti = teksti + "<p>Paikka: " + safarit[i].location + "</p>";
      teksti = teksti + "<p>Ajankohdat: " + safarit[i].dates.join(", ") + "</p>";
      teksti = teksti + "<p>Hinta: " + safarit[i].price.child + " €" + " - " + safarit[i].price.adult + " €/henkilö" + "</p>";
      teksti = teksti + "<p>Kesto: " + safarit[i].duration + "</p>";
      teksti = teksti + "<p>" + safarit[i].description + "</p>";
      teksti = teksti + "<p> <a href='" + safarit[i].url + "' target='_blank'>Lisätietoja</a></p>";
    }

    // Tulostetaan safarit
    document.getElementById("vastaus").innerHTML = teksti;
  }
}
