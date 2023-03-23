import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

import orderCommand from './commands/order.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/user.js';
import chanelsCommand from './commands/channel.js';

config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => console.log(`Bot is ready! Logged in as: ${client.user.tag}`));

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const food = interaction.options.get('food').value;
        const drink = interaction.options.get('drink').value;
        interaction.reply({ content: `You ordered: ${food} and ${drink}` });
    }
});

async function main() {
    const commands = [orderCommand, rolesCommand, usersCommand, chanelsCommand];
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        client.login(TOKEN);
    } catch (error) {
        console.log(error);
    }
}

main();
