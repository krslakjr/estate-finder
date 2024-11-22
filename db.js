// db.js

const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(
  'wt24',
  'root',
  'password',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
db.models = {};

const Nekretnina = require('./public/models/Nekretnina')(sequelize, Sequelize);
const Korisnik = require('./public/models/Korisnik')(sequelize, Sequelize);
const Upit = require('./public/models/Upit')(sequelize, Sequelize);


db.models.Nekretnina = Nekretnina;
db.models.Korisnik = Korisnik;
db.models.Upit = Upit;

db.models.Upit.belongsTo(db.models.Nekretnina, {foreignKey: 'nekretnina_id'});
db.models.Upit.belongsTo(db.models.Korisnik, {foreignKey : 'korisnik_id'});
db.models.Korisnik.hasMany(db.models.Upit, { foreignKey: 'korisnik_id' });
db.models.Nekretnina.hasMany(db.models.Upit, { foreignKey: 'nekretnina_id' });

const seedDatabase = async () => {
  try {
    console.log('Connected to the database');

    // Brisanje svih redova iz tablice 'Nekretnina' prije ubacivanja novih podataka
    await Nekretnina.destroy({ where: {} });

    // Ubaci podatke putem novog bulkInsert poziva
    await sequelize.getQueryInterface().bulkInsert('Nekretnina', [
      {
        id: 1,
        tip_nekretnine: 'Stan',
        naziv: 'Stan Sarajevo Novo Sarajevo 83a',
        kvadratura: 83,
        cijena: 419900,
        tip_grijanja: 'centralno grijanje',
        lokacija: 'Novo Sarajevo, Sarajevo Tower',
        godina_izgradnje: 2012,
        datum_objave: '28.10.2023.',
        opis: 'Prodaje se UKNJIŽEN luksuzan stan površine 83,5 m2 u modernoj stambenoj zgradi sa osam liftova u naselju Pofalići, Općina Novo Sarajevo. Stan se sastoji od dnevnog boravka - uređen stilskim namještajem, trpezarije koja se nalazi u sklopu dnevnog boravka i kuhinje; spavaće sobe sa izlazom na balkon; master spavaće sobe sa kupatilom i izlazom na balkon; kupatila i hodnika. Obzirom da je stan novije gradnje, vanjska stolarija je PVC, dok je unutrašnja drvena. Pod je obložen parketom i keramikom. Ulazna vrata su blindirana. Stan posjeduje isočnu orijentaciju. Više informacija možete dobiti na vlastiti upit.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        tip_nekretnine: 'Stan',
        naziv: 'Stan Sarajevo Novi grad 47b',
        kvadratura: 47,
        cijena: 210000,
        tip_grijanja: 'centralno grijanje',
        lokacija: 'Novi grad, Dobrinja',
        godina_izgradnje: 2019,
        datum_objave: '28.10.2023.',
        opis: "Prodaje se manji dvosoban stan površine 46.66 kvadratnih metara smješten u Sarajevu, na području Dobrinje. Stan se nalazi u novoizgrađenom objektu Bella Casa, sa ograđenim dvorištem, orijentisan je ka zapadu, a sadrži dnevni boravak, sa trpezarijom, kuhinjom, kupatilo i jednu spavaću sobu, na donjoj etaži, i dvije odvojene galerijske prostorije za spavanje na gornjoj etaži. Stan je u potpunosti opremljen svim neophodnim kućanskim električnim uređajima, klima uređajem i opremljen je sistemom centralnog grijanja na gas.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
      tip_nekretnine: 'Stan',
      naziv: "Stan Sarajevo Novo Sarajevo 78g",
      kvadratura: 78,
      cijena: 450000,
      tip_grijanja: "centralno grijanje",
      lokacija: "Novo Sarajevo, Grbavica",
      godina_izgradnje: 1995,
      datum_objave: "29.10.2023.",
      opis: "Prodaje se trosoban, komforan i dvostrano orijentisan stan, uknjižene površine 78 metara kvadratnih, u naselju Grbavica - stambeno-poslovna zgrada LORIS. Lokacija stana je izvrsna i poželjna za stanovanje iz razloga što je Grbavica idealna za porodicu, zbog dosta zelenila koje je okružuje, kao i ostalih infrastrukturnih objekata neophodnih za život. Ovaj komforan stan, sa dva balkona, se sastoji od dnevnog boravka,trpezarije, kuhinje, dvije spavaće sobe, toaleta, kupatila, hodnika i ostave. U blizini stana se nalazi veliki javni parking koji mogu budući vlasnici koristiti.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 4,
        tip_nekretnine: "Stan",
      naziv: "Stan Sarajevo Centar 93a",
      kvadratura: 93,
      cijena: 750000,
      tip_grijanja: "",
      lokacija: "Centar, Skenderija",
      godina_izgradnje: 2005,
      datum_objave: "30.10.2023.",
      opis: "Prodaje se luksuzan stan od 93 kvadratna metara. Sastoji se od dvije spavaće sobe, prostranog i svijetlog dnevnog boravka,,trpezarije, kuhinje, kupaonice, toaleta i ostave. Smješten je u kvalitetno opremljenoj zgradi izgrađenoj 2005. godine u centru Sarajeva, na području Skenderije, u neposrednoj blizini Njemačke , Grčke i Ambasade EU Delegacije. Zgrada je pod video nadzorom, a svaka stambena jedinica je opremljena video interfonom, dok rezervni baterijski sistem obezbeđuje napajanje u slučaju nestanka struje. Opremljen je klima-uređajem. Sav ugradbeni namještaj ostaje u stanu.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 5,
        tip_nekretnine: "Stan",
      naziv: "Stan Sarajevo Centar 40a",
      kvadratura: 40,
      cijena: 90000,
      tip_grijanja: "",
      lokacija: "Centar, Koševo",
      godina_izgradnje: 2008,
      datum_objave: "30.10.2023.",
      opis: " Prodaje se dvosoban stan, površine 40 kvadratnih metara, sa balkonom i pogledom na termalne bazene lječilišta Reumal, a koji je smješten u okviru Apartmanskog naselja Hotela Reumal u Fojnici. Stan predstavlja zasebnu etažiranu stambenu jedinicu sa parking mjestom ispred objekta, u cjelosti je južne orijentacije i sadrži: dnevni boravak sa kuhinjom i trpezarijom i izlazom na balkon,spavaću sobu, prostrano kupatilo i ulazni hol. Više informacija možete dobiti na vlastiti zahtjev.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 6,
      tip_nekretnine: "Stan",
      naziv: "Stan Sarajevo Centar 66d",
      kvadratura: 66,
      cijena: 314900,
      tip_grijanja: "centralno grijanje",
      lokacija: "Centar, Ciglane",
      godina_izgradnje: 2008,
      datum_objave: "31.10.2023.",
      opis: " Prodaje se stan površine 66 metara kvadratnih sa pripadajućim dvorištem površine 52 metra kvadratna, te natkrivenom terasom (8 m2) i vanjskom ostavom (2 m2). Stan se nalazi na najljepšem dijelunaselja Ciglane - Merhemića trg. U neposrednoj blizini stana je zelena pijaca Ciglane, mnoštvo restorana i kafića; nekoliko domaćih i internacionalnih škola; veliki javni parking i zajednička gradska garaža koja se plaća. Stan je odlično povezan gradskim javnim prevozom sa drugim dijelovima Grada, a samo 10-ak minuta pješice od glavne ulice i zgrade Predsjedništva BiH. U neposrednoj blizini stana su bolnice; teniski, fudbalski tereni i rekreaciona zona; te Zoološki vrt Pionirska dolina.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 7,
        tip_nekretnine: "Kuca",
      naziv: "Kuca Sarajevo Stari Grad 350c",
      kvadratura: 359,
      cijena: 250000,
      tip_grijanja: "",
      lokacija: "Stari Grad, Bistrik",
      godina_izgradnje: 2010,
      datum_objave: "01.11.2023.",
      opis: "Prodaje se starija kuća sa okućnicom na Bistriku, općina Stari Grad. Uredno uknjižena sa svim pratećim instalacijama (voda, struja, plin) uslovna za stanovanje. Sastoji se od tri odvojene stambene jedinice sa zasebnim ulazom. Stambena površina cca 130 m2, ukupne površine placa 359 m2. Nalazi se u neposrednoj blizini Trebevićke žičare, a u podnožiju stare Bistričke Stanice sa prekrasnim pogledom na grad. Laganim hodom 10min udaljena od Baščaršije.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 8,
        tip_nekretnine: "Kuca",
      naziv: "Kuca Sarajevo Stari Grad 138a",
      kvadratura: 138,
      cijena: 630000,
      tip_grijanja: "centralno grijanje, kamin",
      lokacija: "Stari Grad, Bašćaršija",
      godina_izgradnje: 2013,
      datum_objave: "02.11.2023.",
      opis: "Prodaje se kuća, potpuno opremljena namještajem, sa dvije spavaće sobe, površine 138 kvadratnih metara stambenog prostora, koja je smještena u Sarajevu, na području Baščaršije.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 9,
        tip_nekretnine: "Kuca",
      naziv: "Kuca Sarajevo Donji Hotonj 247a",
      kvadratura: 247,
      cijena: 695000,
      tip_grijanja: "centralno grijanje",
      lokacija: "Vogošća, Donji Hotonj",
      godina_izgradnje: 2011,
      datum_objave: "01.11.2023.",
      opis: " NOVA CIJENA! Prodaje se renovirana kuća sa pet spavaćih soba, površine 220 kvadratnih metara, izgrađena na zemljišnom placu,površine cca 1184 kvadratnih metara, smještena u Hotonju, 6 km od centra Sarajeva. Kuća je smještena na zemljišnom placu površine 1184 kvadratnih metara, koji je u cjelosti ograđen i kultivisan.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 10,
        tip_nekretnine: "Kuca",
      naziv: "Kuca Sarajevo Centar 300e",
      kvadratura: 300,
      cijena: 620000,
      tip_grijanja: "",
      lokacija: "Centar, Poljine",
      godina_izgradnje: 2013,
      datum_objave: "02.11.2023.",
      opis: "Imamo zadovoljstvo predstaviti vam ovu impozantnu rezidencijalnu kuću dostupnu za prodaju . S površinom od otprilike 300 kvadratnih metara, ova kuća pruža obilje prostora, luksuza i udobnosti za vas i vašu porodicu. Kuća dolazi potpuno namještena, spremna za vaš udoban dolazak. Bez brige oko opremanja prostora. U prizemlju kuće nalazi se odvojeni stan koji uključuje dnevni boravak, kuhinju,kupatilo i jednu prostranu spavaću sobu.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 11,
        tip_nekretnine: "Kuca",
      naziv: "Kuca Sarajevo Centar 189a",
      kvadratura: 189,
      cijena: 599000,
      tip_grijanja: "",
      lokacija: "Centar, Koševsko brdo",
      godina_izgradnje: 2000,
      datum_objave: "03.11.2023.",
      opis: "Prodaje se veoma lijepa, porodična kuća, uknjižene površine 189 kvadratnih metara (stvarna neto korisna površina objekta bez dvorišta iznosi cca 220 m2), smještena na Koševskom brdu, jednom od najljepših rezidencijalnih dijelova Sarajeva. Objekat je izgrađen planskom gradnjom početkom 1980-ih godina i karakteriše ga izuzetan kvalitet gradnje.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 12,
        tip_nekretnine: "Kuca",
      naziv: "Kuca Sarajevo Centar 243a",
      kvadratura: 170,
      cijena: 600000,
      tip_grijanja: "plin",
      lokacija: "Centar, Koševo",
      godina_izgradnje: 1970,
      datum_objave: "03.11.2023.",
      opis: " Prodaje se uknjižena kuća sa ukupno tri etaže, uknjižene kvadrature 70m2 sa manjim dvorištem na parceli površine 173m2, smještena na atraktivnoj lokaciji u Općini Centar Sarajevo,udaljena je samo nekoliko minuta hoda od ulice Bjelave i KCUS-a.Prema informaciji od vlasnika izgrađena je 1970ih. godina, nalazi se u izvornom stanju što budućim vlasnicima ostavlja mogućnost uređenja ili eventualne dogradnje u skladu sa ličnim potrebama.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 13,
        tip_nekretnine: "Poslovni prostor",
      naziv: "Poslovni prostor Sarajevo Novi Grad 800a",
      kvadratura: 800,
      cijena: 2700000,
      tip_grijanja: "plin",
      lokacija: "Novi grad",
      godina_izgradnje: 2002,
      datum_objave: "01.11.2023.",
      opis: "Prodaje se poslovni objekat uknjižene površine 800m2 u Općini Novi Grad Sarajevo. Ulica u kojoj je smješten objekat predstavlja jednu od frekventnijih mikro-lokacija u naselju sa velikim brojem stambenih, privrednih i administrativnih objekata. Lokalitet je prema svojoj namjeni pretežno industrijsko-poslovni sa velikim brojem objekata prodajne, uslužne, administrativne, skladišne i industrijske namjene.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 14,
        tip_nekretnine: "Poslovni prostor",
      naziv: "Poslovni prostor Sarajevo Centar",
      kvadratura: 171,
      cijena: 779000,
      tip_grijanja: "plin",
      lokacija: "Centar",
      godina_izgradnje: 1970,
      datum_objave: "29.10.2023.",
      opis: " PROSTOR Vam izdaje fiskalni račun za svaku uslugu! Vaša sigurnost je naša obaveza! Prodaje se dvoetažni poslovni prostor smješten na trećem spratu u ulici Branilaca Sarajeva u neposrednoj blizini Opštinskog Suda i Aria tržnog centra. Zgrada u kojoj je smještena nekretnina izgrađena je cca. 1970. godine i nalazi se u jako dobrom stanju. Kompletna adaptacija predmetne nekretnine bila je 2004. godine, a tokom godina je uredno i redovno održavana. Važno je napomenuti da vlasnik ostavlja kompletan kancelarijski namještaj budućim kupcima.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 15,
        tip_nekretnine: "Poslovni prostor",
      naziv: "Poslovni prostor Sarajevo Ciglane",
      kvadratura: 8,
      cijena: 45000,
      tip_grijanja: "centralno grijanje",
      lokacija: "Centar, Ciglane",
      godina_izgradnje: 1970,
      datum_objave: "03.11.2023.",
      opis: "PROSTOR Vam izdaje fiskalni račun za svaku uslugu! Vaša sigurnost je naša obaveza! Prodaje se multifunkcionalan poslovni prostor sa visokim portalima uknjižene površine 8m2 smješten u prizemlju poslovne zgrade na izrazito atraktivnoj lokaciji, u centralnom dijelu ulice Merhemića trg.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 16,
        tip_nekretnine: "Poslovni prostor",
      naziv: "Poslovni prostor Sarajevo Grbavica",
      kvadratura: 12,
      cijena: 45000,
      tip_grijanja: "",
      lokacija: "Novo Sarajevo, Grbavica",
      godina_izgradnje: 2002,
      datum_objave: "03.11.2023.",
      opis: "PROSTOR Vam izdaje fiskalni račun za svaku uslugu! Vaša sigurnost je naša obaveza! Prodaje se manji poslovni prostor sastavljen od jedne prostorije i toaleta uknjižene površine 12,88m2 smješten u prizemlju samostojećeg objekta. Poslovni prostor je u izvornom stanju te budućim kupcima pruža mogućnost adaptacije prema vlastitim preferencijama. Poslovni prostor se sastoji od jedne prostorije i toaleta. U neposrednoj blizini samog objekta smješten je veliki broj zajedničkih parking mjesta pa je korištenje automobila uveliko olakšano.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 17,
        tip_nekretnine: "Poslovni prostor",
      naziv: "Poslovni prostor Sarajevo Baščaršija",
      kvadratura: 10,
      cijena: 55000,
      tip_grijanja: "",
      lokacija: "Stari Grad, Bašćaršija",
      godina_izgradnje: 1982,
      datum_objave: "02.11.2023.",
      opis: "PROSTOR Vam izdaje fiskalni račun za svaku uslugu! Vaša sigurnost je naša obaveza! Prodaje se manji poslovni prostor uknjižene površine 10,15m2 smješten u prizemlju poslovnog centra u ulici Mula Mustafe Bašeskije, na Baščaršiji, u blizini Sebilja. Poslovni prostor se sastoji od jedne prostorije. Ima visoke portale i pogodan je za prodajne djelatnosti, uslužne djelatnosti, kancelariju i sl.",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {id: 18,
        tip_nekretnine: "Poslovni prostor",
      naziv: "Poslovni prostor Sarajevo Koševsko Brdo",
      kvadratura: 24,
      cijena: 820000,
      tip_grijanja: "",
      lokacija: "Centar, Koševsko brdo",
      godina_izgradnje: 1984,
      datum_objave: "30.10.2023.",
      opis: " PROSTOR Vam izdaje fiskalni račun za svaku uslugu! Vaša sigurnost je naša obaveza! Prodaje se poslovni prostor uknjižene površine 24m2 u prizemlju zgrade u ulici Nusreta Šišića Dede, naselje Koševsko Brdo, opština Centar. Lokaciju karakteriše visoka frekvencija pješačkog i automobilskog saobraćaja, što doprinosi njenom poslovnom potencijalu. Zgrada u kojoj se nalazi predmetna nekretnina izgrađena je 1984. godine.",
      createdAt: new Date(),
      updatedAt: new Date(),
      }
    ]);

    console.log('Seeder executed successfully');

// Brisanje svih redova iz tablice 'Korisnik' prije ubacivanja novih podataka
await Korisnik.destroy({ where: {} });

// Ubaci podatke putem bulkInsert poziva
await sequelize.getQueryInterface().bulkInsert('Korisnik', [
  {
    id: 1,
    ime: "Anesa",
    prezime: "Kršlak",
    username: "username1",
    password: "$2b$10$f.mal3IEhdZPYL0J3ZKUN.9/U/knQA9/Tu5QSPdteJbw1JLgTdJ2O",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
    password: "$2b$10$P5f6RJ18KBMiJx1bD7lsJOq/1amrcCeLcTp3KidWD2fpUwOHLsER2",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
], {});



    // Brisanje svih redova iz tablice 'Upit' prije ubacivanja novih podataka
    await Upit.destroy({ where: {} });
    
    // Ubaci podatke putem bulkInsert poziva
    await sequelize.getQueryInterface().bulkInsert('Upit', [
      {
        nekretnina_id: 1,
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { nekretnina_id: 1,
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        nekretnina_id: 2,
        korisnik_id: 1,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 2,
        korisnik_id: 2,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 3,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 3,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        nekretnina_id: 4,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 4,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 5,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 5,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 6,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 6,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        nekretnina_id: 7,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 7,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 8,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 8,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 9,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 9,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 10,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 10,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        nekretnina_id: 11,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 11,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 12,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 12,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 13,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 13,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 14,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 14,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 15,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 15,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 16,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 16,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 17,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 17,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 18,
        korisnik_id: 1,
        tekst_upita: "Koliko košta?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nekretnina_id: 18,
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
    
    console.log('Tabela "Upit" uspješno popunjena.');
  } catch (error) {
    console.error('Error executing seeder:', error);
  }
};

// Poveži se s bazom i pokreni sinhronizaciju
if (process.env.NODE_ENV !== 'production') {
  sequelize.authenticate()
    .then(() => {
      sequelize.sync()
        .then(() => seedDatabase())
        .catch((error) => {
          console.error('Error syncing the database:', error);
        });
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });
}

async function getNekretninaDetailsById(nekretninaId) {
  const nekretnina = await Nekretnina.findByPk(nekretninaId);
  return nekretnina;
}

async function getUpitiByNekretninaId(nekretninaId) {
  try {
    const upiti = await db.models.Upit.findAll({
      where: { nekretnina_id: nekretninaId },
      include: [
        { model: db.models.Nekretnina, attributes: ['naziv'] },
        { model: db.models.Korisnik, attributes: ['ime', 'prezime'] }
      ]
    });
    return upiti;
  } catch (error) {
    console.error('Error fetching upiti:', error);
    throw error;
  }
}

module.exports = {
  getNekretninaDetailsById,
  getUpitiByNekretninaId
};


module.exports = db;
