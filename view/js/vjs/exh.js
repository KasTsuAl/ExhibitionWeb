let isCollect = false;
let account = "";
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
                    key: 313,
                    acc: account,
                    eID: eID
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
        }else{
            $("#acc").hide();
            $("#logout").hide();
            $("#collect").hide();
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
// 尋覽列
$("#info").click(() => {
    $("#navbarNavAltMarkup").removeClass("show");
});
$("#pro").click(() => {
    $("#navbarNavAltMarkup").removeClass("show");
});
// 取得GET值
let eID = new URL(location.href).searchParams.get('eID');
// 展覽資訊
$.ajax({
    type: "POST",
    url: "../../api/command.php",
    data: {
        key: 302,
        eID: eID
    },
    success: (response) => {
        let res = JSON.parse(response).result;
        // 主辦方
        $("#sponsor")
            .text(res.sName)
            .attr("href", "sponsor.php?sAcc=" + res.sAccount);
        // 輪播圖片
        $.ajax({
            type: "POST",
            url: "../../api/command.php",
            data: {
                key: 320,
                eID: eID
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
                                    .attr("src", "../img/" + res.eID + "/" + v)
                                    .addClass("d-block w-100")
                                    .attr("alt", "exh")
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
        // 展覽資訊
        $("#eName").text(res.eName);
        $("#date").text(res.start + "~" + res.end);
        $("#place").text(res.ePlace);
        $("#title").text(res.title);
        $("#descript").html(res.descript.replace(/\n/g,'<br/>'));
    }
});
// 作品資訊
$.ajax({
    type: "POST",
    url: "../../api/command.php",
    data: {
        key: 501,
        eID: eID
    },
    success: (response) => {
        let status = JSON.parse(response).stateCode;
        let res = JSON.parse(response).result;
        if (status == 100) {
            let row = $("<div></div>").addClass("row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3");
            res.forEach(e => {
                if(e == null){
                    $("#info").hide();
                    $("#pro").hide();
                    $("#product").hide();
                }else{
                    let pro = $("<div></div>")
                        .addClass("col px-1 px-sm-2")
                        .append(
                            $("<div></div>")
                                .addClass("card border-dark h-100")
                                .append(
                                    $("<img></img>")
                                        .addClass("card-img-top")
                                        .attr("src", "../img/" + e.eID + "/pro_" + e.pID + "/pro.jpg")
                                    ,
                                    $("<div></div>")
                                        .addClass("card-body")
                                        .append(
                                            $("<h5></h5>")
                                                .addClass("card-title text-truncate")
                                                .text(e.pName),
                                            $("<p></p>")
                                                .addClass("card-text ellipsis")
                                                .text(e.descript),
                                            $("<a></a>")
                                                .addClass("stretched-link")
                                                .attr("href", "pro.php?eID=" + e.eID + "&pID=" + e.pID)
                                    ),
                                    $("<div></div>")
                                        .addClass("card-footer text-truncate")
                                        .text(e.author)
                                )
                    );
                    row.append(pro);
                }
            });
            $("#product").append(row);
        }else {
            $("#product").hide();
        }
        
    }
});
// 展覽收藏
$("#collect").click(() => {
    if(isCollect){
        $.ajax({
            type: "POST",
            url: "../../api/command.php",
            data: {
                key: 312,
                eID: eID,
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
                key: 310,
                eID: eID,
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