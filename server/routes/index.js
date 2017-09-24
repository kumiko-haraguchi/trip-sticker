const express = require('express');
const router = express.Router();
const app = express();

module.exports = (services)=> {
  /* GET sticker lists */
  router.get('/', async function(req, res) {
    console.log('env', process.env.DATABASE_URL)

    // try {
    //   console.log('req start', req)
    //   let stickers = await services.db.stickers.list();
    //   console.log('after db', stickers)
    //   stickers = stickers.map((sticker) => sticker.serialize());
    //   console.log('after seriarize', stickers)
    //   res.status(200).send(stickers);
    // } catch(err) {
    //   console.error('error', err)
    //   res.status(400).send(err.message);
    // }
  });

  /* POST sticker data */
  router.post('/', async function(req, res) {
    try {
      let sticker = await services.db.stickers.create(req.body);
      res.status(200).send(sticker);
    } catch(err) {
      res.status(400).send(err.message);
    }
  });

  /* PUT sticker data */
  router.put('/', async function(req, res) {
    try {
      let sticker = await services.db.stickers.update(req.body);
      res.status(200).send(sticker);
    } catch(err) {
      res.status(400).send(err.message);
    }
  });

  /* DELETE sticker data */
  router.delete('/', async function(req, res) {
    try {
      let deletedId = await services.db.stickers.delete(req.body);
      res.status(200).send(deletedId);
    } catch(err) {
      res.status(400).send(err.message);
    }
  });

  return router;
}

