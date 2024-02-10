const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'reservation'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection: ' + err.stack);
      return;
    }
    console.log('Database connection closed');
  });
});

// Démarrage du serveur Express
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Afficher table client 
app.get('/client', (req, res) => {
    connection.query('SELECT * FROM reservation.client', (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des clients :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des clients' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
// Afficher table agent d'accueil
app.get('/agent', (req, res) => {
    connection.query('SELECT * FROM reservation.agent_d_accueil', (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des agents d\'accueil :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des agents d\'accueil' });
      } else {
        res.status(200).json(results);
      }
    });
});

// Afficher table facture 
app.get('/facture', (req, res) => {
    connection.query('SELECT * FROM reservation.facture', (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des factures :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des factures' });
      } else {
        res.status(200).json(results);
      }
    });
});

