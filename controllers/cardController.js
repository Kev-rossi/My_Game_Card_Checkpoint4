import express from "express";
import Cards from "../models/cardModel.js";

const router = express.Router();

router.get('/', (req, res) => {
  Cards.getAll()
  .then(card => {
    res.json(card);
  }).catch(err => {
    res.status(500).json({error : err.message})
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Cards.getOne(id)
  .then(card => {
    if (card[0]) res.status(200).json(card);
    else res.status(404).send('Not Found, please check the id');
  }).catch(err => {
    res.status(500).json({error: err.message})
  })
})

router.post('/', (req, res) => {
const { name,  image, description, defence, powerfull, protection, attack, logo_family, id_Families } = req.body;
  const validValue = Cards.validate({ name,  image, description, defence, powerfull, protection, attack, logo_family, id_Families });
if(validValue.error) return res.status(422).json({ error: "Invalid Values" })
else {
  Cards.create(validValue.value)
  .then(id => {
    const createdCard = { id, ...validValue.value };
    res.status(201).json(createdCard);
  }).catch(err => {
    res.status(500).json({error : err.message})
  })
}
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const validValue = Cards.validate(req.body, false);
  Cards.update(validValue.value, id)
  .then(card => {
    if (card.affectedRows > 0) res.status(200).send('card update');
    else res.status(404).send('Not Found');
  }).catch(err => {
    res.status(500).json({ error : err.message})
  })
})

router.delete('/:id', (req, res) =>{
  const id = Number(req.params.id);
  Cards.deleteById(id)
  .then(card => {
    if (card === 0) {
      res.status(500).send('Error for delete')
    } else {
      res.status(200).send('Deleted succesfully')
    }
  })
})

export default router;