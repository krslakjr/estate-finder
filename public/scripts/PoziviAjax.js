const PoziviAjax = (() => {
    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null
    // vraća korisnika koji je trenutno prijavljen na sistem
    function impl_getKorisnik(fnCallback) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "/korisnik");
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
      
        ajax.onreadystatechange = function() {
          if (ajax.status === 200 && ajax.readyState === 4) {
            fnCallback(null, JSON.parse(ajax.responseText));
          } else if (ajax.readyState === 4) {
            fnCallback(ajax.statusText, null);
          }
        };
    }
    // ažurira podatke loginovanog korisnika
    function impl_putKorisnik(fnCallback) {
        var ajax = new XMLHttpRequest();
        ajax.open("PUT", "/korisnik");
        ajax.setRequestHeader("Content-Type", "application/json");

        // Koristite objekat za slanje podataka
        var data = {
                ime: ime,
                prezime: prezime,
                username: username,
                password: password,
        };

        ajax.send(JSON.stringify(data));

        ajax.onreadystatechange = function() {
        if (ajax.status === 200 && ajax.readyState === 4) {
        fnCallback(null, JSON.parse(ajax.responseText));} 
        else if (ajax.readyState === 4) {
      fnCallback(ajax.statusText, null);}
  };
    }
    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/upit");
    ajax.setRequestHeader("Content-Type", "application/json");

    // Koristite objekat za slanje podataka
    var data = {
    nekretnina_id: nekretnina_id,
    tekst_upita: tekst_upita,
    };

    ajax.send(JSON.stringify(data));

    ajax.onreadystatechange = function() {
    if (ajax.status === 200 && ajax.readyState === 4) {
      fnCallback(null, JSON.parse(ajax.responseText));
    } else if (ajax.readyState === 4) {
      fnCallback(ajax.statusText, null);
    }
  };
    }
    function impl_getNekretnine(fnCallback) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "/nekretnine");
        ajax.setRequestHeader("Content-Type", "application/json");
        
      
        ajax.onreadystatechange = function() {
          if (ajax.status === 200 && ajax.readyState === 4) {
            fnCallback(null, JSON.parse(ajax.responseText));
          } else if (ajax.readyState === 4) {
            fnCallback(ajax.statusText, null);
          }
        };
        ajax.send();
    }
    function impl_postLogin(username, password, fnCallback) {
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "/login");
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({username:username,password:password}));
        ajax.onreadystatechange = function() {
            if (ajax.status == 200 && ajax.readyState == 4){
                fnCallback(null, ajax.responseText);
            }
            else if (ajax.readyState == 4){
                fnCallback(ajax.statusText,null);
            }
        }
    }
    function impl_postLogout(fnCallback) {
      var ajax = new XMLHttpRequest();
      ajax.open("POST", "/logout");
      ajax.onload = function() {
          if (ajax.status == 200 && ajax.readyState == 4){
              fnCallback();
              
              // Dodajte redirekciju nakon odjave
              console.log("Redirecting to /html/nekretnine.html");
              window.location.href = "../html/nekretnine.html";
          }
          else if (ajax.readyState == 4){
              fnCallback(ajax.statusText, null);
          }
      }
      ajax.send();
  }

  function impl_getUpitiByNekretninaId(nekretnina_id, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", `/upiti/${nekretnina_id}`);
    ajax.setRequestHeader("Content-Type", "application/json");

    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            const upiti = JSON.parse(ajax.responseText);
            console.log(upiti); // Dodajte ovu liniju
            if (upiti && Array.isArray(upiti)) {
                fnCallback(null, upiti);
            } else {
                fnCallback('Pogrešan format podataka', null);
            }
        } else if (ajax.readyState === 4) {
            fnCallback(ajax.statusText, null);
        }
    };

    ajax.send();
}




function impl_getNekretninaById(nekretnina_id, fnCallback) {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "/nekretnina/" + nekretnina_id);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send();

  ajax.onreadystatechange = function () {
      if (ajax.status === 200 && ajax.readyState === 4) {
          fnCallback(null, JSON.parse(ajax.responseText));
      } else if (ajax.readyState === 4) {
          fnCallback(ajax.statusText, null);
      }
  };
}

  
    return {
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getKorisnik: impl_getKorisnik,
    putKorisnik: impl_putKorisnik,
    postUpit: impl_postUpit,
    getNekretnine: impl_getNekretnine,
    getUpitiByNekretninaId: impl_getUpitiByNekretninaId,
    getNekretnineById : impl_getNekretninaById
    };
    })();