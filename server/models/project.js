const mongoose = require('mongoose');

let TreeSchema = new mongoose.Schema({
  component: String,
  is_nested: Boolean,
  children: [mongoose.Schema.Types.Mixed],
  lib_component: String,
  config: mongoose.Schema.Types.Mixed,
  meta: mongoose.Schema.Types.Mixed
});

let PageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  tree: [TreeSchema]
});

let ProjectSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  name: {
    type: String,
    required: true
  },
  lib: {
    type: String
  },
  image: Buffer,
  created: {
    type: Date,
    default: Date.now
  },
  pages: [PageSchema]
});

module.exports = mongoose.model('Project', ProjectSchema);
