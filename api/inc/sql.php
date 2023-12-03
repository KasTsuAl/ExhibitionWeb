<?php
    function query($db, string $sql, array $params)
    {   
        try {
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt->db = null;
            return $res;
        } catch (PDOException $e) {
            return $e;
        }
    }
    function insert($db, string $sql, array $params)
    {
        try {
            $stmt = $db->prepare($sql);
            $res = $stmt->execute($params);
            $stmt->db = null;
            return array($res);
        } catch (PDOException $e) {
            return $e;
        }
    }
?>