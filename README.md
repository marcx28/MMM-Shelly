# New Document# MMM-Shelly

This is a simple MagicMirror module to display the current power, total power of today and temperature of a Shelly sensor. I only tested it with a Shelly Plug S sensor so I do not know if the module works with other Shelly  sensors too. Currently the module does not support an unauthenticated web interface but will be added later. Just set a user and password in the web interface (Internet and Security -> Restrict Login).

## Configuration
Clone the repository:

```
git clone https://github.com/marcx28/MMM-Shelly
```

Add this to your config file:
```
{
	module: "MMM-Shelly",
	header: "⚡ Solar",
	position: "top_right",
    config: {
        ip: "192.168.1.12",
        username: "admin",
		password: "admin"
	}
}
```
## To-Do
- [ ] support unauthenticated web interfaces
- [ ] translations
- [ ] test with other Shelly sensors
