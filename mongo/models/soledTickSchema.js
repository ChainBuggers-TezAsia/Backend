const mongoose = require("mongoose");
const Theatre = require("./theatreSchema");
const Movie = require("./movieSchema");
const User = require("./userSchema");

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
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  listed:{
    type:Boolean
  }
});


const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
