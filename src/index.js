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
    InteractionType,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import { REST } from '@discordjs/rest';

import orderCommand from './commands/order.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/user.js';
import chanelsCommand from './commands/channel.js';
import banCommand from './commands/ban.js';
import registerCommand from './commands/register.js';
import buttonCommand from './commands/button.js';

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

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const sentMessage = await message.channel.send({
        content: 'Hello World!',
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                    .setCustomId('button')
                    .setLabel('Button')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('button2')
                    .setLabel('Button2')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setLabel('Discord')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com'),
            ),
        ],
    });
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log('Chat command');
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
        } else if (interaction.commandName === 'button') {
            interaction.reply({
                content: 'Button',
                components: [
                    new ActionRowBuilder().setComponents(
                        new ButtonBuilder()
                            .setCustomId('button')
                            .setLabel('Button')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('button2')
                            .setLabel('Button2')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('Discord')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://discord.com'),
                    ),
                ],
            });
        }
    } else if (interaction.isStringSelectMenu()) {
        console.log('Select menu');
        if (interaction.customId === 'food_options') {
            console.log('hello');
        } else if (interaction.customId === 'drink_options') {
            console.log('hello');
        }
    } else if (interaction.type === InteractionType.ModalSubmit) {
        console.log('Modal submitted....');
        if (interaction.customId === 'registerUserModal') {
            console.log(interaction.fields.getTextInputValue('username'));
            interaction.reply({ content: 'Thanks for registering' });
        }
    } else if (interaction.isButton()) {
        console.log('Button clicked!');
        console.log(interaction.componentType);
        interaction.reply({ content: 'Thank for clicking on the button!' });
    } else if (interaction.isUserContextMenuCommand()) {
        console.log('User context menu command');
        console.log(interaction.commandName);
        if (interaction.commandName === 'Report') {
            const modal = new ModalBuilder()
                .setCustomId('reportUserModal')
                .setTitle('Report User')
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setCustomId('reportMessage')
                            .setLabel('Report Message')
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                            .setMinLength(10)
                            .setMaxLength(1000),
                    ),
                );
            await interaction.showModal(modal);
            const modalSubmitInteraction = await interaction.awaitModalSubmit({
                fillter: (i) => {
                    console.log('Awaiting modal submit');
                    return true;
                },
                time: 120000,
            });

            modalSubmitInteraction.reply({
                content: `Thanks for reporting ${
                    interaction.targetMember
                }. Reason: ${modalSubmitInteraction.fields.getTextInputValue('reportMessage')}`,
                ephemeral: true,
            });
        } else if (interaction.commandName === 'Wave') {
            interaction.reply({
                content: `Hello ${interaction.targetMember}`,
            });
        }
    } else if (interaction.isMessageContextMenuCommand()) {
        console.log(interaction.targetMessage);
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
        buttonCommand,
        {
            name: 'Report',
            type: 2,
        },
        {
            name: 'Wave',
            type: 2,
        },
        {
            name: 'Report Message',
            type: 3,
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
