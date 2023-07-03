> Note : versions earlier than [v1.0.2] only work for revolt.js@v6

## Example:
```javascript
const Revolt = require("revolt.js");
const client = new Revolt.Client();
const RevoltBots = require('revoltbots.js');
const api = new RevoltBots.Client("Your-RBL-API-Key-Here");

// Posting manually...
client.on("ready", ()=>{
	api.postStats(client).then(result => {
    		console.log(result)
	});

})

// Hourly AutoPost...
client.on("ready", ()=>{
	api.autopostStats(client).then(result => {
    		console.log(result)
	});
});

client.on("message", ()=>{
// ..
	api.hasVoted(client, "REVOLTUSERID").then(result => {
    		console.log(result)
	});

// ...
	api.getStats(client).then(result => {
    		console.log(result)
	});
// ...

	api.getVoted(client).then(result => {
    		console.log(result)
	});
// ..
})

client.loginBot("revolt.BOT-TOKEN_HERE")
```
> WIP
