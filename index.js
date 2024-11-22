const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const fs = require('fs');
const db = require('./db.js');
const { Sequelize } = require('sequelize');
const app = express();
const port = 3000;

// Postavljanje statičkih direktorija za HTML i CSS datoteke
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);


// Varijabla za praćenje trenutnog stanja prijave korisnika
let loggedInUser = null;


// Rutiranje za stranicu prijave
app.get('/detalji.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'detalji.html'));
});

// Rutiranje za stranicu prijave
app.get('/nekretnine.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'nekretnine.html'));
});

// Rutiranje za stranicu prijave
app.get('/profil.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'profil.html'));
});


app.get('/meni.html', (req, res) => {
  // Provjerite je li korisnik prijavljen
  if (loggedInUser) {
    res.sendFile(path.join(__dirname, 'public', 'html', 'meni_loggedin.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'html', 'meni_loggedout.html'));
  }
});

// Rutiranje za stranicu prijave
app.get('/prijava.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'prijava.html'));
});

app.get('nekretnine.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'nekretnine.html'));
});

// Rutiranje za login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const korisnik = await db.models.Korisnik.findOne({
      where: { username: username }
    });

    if (korisnik && bcrypt.compareSync(password, korisnik.password)) {
      req.session.username = username;
      loggedInUser = username;
      console.log('Uspješna prijava');
      res.status(200).json({ poruka: 'Uspješna prijava' });
    } else {
      res.status(401).json({ greska: 'Neuspješna prijava' });
    }
  } catch (error) {
    console.error('Greška prilikom prijave:', error);
    res.status(500).json({ greska: 'Greška prilikom prijave' });
  }
});

