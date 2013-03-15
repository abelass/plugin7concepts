<?php
/**
 * Utilisations de pipelines par 7concepts
 *
 * @plugin     7concepts
 * @copyright  2013
 * @author     Rainer Müller
 * @licence    GNU/GPL
 * @package    SPIP\7concepts\Pipelines
 */

if (!defined('_ECRIRE_INC_VERSION')) return;

/*Charger les valeurs de champs extras*/
function sevenconcepts_formulaire_charger($flux){
    $form=$flux['args']['form'];
    if($form=='inscription'){
       include_spip('cextras_pipelines');
       $champs_extras=champs_extras_objet(table_objet_sql('auteur'));
       foreach($champs_extras as $value){
           $flux['data'][$value['options']['nom']]=''; 
           if(isset($value['options']['obligatoire']))$flux['data']['obligatoire'][$value['options']['nom']]='on';
       }
       $flux['data']['nom_inscription']='';
       $flux['data']['mail_inscription']='';
    }
    
    return $flux;
}

/*Vérifier les champs extras obligatoires*/
function sevenconcepts_formulaire_verifier($flux){
    $form=$flux['args']['form'];
    if($form=='inscription'){
       include_spip('cextras_pipelines');
       $champs_extras=champs_extras_objet(table_objet_sql('auteur'));
       foreach($champs_extras as $value){
           if(isset($value['options']['obligatoire']) AND $value['options']['nom'] !='name' AND !_request($value['options']['nom'])){
               $flux['data'][$value['options']['nom']]=_T("info_obligatoire");
           }
       }
    }
   
    return $flux;
}

/*Insert les champs extras - fait en amont pour pouvoir les reprendre dans l'envoi du mail de confirmation*/
function sevenconcepts_pre_insertion($flux){
   if ($flux['args']['table']=='spip_auteurs'){
       include_spip('cextras_pipelines');
       $champs_extras=champs_extras_objet(table_objet_sql('auteur'));
       foreach($champs_extras as $value){
           $flux['data'][$value['options']['nom']]=_request($value['options']['nom']); 
            }
       $flux['data']['name']=_request('nom_inscription');       
        }
return $flux;
}

/*Modifier le nom */
function sevenconcepts_formulaire_traiter($flux){
    $form=$flux['args']['form'];
    
    if($form=='inscription'){

       $valeurs['nom']=_request('nom_inscription').' '._request('surname');

       sql_updateq('spip_auteurs',$valeurs,'email='.sql_quote(_request('mail_inscription'))); 
       
    }
    
    return $flux;
}
    

?>