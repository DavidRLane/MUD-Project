<?php
	//DATABASE CONNECTION
	$dbserver 		= "localhost";
	$dbusername 	= "root";
	$dbpassword 	= "";
	$db 			= "mmorts";
	
	//CREATE CONNECTION
	$conn = new mysqli($dbserver, $dbusername, $dbpassword, $db);
	
	//CHECK CONNECTION
	if($conn->connect_error)
	{
		//Kill connection and send error message
		die("Connection Failed: ".$conn->connect_error);
	}
	else
	{
		//IF CONNECTION IS GOOD, GET DATA FROM DATABASE
		$query = "SELECT name, seperator, description, maintenance, logo FROM configuration";
		//store query in a var
		$result = mysqli_query($conn, $query);
		//grab a row from the table
		$row = mysqli_fetch_assoc($result);
		
		//grabs the column 'name' from table 'configuration' and stores it
		$name = $row['name'];
		
		//GENERAL SETTINGS
		$title 			= $row['name'];
		$seperator 		= $row['seperator'];
		$description 	= $row['description'];
		$logo 			= $row['logo'];
		
		//TECHNICAL SETTINGS
		$maintenance 	= $row['maintenance'];
	}
?>