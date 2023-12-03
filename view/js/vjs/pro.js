let isCollect = false;
let account = "";
let eName = "";
let pName = "";
// 取得GET值
let eID = new URL(location.href).searchParams.get('eID');
let pID = new URL(location.href).searchParams.get('pID');
// 是否登入
$.ajax({
    type: "POST",
    url: "../../api/command.php",
    data: {
        key: 110
    },
    success: (response) => {
        let res = JSON.parse(response);
        if(res.stateCode == 100){
            $("#register").hide();
            $("#login").hide();
            $("#account").text(res.result[0]);
            account = res.result[0];
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 513,
                    acc: account,
                    eID: eID,
                    pID: pID
                },
                success: (response) => {
                    let res = JSON.parse(response);
                    if(res.stateCode == 100){
                        isCollect = true;
                        $("#collect")
                            .text("取消收藏")
                            .removeClass("btn-primary")
                            .addClass("btn-outline-primary");
                    }else{
                        isCollect = false;
                        $("#collect").text("＋收藏");
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 403,
                    acc: account,
                    eID: eID
                },
                success: (response) => {
                    let res = JSON.parse(response);
                    if(res.stateCode != 100){
                        $("#vote").hide();
                    }else{
                        $.ajax({
                            type: "POST",
                            url: "../../api/command.php",
                            data: {
                                key: 602,
                                acc: account,
                                eID: eID
                            },
                            success: (response) => {
                                let res = JSON.parse(response);
                                if(res.stateCode == 100){
                                    $("#vote")
                                        .text("已投票")
                                        .prop("disabled", true);
                                }else{
                                    
                                }
                            }
                        });
                    }
                }
            });
        }else{
            $("#acc").hide();
            $("#logout").hide();
            $("#collect").hide();
            $("#vote").hide();
        }
    }
});
// 登出
$("#logout").click(()=>{
    $.ajax({
        type: "POST",
        url: "../../api/command.php",
        data: {
            key: 120
        },
        success: (response) => {
            console.log(response);
            account = "";
            alert("帳號已登出！");
            location.reload();
        }
    })
});
// 作品資訊
$.ajax({
    type: "POST",
    url: "../../api/command.php",
    data: {
        key: 502,
        eID: eID,
        pID: pID
    },
    success: (response) => {
        let res = JSON.parse(response).result[0];
        eName = res.eName;
        pName = res.pName;
        $("#exh")
            .attr("href", "exh.php?eID=" + eID)
            .text(eName);
        $("#pName").text(pName);
        $("#author").text(res.author);
        $("#date").text(res.date);
        $("#desc").text(res.descript);
        // 照片輪播
        $.ajax({
            type: "POST",
            url: "../../api/command.php",
            data: {
                key: 520,
                eID: eID,
                pID: pID
            },
            success: (response) => {
                let files = JSON.parse(response).result;
                console.log(files);
                let cnt = 0;
                files.forEach( v => {
                    $(".carousel-inner").append(
                        $("<div></div>")
                            .addClass("carousel-item" + (cnt == 0 ? " active" : ""))
                            .append(
                                $("<img></img>")
                                    .attr("src", "../img/" + res.eID + "/pro_" + res.pID + "/" + v)
                                    .addClass("d-block w-100")
                                    .attr("alt", "pro")
                                )
                    );
                    $(".carousel-indicators").append(
                        $("<button></button>")
                            .attr("type", "button")
                            .attr("data-bs-target", "#imgCarousel")
                            .attr("data-bs-slide-to", cnt)
                            .attr("aria-current", "true")
                            .attr("aria-label", "Slide " + cnt + 1)
                            .addClass((cnt++ == 0 ? "active" : ""))
                    );
                });
            }
        });
    }
});
// 收藏
$("#collect").click(() => {
    if(isCollect){
        $.ajax({
            type: "POST",
            url: "../../api/command.php",
            data: {
                key: 512,
                eID: eID,
                pID: pID,
                acc: account
            },
            success: (response) => {
                let res = JSON.parse(response).stateCode;
                if(res == 100){
                    isCollect = false;
                    $("#collect")
                        .text("＋收藏")
                        .removeClass("btn-outline-primary")
                        .addClass("btn-primary");
                }
            }
        });
    }else{
        $.ajax({
            type: "POST",
            url: "../../api/command.php",
            data: {
                key: 510,
                eID: eID,
                pID: pID,
                acc: account
            },
            success: (response) => {
                let res = JSON.parse(response).stateCode;
                if(res == 100){
                    isCollect = true;
                    $("#collect")
                        .text("取消收藏")
                        .removeClass("btn-primary")
                        .addClass("btn-outline-primary");
                }
            }
        });
    }
    this.blur();
});

// 403 {"stateCode":100,"result":[true]} 98 -false

// 投票
$("#vote").click(()=>{
    $.ajax({
        type: "POST",
        url: "../../api/command.php",
        data: {
            key: 403,
            acc: account,
            eID: eID
        },
        success: (response) => {
            let res = JSON.parse(response);
            if(res.stateCode != 100){
                alert("您尚未參加過【" + eName + "】，無投票權");
            }else{
                $.ajax({
                    type: "POST",
                    url: "../../api/command.php",
                    data: {
                        key: 602,
                        acc: account,
                        eID: eID
                    },
                    success: (response) => {
                        let res = JSON.parse(response);
                        if(res.stateCode == 100){
                            alert("您已投票給【" + eName + "】之作品，無法重複投票");
                        }else{
                            if(confirm("確定要投票給【" + pName + "】?\n\n--- 每人限投一票 ---")){
                                $.ajax({
                                    type: "POST",
                                    url: "../../api/command.php",
                                    data: {
                                        key: 600,
                                        acc: account,
                                        eID: eID,
                                        pID: pID
                                    },
                                    success: (response) => {
                                        alert("投票成功");
                                        location.reload();
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
    });
    
});