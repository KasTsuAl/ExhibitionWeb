<?php
    function salt()
    {
        $now = time();
        $salt = "";
        for($i = 1; $i <= 6; $i++) {
            $r = rand(1, 3);
            $salt .= chr(90 + ($now % 10) * $r + $r ** 2);
            $now /= 10;
        }
        return $salt;
    }
?>