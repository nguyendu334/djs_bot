import { SlashCommandBuilder } from '@discordjs/builders';

const banCommand = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server')
    .addSubcommandGroup((group) =>
        group
            .setName('group_a')
            .setDescription('Group a')
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('temp')
                    .setDescription('Temporarily ban a user from the server')
                    .addUserOption((option) =>
                        option.setName('user').setDescription('The user to ban'),
                    ),
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('perm')
                    .setDescription('Permanently ban a user from the server')
                    .addUserOption((option) =>
                        option.setName('user').setDescription('The user to ban'),
                    ),
            ),
    )
    .addSubcommandGroup((group) =>
        group
            .setName('group_b')
            .setDescription('Group b')
            .addSubcommand((subcommand) =>
                subcommand.setName('soft').setDescription('Soft ban a user from the server'),
            ),
    );

export default banCommand.toJSON();
