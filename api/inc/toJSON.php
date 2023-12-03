<?php
    function toJSON(int $stateCode, array $result)
    {
        $arr['stateCode'] = $stateCode;
        $arr['result'] = $result;
        return json_encode($arr);;
    }
?>