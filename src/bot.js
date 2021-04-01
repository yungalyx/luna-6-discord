require('dotenv').config();

const { Client, Message} = require('discord.js');
const _ = require('lodash');
const PREFIX = "$"

const client = new Client();
// message.channel.send();

client.on('ready', ()=> {
    console.log('=== LOGGED IN ===')
})

client.on('message', (message) => {
    if (message.content.startsWith(PREFIX)) {
        const [CMD, ...args] = message.content
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);

        switch(CMD) {
            case 'CRD': 
                // TODO: num check
                const principal = args[0];
                const monthly_deposit = args[1];
                var annual_return = args[2];
                const term = args[3];

                if (annual_return < 1) { 
                    message.channel.send(`Initial principal: $${principal} \nMonthly deposit: $${monthly_deposit} \nAnnual return: ${annual_return*100}% for ${term} years\n`);
                    let total_months = term*12;
                    var total = 0;
                    for (i of _.range(total_months)) {
                        var agg = monthly_deposit*(1+(annual_return/12))**i
                        total += agg
                    }
                    total += principal*(1+(annual_return/12))**term;
                    const gains = total-(monthly_deposit*total_months)-principal
                    message.channel.send(`In ${term} years, you'll have: $${total.toFixed(2)} \nMonthly principal supplied: $${monthly_deposit*total_months} \nAmount made from gains: $${gains.toFixed(2)} \n\nThat's an average of $${(gains/(365*term)).toFixed(2)} a day!`);
                } else {
                    annual_return = annual_return/100
                    message.channel.send(`Initial principal: $${principal} \nMonthly deposit: $${monthly_deposit} \nAnnual return: ${annual_return*100}% for ${term} years\n`);
                    let total_months = term*12;
                    var total = 0;
                    for (i of _.range(total_months)) {
                        var agg = monthly_deposit*(1+(annual_return/12))**i
                        total += agg
                    }
                    total += principal*(1+(annual_return/12))**term;
                    const gains = total-(monthly_deposit*total_months)-principal
                    message.channel.send(`In ${term} years, you'll have: $${total.toFixed(2)} \nMonthly principal supplied: $${monthly_deposit*total_months} \nAmount made from gains: $${gains.toFixed(2)} \n\nThat's an average of $${(gains/(365*term)).toFixed(2)} a day!`);

                }
            break

            default: 
                message.channel.send("command not found")
        }
    }
})
client.login(process.env.DISCORD_BOT_TOKEN);