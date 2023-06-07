import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema({
   name: String,
   abi: Object,
   address: String,
});

export default mongoose.models.Contract ||
   mongoose.model('Contract', ContractSchema);
