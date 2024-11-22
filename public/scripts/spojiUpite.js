function postaviUpit() {
    // Dobavite vrednosti iz input polja
    const nekretninaId = localStorage.getItem('nekretninaId');
    var tekst_upita = document.getElementById("tekst_upita").value;
  
    // Pozovite funkciju za slanje upita
    PoziviAjax.postUpit(nekretninaId, tekst_upita, function(err, result) {
      if (err) {
        if (err === 'Unauthorized') {
          console.error('Neautorizovan pristup. Korisnik nije prijavljen.');
        } else {
          console.error('Greška prilikom slanja upita:', err);
        }
      } else {
        location.reload();
      }
    });
  }
  