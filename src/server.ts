import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`The example app listening on ${config.port}!`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
