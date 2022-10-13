		var map = L.map('map', {
			zoom: 5,
			fullscreenControl: true,

			center: [42, 23]
		});
		 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			 attribution:
				 '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' +
				 ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
			
		 }).addTo(map);
		var lLejer=L.tileLayer('https://farcross.weather2umbrella.com/europan/w_jsons/png/{d}/{h}/tmp2m/{z}/{x}/{y}.png', {
		});
		var portusTimeLayer = L.timeDimension.layer.tileLayer.portus(lLejer, {});
		portusTimeLayer.addTo(map);
