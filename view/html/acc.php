<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap-icons.css">
    <link rel="stylesheet" type="text/css" href="../css/utility.css">
    <title>會員資訊</title>
</head>

<?php
    session_start();
    if(isset($_SESSION['role']) && $_SESSION['role'] == 's') {
        header('location: sAcc.php');
    }
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
                    <a class="nav-link" href="#member" id="info"><span class="align-middle">基本資料</span></a>
                    <a class="nav-link" href="#collect" id="col"><span class="align-middle">我的收藏</span></a>
                    <a class="nav-link" href="#record" id="rec"><span class="align-middle">參展紀錄</span></a>
                    <a class="nav-link" href="register.php?id=m" id="register"><span class="align-middle">註冊</span></a>
                    <a class="nav-link" href="login.php" id="login"><span class="align-middle">登入</span></a>
                    <a class="nav-link" href="acc.php" id="acc">
                        <svg id="person" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person me-1" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>
                        <span class="align-middle" id="account"></span>
                    </a>
                    <a class="nav-link" href="index.php" id="home"><span class="align-middle">回首頁</span></a>
                    <a class="nav-link" href="index.php" id="logout"><span class="align-middle">登出</span></a>
                </div>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="my-4" id="member">
            <div class="d-flex">
                <div>  
                    <h3>會員資訊</h3>
                </div>
                <div class="ms-auto">
                    <a class="btn btn-dark rounded-pill" href="accEdit.php">
                        <i class="bi bi-pencil"></i>
                        &nbsp;更改資訊
                    </a>
                </div>
            </div>
            <div class="mt-2 border border-2 border-dark rounded rounded-3 p-3 overflow-auto text-nowrap">
                <div class="d-flex flex-wrap">
                    <img id="barcode" class="d-block mx-auto mb-5">
                    <div class="row row-cols-1 row-cols-sm-2 g-2 mx-auto">
                        <div class="col">
                            <b>姓　　名</b>
                            <span id="name" class="ms-3">姓名</span>
                        </div>
                        <div class="col">
                            <b>性　　別</b>
                            <span id="sex" class="ms-3">性別</span>
                        </div>
                        <div class="col">
                            <b>生　　日</b>
                            <span id="birth" class="ms-3">2021-04-14</span>
                        </div>
                        <div class="col">
                            <b>聯絡電話</b>
                            <span id="phone" class="ms-3">0900-000000</span>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        <div class="my-4" id="collect">
            <h3>我的收藏</h3>
            <div class="mt-3 border border-2 border-dark rounded rounded-3 p-3">
                <nav>
                    <div class="nav nav-tabs row row-cols-2 row-cols-sm-6" id="nav-tab" role="tablist">
                        <button class="nav-link col active" id="exh-tab" data-bs-toggle="tab" data-bs-target="#exh" type="button" role="tab" aria-controls="exh" aria-selected="true">展覽</button>
                        <button class="nav-link col" id="pro-tab" data-bs-toggle="tab" data-bs-target="#pro" type="button" role="tab" aria-controls="pro" aria-selected="false">作品</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="exh" role="tabpanel" aria-labelledby="exh-tab">
                        <div class="table-responsive">
                            <table class="table text-nowrap align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col" colspan = "2">
                                            <div class="d-flex">
                                                <div class="pt-2">展覽資訊</div>
                                                <div class="ms-5">
                                                    <select id="exh_filter" class="form-select form-select-sm">
                                                        <option value="" selected>篩選－主辦方</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </th>
                                        <th class="text-center" scope="col">取消收藏</th>
                                    </tr>
                                </thead>
                                <tbody id="exh_list">
                                    <!-- <tr>
                                        <td>
                                            <a class="btn btn-outline-dark border-0 w-100 text-start fw-bolder">2020商業經營系專題成果展</a>    
                                        </td>
                                        <td>
                                            <a class="btn btn-secondary rounded-pill py-0">國立臺中科技大學 商業經營系</a>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn-close" aria-label="Close"></button>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pro" role="tabpanel" aria-labelledby="pro-tab">
                        <div class="table-responsive">
                            <table class="table text-nowrap align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col" colspan = "2">
                                            <div class="d-flex">
                                                <div class="pt-2">作品資訊</div>
                                                <div class="ms-5">
                                                    <select id="pro_filter" class="form-select form-select-sm">
                                                        <option value="" selected>篩選－展覽名稱</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </th>
                                        <th scope="col"></th>
                                        <th class="text-center" scope="col">取消收藏</th>
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
                                            <a class="btn btn-secondary rounded-pill py-0">2020商業經營系專題成果展</a>
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
        </div>
        <div class="my-4" id="record">
            <h3>參展紀錄</h3>
            <div class="mt-3 border border-2 border-dark rounded rounded-3 p-3">
                <nav>
                    <div class="nav nav-tabs row row-cols-2 row-cols-sm-6" id="nav-tab" role="tablist">
                        <button class="nav-link col active" id="attend-tab" data-bs-toggle="tab" data-bs-target="#attend" type="button" role="tab" aria-controls="attend" aria-selected="true">入場紀錄</button>
                        <button class="nav-link col" id="vote-tab" data-bs-toggle="tab" data-bs-target="#vote" type="button" role="tab" aria-controls="vote" aria-selected="false">投票紀錄</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="attend" role="tabpanel" aria-labelledby="attend-tab">
                        <div class="table-responsive">
                            <table class="table text-nowrap align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">時間</th>
                                        <th scope="col" colspan="2">
                                            展覽資訊
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="att_list">
                                    <!-- <tr>
                                        <td>
                                            2021-05-08 12:10
                                        </td>
                                        <td>
                                            <a class="btn btn-outline-dark border-0 w-100 text-start fw-bolder">2020商業經營系專題成果展</a>
                                        </td>
                                        <td>
                                            <a class="btn btn-secondary rounded-pill py-0">國立臺中科技大學 商業經營系</a>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="vote" role="tabpanel" aria-labelledby="vote-tab">
                        <div class="table-responsive">
                            <table class="table text-nowrap align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">時間</th>
                                        <th scope="col" colspan = "2">
                                            作品資訊
                                        </th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="vote_list">
                                    <!-- <tr>
                                        <td>
                                            2021-05-08 12:10
                                        </td>
                                        <td>
                                            <a class="btn btn-outline-dark border-0 w-100 text-start fw-bolder">作品名稱</a>    
                                        </td>
                                        <td>
                                            作者
                                        </td>
                                        <td>
                                            <a class="btn btn-secondary rounded-pill py-0">2020商業經營系專題成果展</a>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="../js/JsBarcode.all.js"></script>
    <script type="text/javascript" src="../js/vjs/acc.js"></script>
</body>
</html>