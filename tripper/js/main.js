var critJSON = []; // recup des données du fichier critJSON
$.getJSON('criteres.json').done(function(response){
	response.data.forEach( function(element) {
		critJSON.push(element);
	});
	return critJSON;
});
var critCurrent = new Map(); // map idCritere/idDivCritere pour gerer la suppression du critere


////////////////// ajouter une option critere au select d'ajout de critere //////////////////

$("#add").click(function(){
		$("#critere").empty();
		critJSON.forEach( function(element) {
				var crit = document.createElement("a");
				crit.setAttribute("class", "dropdown-item text-center");
				crit.setAttribute("href", "#");
				crit.setAttribute("id", element.name);
				crit.setAttribute("onclick", "displayCritere("+element.name+")");
				crit.text = element.name;
				$("#critere").append(crit);
			});
})


//////////////////////////////////////////////////////////////////////////////*/

$("#critRecherche").submit(function(e){
	e.preventDefault();
	var crit = [];

	var temperature = $("#temperature").val();
	var distance = $("#distance").val();
	var langue = $("#langue").val();
	var lati = 48.5;
	var longi = 2.48;

	searchAndDisplay(temperature, distance, langue, lati, longi);
});

function searchAndDisplay(temperature, distance,langue, lati, longi){
	$.ajax({
		url:"http://localhost/triper/triper/public/search/api/v1",
		type: "GET",
		data: {
			temp : temperature,
			dist : distance,
			lat : lati,
			long : longi,
			lang1 : langue
		}
	}).done(function(response){
		var pays = response.data;
		console.log(pays);
	});
}

//////////////////////////gestion d'ajout de critere /////////////////////////
function displayCritere(idCrit){
		critJSON.forEach(function(element){
			if(element.name == idCrit.id && !critCurrent.has(element.id)){ // test si presence du critere dans la map pr pas avoir de doublon
				var el = element; 
				var o = "";
				if(el.option){
					el.option.forEach(function(option){
						o += addOption(option);
					});
				}
				var c = generateCrit(el, o); // fonction creation du modal html + option pr les inputs radio

				$('#generate').append(c);
				critCurrent.set(element.id, element.idDiv);
			}
			});
}
//////////////////////////suppression de critere /////////////////////////
function deleteCrit(idCrit){
	if(critCurrent.get(idCrit.id)){
		var div = critCurrent.get(idCrit.id);
		critCurrent.delete(idCrit.id);
		$("."+div).remove();
	}
}


function displayValueRadio(crit){ // fonction pr recuperer la valeur selectionnée sur les radio pour l'afficher sur la home
		var critere;
		var t;
		
		critJSON.forEach(function(element){ // recup des infos du critere dans le JSON pr manipuler l' html
			if(element.id == crit.id){
			critere = element;
			}
		});
		
		$("#"+critere.idOption+"> div > input").change(function(){
			t = $(this).val();
			$("#"+critere.name).empty();
			$("#"+critere.name).removeClass("invisible");
			$("#"+critere.name).text(t);
		});
	
}


//$dist=null; $lat=null; $long=null; $dens=null; $tempAvg=null; $lang1=null; $lang2=null; $lang3=null;


function generateCrit(crit, opt){
	var pop = "<div class='col-8 "+crit.idDiv+"'><button type='button' class='btn btn-white btn-block text-primary' data-toggle='modal' data-target='#"+crit.id+"' onclick='displayValueRadio("+crit.id+")'>"+crit.label+"</button></div>"
	+
	"<div class='col-4 "+crit.idDiv+"'><button type='button' id="+crit.name+" class='btn btn-block btn-warning invisible'></button></div>"
		+
			"<div class='modal fade' id='"+crit.id+"' tabindex='-1' role='dialog' aria-labelledby='"+crit.name+"' aria-hidden='true'>"
			+
				"<div class='modal-dialog' role='document'>"
				+
			    	"<div class='modal-content'>"
			    	+
			        	"<div class='modal-header bg-primary'>"
			        	+
			        		"<h5 class='modal-title text-white'>"+crit.label+"</h5>"
			        		+
			        			"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
			        			+
			          			"<span aria-hidden='true'>&times;</span>"
			          			+
			        			"</button>"
			        			+
			        			"</div>"
			        			+
			        			"<div class='modal-body'>"
			        			+
			        			"<fieldset class='form-group'>"
			        			+
					    			"<div class='row'>"
					    			+
					      				"<div class='col-sm-10' id='"+crit.idOption+"'>"
					      				+
					      				opt
					      				+
					      				"</div>"
					      			+
					      			"</div>"
					      		+
					      		"</fieldset>"
					      		+
					      		"</div>"
					      		+
					      		"<div class='modal-footer bg-primary'>"
					      			+
							        "<button type='button' class='btn btn-white' data-dismiss='modal'>OK</button>"
							        +
							        "<button type='submit' class='btn btn-danger' data-dismiss='modal' onclick='deleteCrit("+crit.id+")'>Supprimer</button>"
							        +
							      	"</div>"
					+
					"</div>"
				+
				"</div>"
			+
			"</div>";

return pop;
}
function addOption(e){
		var option ="<div class='form-check'>"
			+
			"<input class='form-check-input' type='radio' name='"+e.name+"' id='"+e.id+"' value='"+e.value+"'/>"
			+
			"<label class='form-check-label' for='"+e.id+"'>"
			+
			e.texte
			+
			"</label>"
			+
			"</div>";
return option;
}
