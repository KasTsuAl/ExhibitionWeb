<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap-icons.css">
    <link rel="stylesheet" type="text/css" href="../css/utility.css">
    <title>入場資訊</title>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-2 px-sm-5">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
            <img src="../../../favicon.ico" class="me-2" height="25px">
            展覽資訊平台</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto">
                    <a class="nav-link" href="register.php?id=m" id="register" style="display: none;"><span
                            class="align-middle">註冊</span></a>
                    <a class="nav-link" href="login.php" id="login" style="display: none;"><span
                            class="align-middle">登入</span></a>
                    <a class="nav-link" href="acc.php" id="acc">
                        <svg id="person" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                            class="bi bi-person me-1" viewBox="0 0 16 16">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z">
                            </path>
                        </svg>
                        <span class="align-middle" id="account"></span>
                    </a>
                    <a class="nav-link" href="index.php" id="logout"><span class="align-middle">登出</span></a>
                </div>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="my-5">
            <div>
                <a class="btn btn-secondary rounded-pill py-0 mb-2" id="exh">展覽名稱</a>
            </div>
            <div class="d-flex">
                <div>
                    <h3>入場資訊</h3>
                </div>
                <div class="ms-auto">
                    <form id="f">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="會員帳號" aria-label="Recipient's username" aria-describedby="btn" name="account" id="acc_input" maxlength="30"  autofocus>
                            <button class="btn btn-outline-secondary" type="submit" id="btn">入場</button>
                        </div>
                    </form>
                    
                </div>
            </div>
            <div class="mt-3" id="att">
                <div class="table-responsive">
                    <table class="table text-nowrap align-middle table-hover">
                        <thead>
                            <tr>
                                <th scope="col">入場時間</th>
                                <th scope="col">會員帳號</th>
                                <th scope="col">姓名</th>
                                <th scope="col">性別</th>
                                <th scope="col">電話</th>
                            </tr>
                        </thead>
                        <tbody id="att_list">
                            <!-- <tr>
                                <td>2021-05-11 09:43:43</td>
                                <td>陳Ｏ睿</td>
                                <td>男</td>
                                <td>0968-775633</td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="../js/vjs/attend.js"></script>
</body>

</html>