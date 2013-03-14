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



function sevenconcepts_formulaire_traiter($flux){
    $form=$flux['args']['form'];
    
    if($form=='inscription'){
       $valeurs=array();
       $id_auteur=$flux['data']['id_auteur'];
       include_spip('cextras_pipelines');
       $champs_extras=champs_extras_objet(table_objet_sql('auteur'));
       foreach($champs_extras as $value){
           $valeurs[$value['options']['nom']]=_request($value['options']['nom']); 
       }
       $valeurs['nom']=_request('nom_inscription').' '._request('surname');
       $valeurs['name']=_request('nom_inscription');  
       sql_updateq('spip_auteurs',$valeurs,'email='.sql_quote(_request('mail_inscription'))); 
       
    }
    
    return $flux;
}
    

?>