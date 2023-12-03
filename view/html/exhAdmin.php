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
                    <a class="nav-link" id="attend" target="_blank"><span class="align-middle">入場管理</span></a>
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
        <div class="my-4" id="exh">
            <div class="d-flex">
                <div class="ms-auto">
                    <a class="btn btn-dark rounded-pill" id="edit">
                        <i class="bi bi-pencil"></i>
                        &nbsp;更改資訊
                    </a>
                </div>
            </div>
            <div class="row py-4 g-1">
                <div class="col-12 p-1 bg-dark">
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
                    <h1 id="eName">展覽名稱</h1>
                </div>
                <div class="col">
                    <ul>
                        <li id="date">日期：2021-03-09～2021-03-10</li>
                        <li id="place">地點：中商大樓圖書館門口</li>
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
        <div class="my-5" id="product">
            <div class="d-flex">
                <div>
                    <h3>作品集</h3>
                </div>
                <div class="ms-auto">
                    <a class="btn btn-dark rounded-pill" id="proAdd">
                        <i class="bi bi-plus"></i>
                        &nbsp;新增作品
                    </a>
                </div>
            </div>
            <div class="mt-3" id="pro">
                <div class="table-responsive">
                    <table class="table text-nowrap align-middle table-hover">
                        <thead>
                            <tr>
                                <th scope="col" colspan = "2">
                                    作品資訊
                                </th>
                                <th class="text-center" scope="col">得票數</th>
                                <!-- <th class="text-center" scope="col">收藏數</th> -->
                                <th class="text-center" scope="col">刪除作品</th>
                            </tr>
                        </thead>
                        <tbody id="pro_list">
                            <!-- <tr>
                                <td>
                                    <a class="btn btn-outline-dark border-0 w-100 text-start fw-bolder">作品名稱</a>    
                                </td>
                                <td>
                                    作者
                                </td>
                                <td>
                                    時間
                                </td>
                                <td class="text-center">
                                    <button type="button" class="btn-close" aria-label="Close"></button>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="../js/vjs/exhAdmin.js"></script>
</body>
</html>