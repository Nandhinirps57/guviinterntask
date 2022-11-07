<?php 

require '../assets/vendor/autoload.php';

$redis =new Predis\Client();

$cachedEntry = $redis->get('userDetails');


$t0=0;
$t1=0;

if($cachedEntry){
  // echo "From Redis Cache <br>";
  $t0=microtime(true)*1000;
 
  print_r($cachedEntry);
  $t1=microtime(true)*1000;
  // echo 'Time Taken: '.round($t1-$t0,4);
  // print_r("redis");
  exit();
} 
else
{  $t0=microtime(true)*1000;
  $con=new mysqli("localhost","root","","users");
  //echo "from data base <br>";
  $email=isset( $_GET["email"]) ? $_GET["email"]:'' ;
  $password=isset($_GET["password"]) ? $_GET["password"]:'' ;
  
  $sql="select * from userdetails where email=? and password=?";
  $stmt = $con->prepare($sql);
  
  $stmt->bind_param("ss",$email,$password);
  
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  $user = $result->fetch_assoc();
  $json=json_encode($user);
  $t1=microtime(true)*1000;
  //echo 'Time Taken: '.round($t1-$t0,4);
  $redis->set('userDetails',$json);
  $redis->expire('userDetails',20); //for 20 seconds
 
  if($user)
  {
     echo $json;
   }
  else{
       echo "Error";
   } exit();
  

}



?>