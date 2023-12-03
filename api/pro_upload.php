<?php // product img
    require_once("inc/db_connect.php");
    require_once("inc/sql.php");
    require_once("inc/toJSON.php");
    require_once("inc/isLogin.php");
    session_start();
    isLogin();
    // dir
    $sql = "SELECT `eID`, `pID` FROM `product` ORDER BY `pID` DESC LIMIT 1";
    $data = query($db_link, $sql, array(null))[0];
    $dir = realpath(dirname(__FILE__, 2)) . "/view/img/" . $data['eID'] . "/pro_" . $data['pID'] . "/";
    if ( !is_dir($dir)) {
        mkdir($dir);
    }
    // cnt
    $cnt = count($_FILES['img']['name']);
    for($i = 0; $i < $cnt; $i++){
        $file = $dir.basename("pro" . ($i != 0 ? $i : "") . ".jpg");
        if(move_uploaded_file($_FILES["img"]["tmp_name"][$i], $file)){
            $json = toJSON(100, array($i . "File Upload Successful"));
        } else {
            $json = toJSON(94, array($i . "File Upload Failed"));
            break;
        }
    }
    echo $json;
?>