<?php
    require_once("toJSON.php");
    function isLogin()
    {
        $json = toJSON(96, array("Not Login"));
        return (isset($_SESSION['username']) ? true : die($json));
    }
?>