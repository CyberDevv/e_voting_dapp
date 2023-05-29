import mongoose from 'mongoose';

const ElectionSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, 'Please add a title'],
   },
   startTime: {
      type: Date,
      required: [true, 'Please add a start time'],
   },
   endTime: {
      type: Date,
      required: [true, 'Please add an end time'],
   },
   electionCandidates: {
      items: [
         {
            candidateName: {
               type: String,
               required: [true, 'Please add a candidate name'],
            },
            department: {
               type: String,
               required: [true, 'Please add a department'],
            },
            quote: {
               type: String,
               required: [true, 'Please add a quote'],
            },
            campainPromise: {
               type: String,
               required: [true, 'Please add a campain promise'],
            },
         },
      ],
      default: [],
   },
});

export default mongoose.models.Election ||
   mongoose.model('Election', ElectionSchema);
