<?php
	session_start();
	
	//DATABASE CONNECTION
	$dbserver	= "localhost";
	$dbusername	= "root";
	$dbpassword	= "";
	$db			= "mmorts";
	
	//CREATE CONNECTION
	$conn = new mysqli($dbserver, $dbusername, $dbpassword, $db);
	
	//CHECK CONNECTION
	if($conn->connect_error)
	{
		//KILL CONNECTION/ERROR MESSAGE
		die("Connection Failed: ".$conn->connect_error);
	}

	//ASSIGN VARIABLES FROM FORM
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	//ENCRYPT PASSWORD
	$password = md5($password);
	
	$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
	if($result=mysqli_query($conn,$sql))
	{
		$rowcount = mysqli_num_rows($result);
	}
	if($rowcount == 1)
	{
		$_SESSION['loggedin'] = $username;
		echo "User Logged On: ".$_SESSION['loggedin'];
	
		header("refresh:2;url=../../index.php?msg=loginsuccess");
		die();	
	}
	else 
	{
		echo "The details you entered are not found in the database";
		
		header("refresh:2;url=../../index.php?page=login");
		die();	
	}
?>