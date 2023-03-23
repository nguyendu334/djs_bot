import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

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
        interaction.reply({ content: `You order: ${interaction.options.getString('food')}` });
    }
});

async function main() {
    const commands = [
        {
            name: 'order',
            description: 'Order something...',
            options: [
                {
                    name: 'food',
                    description: 'The type of food you want to order',
                    type: 3,
                    required: true,
                },
            ],
        },
        {
            name: 'help',
            description: 'Help me!',
        },
    ];
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        client.login(TOKEN);
    } catch (error) {
        console.log(error);
    }
}

main();
