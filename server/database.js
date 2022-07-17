const mongoose = require('mongoose');
 
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;