const express = require('express');
const router = express.Router();
const Teams = require('../models/teams');
const cors = require('cors')



// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

router.options('*',cors({
  allowedOrigins: [
      '*'
  ]
}));

// Rota para obter todos os team
router.get('/', async (req, res, next) => {
  try {
    const team = await Teams.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um teams por ID
router.get('/:id', getTeams, (req, res, next) => {
  res.json(res.teams);
});

// Rota para criar um novo teams
router.post('/', async (req, res, next) => {
  const teams = new Teams({
    nome_team: req.body.nome_team,
    coach: req.body.coach,
    president: req.body.president,
    stadium: req.body.stadium,
    city: req.body.city,
    team_shield: req.body.team_shield,
  });

  try {
    const newTeams = await teams.save();
    res.status(201).json(newTeams);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um teams por ID
router.put('/:id', getTeams, async (req, res, next) => {
  if (req.body.nome_team != null) {
    res.teams.nome_team = req.body.nome_team;
  }
  if (req.body.coach != null) {
    res.teams.coach = req.body.coach;
  }
  if (req.body.president != null) {
    res.teams.president = req.body.president;
  }
  if (req.body.stadium != null) {
    res.teams.stadium = req.body.stadium;
  }
  if (req.body.city != null) {
    res.teams.city = req.body.city;
  }
  if (req.body.team_shield != null) {
    res.teams.team_shield = req.body.team_shield;
  }

  try {
    const updatedTeams = await res.teams.save();
    res.json(updatedTeams);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

 
// Rota para excluir um teams por ID
router.delete('/:id', cors(), getTeams, async (req, res, next) => {
  try {
    await res.teams.deleteOne();
    res.json({ message: 'Time excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTeams(req, res, next) {
  try {
    const teams = await Teams.findById(req.params.id);
    if (teams == null) {
      return res.status(404).json({ message: 'Time não encontrado' });
    }
    res.teams = teams;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
