<?php error_reporting(0);
$con=new mysqli("localhost","root","","users");
$userName=$_POST["userName"] ;
$email= $_POST["email"];
$password=$_POST["password"];
$birthday=$_POST["dob"];
$gender=$_POST["gender"];
$location=$_POST["location"];


/* Prepared statement, stage 1: prepare */
$stmt = $con->prepare("INSERT INTO userdetails(userName,email,password,birthday,gender,location) VALUES (?, ?, ?, ?, ?, ?)");

/* Prepared statement, stage 2: bind and execute */

$stmt->bind_param("ssssss", $userName,$email,$password,$birthday,$gender,$location); 

if($stmt->execute())
{
echo "Data...Inserting";
}
else{
    echo "Error";
}

?>