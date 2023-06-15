var express = require('express');
var router = express.Router();
const mongoConnection = require('../mongo_connection');
let fs = require('fs');
const ruta_data_modulo ='/miproc/timestamps';

router.get('/', function(req, res, next) {
  res.status(200).send("API NODEJS - SO1 CLASE 7");
});

router.get('/timestampinfo', async function(req, res, next) {
  let data = fs.readFileSync(ruta_data_modulo, 'utf-8');
  console.log(data)
    try {
      const doc = JSON.parse(data)
      res.status(200).json(doc);
    } catch(err) {
      res.status(500).json({ message: "Error en al obtener timestamp"+err });
    } finally {
      await mongoConnection.close();
    }
});

router.post('/save', async function(req, res) {
  console.log(req.body);
  try {
    await mongoConnection.connect();
    const database = mongoConnection.db("prueba");
    const coleccion = database.collection("data");
    const result = await coleccion.insertOne(req.body);

    res.status(200).json({ message: `Json insertada en la base de datos con el _id: ${result.insertedId}`});
  } catch (err) {
    res.status(500).json({ message: "Error en la conexion de la base de datos"+err });
  } finally {
    await mongoConnection.close();
  }
});

router.post('/delete', async function(req, res) {
  console.log(req.body);
  try {
    await mongoConnection.connect();
    const database = mongoConnection.db("prueba");
    const coleccion = database.collection("data");
    const result = await coleccion.deleteOne({ _id: req.body._id});

    res.status(200).json({ message: `Json eliminado _id: ${req.body._id}`});
  } catch (err) {
    res.status(500).json({ message: "Error en la conexion de la base de datos"+err });
  } finally {
    await mongoConnection.close();
  }
});

router.post('/update', async function(req, res) {
  console.log(req.body);
  try {
    await mongoConnection.connect();
    const database = mongoConnection.db("prueba");
    const coleccion = database.collection("data");
    const result = await coleccion.updateOne({ _id: req.body._id}, { $set: { nombre: req.body.nombre} });

    res.status(200).json({ message: `Json actualizado _id: ${req.body._id}`});
  } catch (err) {
    res.status(500).json({ message: "Error en la conexion de la base de datos"+err });
  } finally {
    await mongoConnection.close();
  }
});

router.get('/obtenerTodo', async function(req, res, next) {
  console.log(req.body)
  try {
    await mongoConnection.connect();
    const database = mongoConnection.db("prueba");
    const coleccion = database.collection("data");

    const cursor = coleccion.find({});
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
      res.status(500).json({ message: "Error! Documento no encontrado" });
    }
       
    var data = [];
    await cursor.forEach(
      element =>
      data.push(element)
    );
   
    res.status(200).send(data);

  } catch (err) {
    res.status(500).json({ message: "Error en la conexion de la base de datos"+err }); 
  } finally {
    await mongoConnection.close();
  }
});

router.get('/obtenerTodo2', async function(req, res, next) {
  console.log(req.body)
  try {
    await mongoConnection.connect();
    const database = mongoConnection.db("prueba");
    const coleccion = database.collection("data");
let edad = parseInt(req.query.edad);
    const cursor = coleccion.find({edad: edad});
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
      res.status(500).json({ message: "Error! Documento no encontrado " + edad });
    }
       
    var data = [];
    await cursor.forEach(
      element =>
      data.push(element)
    );
   
    res.status(200).send(data);

  } catch (err) {
    res.status(500).json({ message: "Error en la conexion de la base de datos"+err }); 
  } finally {
    await mongoConnection.close();
  }
});

router.get('/obtenerTodo3', async function(req, res, next) {
  console.log(req.body)
  try {
    await mongoConnection.connect();
    const database = mongoConnection.db("prueba");
    const coleccion = database.collection("data");
let edad = parseInt(req.query.edad);
    const cursor = coleccion.find({edad: { $gte: edad}});
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
      res.status(500).json({ message: "Error! Documento no encontrado " + edad });
    }
       
    var data = [];
    await cursor.forEach(
      element =>
      data.push(element)
    );
   
    res.status(200).send(data);

  } catch (err) {
    res.status(500).json({ message: "Error en la conexion de la base de datos"+err }); 
  } finally {
    await mongoConnection.close();
  }
});

module.exports = router;