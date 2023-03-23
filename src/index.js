import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
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
        const food = interaction.options.getString('food');
        const drink = interaction.options.getString('drink');
        interaction.reply({ content: `You ordered: ${food} and ${drink}` });
    }
});

async function main() {
    const orderCommand = new SlashCommandBuilder()
        .setName('order')
        .setDescription('Order something...')
        .addStringOption((option) =>
            option
                .setName('food')
                .setDescription('The type of food you want to order')
                .setRequired(true)
                .setChoices(
                    {
                        name: 'Pizza',
                        value: 'pizza',
                    },
                    {
                        name: 'Hamburger',
                        value: 'hamburger',
                    },
                ),
        )
        .addStringOption((option) =>
            option
                .setName('drink')
                .setDescription('The type of drink you want to order')
                .setRequired(true)
                .setChoices(
                    {
                        name: 'Coke',
                        value: 'coke',
                    },
                    {
                        name: 'Fanta',
                        value: 'fanta',
                    },
                    {
                        name: 'Sprite',
                        value: 'sprite',
                    },
                ),
        );

    const commands = [orderCommand.toJSON()];
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        client.login(TOKEN);
    } catch (error) {
        console.log(error);
    }
}

main();
