var NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({
	start: function() {
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification == "GetShellyStatus"){
			self = this;

			request(payload, { json: true }, (err, res, body) => {
				if (err) { return console.log("GetShellyStatus failed: " + err); }

				var date = new Date();

				var stringDate = date.toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" }) + " um " + date.toLocaleTimeString("de-DE", {hour: "numeric", minute: "numeric", second: "numeric"});

				payload= {
					power: body["meters"][0].power,
					total: body["meters"][0].total,
					temp: body["tmp"].tC,
					lastUpdated: stringDate
				}
			
				self.sendSocketNotification("ShellyStatusData", payload)
			});
		}
	}
});