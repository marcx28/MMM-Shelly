/* Magic Mirror
 * Module: MMM-Shelly
 *
 * Displays current power and total power of Shelly Plug S
 * 
 * By Marco Haiden
 * MIT Licensed.
 */

Module.register("MMM-Shelly", {
    // default config
    defaults: {
        fetchInterval: 5 * 1000
    },

    ShellyStatusData: {
        power: "---",
        total: "---",
        temp: "---",
        lastUpdated: "---"
    },

    getStyles: function () {
		return ["MMM-Shelly.css"];
	},

    start: function() {
		var self = this;

		// schedule update timer
		setInterval(function() {
			self.sendSocketNotification("GetShellyStatus", `http://${self.config.username}:${self.config.password}@${self.config.ip}/status`);
			self.updateDom();
		}, this.config.fetchInterval);
	},

    socketNotificationReceived: function (notification, payload) {
		if (notification = "ShellyStatusData"){
			this.ShellyStatusData.power = payload.power
            this.ShellyStatusData.total = payload.total,
            this.ShellyStatusData.temp = payload.temp,
            this.ShellyStatusData.lastUpdated = payload.lastUpdated
		}
	},

    getDom: function() {
        var wrapper = document.createElement("div");
        innerHTML =  "<div class='container'>";

        innerHTML += "<div class='newline power'><sup>Momentane Leistung: </sup>" + this.ShellyStatusData.power + " W</div>";

        if (this.ShellyStatusData.total != "---") {
            this.ShellyStatusData.total = ((this.ShellyStatusData.total / 60) / 1000).toFixed(2);
        }

        innerHTML += "<div class='newline total'><sup>Gesamt heute: </sup> " + this.ShellyStatusData.total + " kWh</div>";
        innerHTML += "<div class='newline total'><sup>Temperatur: </sup> " + this.ShellyStatusData.temp + " °C</div>";

        innerHTML += "<p class='bottom'>Stand: " + this.ShellyStatusData.lastUpdated +"</p>";
        innerHTML += "</div><div class='newline'></div>"
       
        wrapper.innerHTML = innerHTML;

        return wrapper;
    },
});