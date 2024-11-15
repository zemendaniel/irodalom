const arr = [
    {
        nev: 'Balassi Bálint',
        korszak: 'reformáció',
        szerelem1: 'Losonczy Anna',
        szerelem2: 'Dobó Krisztina'},
    {
        nev: 'Csokonai Vitéz Mihály',
        korszak: 'felvilágosodás',
        szerelem1: 'Vajda Juliána'},
    {
        nev: 'Petőfi Sándor',
        korszak: 'magyar romantika',
        szerelem1: 'Mednyánszky Berta',
        szerelem2: 'Szendrey Júlia'},
    {
        nev: 'Ady Endre',
        korszak: '20. század',
        szerelem1: 'Léda',
        szerelem2: 'Csinszka',
    }
];

const headers = ["Költő", "Korszak", "Szerelme"];

updateTable();

createForm();

handleCheckbox();
