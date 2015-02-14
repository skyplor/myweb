<?php
$msg="";
/* ****Important!****
replace name@your-web-site.com below 
with an email address that belongs to 
the website where the script is uploaded.
For example, if you are uploading this script to
www.my-web-site.com, then an email like
form@my-web-site.com is good.
*/

$from_add = "portfolio@skypayjm.com"; 

$to_add = "sky.jmpay@gmail.com"; //<-- put your yahoo/gmail email address here
if(isset($_GET['subject'])) $subject = trim($_GET['subject']);
else $subject = "Test Subject";
if(isset($_GET['fullname'])) $fullname = trim($_GET['fullname']);
else $fullname = 'No Name';
if(isset($_GET['email'])) $email = trim($_GET['email']);
else $email = "test@sky.com";
if(isset($_GET['message'])) $message = trim($_GET['message']);
else $message = "Test Message";

$headers = "From: $from_add \r\n";
$headers .= "Reply-To: $from_add \r\n";
$headers .= "Return-Path: $from_add\r\n";
$headers .= "X-Mailer: PHP \r\n";


if(mail($to_add,$subject,$message,$headers)) 
{
	$msg = "Mail sent OK";
} 
else 
{
   $msg = "Error sending email!";
}
?>