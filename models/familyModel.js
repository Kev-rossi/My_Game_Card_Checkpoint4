import dbConnect from "../config/dbConfig.js";
import Joi from 'joi';

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    name: Joi.string().min(2).max(225).presence(presence),
    country : Joi.string().min(2).max(225).presence(presence),
    capacity: Joi.number().integer().presence(presence),
  }).validate(data, {abortEarly: false})
}

const getAll = () => {
  return new Promise((resolve, reject) => {
  dbConnect.query("SELECT * FROM family", (err, results) => {
    if (err) reject(err);
    else resolve(results);
  })
})
}

const getOne = (id) => {
  return new Promise ((resolve, reject) => {
dbConnect.query("SELECT * FROM family WHERE id = ?", id, (err, result) => {
  if (err) reject (err);
  else resolve(result);
})
})
}

const create = (family) => {
  const {
    name, country, capacity
  } = family;
  return new Promise((resolve, reject) => {
    dbConnect.query('INSERT INTO family ( name, country, capacity) VALUES (?,?,?)', [name, country, capacity], (err, results) => {
if (err) reject (err)
else resolve(results.insertId);
    })
  })
}

const update = (body, id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('UPDATE family SET ? WHERE id = ?', [body, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  })
}

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('DELETE FROM family WHERE id = ?', [id], (err, result) => {
      if(err) reject(err);
      else resolve(result.affectedRows);
    })
  })
}

export default { getAll, getOne, create, validate, update, deleteById }