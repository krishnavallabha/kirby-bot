const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

// Bot configuration
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
// Arrays of compliments and affirmations
const compliments = [
    "you have a way of making the best out of the worst",
    "your smile brightens everyone's day",
    "you're an incredibly thoughtful person",
    "you have such a wonderful sense of humor",
    "your kindness is a balm to all who encounter it",
    "you're a great listener and always know what to say",
    "you bring out the best in other people",
    "your creativity knows no bounds",
    "you have impeccable taste",
    "you're even more beautiful on the inside than on the outside",
    "you're like sunshine on a rainy day",
    "you're a gift to those around you",
    "you make everything better just by being here",
    "your presence is a present to the world",
    "you light up every room you walk into",
    "you're someone's reason to smile today",
    "you're always learning and growing",
    "your positive energy is contagious",
    "you have a great perspective on things",
    "you're an awesome friend",
    "you have a brilliant mind",
    "your dedication to growth is inspiring",
    "you handle challenges with grace",
    "you have a remarkable attention to detail",
    "your perseverance is admirable",
    "you're wonderfully authentic",
    "you have a gift for understanding others",
    "your organizational skills are impressive",
    "you have a calming presence",
    "you're incredibly resilient",
    "your thoughtfulness doesn't go unnoticed",
    "you're a natural problem-solver",
    "your work ethic is exceptional",
    "you have a wise perspective",
    "you're exceptionally reliable",
    "your curiosity is inspiring",
    "you have a talent for explaining complex things simply",
    "you're wonderfully consistent",
    "your patience is truly remarkable",
    "you have great integrity",
    "you're incredibly resourceful",
    "your empathy makes people feel heard",
    "you have excellent judgment",
    "you're wonderfully dependable",
    "your diligence pays off in everything you do",
    "you have a knack for making people feel comfortable",
    "you're a steady anchor in stormy seas",
    "your commitment to learning is admirable",
    "you have an incredible memory",
    "you're beautifully consistent in your values",
    "your analytical thinking is impressive",
    "you have a gift for bringing people together",
    "you're refreshingly genuine",
    "your time management skills are excellent",
    "you have great emotional intelligence",
    "you're remarkably level-headed",
    "your attention to quality is exceptional",
    "you have a wonderful sense of fairness",
    "you're incredibly thorough in your work",
    "your determination is inspiring",
    "you have a talent for finding solutions",
    "you're wonderfully methodical",
    "your ability to focus is impressive",
    "you have a great sense of responsibility",
    "you're remarkably self-disciplined",
    "your strategic thinking is valuable",
    "you have a calming effect on others",
    "you're incredibly observant",
    "your consistency is admirable",
    "you have a talent for seeing the bigger picture",
    "you're wonderfully meticulous",
    "your logical thinking is impressive",
    "you have great follow-through",
    "you're refreshingly honest",
    "your ability to prioritize is excellent",
    "you have a gift for careful planning",
    "you're remarkably focused under pressure",
    "your reliability is exceptional",
    "you have a talent for systematic thinking",
    "you're wonderfully conscientious",
    "your precision is admirable",
    "you have a great ability to concentrate",
    "you're incredibly steady and consistent",
    "your practical thinking is valuable",
    "you have a talent for thorough research",
    "you're remarkably diligent in all you do",
    "your systematic approach yields great results",
    "you have a wonderful capacity for detail",
    "you're incredibly persistent",
    "your ability to execute plans is impressive",
    "you have a gift for careful analysis",
    "you're wonderfully responsible",
    "your methodical nature is an asset",
    "you have great staying power",
    "you're remarkably thorough",
    "your commitment to excellence is inspiring",
    "you have a talent for organized thinking",
    "you're incredibly dedicated",
    "your ability to see patterns is impressive",
    "you have a wonderful sense of order",
    "you're refreshingly systematic",
    "your analytical skills are exceptional",
    "you have a gift for careful observation",
    "you're wonderfully precise",
    "your consistent effort is admirable",
    "you have great intellectual stamina",
    "you're remarkably focused",
    "your practical wisdom is valuable",
    "you have a talent for structured thinking",
    "you're incredibly earnest in your endeavors",
    "your disciplined approach is impressive",
    "you have a wonderful capacity for work",
    "you're refreshingly thorough in your understanding",
    "your systematic mind is an asset",
    "you have great precision in thought and action",
    "you're remarkably steady in your pursuits",
    "your consistent quality is impressive",
    "you have a talent for detailed planning",
    "you're wonderfully committed to doing things well",
    "your methodical excellence inspires others"
];

