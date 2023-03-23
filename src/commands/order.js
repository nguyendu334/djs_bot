import { SlashCommandBuilder } from '@discordjs/builders';

const orderCommand = new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order something...')
    // .addStringOption((option) =>
    //     option
    //         .setName('food')
    //         .setDescription('The type of food you want to order')
    //         .setRequired(true)
    //         .setChoices(
    //             {
    //                 name: 'Pizza',
    //                 value: 'pizza',
    //             },
    //             {
    //                 name: 'Hamburger',
    //                 value: 'hamburger',
    //             },
    //         ),
    // )
    // .addStringOption((option) =>
    //     option
    //         .setName('drink')
    //         .setDescription('The type of drink you want to order')
    //         .setRequired(true)
    //         .setChoices(
    //             {
    //                 name: 'Coke',
    //                 value: 'coke',
    //             },
    //             {
    //                 name: 'Fanta',
    //                 value: 'fanta',
    //             },
    //             {
    //                 name: 'Sprite',
    //                 value: 'sprite',
    //             },
    //         ),
    // );

export default orderCommand.toJSON();