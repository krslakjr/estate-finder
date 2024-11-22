let SpisakNekretnina = function () {
    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];
  
    //implementacija metoda
    let init = function (nekretnine, korisnici) {
      listaNekretnina = nekretnine;
      listaKorisnika = korisnici;
    };
    
  
    let filtrirajNekretnine = function (kriterij) {
      // Ako kriterijum nije prosleđen ili je prazan objekt, vraćamo sve nekretnine
      if (!kriterij || Object.keys(kriterij).length === 0) {
        return listaNekretnina;
      }
    
      // Provera i konverzija vrednosti za cenu
      let minCijena = isNaN(kriterij.min_cijena) ? Number.MIN_VALUE : parseInt(kriterij.min_cijena);
      let maxCijena = isNaN(kriterij.max_cijena) ? Number.MAX_VALUE : parseInt(kriterij.max_cijena);
    
      // Filtriranje na osnovu kriterijuma
      let filtriraneNekretnine = listaNekretnina.filter(nekretnina => {
        // Filtriranje po tipu nekretnine
        if (kriterij.tip_nekretnine && nekretnina.tip_nekretnine !== kriterij.tip_nekretnine) {
          return false;
        }
    
        // Filtriranje po kvadraturi
        if (kriterij.min_kvadratura && nekretnina.kvadratura < kriterij.min_kvadratura) {
          return false;
        }
    
        if (kriterij.max_kvadratura && nekretnina.kvadratura > kriterij.max_kvadratura) {
          return false;
        }
    
        // Filtriranje po ceni
        if (minCijena && nekretnina.cijena < minCijena) {
          return false;
        }
    
        if (maxCijena && nekretnina.cijena > maxCijena) {
          return false;
        }
    
        // Ako nekretnina zadovoljava sve uslove, vraćamo true
        return true;
      });
      return filtriraneNekretnine;
    };
      
  
    let ucitajDetaljeNekretnine = function (id) {
      // Pronađi nekretninu sa datim ID-em
      let trazenaNekretnina = listaNekretnina.find(nekretnina => nekretnina.id === id);
      // Provera da li je nekretnina pronađena
      if (trazenaNekretnina) {
        return trazenaNekretnina;
      } else {
        return null; // ili neku drugu vrednost koja označava da nekretnina nije pronađena
      }
    };
  
    return {
      init: init,
      filtrirajNekretnine: filtrirajNekretnine,
      ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    };
  };
  