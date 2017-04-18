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
		//KILL CONNECTION/ERROR MESSAGE
		die("Connection Failed: ".$conn->connect_error);
	}
	
	//ASSIGN VARIABLES FROM FORM
	$username = $_POST['username'];
	$password = $_POST['password'];
	$email = $_POST['email'];
	
	//ENCRYPT PASSWORD
	$password = md5($password);
	
	$sql = "SELECT username FROM users WHERE username = '$username'";
	if($result=mysqli_query($conn,$sql))
	{
		$rowcount = mysqli_num_rows($result);
	}
	if($rowcount >= 1)
	{
		echo "This is already an user with this username";
		header("refresh:2;url=../../index.php?page=register");
		die();
	}
	else
	{
		//INSERT DATA INTO DATABASE
		$sql = "INSERT INTO users(username, password, email)
		VALUES('$username', '$password', '$email')";
		
		//EXECUTE QUERY
		if($conn->query($sql) == TRUE)
		{
			echo "Account has been added successfully: ".$username." ".$password." ".$email;
			header("refresh:2;url=../../index.php?page=register");
			die();
		}
		else
		{
			echo "Error: ".$sql."<br/>".$conn->error;	
		}	
	}
?>