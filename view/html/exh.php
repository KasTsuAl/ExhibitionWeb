<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap-icons.css">
    <link rel="stylesheet" type="text/css" href="../css/utility.css">
    <title>展覽資訊</title>
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
                    <a class="nav-link" href="#exh" id="info"><span class="align-middle">展覽資訊</span></a>
                    <a class="nav-link" href="#product" id="pro"><span class="align-middle">作品集</span></a>
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
        <div id="exh">
            <div class="row py-4 g-1">
                <div class="col-12 d-flex flex-wrap">
                    <div>
                        <a class="btn btn-success rounded-pill py-0 mb-2" id="sponsor" target="_blank"></a>
                    </div>
                    <div class= "ms-auto">
                        <button class="btn btn-primary rounded-pill py-0 mb-2" id="collect">
                            ＋收藏
                        </button>
                    </div>
                </div>
                <div class="col-12 p-1 shadow-sm">
                    <div id="imgCarousel" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <!-- <button type="button" data-bs-target="#imgCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#imgCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button> -->
                        </div>
                        <div class="carousel-inner">
                            <!-- <div class="carousel-item">
                                <img src="../img/2/exh.jpg" alt="exh" class="d-block w-100">
                            </div> -->
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#imgCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#imgCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row row-cols-1 g-2">
                <div class="col">
                    <h1 id="eName"></h1>
                </div>
                <div class="col row">
                    <div class="col-auto card text-nowrap overflow-auto border-0 shadow dp">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item dp"><i class="bi bi-calendar2-minus-fill pe-2"></i><span id="date"></span></li>
                            <li class="list-group-item dp"><i class="bi bi-geo-alt-fill pe-2"></i><span id="place"></span></li>
                        </ul>
                    </div>
                    <!-- "col col-sm-9 col-lg-6 col-xl-5 card text-nowrap overflow-auto ps-3" -->
                </div>
                <div class="col p-3">
                    <h3 id="title"></h3>
                    <p id="descript">
                    </p>
                </div>
            </div>
        </div>
        <div class="my-5" id="product">
            <h3>作品集</h3>
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
    <script type="text/javascript" src="../js/bootstrap.bundle.js"></script>
    <script type="text/javascript" src="../js/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="../js/vjs/exh.js"></script>
</body>
</html>