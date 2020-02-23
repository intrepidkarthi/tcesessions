const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const powers = [
   { id: 1, name: 'flying' },
   { id: 2, name: 'teleporting' },
   { id: 3, name: 'super speed' },
   { id: 4, name: 'invisible'},
   { id: 5, name: 'mind reading' }
];

const heroes = [
   {
       id: 1,
       type: 'flying-machine',
       displayName: 'Iron man',
       powers: [1, 4],
       img: 'ironman.png',
       busy: false
   },
   {
       id: 2,
       type: 'combat-attack',
       displayName: 'Black widow',
       powers: [2, 5],
       img: 'blackwidow.png',
       busy: false
   },
   {
       id: 3,
       type: 'green-light-side',
       displayName: 'Green lantern',
       powers: [3, 2],
       img: 'greenlantern.png',
       busy: false
   },
   {
       id: 4,
       type: 'spider-dog',
       displayName: 'Spiderman',
       powers: [1, 5],
       img: 'spiderman.png',
       busy: false
   }
];

app.get('/heroes', (req, res) => {
   console.log('Returning heroes list');
   res.send(heroes);
});

app.get('/powers', (req, res) => {
   console.log('Returning powers list');
   res.send(powers);
});

app.post('/hero/**', (req, res) => {
   const heroId = parseInt(req.params[0]);
   const foundHero = heroes.find(subject => subject.id === heroId);

   if (foundHero) {
       for (let attribute in foundHero) {
           if (req.body[attribute]) {
               foundHero[attribute] = req.body[attribute];
               console.log(`Set ${attribute} to ${req.body[attribute]} in hero: ${heroId}`);
           }
       }
       res.status(202).header({Location: `http://127.0.0.1:${port}/hero/${foundHero.id}`}).send(foundHero);
   } else {
       console.log(`Hero not found.`);
       res.status(404).send();
   }
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Heroes service listening on port ${port}`);
app.listen(port);
