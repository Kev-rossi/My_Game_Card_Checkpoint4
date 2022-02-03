import Players from "../models/playerModel.js";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
try {
const players = await Players.getAll();
res.json(players).status(200);
}catch (error) {
  res.json({ message: error.message}).status(500);
}
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Players.getOne(id)
  .then(player => {
    if (player[0]) res.status(200).json(player);
  else res.status(404).send('Not found, please check a id');
  }).catch(err => {
    res.status(500).json({error : err.message})
  })
})

router.get('/', (req, res)=> {
  const email = req.body.email;
  Players.getByEmail(email)
  .then(mail => {
    if (mail[0]) res.status(200).json(mail);
    else res.status(404).send('Not found, please check a valid email');
  }).catch(err => {
    res.status(500).json({error : err.message})
  })
})

router.post('/', (req, res) => {
  const {Gamer_tag, email, password} = req.body;
  const validValue = Players.validate({Gamer_tag, email, password});
if(validValue.error) return res.status(422).json({ error: "Invalid Values" })
else {
  Players.create(validValue.value)
  .then(id => {
    const createdPlayer = { id, ...validValue.value };
    res.status(201).json(createdPlayer);
  }).catch(err => {
    res.status(500).json({error : err.message})
  })
}
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const validValue = Players.validate(req.body, false);
  Players.update(validValue.value, id)
  .then(player => {
    if (player.affectedRows > 0) res.status(200).send('player update');
    else res.status(404).send('Not Found');
  }).catch(err => {
    res.status(500).json({ error : err.message})
  })
})

router.delete('/:id', (req, res) =>{
  const id = Number(req.params.id);
  Players.deleteById(id)
  .then(player => {
    if (player === 0) {
      res.status(500).send('Error for delete')
    } else {
      res.status(200).send('Deleted succesfully')
    }
  })
})

export default router;