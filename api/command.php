<?php
session_start();
// if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']))
//     die(http_response_code(404));
require_once("inc/db_connect.php");
require_once("inc/sql.php");
require_once("inc/toJSON.php");
require_once("inc/getPOST.php");
require_once("inc/isLogin.php");
require_once("inc/salt.php");
$key = getPOST('key');
$android = @$_POST["android"] or null;
switch ($key) {
    case 100: // (100, id, acc, pw) 登入
        // 判斷身分
        if (getPOST('id') == 's') {
            $sql = "SELECT * FROM `sponsor` WHERE `sAccount`=?";
        } else {
            $sql = "SELECT * FROM `member` WHERE `account`=?";
        }
        // 查詢
        $res = query($db_link, $sql, array(getPOST('acc')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("Data Not Found"));
        } else {
            $res = $res[0];
            if (hash_equals($res['password'], crypt(getPOST('pw'), $res['password']))) {
                // 100 成功登入
                unset($res['password']);
                $json = toJSON(100, $res);
                $_SESSION['username'] = getPOST('acc');
                $_SESSION['role'] = getPOST('id');
            } else {
                // 99 密碼錯誤
                $json = toJSON(99, array("Wrong Password"));
            }
        }
        echo $json;
        break;
    case 110: // 是否登入
        if(isLogin()){
            $json = toJSON(100, array($_SESSION['username'], $_SESSION['role']));
            echo $json;
        }
        break;
    case 120: // 登出
        isLogin();
        unset($_SESSION['username']);
        unset($_SESSION['role']);
        echo  toJSON(100, array(null));
        break;
    case 130: // (130, id, acc, pw, data)更新會員資料
        if ($android == null){
            isLogin();
        }
        // 序列化
        $data = json_decode(getPOST('data'), true);
        $cnt = 0;
        $fields = "";
        foreach ($data as $key => $value) {
            $fields .= ($cnt++ == 0 ? "" : ", ");
            if($key == 'password') {
                // password hash
                $salt = salt();
                $fields .= "`$key` = '".crypt($value, $salt)."'";
            } else {
                $fields .= "`$key` = '$value'";
            }
        }
        // 身分驗證
        if (getPOST('id') == 's') {
            $sqlq = "SELECT * FROM `sponsor` WHERE `sAccount`=?";
            $sql = "UPDATE `sponsor` SET $fields WHERE `sAccount`=?";
        } else {
            $sqlq = "SELECT * FROM `member` WHERE `account`=?";
            $sql = "UPDATE `member` SET $fields WHERE `account`=?";
        }
        // 查詢
        $res = query($db_link, $sqlq, array(getPOST('acc')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("Data Not Found"));
        } else {
            $res = $res[0];
            if (hash_equals($res['password'], crypt(getPOST('pw'), $res['password']))) {
                // 100 驗證成功
                unset($res['password']);
                // 更新
                $res = insert($db_link, $sql, array(getPOST('acc')));
                if (gettype($res) != 'array') {
                    // 10 SQL錯誤
                    $json = toJSON(10, $res->errorInfo);
                } else {
                    // 100 成功｜89 失敗
                    $json = toJSON(($res[0] ? 100 : 89), $res);
                }
            } else {
                // 99 密碼錯誤
                $json = toJSON(99, array("Wrong Password"));
            }
        }
        echo $json;
        break;
        // 200 會員
    case 200: // (200, id, data) 註冊
        // 序列化
        $data = json_decode(getPOST('data'), true);
        // password hash
        $salt = salt();
        $data['password'] = crypt($data['password'], $salt);
        // 判斷身分
        if (getPOST('id') == 's') {
            $fields = ":sAccount, :password, :sName, :address, :phone, :title, :descript";
            $sql = "INSERT INTO `sponsor` VALUES($fields)";
        } else {
            $fields = ":account, :password, :name, :birth, :sex, :phone";
            $sql = "INSERT INTO `member` VALUES($fields)";
        }
        // 新增
        $res = insert($db_link, $sql, $data);
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 201: // (201, id, acc) 取得帳號資訊
        $id = getPOST('id');
        // 判斷身分
        if ($id == 's') {
            $sql = "SELECT * FROM `sponsor` WHERE `sAccount`=?";
        } else {
            $sql = "SELECT * FROM `member` WHERE `account`=?";
        }
        // 查詢
        $res = query($db_link, $sql, array(getPOST('acc')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("Data Not Found"));
        } else {
            $res = $res[0];
            unset($res['password']);
            if ($id == 's') {
                unset($res['sAccount']);
            } else {
                unset($res['account']);
            }
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
        // 300 展覽
    case 300: // (300, data) 新增展覽
        isLogin();
        // 序列化
        $data = json_decode(getPOST('data'), true);
        $fields = "";
        foreach ($data as $key => $value) {
            $fields .= ":$key, ";
        }
        $fields = rtrim($fields, ", ");
        $f = str_replace(":", "", $fields);
        $sql = "INSERT INTO `exhibition`($f) VALUES($fields)";
        // 新增
        $res = insert($db_link, $sql, $data);
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 301: // (301) 取得所有展覽資訊
        $sql = "SELECT A.*, B.`sName`, B.`sAccount` FROM `exhibition` AS A JOIN `sponsor` AS B ON A.`sAccount` = B.`sAccount` ORDER BY A.`start` DESC;";
        $res = query($db_link, $sql, array(null));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("尚未有任何展覽"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 302: // (302, eID) 取得展覽資訊
        $sql = "SELECT A.*, B.`sName`, B.`sAccount` FROM `exhibition` AS A JOIN `sponsor` AS B ON A.`sAccount` = B.`sAccount` WHERE `eID` = ?;";
        $res = query($db_link, $sql, array(getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("Data Not Found"));
        } else {
            $res = $res[0];
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 303: // (303, acc) 取得主辦方展覽資訊
        $sql = "SELECT A.*, B.`sName`, B.`sAccount`, IFNULL(C.`c_cnt`, 0) AS `c_cnt` FROM `exhibition` AS A JOIN `sponsor` AS B ON A.`sAccount` = B.`sAccount` LEFT JOIN (SELECT `eID`, COUNT(`account`) AS c_cnt FROM `exh_collection` GROUP BY `eID`) AS C on A.`eID` = C.`eID` WHERE A.`sAccount` = ? ORDER BY A.`start` DESC;";
        $res = query($db_link, $sql, array(getPOST('acc')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("Data Not Found"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
        // 展覽收藏
    case 310: // (310, acc, eID) 收藏展覽
        if ($android == null){
            isLogin();
        }
        $sql = "INSERT INTO `exh_collection`(`account`, `eID`) VALUES(?, ?)";
        $res = insert($db_link, $sql, array(getPOST('acc'), getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 311: // (311, acc) 會員展覽收藏紀錄
        if ($android == null){
            isLogin();
        }
        $sql = "SELECT A.`eID`, B.`eName`, B.`sAccount`, C.`sName`, A.`cTime` FROM `exh_collection` AS A JOIN `exhibition` AS B ON A.`eID` = B.`eID` JOIN `sponsor` AS C ON B.`sAccount` = C.`sAccount` WHERE `account`=? ORDER BY A.`cTime` DESC;";
        $res = query($db_link, $sql, array(getPOST('acc')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("尚未收藏任何展覽"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 312: // (312, acc, eID) 取消收藏展覽
        if ($android == null){
            isLogin();
        }
        $sql = "DELETE FROM `exh_collection` WHERE `account`=? AND `eID`=?;";
        $res = insert($db_link, $sql, array(getPOST('acc'), getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 313: // (313, acc, eID) 會員是否收藏展覽
        if ($android == null){
            isLogin();
        }
        $sql = "SELECT * FROM `exh_collection` WHERE `account`=? AND `eID`=?";
        $res = query($db_link, $sql, array(getPOST('acc'), getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(95, array("Not Collect"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 320: // (320, eID) 展覽圖片檔名
        $dir = @dir("../view/img/".getPOST("eID")."/") or die(toJSON(98, array("Data Not Found.")));
        $file = $dir->read();
        $arr = array();
        while($file != null){
            if(strpos($file, "exh") !== false)
                $arr[] = $file;
            $file = $dir->read();
        }
        $dir->close();
        echo toJSON(100, $arr);
        break;
    case 330: // (330, eID, data)更新展覽資訊
        isLogin();
        // 序列化
        $data = json_decode(getPOST('data'), true);
        $cnt = 0;
        $fields = "";
        foreach ($data as $key => $value) {
            $fields .= ($cnt++ == 0 ? "" : ", ");
            $fields .= "`$key` = '$value'";
        }
        // 更新
        $sql = "UPDATE `exhibition` SET $fields WHERE `eID`=?";
        $res = insert($db_link, $sql, array(getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 340: // (340, eID) 刪除作品
        isLogin();
        $sql = "DELETE FROM `exhibition` WHERE `eID`=?";
        $res = insert($db_link, $sql, array(getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
        // 400 參加紀錄
    case 400: // (400, acc, eID) 新增參加紀錄
        isLogin();
        $sql = "INSERT INTO `attend`(`account`, `eID`) VALUES(?, ?)";
        $res = insert($db_link, $sql, array(getPOST('acc'), getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 401: // (401, acc) 取得會員紀錄
        isLogin();
        $sql = "SELECT A.`aTime`, C.`eName`, C.`ePlace`, C.`eID`, B.`sAccount`, B.`sName` FROM `attend` AS A JOIN `exhibition` AS C ON A.`eID` = C.`eID` JOIN `sponsor` AS B ON C.`sAccount` = B.`sAccount` WHERE A.`account` = ? ORDER BY A.`aTime` DESC;";
        $res = query($db_link, $sql, array(getPOST('acc')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("尚未參觀任何展覽"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 402: // (402, eID) 取得展覽紀錄
        isLogin();
        $sql = "SELECT A.`aTime`, B.`name`, B.`sex`, B.`phone`, B.`account` FROM `attend` AS A JOIN `member` AS B ON A.`account` = B.`account` WHERE A.`eID` = ? ORDER BY A.`aTime` DESC;";
        $res = query($db_link, $sql, array(getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("尚未有會員參觀"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 403: // (403, acc, eID) 是否參加過
        isLogin();
        $sql = "SELECT * FROM `attend` WHERE `eID` = ? AND `account` = ?;";
        $res = query($db_link, $sql, array(getPOST('eID'), getPOST('acc')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array(false));
        } else {
            $json = toJSON(100, array(true));
        }
        echo $json;
        break;
        // 500 作品
    case 500: // (400, data) 新增作品
        isLogin();
        // 序列化
        $data = json_decode(getPOST('data'), true);
        $fields = "";
        foreach ($data as $key => $value) {
            $fields .= ":$key, ";
        }
        $fields = rtrim($fields, ", ");
        $f = str_replace(":", "", $fields);
        $sql = "INSERT INTO `product`($f) VALUES($fields)";
        // 新增
        $res = insert($db_link, $sql, $data);
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 501: // (501, eID) 取得展覽所有作品
        $sql = "SELECT A.*, IFNULL(B.`c_cnt`, 0) AS `c_cnt`, IFNULL(C.`v_cnt`, 0) AS `v_cnt`  FROM `product` AS A LEFT JOIN (SELECT `pID`, COUNT(`account`) AS c_cnt FROM `pro_collection` GROUP BY `pID`) AS B on A.`pID` = B.`pID` LEFT JOIN (SELECT `pID`, COUNT(`account`) AS v_cnt FROM `vote` GROUP BY `pID`) AS C on A.`pID` = C.`pID` WHERE `eID` = ?;";
        $res = query($db_link, $sql, array(getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 無紀錄
            $json = toJSON(98, array("尚未新增任何作品"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 502: // (502, eID, pID) 取得展覽所有作品
        $sql = "SELECT A.*, B.`eName`, B.`eID` FROM `product` AS A JOIN `exhibition` AS B ON A.`eID` = B.`eID` WHERE A.`eID`=? AND A.`pID`=?;";
        $res = query($db_link, $sql, array(getPOST('eID'), getPOST('pID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 無紀錄
            $json = toJSON(98, array("此展覽尚未登入任何作品"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
        // 作品收藏
    case 510: // (510, acc, eID, pID) 收藏作品
        if ($android == null){
            isLogin();
        }
        $sql = "INSERT INTO `pro_collection`(`account`, `eID`, `pID`) VALUES(?, ?, ?)";
        $res = insert($db_link, $sql, array(getPOST('acc'), getPOST('eID'), getPOST('pID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 511: // (511, acc) 會員作品收藏紀錄
        if ($android == null){
            isLogin();
        }
        $sql = "SELECT A.`eID`, B.`eName`, A.`pID`, C.`pName`, C.`author`, A.`cTime` FROM `pro_collection` AS A JOIN `exhibition` AS B ON A.`eID` = B.`eID` JOIN `product` AS C ON A.`eID` = C.`eID` AND A.`pID` = C.`pID` WHERE `account`=? ORDER BY A.`cTime` DESC;";
        $res = query($db_link, $sql, array(getPOST('acc')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(98, array("尚未收藏任何作品"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 512: // (512, acc, eID, pID) 取消收藏作品
        if ($android == null){
            isLogin();
        }
        $sql = "DELETE FROM `pro_collection` WHERE `account`=? AND `eID`=? AND `pID`=?;";
        $res = insert($db_link, $sql, array(getPOST('acc'), getPOST('eID'), getPOST('pID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 513: // (513, acc, eID, pID) 會員是否收藏作品
        if ($android == null){
            isLogin();
        }
        $sql = "SELECT * FROM `pro_collection` WHERE `account`=? AND `eID`=? AND `pID`=?";
        $res = query($db_link, $sql, array(getPOST('acc'), getPOST('eID'), getPOST('pID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 98 查無資料
            $json = toJSON(95, array("Not Collect"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 520: // (520, eID, pID) 作品圖片檔名
        $dir = @dir("../view/img/".getPOST("eID")."/pro_".getPOST("pID")) or die(toJSON(98, array("Data Not Found.")));
        $file = $dir->read();
        $arr = array();
        while($file != null){
            if(strpos($file, "pro") !== false)
                $arr[] = $file;
            $file = $dir->read();
        }
        $dir->close();
        echo toJSON(100, $arr);
        break;
    case 530: // (530, eID, pID, data) 更新作品資訊
        isLogin();
        // 序列化
        $data = json_decode(getPOST('data'), true);
        $cnt = 0;
        $fields = "";
        foreach ($data as $key => $value) {
            $fields .= ($cnt++ == 0 ? "" : ", ");
            $fields .= "`$key` = '$value'";
        }
        // 更新
        $sql = "UPDATE `product` SET $fields WHERE `eID`=? AND `pID`=?";
        $res = insert($db_link, $sql, array(getPOST('eID'), getPOST('pID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
        }
        echo $json;
        break;
    case 540: // (540, eID, pID) 刪除作品
        isLogin();
        $eID = getPOST('eID');
        $pID = getPOST('pID');
        $sql = "DELETE FROM `product` WHERE `eID`=? AND `pID`=?;";
        $res = insert($db_link, $sql, array($eID, $pID));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else {
            // 100 成功｜89 失敗
            $json = toJSON(($res[0] ? 100 : 89), $res);
            if ($res[0]) {
                $dir = realpath(dirname(__FILE__, 2)) . "/view/img/" . $eID . "/pro_" . $pID . "/";
                $dp = opendir($dir);
                while ($file = readdir($dp)) {
                    if(strcmp($file, ".") || strcmp($file, "..")){
                        @unlink($dir . $file);
                    }
                }
                closedir($dp);
                rmdir($dir);
            }
        }
        echo $json;
        break;
    case 600: // (600, acc, eID, pID) 作品投票
        isLogin();
        $acc = getPOST('acc');
        $eID = getPOST('eID');
        $sql = "SELECT * FROM `attend` WHERE account = ? AND eID = ?;";
        $res_attend = query($db_link, $sql, array($acc, $eID));
        if (gettype($res_attend) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res_attend->errorInfo);
        } else if ($res_attend == null) {
            // 未參加此展覽
            $json = toJSON(100, array("尚未參觀此展覽"));
        } else {
            // 已參加此展覽
            $sql = "SELECT * FROM `vote` WHERE account = ? AND eID = ?;";
            $res_vote = query($db_link, $sql, array($acc, $eID));
            if (gettype($res_vote) != 'array') {
                // 10 SQL錯誤
                $json = toJSON(10, $res_vote->errorInfo);
            } else if ($res_vote == null) {
                // 尚未投票
                $sql = "INSERT INTO `vote`(`account`, `eID`, `pID`) VALUES(?, ?, ?)";
                // 新增
                $res = insert($db_link, $sql, array($acc, $eID, getPOST('pID')));
                if (gettype($res) != 'array') {
                    // 10 SQL錯誤
                    $json = toJSON(10, $res->errorInfo);
                } else {
                    // 100 成功｜89 失敗
                    $json = toJSON(($res[0] ? 100 : 89), $res);
                }
            } else {
                // 已投票
                $json = toJSON(100, array("已經投票過囉！"));
            }
        }
        echo $json;
        break;
    case 601: // (601, acc) 會員投票紀錄
        isLogin();
        $sql = "SELECT A.`vTime`, A.`eID`, C.`eName`, A.`pID`, B.`pName`, B.`author` FROM `vote` AS A JOIN `product` AS B ON A.`pID` = B.`pID` AND A.`eID`= B.`eID` JOIN `exhibition` AS C ON A.`eID` = C.`eID` WHERE A.`account` = ?;";
        $res = query($db_link, $sql, array(getPOST('acc')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 無紀錄
            $json = toJSON(98, array("尚未投票給任何作品"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    case 602: // (602, acc, eID) 是否投票過
        isLogin();
        $sql = "SELECT * FROM `vote` WHERE `account` = ? AND `eID` = ?;";
        $res = query($db_link, $sql, array(getPOST('acc'), getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 無紀錄
            $json = toJSON(98, array(false));
        } else {
            $json = toJSON(100, array(true));
        }
        echo $json;
        break;
    case 603: // (603, eID) 展覽票數統計
        isLogin();
        $sql = "SELECT A.`pID`, B.`pName`, B.`author`, COUNT(A.`account`) AS `count` FROM `vote` AS A JOIN `product` AS B ON A.`eID` = B.`eID` AND A.`pID` = B.`pID` GROUP BY A.`eID` HAVING A.`eID` = ?;";
        $res = query($db_link, $sql, array(getPOST('eID')));
        if (gettype($res) != 'array') {
            // 10 SQL錯誤
            $json = toJSON(10, $res->errorInfo);
        } else if ($res == null) {
            // 無紀錄
            $json = toJSON(98, array("Data Not Found"));
        } else {
            $json = toJSON(100, $res);
        }
        echo $json;
        break;
    default: // 查無KEY
        echo toJSON(0, array("Key Not Found"));
        break;
}