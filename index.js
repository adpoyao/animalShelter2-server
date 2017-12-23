'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {PORT, CLIENT_ORIGIN} = require('./config');
const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

const catShelter = [{
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
},
{
  imageURL:'http://www.briarwoodanimalhospital.com/wp-content/uploads/sites/28/2016/08/hairballcats.jpg',
  imageDescription: 'Gray cat lying on its back with crown of head on the floor, looking back.',
  name: 'Belly Button',
  sex: 'Male',
  age: 3,
  breed: 'Mutt',
  story: 'A cat who loves to lie on his back with a tummy itching for a rubbing.'
},
{imageURL:'https://data.whicdn.com/images/15566661/original.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Agnes',
  sex: 'Female',
  age: 1,
  breed: 'Mutt',
  story: 'Perfect crazy cat lady starter kit'
}];
const dogShelter = [{
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
},
{
  imageURL: 'http://images6.fanpop.com/image/photos/33500000/Cute-Dog-dogs-33531442-450-475.jpg',
  imageDescription: 'A brown puppy covered in snow powder.',
  name: 'Chione',
  sex: 'Male',
  age: 1,
  breed: 'Retriever',
  story: 'Lost its wintry home due to global warming'
},
{
  imageURL: 'https://1funny.com/wp-content/uploads/2011/03/dog-mail.jpg',
  imageDescription: 'A small, indoor terrier with chewed up mails and mail shreds trailing from front door\'s mail slot.',
  name: 'Mercury',
  sex: 'Male',
  age: 4,
  breed: 'Terrier',
  story: 'Loves to deliver (and destroy) your daily mails!'
}];

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cat', (req, res) => {
  res.json(catShelter[0]);
});

app.get('/api/dog', (req, res) => {
  res.json(dogShelter[0]);
});

app.delete('/api/cat', (req, res) => {
  catShelter.shift();
  res.status(204).end();
});

app.delete('/api/dog', (req, res) => {
  dogShelter.shift();
  res.status(204).end();
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = {app};
