const now = new Date();
const formattedDate = now.toLocaleString('en-US', { dateStyle: 'short' });
// Output: "9/23/2021"

const now = new Date();
const formattedDate = now.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
// Output: "Thursday, September 23, 2021"



	$('#today').text(formattedDate);
	$('#currentTime').text(formattedDate);