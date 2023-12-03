<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/utility.css">
    <title>註冊</title>
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
                    <a class="nav-link" href="login.php" id="login"><span class="align-middle">登入</span></a>
                    <a class="nav-link" href="index.php" id="home"><span class="align-middle">回首頁</span></a>
                </div>
            </div>
        </div>
    </nav>
    <div class="container">
        <!-- <div class="p-4 mx-auto" style="max-width: 500px;">
            <h5>註冊（一般會員）</h5>
            <form class="row g-3 my-3">
                <div class="col-12">
                    <label for="acc" class="form-label">帳號</label>
                    <input type="text" class="form-control" name="acc" id="acc" maxlength="30" required>
                </div>
                <div class="col-12">
                    <label for="pw" class="form-label">密碼</label>
                    <input type="password" class="form-control" name="pw" id="pw" maxlength="30" required>
                </div>
                <div class="col-12">
                    <label for="pw2" class="form-label">確認密碼</label>
                    <input type="password" class="form-control" name="pw2" id="pw2" maxlength="30" required>
                </div>
                <div class="col-12  col-sm-6">
                    <label for="name" class="form-label">姓名</label>
                    <input type="text" class="form-control" name="name" id="name" maxlength="4" required>
                </div>
                <div class="col-12 col-sm-6">
                    <label for="sex" class="form-label">性別</label>
                    <div class="row row-cols-3 row-cols-sm-2 px-3" id="sex">
                        <div class="col form-check">
                            <input class="form-check-input" type="radio" name="sex" id="male" value="m" required>
                            <label class="form-check-label" for="male">
                                男性
                            </label>
                        </div>
                        <div class="col form-check">
                            <input class="form-check-input" type="radio" name="sex" id="female" value="f" required>
                            <label class="form-check-label" for="female">
                                女性
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-5">
                    <label for="birth" class="form-label">生日</label>
                    <input type="date" class="form-control" name="birth" id="birth" required>
                </div>
                <div class="col-12 col-sm-7">
                    <label for="phone" class="form-label">電話</label>
                    <input type="tel" class="form-control" name="phone" id="phone" placeholder="0912345678" pattern="[0-9]{10}" required>
                </div>
                <div class="col-12 mt-5">
                    <button type="submit" class="btn btn-primary w-100">註　冊</button>
                </div>
            </form>
        </div> -->
    </div>

    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="../js/vjs/register.js"></script>
</body>

</html>