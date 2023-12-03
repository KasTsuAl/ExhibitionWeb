<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <title>作品簡介</title>
    <link rel="stylesheet" href="../css/bootstrap.css"/>
    <link rel="stylesheet" href="../css/pinfo.css">
    <link rel="stylesheet" href="../css/utility.css"/>

    </style>
</head>
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
    <div class="article-clean">
        <div class="container" >            
            <div class="row" >    
                <div class="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
                    <div class="col-12 d-flex flex-wrap">
                        <div>
                            <a class="btn btn-darkred rounded-pill py-0 mb-2" id="exh" href="#">所屬展覽</a>
                        </div>
                        <div class="ms-auto">
                            <button class="btn btn-primary rounded-pill py-0 mb-2" id="collect">
                                ＋收藏
                            </button>
                        </div>
                    </div>
                    <div class="intro">
                        <h1 class="text-center" id="pName">作品名稱</h1>
                        <p class="text-center"><span class="by">by</span> <a href="#" id="author">作者</a><span class="date" id="date">Sept 8th, 2016 </span></p>
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
                    <div class="text">
                        <div id="desc"></div>
                        <figure><button class="btn lblue" type="button" id="vote">投票</button></figure>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="../js/vjs/pro.js"></script>       
</body>

</html>