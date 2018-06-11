function generateCrit(crit){
	var pop = "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#"+crit.name+"'>"+crit.label+"</button>"
	+
		"<div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='"+crit.name+"' aria-hidden='true'>"
		+
			"<div class='modal-dialog' role='document'>"
			+
		    	"<div class='modal-content'>"
		    	+
		        	"<div class='modal-header'>"
		        		"<h5 class='modal-title' id='"+crit.name+"'>"+crit.label+"</h5>"
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
				      				"<div class='col-sm-10' id='options'>"
				      				+
				      				foreach(o in crit.option){
				      					addOption(o);
				      				}

}
function addOption(element){
 var option ="<div class='form-check'>"
			+
			"<input class='form-check-input' type='radio' name='"+element.name+"' id='"+element.id+"' value='"+element.value+"'>"
			+
			"<label class='form-check-label' for='"+element.id+"'>"
			+
			"</label>"
			+
			"</div>";
 
 $("#options").append(option);
}
/*function addOption(options){
 var option = options.each(function(element){
			"<div class='form-check'>"
			+
			"<input class='form-check-input' type='radio' name='"+element.name+"' id='"+element.id+"' value='"+element.value+"'>"
			+
			"<label class='form-check-label' for='"+element.id+"'>"
			+
			"</label>"
			+
			"</div>"
 });
 $("#options").append(option);
}*/