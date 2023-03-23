import { config } from 'dotenv';
import {
    Client,
    GatewayIntentBits,
    Routes,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import { REST } from '@discordjs/rest';

import orderCommand from './commands/order.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/user.js';
import chanelsCommand from './commands/channel.js';
import banCommand from './commands/ban.js';
import registerCommand from './commands/register.js';

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
        if (interaction.commandName === 'order') {
            // const food = interaction.options.getString('food');
            // const drink = interaction.options.getString('drink');
            // await interaction.reply(`You ordered a ${food} with ${drink}`);
            const actionRowComponent = new ActionRowBuilder().setComponents(
                new StringSelectMenuBuilder().setCustomId('food_options').setOptions([
                    {
                        label: 'Pizza',
                        value: 'pizza',
                    },
                    {
                        label: 'Hamburger',
                        value: 'hamburger',
                    },
                    {
                        label: 'Hotdog',
                        value: 'hotdog',
                    },
                ]),
            );
            const actionRowDrinkMenu = new ActionRowBuilder().setComponents(
                new StringSelectMenuBuilder().setCustomId('drink_options').setOptions([
                    {
                        label: 'Coke',
                        value: 'coke',
                    },
                    {
                        label: 'Fanta',
                        value: 'fanta',
                    },
                    {
                        label: 'Sprite',
                        value: 'sprite',
                    },
                ]),
            );
            interaction.reply({
                components: [actionRowComponent.toJSON(), actionRowDrinkMenu.toJSON()],
                content: 'Please select a food',
            });
        } else if (interaction.commandName === 'register') {
            const modal = new ModalBuilder()
                .setTitle('Register User form')
                .setCustomId('registerUserModal')
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('username')
                            .setCustomId('username')
                            .setStyle(TextInputStyle.Short),
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('email')
                            .setCustomId('email')
                            .setStyle(TextInputStyle.Short),
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('comment')
                            .setCustomId('comment')
                            .setStyle(TextInputStyle.Paragraph),
                    ),
                );
            interaction.showModal(modal);
        }
    } else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'food_options') {
            console.log('hello');
        } else if (interaction.customId === 'drink_options') {
            console.log('hello');
        }
    }
});

async function main() {
    const commands = [
        orderCommand,
        rolesCommand,
        usersCommand,
        chanelsCommand,
        banCommand,
        registerCommand,
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
