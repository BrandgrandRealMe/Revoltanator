const fetch = require("wumpfetch");
class Client {
    constructor(token) {
        this.KEY = token;
    };

    /**
     *
     * @param { Object } The Bot Client
     * @returns
     */

    async postStats(bot) {
	if (!bot) throw new TypeError("No bot client given!");
        let servercount = Number(bot.servers.size) || Number(bot.servers.size()) || null;
        if (!this.KEY) throw new TypeError('API token not provided');
        if (!Number(servercount)) throw new TypeError('Server count must be a valid number');
          return fetch(`https://revoltbots.org/api/v1/bots/stats`, {
            method: 'POST',
            headers: {
                server_count: servercount,
                'Authorization': this.KEY,
            }
        }).send()
            .then(res => res.json())

    };
    /**
     *
     * @param { Object } The Bot Client
     * @returns
     */
    async autopostStats(bot) {
	if (!bot) throw new TypeError("No bot client given!");
	console.log('Starting Auto post!')
	setInterval(()=>{
        let servercount = Number(bot.servers.size) || Number(bot.servers.size()) || null;
        if (!this.KEY) throw new TypeError('API token not provided');
        if (!Number(servercount)) throw new TypeError('Server count must be a valid number');
          return fetch(`https://revoltbots.org/api/v1/bots/stats`, {
            method: 'POST',
            headers: {
                server_count: servercount,
                'Authorization': this.KEY,
            }
        }).send()
            .then(res => res.json())
	}, 3600000)
    };

    /**
     *
     * @param { Object } The Bot Client
     * @returns
     */

    async getStats(bot) {
	if (!bot) throw new TypeError("No bot client given!");
        if (!this.KEY) throw new TypeError('API token not provided');
          return fetch(`https://revoltbots.org/api/v1/bots/${bot.user._id || bot.user.id}`, {
            method: 'GET',
            headers: {
                'Authorization': this.KEY,
            }
        }).send()
            .then(res => res.json())

    };

    /**
     *
     * @param { Object } The Bot Client
     * @param { String } The UserId
     * @returns
     */

    async hasVoted(bot, userId) {
	if (!bot) throw new TypeError("No bot client given!");
        if (!this.KEY) throw new TypeError('API token not provided');
	if (!userId) throw new TypeError("No userId given!");
          return fetch(`https://revoltbots.org/api/v1/bots/${bot.user._id || bot.user.id}/votes?user=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': this.KEY,
            }
        }).send()
            .then(res => res.json())

    };

    /**
     *
     * @param { Object } The Bot Client
     * @param { String } The UserId
     * @returns
     */

    async getVoted(bot) {
	if (!bot) throw new TypeError("No bot client given!");
        if (!this.KEY) throw new TypeError('API token not provided');
          return fetch(`https://revoltbots.org/api/v1/bots/${bot.user._id || bot.user.id}/votes`, {
            method: 'GET',
            headers: {
                'Authorization': this.KEY,
            }
        }).send()
            .then(res => res.json())
    };

}
module.exports = Client;
