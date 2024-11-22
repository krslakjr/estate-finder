document.addEventListener('DOMContentLoaded', function () {
    const detaljiDiv = document.getElementById('detalji');
  
    if (detaljiDiv) {
      const nekretninaId = localStorage.getItem('nekretninaId');
  
      if (!nekretninaId) {
        console.error('Nedostaje ID nekretnine u localStorage.');
        return;
      }
  
  
      // Dohvati detalje o nekretnini
      PoziviAjax.getNekretnineById(nekretninaId, async (error, nekretnina) => {
        console.log('Nakon dohvata detalja o nekretnini');
        if (error) {
          console.error('Greška prilikom dohvatanja detalja o nekretnini:', error);
          return;
        }
  
  
        try {
          const upiti = await new Promise((resolve, reject) => {
            PoziviAjax.getUpitiByNekretninaId(nekretninaId, (error, data) => {
              if (error) {
                console.error('Greška prilikom dohvatanja upita:', error);
                reject(error);
              } else {
                resolve(data);
              }
            });
          });
  
          console.log('Nakon dohvata upita za nekretnine');
  
          // Dobij upite
          const upitiHtml = upiti.map(upit => `<p><b>Korisnik:</b> ${upit.korisnik_id} <br> <b>Upit:</b> ${upit.tekst_upita}</p>`).join('');
  
          // Provjerite je li korisnik prijavljen
          provjeriStatusPrijave((error, korisnikPrijavljen) => {
            if (error) {
              console.error('Greška prilikom provere statusa prijave:', error);
              return;
            }
  
            // Popuni elemente na stranici detalji.html s podacima iz nekretnina i upita
            detaljiDiv.innerHTML = `
              <h3>OSNOVNE INFORMACIJE</h3>
              <p><b>Naziv:</b> ${nekretnina.naziv}</p>
              <p><b>Kvadratura:</b> ${nekretnina.kvadratura} m²</p>
              <p><b>Cijena:</b> ${nekretnina.cijena} BAM</p>
  
              <h3>DETALJI</h3>
              <p><b>Tip grijanja:</b> ${nekretnina.tip_grijanja}</p>
              <p><b>Godina izgradnje:</b> ${nekretnina.godina_izgradnje}</p>
              <p><b>Lokacija:</b> ${nekretnina.lokacija}</p>
              <p><b>Datum objave:</b> ${nekretnina.datum_objave}</p>
              <p><b>Opis:</b> ${nekretnina.opis}</p>
  
              <h3>UPITI</h3>
              ${upitiHtml}
              
              ${korisnikPrijavljen ? `
                <div id="postavi-upit-container" style="text-align: center; margin-top: 20px;">
                  <input type="text" id="tekst_upita" name="tekst_upita" placeholder="Unesite upit">
                  <button onclick="postaviUpit()">Potvrdi</button>
                </div>` : ''}
            `;
          });
        } catch (error) {
          console.error('Greška prilikom dohvatanja upita:', error);
        }
      });
    }
  });
  


// Funkcija za proveru statusa prijave korisnika putem AJAX-a
function provjeriStatusPrijave(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "/get-login-status");
  
    ajax.onreadystatechange = function () {
      if (ajax.status === 200 && ajax.readyState === 4) {
        const odgovor = JSON.parse(ajax.responseText);
        fnCallback(null, odgovor.isLoggedIn);
      } else if (ajax.readyState === 4) {
        fnCallback(ajax.statusText, null);
      }
    };
  
    ajax.send();
  }
  
