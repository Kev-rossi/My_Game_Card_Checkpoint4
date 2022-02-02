import dbConnect from '../config/dbConfig.js';
import Joi from 'joi';

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    name: Joi.string().min(2).max(225).presence(presence),
    image: Joi.string().max(225).presence(presence),
    description: Joi.string().min(1).max(225).presence(presence),
    defence: Joi.number().integer().presence(presence),
    powerfull: Joi.number().integer().presence(presence),
    protection: Joi.number().integer().presence(presence),
    attack: Joi.number().integer().presence(presence),
    logo_family: Joi.string().min(1).max(225).presence(presence),
    id_Families: Joi.number().integer().presence(presence),
  }).validate(data, {abortEarly: false})
}

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query('SELECT * FROM card', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    })
  })
};

const getOne = (id) => {
  return new Promise((resolve, reject) => {
   dbConnect.query('SELECT * FROM card WHERE id = ?', id, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  })
})
};

const create = (card) => {
  const {
    name, image, description, defence, powerfull, protection, attack, logo_family, id_Families
  } = card;
  return new Promise((resolve, reject) => {
    dbConnect.query('INSERT INTO card ( name, image, description, defence, powerfull, protection, attack, logo_family, id_Families) VALUES (?,?,?,?,?,?,?,?,?)', [name, image, description, defence, powerfull, protection, attack, logo_family, id_Families], (err, results) => {
if (err) reject (err)
else resolve(results.insertId);
    })
  })
}

const update = (body, id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('UPDATE card SET ? WHERE id = ?', [body, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  })
}

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('DELETE FROM card WHERE id = ?', [id], (err, result) => {
      if(err) reject(err);
      else resolve(result.affectedRows);
    })
  })
}










export default { getAll, getOne, create, update, deleteById, validate }