const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
   name: String,
   abi: Object,
   address: String,
});

module.exports =
   mongoose.models.Contract || mongoose.model('Contract', ContractSchema);
