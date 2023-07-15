/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import colors from 'colors/safe';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(colors.cyan(`Database is connected successfully`));

    server = app.listen(config.port, () => {
      console.log(
        colors.green(
          `Application  listening on port ${colors.yellow(
            `http://localhost:${config.port}`
          )}`
        )
      );
    });
  } catch (err) {
    console.log('Failed to connect server', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
