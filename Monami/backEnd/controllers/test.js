const { User, Room } = require('../models');
const Sequelize = require('sequelize');
const { get } = require('../routers/gameReadyRouter');
const Op = Sequelize.Op;
async()=>{
const room = await Room.findOne({
    order: [['id', 'DESC']],
  })
  console.log(room);
}