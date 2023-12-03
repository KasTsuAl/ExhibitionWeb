<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap-icons.css">
    <link rel="stylesheet" type="text/css" href="../css/utility.css">
    <title>主辦方資訊</title>
</head>
<?php
    session_start();
?>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-2 px-sm-5">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
            <img src="../../../favicon.ico" class="me-2" height="25px">
            展覽資訊平台</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto">
                    <a class="nav-link" href="#exh" id="info"><span class="align-middle">主辦方資訊</span></a>
                    <a class="nav-link" href="#product" id="exh"><span class="align-middle">展覽集</span></a>
                    <a class="nav-link" href="register.php?id=m" id="register"><span class="align-middle">註冊</span></a>
                    <a class="nav-link" href="login.php" id="login"><span class="align-middle">登入</span></a>
                    <a class="nav-link" href="acc.php" id="acc">
                        <svg id="person" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person me-1" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>
                        <span class="align-middle" id="account"></span>
                    </a>
                    <a class="nav-link" href="index.php" id="logout"><span class="align-middle">登出</span></a>
                </div>
            </div>
        </div>
    </nav>
    <div class="container-sm">
        <div class="my-5" id="exh">
            <div class="row row-cols-1 g-2">
                <div class="col">
                    <h1 id="sName">國立臺中科技大學</h1>
                </div>
                <div class="col">
                    <ul>
                        <li id="address">地址：台中市北區三民路三段000號</li>
                        <li id="phone">電話：04-22190000</li>
                    </ul>
                </div>
                <div class="col p-3">
                    <h3 id="title">標題</h3>
                    <p id="descript">
                        內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
                    </p>
                </div>
            </div>
        </div>
        <div class="my-5" id="exhibition">
            <h3>展覽集</h3>
            <!-- <div class="row row-cols-1 g-3">
                <div class="col px-4">
                    <div class="card border-dark overflow-hidden">
                        <div class="row g-0">
                            <div class="col-12 col-sm-8">
                                <div class="d-flex flex-column h-100">
                                    <div class="card-header text-truncate">
                                        組員：張庭楨、陳董秋敏、蕭之吟｜指導老師：吳美玉
                                    </div>
                                    <div class="card-body">
                                            <div class="d-block h-100 overflow-hidden">
                                                <h5 class="card-title">茶巡 ‧ 福爾摩沙</h5>
                                            <p class="card-text">
                                                帶領大家去巡視台灣茶葉文化以及製茶方法帶領大家去巡視台帶領大家去巡視台灣茶葉文化以及製茶方法帶領大家去巡視台帶領大家去巡視台灣茶葉文化
                                            </p>
                                        </div>
                                    </div>
                                    <div class="p-3 w-100">
                                        <a href="#" class="btn btn-primary stretched-link">詳細資訊</a>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="col-12 col-sm-4">
                                <img src="../img/6/pro/1.jpg" class="w-100 img-fluid">
                            </div>
                        </div>            
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="../js/vjs/sponsor.js"></script>
</body>
</html>