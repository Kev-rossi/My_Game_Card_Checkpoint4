import express from "express";
import Families from "../models/familyModel.js";

const router = express.Router();

router.get('/', (req, res) => {
  Families.getAll()
  .then(card => {
    res.json(card);
  }).catch(err => {
    res.status(500).json({error : err.message})
  })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Families.getOne(id)
  .then(family => {
    if (family[0]) res.status(200).json(family);
  else res.status(404).send('Not found, please check a id');
  }).catch(err => {
    res.status(500).json({error : err.message})
  })
})

router.post('/', (req, res) => {
  const {name, country, capacity} = req.body;
  const validValue = Families.validate({ name, country, capacity });
if(validValue.error) return res.status(422).json({ error: "Invalid Values" })
else {
  Families.create(validValue.value)
  .then(id => {
    const createdFamily = { id, ...validValue.value };
    res.status(201).json(createdFamily);
  }).catch(err => {
    res.status(500).json({error : err.message})
  })
}
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const validValue = Families.validate(req.body, false);
  Families.update(validValue.value, id)
  .then(family => {
    if (family.affectedRows > 0) res.status(200).send('family update');
    else res.status(404).send('Not Found');
  }).catch(err => {
    res.status(500).json({ error : err.message})
  })
})

router.delete('/:id', (req, res) =>{
  const id = Number(req.params.id);
  Families.deleteById(id)
  .then(family => {
    if (family === 0) {
      res.status(500).send('Error for delete')
    } else {
      res.status(200).send('Deleted succesfully')
    }
  })
})

export default router;