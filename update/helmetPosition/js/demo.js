for (let i = 0; i < 3; i++) {
	(function() {
		setTimeout(function() {
			console.log("i--------", i);
		}, 5000);
	})(i);
}
