import { SlashCommandBuilder } from '@discordjs/builders';

const chanelsCommand = new SlashCommandBuilder()
    .setName('channels')
    .setDescription('Channels cmd')
    .addChannelOption((option) =>
        option.setName('channel').setDescription('Channel').setRequired(true),
    )
    .addBooleanOption((option) =>
        option.setName('deletemsgs').setDescription('Delete messages').setRequired(true),
    )
    .addIntegerOption((option) => option.setName('age').setDescription('Enter your age'))
    .addAttachmentOption((option) => option.setName('file').setDescription('File'));
    
export default chanelsCommand.toJSON();
