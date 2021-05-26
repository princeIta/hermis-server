import { dbConnStr } from '../../config/app.config';
import mongoose from 'mongoose';

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(dbConnStr);

mongoose.connection
  .once('open', function () {
    console.log('DB Connection established');
  })
  .on('error', function (error) {
    console.log('DB Connect error', error);
  })
  .on('disconnected', function () {
    console.log('DB Connection disconnected');
  });

export default mongoose;