const affirmations = [
    "you are capable of amazing things",
    "you deserve all the good things coming your way",
    "you are enough, just as you are",
    "your potential is limitless",
    "you are worthy of love and respect",
    "you have the power to create change",
    "you are braver than you believe",
    "your voice matters and deserves to be heard",
    "you are making a positive difference",
    "you have overcome so much already",
    "you are deserving of your dreams",
    "your story is important",
    "you have so much to offer the world",
    "you are valued and appreciated",
    "you are stronger than you think",
    "you are growing every single day",
    "you have unique gifts to share",
    "you are doing better than you think",
    "you are worthy of good things",
    "you are incredible just the way you are",
    "you are capable of achieving your goals",
    "your journey matters as much as your destination",
    "you have the strength to face today's challenges",
    "your progress is valid, even when it feels slow",
    "you are becoming wiser with each experience",
    "your presence makes a positive difference",
    "you deserve kindness from yourself and others",
    "you are building a meaningful life",
    "your efforts are creating positive change",
    "you have the resilience to overcome obstacles",
    "you are worthy of peace and contentment",
    "your perspective is valuable and unique",
    "you are growing through what you're going through",
    "you deserve to take up space in the world",
    "you are creating your own path to success",
    "your self-awareness is a powerful tool",
    "you are capable of learning from every situation",
    "you deserve moments of rest and renewal",
    "you are stronger than yesterday's struggles",
    "your inner wisdom guides you well",
    "you are building a foundation for lasting happiness",
    "you deserve to celebrate your achievements",
    "you are creating positive momentum in your life",
    "your capacity for growth is unlimited",
    "you are worthy of pursuing your passions",
    "you have the courage to take necessary steps",
    "you are developing valuable skills every day",
    "you deserve to trust your own judgment",
    "you are building resilience with each challenge",
    "your journey is uniquely yours and valuable",
    "you are capable of creating balance in your life",
    "you deserve to acknowledge your progress",
    "you are learning important lessons every day",
    "your determination will carry you forward",
    "you are worthy of setting healthy boundaries",
    "you have the insight to make good decisions",
    "you are creating a life that reflects your values",
    "you deserve to feel proud of how far you've come",
    "you are becoming more confident each day",
    "your perseverance is shaping your character",
    "you are capable of adapting to change",
    "you deserve to feel secure in who you are",
    "you are building meaningful connections",
    "your personal growth is inspiring",
    "you are worthy of following your intuition",
    "you have the wisdom to navigate life's complexities",
    "you are creating space for what matters most",
    "you deserve to feel hopeful about the future",
    "you are developing greater emotional strength",
    "your commitment to self-improvement is powerful",
    "you are capable of finding solutions to problems",
    "you deserve to feel comfortable in your own skin",
    "you are building a legacy of kindness",
    "your authenticity is your strength",
    "you are worthy of pursuing your purpose",
    "you have the clarity to see what truly matters",
    "you are creating harmony in your life",
    "you deserve to feel capable and competent",
    "you are becoming more resilient daily",
    "your positive impact ripples outward",
    "you are capable of managing stress effectively",
    "you deserve to prioritize your well-being",
    "you are building healthy habits that last",
    "your self-compassion makes you stronger",
    "you are worthy of financial stability",
    "you have the ability to create positive routines",
    "you are developing greater self-understanding",
    "you deserve to feel at peace with your past",
    "you are becoming more emotionally intelligent",
    "your personal evolution is beautiful to witness",
    "you are capable of setting and achieving goals",
    "you deserve to feel excited about your future",
    "you are building a life of meaning and purpose",
    "your inner strength continues to grow",
    "you are worthy of professional fulfillment",
    "you have the vision to create what you desire",
    "you are creating healthy relationships",
    "you deserve to feel confident in your abilities",
    "you are becoming more self-reliant each day",
    "your personal power is expanding",
    "you are capable of maintaining healthy boundaries",
    "you deserve to feel joyful in your daily life",
    "you are building emotional resilience",
    "your capacity for love continues to grow",
    "you are worthy of creative expression",
    "you have the discipline to achieve your aims",
    "you are developing greater mental clarity",
    "you deserve to feel safe and secure",
    "you are becoming more financially savvy",
    "your personal development is impressive",
    "you are capable of handling uncertainty",
    "you deserve to feel enthusiastic about life",
    "you are building spiritual awareness",
    "your inner peace is growing stronger",
    "you are worthy of educational opportunities",
    "you have the creativity to solve any problem",
    "you are creating work-life balance",
    "you deserve to feel optimistic about tomorrow",
    "you are becoming more proactive daily",
    "your life is filled with endless possibilities"
];
// Create Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

// Function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Register slash commands
const commands = [
    new SlashCommandBuilder()
        .setName('compliment')
        .setDescription('Send a compliment to someone')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to compliment')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('affirmation')
        .setDescription('Send a positive affirmation to someone')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to send an affirmation to')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('kindness')
        .setDescription('Send either a compliment or affirmation to someone')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to send kindness to')
                .setRequired(true)
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

// Deploy commands
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// Bot ready event
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('KindBot is ready to spread positivity! 💖');
});

// Handle slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    const targetUser = interaction.options.getUser('user');
    const sender = interaction.user;

    if (commandName === 'compliment') {
        const compliment = getRandomItem(compliments);
        await interaction.reply(`${targetUser}, ${compliment}! 💝\n*- Sent with love from ${sender}*`);
    } 
    else if (commandName === 'affirmation') {
        const affirmation = getRandomItem(affirmations);
        await interaction.reply(`${targetUser}, ${affirmation}! ✨\n*- Sent with care from ${sender}*`);
    }
    else if (commandName === 'kindness') {
        const allMessages = [...compliments, ...affirmations];
        const message = getRandomItem(allMessages);
        await interaction.reply(`${targetUser}, ${message}! 🌟\n*- Sent with kindness from ${sender}*`);
    }
});

// Login to Discord
client.login(TOKEN);