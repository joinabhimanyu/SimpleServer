function getData() {
	return "hello world";
}

getData(function (err,result) {
	if (err) {
		console.log(err);
		return;
	}
	else{
		console.log(result);
		return;
	};
});