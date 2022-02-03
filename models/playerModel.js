import dbConnect from "../config/dbConfig.js";
import Joi from "joi";



const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    Gamer_tag: Joi.string().min(2).max(20).presence(presence),
    email : Joi.string().email().presence(presence),
    password: Joi.string().min(10).max(50).presence(presence),
  }).validate(data, {abortEarly: false})
}

const getAll = () => {
  return new Promise((resolve, reject) => {
  dbConnect.query("SELECT * FROM player", (err, results) => {
    if (err) reject(err);
    else resolve(results);
  })
})
}

const getOne = (id) => {
  return new Promise ((resolve, reject) => {
dbConnect.query("SELECT * FROM player WHERE id = ?", id, (err, result) => {
  if (err) reject (err);
  else resolve(result);
})
})
}

const getByEmail = (email) => {
  return new Promise ((resolve, reject) => {
dbConnect.query("SELECT * FROM player WHERE email = ?", email, (err, result) => {
  if (err) reject (err);
  else resolve(result[0]);
})
})
}

const create = (player) => {
  const {
    Gamer_tag, email, password
  } = player;
  return new Promise((resolve, reject) => {
    dbConnect.query('INSERT INTO player ( Gamer_tag, email, password) VALUES (?,?,?)', [Gamer_tag, email, password], (err, results) => {
if (err) reject (err)
else resolve(results.insertId);
    })
  })
}

const update = (body, id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('UPDATE player SET ? WHERE id = ?', [body, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  })
}

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('DELETE FROM player WHERE id = ?', [id], (err, result) => {
      if(err) reject(err);
      else resolve(result.affectedRows);
    })
  })
}

export default { validate, getAll, getOne, getByEmail, create, update, deleteById }