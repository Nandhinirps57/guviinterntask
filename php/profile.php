<?php

   require_once  '../assets/vendor/autoload.php';

   $con = new MongoDB\Client("mongodb://localhost:27017");
   // echo "successfully";

   $db = $con->selectDatabase('Userprofile');
   // echo "Selected";

   $col = $db->selectCollection('profiles');
 
    $document =$_POST;
if($document){
  // echo "done";
   $insertRs=$col->insertOne($document);
   print_r($insertRs);
}
$uid= isset($_GET['uid']) ? $_GET['uid'] : '';
   //$ok= $insertRs->getInsertedCount();

  // print_r($ok);

   //print_r($insertRs->getInsertedId());
   if($uid!=''){
   $manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
  
$filter = ["uid"=>"$uid"];
$options = ['sort'=>array('_id'=>-1),'limit'=>1];
$query = new MongoDB\Driver\Query($filter, $options);

// $result = $manager->executeQuery('pastTimeDb.movie', $query);



#executing
$cursor = $manager->executeQuery('Userprofile.profiles', $query);

foreach ($cursor as $document) {
   $document = json_encode($document);
    
    print_r($document);
}} else {
   print_r("uid is not exits");
}

 ?>