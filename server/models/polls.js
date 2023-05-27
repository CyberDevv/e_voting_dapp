const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
   {
      question: {
         type: String,
         required: true,
      },
      choices: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.models.Poll || mongoose.model('Poll', BookSchema);
