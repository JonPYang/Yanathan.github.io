$(document).ready(function(){        });

$('#Missions').mousedown(function(event) {
    switch (event.which) {
        case 1:
            alert('Left Mouse button pressed.');
            break;
        case 2:
            alert('Middle Mouse button pressed.');
            break;
        case 3:
            alert('Right Mouse button pressed.');
            break;
        default:
            alert('You have a strange Mouse!');
    }
});
