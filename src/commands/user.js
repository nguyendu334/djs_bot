import { SlashCommandBuilder } from '@discordjs/builders';

const usersCommand = new SlashCommandBuilder()
    .setName('users')
    .setDescription('Users cmd')
    .addUserOption((option) => option.setName('user').setDescription('User'));

export default usersCommand.toJSON();
