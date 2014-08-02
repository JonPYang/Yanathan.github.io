var bugAmbassador = {code:'bug', name:'Bug Ambassador', type:'known', available:true};
var transferMicrofilm = {code:'transfer', name:'Transfer Microfilm', type:'known', available:true};
var contactDoubleAgent = {code:'contact', name:'Contact Double Agent', type:'known', available:true};
var swapStatue = {code:'swap', name:'Swap Statue', type:'known'};
var seduceTarget = {code:'seduce', name:'Seduce Target', type:'known', available:true};
var inspectStatues = {code:'inspect', name:'Inspect Statues', type:'known', available:true};
var purloinGuestList = {code:'purloin', name:'Purloin Guest List', type:'known', available:true};
var fingerprintAmbassador = {code:'fingerprint', name:'Fingerprint Ambassador', type:'known', available:true};
var missions = [bugAmbassador, transferMicrofilm, contactDoubleAgent, swapStatue, seduceTarget, inspectStatues, purloinGuestList, fingerprintAmbassador];
var checkPicked = false;
var checkKnown = false;

$(document).ready(function(){ 

	for(i in missions){
		$("#Missions").append("<input id='"+missions[i].code+"'><p></p>");
		$("#"+missions[i].code).attr({"type":"button","value":missions[i].name, "class":"available"});
	}
	
	$("#firstX").text($(".available").length.toString());
	$("#secondX").text($(".available").length.toString());
	
	$('#Missions input').mousedown(function(event) {
		switch (event.which) {
			case 1:
				$("#"+this.id).attr({"class":"available"})
				if($("#Type").text() === "Known "){
					$("#"+this.id).attr({"class":"known"})
				}
				typeSetter();
				break;
			case 2:
				$("#Type").text("Pick ");
				$("#"+this.id).attr({"class":"picked"});
				typeSetter();
				break;
			case 3:
				$("#"+this.id).attr({"class":"removed"});
				typeSetter();
				
				break;
			default:
				alert('You have a strange Mouse!');
			}
		});
		

	

	function typeSetter(){
		if($("#Type").text() === "Pick ") {
			$('#Missions input').each(function(index) {
				if($(this).hasClass("known")){
					$(this).attr({"class":"available"});
					}
				});
			$("#firstX").text(($(".picked").length).toString());
			$("#of").text(" of ");
			$("#secondX").text((8-$(".removed").length).toString());
		}
		else if($("#Type").text() === "Known "){
			$("#firstX").text(($(".known").length).toString());
			$("#of").text("");
			$("#secondX").text("");
			} else {
			$("#Type").text("Any ");
			$("#firstX").text((($(".available").length)+$(".picked").length).toString());
			$("#of").text(" of ");
			$("#secondX").text((8-$(".removed").length).toString());
			}
			
		checkPicked = false;
		checkKnown = false;
	}
});

	function setKnown(){
		$('#Missions input').each(function(index) {
				if($(this).hasClass("available") || $(this).hasClass("picked")){
				$(this).attr({"class":"known"});
				}
			});
		$("#Type").text("Known ");
		$("#firstX").text(($(".known").length).toString());
		$("#of").text("");
		$("#secondX").text("");
	}

	function setAny(){
		$('#Missions input').each(function(index) {
			if($(this).hasClass("known") || $(this).hasClass("picked")){
			$(this).attr({"class":"available"});
			}
		});
		$("#Type").text("Any ");
		$("#of").text(" of ");
		$("#firstX").text(($(".available").length).toString());
		$("#secondX").text((8-$(".removed").length).toString());
	}
	
