import { SlashCommandBuilder } from '@discordjs/builders';

const buttonCommand = new SlashCommandBuilder()
    .setName('button')
    .setDescription('Button cmd')
    
export default buttonCommand.toJSON();
