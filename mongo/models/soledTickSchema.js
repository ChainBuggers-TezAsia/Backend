const mongoose = require("mongoose");
const Theatre = require("./theatreSchema");
const Movie = require("./movieSchema");

require("../db");

const ticketSchema = new mongoose.Schema({
  seat: {
    type: String,
  },
  movie:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Movie"
  },
  theatre:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Theatre"
  },
  listed:{
    type:Boolean
  }
});


const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
