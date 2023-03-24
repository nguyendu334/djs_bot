import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType } from 'discord.js';

const scheduleCommand = new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Schedules a message to be sent at a specific time')
    .addStringOption((option) =>
        option
            .setName('message')
            .setDescription('The message to be sent')
            .setMinLength(10)
            .setMaxLength(2000)
            .setRequired(true),
    )
    .addIntegerOption((option) =>
        option
            .setName('time')
            .setDescription('The time to send the message in minutes')
            .setChoices(
                {
                    name: '5 seconds',
                    value: 5000,
                },
                {
                    name: '1 minute',
                    value: 60000,
                },
                {
                    name: '15 minutes',
                    value: 900000,
                },
                {
                    name: '30 minutes',
                    value: 1800000,
                },
                {
                    name: '1 hour',
                    value: 3600000,
                },
            )
            .setRequired(true),
    )
    .addChannelOption((option) =>
        option
            .setName('channel')
            .setDescription('The channel to send the message in')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true),
    );

export default scheduleCommand.toJSON();
