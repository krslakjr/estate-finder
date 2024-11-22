let lastSuccessfulCall = null;
let trenutniDetaljiContainer = null;

document.addEventListener('DOMContentLoaded', () => {
   PoziviAjax.getNekretnine((error, data) => {
    if (error) {
        console.error('Greška prilikom dohvata nekretnina:', error);
    } else {
        // Inicijalizacija modula s dohvaćenim podacima
        nekretnineModul = new SpisakNekretnina();
        nekretnineModul.init(data, []); // Nema korisnika za sada
          

          // Pozivanje funkcije za svaki tip nekretnine
          spojiNekretnine('Stan', nekretnineModul, "Stan");
          spojiNekretnine('Kuca', nekretnineModul, "Kuca");
          spojiNekretnine('Pp', nekretnineModul, "Poslovni prostor");
          // Postavljanje slušača na dugme za pretragu
          const pretragaBtn = document.getElementById('pretragaBtn');
          if (pretragaBtn) {
              pretragaBtn.addEventListener('click', function () {
                  filtrirajNekretnine();
              });
          }
      }
  });
});


  
  function filtrirajNekretnine() {
    const minCijenaInput = document.getElementById('minCijena');
    const maxCijenaInput = document.getElementById('maxCijena');
    const minCijena = minCijenaInput.value.trim() !== '' ? parseInt(minCijenaInput.value) : undefined;
    const maxCijena = maxCijenaInput.value.trim() !== '' ? parseInt(maxCijenaInput.value) : undefined;
    const minKvadraturaInput = document.getElementById('minKvadratura');
    const maxKvadraturaInput = document.getElementById('maxKvadratura');
    const minKvadratura = minKvadraturaInput.value.trim() !== '' ? parseInt(minKvadraturaInput.value) : undefined;
    const maxKvadratura = maxKvadraturaInput.value.trim() !== '' ? parseInt(maxKvadraturaInput.value) : undefined;

    // Pozivamo funkciju za filtriranje sa odgovarajućim kriterijumima
    const kriterijumi = {
        min_cijena: parseInt(minCijena),
        max_cijena: parseInt(maxCijena),
        min_kvadratura: parseInt(minKvadratura),
        max_kvadratura: parseInt(maxKvadratura),
    };

    const rezultati = nekretnineModul.filtrirajNekretnine(kriterijumi);

    // Filtriranje i ispisivanje rezultata u odgovarajuće gridove
    spojiNekretnine('Stan', nekretnineModul, kriterijumi);
    spojiNekretnine('Kuca', nekretnineModul, kriterijumi);
    spojiNekretnine('Pp', nekretnineModul, kriterijumi);

}

function spojiNekretnine(idDivReferenca, instancaModula, kriterijumi) {
    const divReferenca = document.getElementById(idDivReferenca);

    if (divReferenca === null) {
        console.error(`Element sa ID "${idDivReferenca}" nije pronađen.`);
        return;
    }

    if (!instancaModula || typeof instancaModula.filtrirajNekretnine !== 'function') {
        console.error('Instanca modula nije pravilno inicijalizovana ili nema metodu filtrirajNekretnine.');
        return;
    }

    const filtriraneNekretnine = instancaModula.filtrirajNekretnine(kriterijumi);

    // Uklonite postojeće elemente
    while (divReferenca.firstChild) {
        divReferenca.removeChild(divReferenca.firstChild);
    }

    filtriraneNekretnine.forEach(nekretnina => {
        const nekretninaDiv = document.createElement("div");

        // Dodajte klase ili stilove prema tipu nekretnine
        if (nekretnina.tip_nekretnine === 'Stan') {
            nekretninaDiv.className = 'grid-item';
        } else if (nekretnina.tip_nekretnine === 'Kuca') {
            nekretninaDiv.className = 'grid-item2';
        } else if (nekretnina.tip_nekretnine === 'Poslovni prostor' && idDivReferenca === 'Pp') {
            nekretninaDiv.className = 'grid-item3';
        }

        nekretninaDiv.innerHTML = `
            <p class="text-left"><b>Naziv:</b> ${nekretnina.naziv}</p>
            <p class="text-left"><b>Kvadratura:</b> ${nekretnina.kvadratura} m²</p>
            <p class="text-right">Cijena:<b>${nekretnina.cijena} BAM</b> </p>
            <button data-nekretnina-id="${nekretnina.id}">Detalji</button>
            <div class="detalji-container" style="display: none;">
        <!-- Dodajte ovdje dodatne detalje koje želite prikazati -->
        <p>Lokacija: ${nekretnina.lokacija}</p>
        <p>Godina izgradnje: ${nekretnina.godina_izgradnje}</p>
        <button class="otvoriDetalje" data-target="detalji.html" data-nekretnina-id="${nekretnina.id}">Otvori detalje</button>
    </div>
        `;

        // Provera da li je tip nekretnine jednak tipu koji očekujemo
        if (nekretnina.tip_nekretnine === idDivReferenca || (nekretnina.tip_nekretnine === 'Poslovni prostor' && idDivReferenca === 'Pp')) {
            divReferenca.appendChild(nekretninaDiv);
        }
   
        const detaljiButton = nekretninaDiv.querySelector('button');
        const detaljiContainer = nekretninaDiv.querySelector('.detalji-container');
    
        detaljiButton.addEventListener('click', () => {
            // Sakrij trenutni detalji-container ako postoji
            if (trenutniDetaljiContainer) {
                trenutniDetaljiContainer.style.display = 'none';
            }
    
            // Postavi trenutni detalji-container na novi
            trenutniDetaljiContainer = detaljiContainer;
    
            // Prikaži ili sakrij detalji-container
            detaljiContainer.style.display = detaljiContainer.style.display === 'none' ? 'block' : 'none';

        });
    

        const otvoriDetaljeButton = nekretninaDiv.querySelector('.otvoriDetalje');

        otvoriDetaljeButton.addEventListener('click', () => {
            const target = otvoriDetaljeButton.dataset.target;
            const nekretninaId = nekretnina.id;
        
            localStorage.setItem('nekretninaId', nekretninaId);
        
            window.location.href = target;
        });



    });
}