// Rutiranje za POST zahtjev za odjavu
app.post('/logout', async (req, res) => {
  try {
    // Provjera je li korisnik prijavljen putem sesije
    if (req.session && req.session.username) {
      // Brisanje informacija iz sesije
      req.session.destroy(); // Uništite sesiju
      loggedInUser = null; // Dodajte ovu liniju
      res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
    } else {
      res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
  } catch (error) {
    console.error('Greška prilikom odjave korisnika:', error);
    res.status(500).json({ greska: 'Greška prilikom odjave korisnika', detalji: error.message });
  }
});




// Middleware za provjeru autorizacije
const provjeriAutorizaciju = (req, res, next) => {
  // Simulirajte provjeru autentifikacije, ovisno o vašoj implementaciji
  const korisnik = provjeriAutentifikaciju(req.headers.authorization);

  if (korisnik) {
    req.korisnik = korisnik;
    next();
  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
};
// PUT ruta za ažuriranje korisničkih podataka
app.put('/korisnik', provjeriAutorizaciju, async (req, res) => {
  try {
    // Provjerite je li korisnik prijavljen
    if (!req.session.username) {
      return res.status(401).json({ greska: 'Neautorizovan pristup' });
    }

    const { ime, prezime, username, password } = req.body;
    const korisnik = await db.models.Korisnik.findOne({
      where: { username: req.session.username }
    });

    // Ažuriranje samo onih polja koja su poslana u zahtjevu
    if (ime) korisnik.ime = ime;
    if (prezime) korisnik.prezime = prezime;
    if (username) korisnik.username = username;
    if (password) {
      // Heshirajte novi password prije nego ga spremite
      const hashedPassword = await bcrypt.hash(password, 10);
      korisnik.password = hashedPassword;
    }

    // Spremite ažuriranog korisnika u bazu
    await korisnik.save();

    res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
  } catch (error) {
    console.error('Greška prilikom ažuriranja korisničkih podataka:', error);
    res.status(500).json({ greska: 'Greška prilikom ažuriranja korisničkih podataka', detalji: error.message });
  }
});

// Funkcija za simulaciju provjere autentifikacije
async function provjeriAutentifikaciju(authorizationHeader) {
  try {
    if (!authorizationHeader || typeof authorizationHeader !== 'string') {
      throw new Error('Authorization header nije ispravan.');
    }

    // Dekodirajte token iz zaglavlja autorizacije (očekuje se u formatu "Basic base64(username:password)")
    const decodedCredentials = Buffer.from(authorizationHeader.split(' ')[1], 'base64').toString('utf-8');
    
    // Rasparširajte korisničko ime i lozinku
    const [username, password] = decodedCredentials.split(':');

    // Pronađite korisnika u bazi podataka prema korisničkom imenu i lozinci
    const korisnik = await db.models.Korisnik.findOne({
      where: { username: username, password: password }
    });

    return korisnik;
  } catch (error) {
    console.error('Greška prilikom provjere autentifikacije:', error);
    return null;
  }
}



//Ruta GET /nekretnine
app.get('/nekretnine', async (req, res) => {
  try {
    if (!db.models.Nekretnina) {
      throw new Error('Model Nekretnina nije definiran.');
    }

    const nekretnine = await db.models.Nekretnina.findAll();
    res.status(200).json(nekretnine);
  } catch (error) {
    console.error('Greška prilikom dohvata nekretnina:', error);
    res.status(500).json({ greska: 'Greška prilikom dohvata nekretnina', detalji: error.message });
  }
});


// Ruta GET /korisnik
app.get('/korisnik', async (req, res) => {
  try {
    if (!req.session.username) {
      return res.status(401).json({ greska: 'Korisničko ime nije pronađeno u sesiji' });
    }

    const korisnik = await db.models.Korisnik.findOne({
      where: { username: req.session.username }
    });

    if (korisnik) {
      res.status(200).json(korisnik);
    } else {
      res.status(404).json({ greska: 'Korisnik nije pronađen' });
    }
  } catch (error) {
    console.error('Greška prilikom čitanja podataka iz baze:', error);
    res.status(500).json({ greska: 'Greška prilikom čitanja podataka iz baze', detalji: error.message });
  }
});



app.post('/upit', provjeriAutorizaciju, async (req, res) => {
  try{
  // Provjeri je li korisnik prijavljen
  if (!req.session.username) {
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }

  const korisnikIme = req.session.username;
  const korisnik = await db.models.Korisnik.findOne({
    where: {username: korisnikIme}
  });
  const { nekretnina_id, tekst_upita } = req.body;
  const korisnikId = korisnik.id;

  try {
    // Provjerite je li nekretnina s danim ID-om postoji u bazi
    const nekretnina = await db.models.Nekretnina.findOne({
      where: { id: nekretnina_id }
    });

    if (!nekretnina) {
      return res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
    }

    // Dodajte novi upit u bazu
    const noviUpit = await db.models.Upit.create({
      korisnik_id: korisnikId,
      nekretnina_id: nekretnina.id,
      tekst_upita: tekst_upita,
    });

    res.status(200).json({ poruka: 'Upit je uspješno dodan' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ greska: 'Greška prilikom dodavanja upita u bazu', detalji: error.message });
  }
}catch(error){
  console.error('Greška prilikom ažuriranja korisničkih podataka:', error);
  res.status(500).json({ greska: 'Greška prilikom ažuriranja korisničkih podataka', detalji: error.message });
}
});

//Ruta za zadatak 2 cetvrte spirale : 
// Dodajte ovu rutu iznad svojih postojećih ruta
app.get('/nekretnina/:id', async (req, res) => {
  try {
    const nekretninaId = req.params.id;

    // Provjerite je li nekretnina s danim ID-om postoji u bazi
    const nekretnina = await db.models.Nekretnina.findOne({
      where: { id: nekretninaId }
    });

    if (!nekretnina) {
      return res.status(400).json({ greska: `Nekretnina sa id-em ${nekretninaId} ne postoji` });
    }

    // Vratite podatke o nekretnini u JSON formatu
    res.status(200).json(nekretnina);
  } catch (error) {
    console.error('Greška prilikom dohvata podataka o nekretnini:', error);
    res.status(500).json({ greska: 'Greška prilikom dohvata podataka o nekretnini', detalji: error.message });
  }
});
// Nova ruta za dohvat upita prema nekretnina_id
app.get('/upiti/:nekretnina_id', async (req, res) => {
  try {
    const nekretninaId = req.params.nekretnina_id;

    // Dohvatite upite prema nekretnina_id
    const upiti = await db.models.Upit.findAll({
      where: { nekretnina_id: nekretninaId }
    });

    res.status(200).json(upiti);
  } catch (error) {
    console.error('Greška prilikom dohvata upita:', error);
    res.status(500).json({ greska: 'Greška prilikom dohvata upita', detalji: error.message });
  }
});


//Za treći zadatak ruta :)

app.get('/get-login-status', (req, res) => {
  // Provjerite je li korisnik prijavljen i šaljete odgovarajući odgovor
  const isLoggedIn = isUserLoggedIn(req);
  res.json({ isLoggedIn });
});
const isUserLoggedIn = (req) => {
  return req.session && req.session.username !== undefined;
};






// Pokretanje servera
app.listen(port, () => {
  console.log(`Server sluša na http://localhost:${port}`);
});

