
// FORMULE POUR AFFICHER TOUT LE FORMULAIRE DEPUIS LE FICHIER JSON
function afficherToutLeFormulaire() {
    $.getJSON('criteres.json',
        function (file) {

            $(file.data).each(
                function (e) {
                    $('form').append('<label for="' + this.name + '">' + this.label + '</label>');
                    if (this.type == 'text') {

                        $('form').append('<input type="' + this.type + '" name="' + this.name + '"\>');
                    }
                    else if (this.type == 'radio' || this.type == 'checkbox') {
                        var typeInput = this.type;
                        var nameInput = this.name;
                        $(this.option).each(
                            function (i) {
                                $('form').append('<input id ="' + this.id + '" type="' + typeInput + '" name="' + nameInput + '" value="' + this.value + '"\>');
                                $('form').append('<label for="' + this.id + '">' + this.texte + '</label>');
                            }
                        )
                    };

                });

            $('form').append('<button type="submit">Valider</button>');
        }
    );
}

// FORMULE POUR AJOUTER UN CRITERE AU FORMULAIRE (PAS DE BOUTON VALIDER)
function addCritere(critere){
    $.getJSON('criteres.json',
        function (file) {

            $(file.data).each(
                function (e) {
                    if (this.name == critere) {
                        $('form').append('<label for="' + this.name + '">' + this.label + '</label>');
                        if (this.type == 'text') {

                            $('form').append('<input type="' + this.type + '" name="' + this.name + '" \>');
                        }
                        else if (this.type == 'radio' || this.type == 'checkbox') {
                            var typeInput = this.type;
                            var nameInput = this.name;
                            $(this.option).each(
                                function (i) {
                                    $('form').append('<input id ="' + this.id + '" type="' + typeInput + '" name="' + nameInput + '" value="' + this.value + '"\>');
                                    $('form').append('<label for="' + this.id + '">' + this.texte + '</label>');
                                }
                            );
                        }
                        ;

                    }
                });
        }
    );
}

// FUNCTION QUI PERMET DE SELECT LE CRITERE A AJOUTER :
function selectCritere(){
    $('form').append('<label for="critere">Critère</label>');
    $('form').append('<select name="critere"/>');
    $.getJSON('criteres.json',
        function (file) {
            $(file.data).each(
                function(e){
                    $('select').append('<option value="'+this.name+'">'+this.texte+'</option>');
                });
        })
    $('form').append('</select>');
    }

//afficherToutLeFormulaire();
//addCritere('cont');
//selectCritere();