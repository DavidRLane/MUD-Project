<?php 
	if(isset($_SESSION['loggedin']))
	{
?>
	<div class="account-actions">
		<a href="index.php?page=logout">Logout</a>
		<a href="index.php?page=account-actions">Account</a>
	</div>
<?php
	}
	else
	{
?>
	<div class="account-actions">
		<a href="index.php?page=login">Login</a>
		<a href="index.php?page=register">Registration</a>
	</div>
<?php
	}
?>