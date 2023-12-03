<?php
    require_once("toJSON.php");
    function getPOST(string $key)
    {
        $json = toJSON(97, array("Wrong Params"));
        $value = @$_POST[$key] or die($json);
        return $value;
    }
?>