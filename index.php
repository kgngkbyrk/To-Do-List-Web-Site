<?php 
  session_start(); 

  if (!isset($_SESSION['username'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: login.php');
  }
  if (isset($_GET['logout'])) {
  	session_destroy();
  	unset($_SESSION['username']);
  	header("location: login.php");
  }
?>
<!DOCTYPE html>
<html>
<head>
	<title>Home</title>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css"/>
    <link rel="stylesheet" href="uygulama.css"/>
    <script src="//code.jquery.com/jquery-1.12.4.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>


	
<div class="content">
  	<!-- notification message -->
  	<?php if (isset($_SESSION['success'])) : ?>
      <div class="error success" >
      	<h3>
          <?php 
          	echo $_SESSION['success']; 
          	unset($_SESSION['success']);
          ?>
      	</h3>
      </div>
  	<?php endif ?>

    <!-- logged in user information -->
    <?php  if (isset($_SESSION['username'])) : ?>
    	<p style="font-size:x-large;  width: 160px; padding: 10px; border: 5px solid black; margin: 0;">Welcome <strong><?php echo $_SESSION['username']; ?></strong></p>
    	<p> <a href="index.php?logout='1'" style="color: red; font-size:x-large;">logout</a> </p>
    <?php endif ?>
</div>
<div id="geneldiv">
         <div id="uygulamabaslik">To-Do List</div>

         <div class="gorev-liste" id="bekleyen">
             <h3>To-Do</h3>
         </div>

         <div class="gorev-liste" id="devameden">
            <h3>In Progress</h3>
        </div>

        <div class="gorev-liste" id="biten">
            <h3>Done</h3>
        </div>

        <div class="gorev-liste">
            <h3>Add</h3>
            <form id="gorev-form">
                <input type="text" placeholder="Header"/>
                <textarea placeholder="Details"></textarea>
                <input type="text" id="tarihsec" placeholder="End Date (dd/mm/yy)"/>
                <input type="button" value="Add to List" onclick="ekle();"/>
            </form>

            <input type="button" value="Clear List" onclick="temizle();"/>

            <div id="sil-div">
                Drop Here to Delete
            </div>

        </div>
        <script type="text/javascript" src="jQuery/jquery.min.js"></script>
        <script type="text/javascript" src="jQuery/jquery.ui.min.js"></script>
        <script type="text/javascript" src="uygulama.js"></script>

        <script type="text/javascript">
            $("#tarihsec").datepicker();
            baslat();
        </script>


     </div>
<script src="script.js"></script>
</body>
</html>