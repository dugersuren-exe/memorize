import mongoose from 'mongoose';

const WordsSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  eng: {
    type: String,
    required: true
  },
  mon: {
    type: String,
    required: true
  },
  comm: {
    type: String,
    required: true
  },


});

export default mongoose.models.Words || mongoose.model('Words', WordsSchema);

