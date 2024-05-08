import { NestFactory } from '@nestjs/core';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { DiscordModule } from './discord.module';
import { setupSwagger } from 'functions/swagger.function';
declare const module: any;
const chalk = require('chalk');

async function bootstrap() {
  const app = await NestFactory.create(DiscordModule);

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  // When the client is ready, run this code (only once).
  // The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
  // It makes some properties non-nullable.
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  });

  // Log in to Discord with your client's token
  client.login(process.env.DISCORD_TOKEN);

  if (process.env.SERVER_ENV === 'development') {
    // SWAGGER
    setupSwagger(app);
  }
  // PORT
  const port = process.env.SERVER_PORT || 3021;
  await app.listen(port);

  console.log(
      chalk.greenBright(`Endpoints are running on: http://localhost:${port}/v1`),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
void bootstrap();
