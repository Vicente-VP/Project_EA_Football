const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  nome_team: {
    type: String,
    required: true,
  },
  coach: {
    type: String,
    required: true,
  },
  president: {
    type: String,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  team_shield: {
    type: String,
    required: true,
  },
});

const Teams = mongoose.model('Teams', teamSchema);

module.exports = Teams;
