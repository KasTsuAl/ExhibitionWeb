let isCollect = false;
let account = "";
let sponsors = [];
let exhibitions = [];
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
                    key: 201,
                    id: "m",
                    acc: account
                },
                success: (response) => {
                    let info = JSON.parse(response).result;
                    $("#barcode").JsBarcode(account);
                    // 姓名
                    let name = info.name;
                    let name_arr = name.split("");
                    name_arr[name.length - 2] = "○";
                    name = name_arr.toString().replace(/,/g, "");
                    // 電話
                    let phone = info.phone;
                    let phone_arr = phone.split("");
                    phone_arr.splice(4, 0, '-');
                    phone_arr[8] = "*";
                    phone_arr[9] = "*";
                    phone_arr[10] = "*";
                    phone = phone_arr.toString().replace(/,/g, "");
                    $("#name").text(name);
                    $("#sex").text((info.sex == "m" ? "男性" : "女性"));
                    $("#birth").text(info.birth);
                    $("#phone").text(phone);
                }
            });
            // 收藏展覽
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 311,
                    acc: account
                },
                success: (response) => {
                    let json = JSON.parse(response);
                    let state = json.stateCode;
                    let res = json.result;
                    if(state == 98){
                        $("#exh_list").append(
                            $("<h5></h5>")
                                .addClass("m-3 text-center")
                                .text(res[0])
                        );
                    }else if(state == 100){
                        res.forEach(element => {
                            let sAcc = element.sAccount;
                            let sName = element.sName;
                            let eID = element.eID;
                            if(!sponsors.includes(sAcc)){
                                $("#exh_filter")
                                    .append(
                                        $("<option></option>")
                                            .val(sAcc)
                                            .text(sName)
                                );
                                sponsors.push(sAcc);
                            }
                            $("#exh_list").append(
                                $("<tr></tr>")
                                    .attr("id", sAcc)
                                    .append(
                                        $("<td></td>").append(
                                            $("<a></a>")
                                                .addClass("btn btn-outline-info text-dark border-0 w-100 text-start fw-bolder")
                                                .attr("id", "exh" + eID)
                                                .attr("href", "exh.php?eID=" + eID)
                                                .text(element.eName)
                                        ),
                                        $("<td></td>").append(
                                            $("<a></a>")
                                                .addClass("btn btn-success rounded-pill py-0")
                                                .attr("href", "sponsor.php?sAcc=" + sAcc)
                                                .text(sName)
                                        ),
                                        $("<td></td>")
                                            .addClass("text-center")
                                            .append(
                                                $("<button></button>")
                                                    .addClass("btn-close")
                                                    .attr("id", "exh_del")
                                                    .attr("type", "button")
                                                    .attr("aria-label", "Close")
                                                    .val(eID)
                                        )
                                )
                            );
                        });
                    }
                }
            });
            // 收藏作品
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 511,
                    acc: account
                },
                success: (response) => {
                    let json = JSON.parse(response);
                    let state = json.stateCode;
                    let res = json.result;
                    if(state == 98){
                        $("#pro_list").append(
                            $("<h5></h5>")
                                .addClass("m-3 text-center")
                                .text(res[0])
                        );
                    }else if(state == 100){
                        res.forEach(element => {
                            let eID = element.eID;
                            let eName = element.eName;
                            let pID = element.pID;
                            if(!exhibitions.includes(eID)){
                                $("#pro_filter")
                                    .append(
                                        $("<option></option>")
                                            .val(eID)
                                            .text(eName)
                                );
                                exhibitions.push(eID);
                            }
                            $("#pro_list").append(
                                $("<tr></tr>")
                                    .attr("id", eID)
                                    .append(
                                        $("<td></td>").append(
                                            $("<a></a>")
                                                .addClass("btn btn-outline-warning text-dark border-0 w-100 text-start fw-bolder")
                                                .attr("href", "pro.php?eID=" + eID + "&pID=" + pID)
                                                .attr("id", "exh" + eID + "_" + pID)
                                                .text(element.pName)
                                        ),
                                        $("<td></td>").text(element.author),
                                        $("<td></td>").append(
                                            $("<a></a>")
                                                .addClass("btn btn-darkred rounded-pill py-0")
                                                .attr("href", "exh.php?eID=" + eID)
                                                .text(eName)
                                        ),
                                        $("<td></td>")
                                            .addClass("text-center")
                                            .append(
                                                $("<button></button>")
                                                    .addClass("btn-close")
                                                    .attr("id", "pro_del")
                                                    .attr("type", "button")
                                                    .attr("aria-label", "Close")
                                                    .val(eID + "_" + pID)
                                        )
                                )
                            );
                        });
                    }
                }
            });
            // 入場紀錄
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 401,
                    acc: account
                },
                success: (response) => {
                    let json = JSON.parse(response);
                    let state = json.stateCode;
                    let res = json.result;
                    if(state == 98){
                        $("#att_list").append(
                            $("<h5></h5>")
                                .addClass("m-3 text-center")
                                .text(res[0])
                        );
                    }else if(state == 100){
                        res.forEach(element => {
                            let time = element.aTime;
                            let eName = element.eName;
                            let eID = element.eID;
                            let sName = element.sName;
                            let sAcc = element.sAccount;
                            $("#att_list").append(
                                $("<tr></tr>")
                                    .append(
                                        $("<td></td>").text(time),
                                        $("<td></td>").append(
                                            $("<a></a>")
                                                .addClass("btn btn-outline-info text-dark border-0 w-100 text-start fw-bolder")
                                                .attr("href", "exh.php?eID=" + eID)
                                                .text(eName)
                                        ),
                                        $("<td></td>").append(
                                            $("<a></a>")
                                                .addClass("btn btn-success rounded-pill py-0")
                                                .attr("href", "sponsor.php?sAcc=" + sAcc)
                                                .text(sName)
                                        )
                                )
                            );
                        });
                    }
                }
            });
            // 投票紀錄
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 601,
                    acc: account
                },
                success: (response) => {
                    let json = JSON.parse(response);
                    let state = json.stateCode;
                    let res = json.result;
                    if(state == 98){
                        $("#vote_list").append(
                            $("<h5></h5>")
                                .addClass("m-3 text-center")
                                .text(res[0])
                        );
                    }else if(state == 100){
                        res.forEach(element => {
                            let time = element.vTime;
                            let eName = element.eName;
                            let eID = element.eID;
                            let pName = element.pName;
                            let pID = element.pID;
                            let author = element.author;
                            $("#vote_list").append(
                                $("<tr></tr>")
                                    .append(
                                        $("<td></td>").text(time),
                                        $("<td></td>").append(
                                            $("<a></a>")
                                                .addClass("btn btn-outline-warning text-dark border-0 w-100 text-start fw-bolder")
                                                .attr("href", "pro.php?eID=" + eID + "&pID=" + pID)
                                                .text(pName)
                                        ),
                                        $("<td></td>").append(
                                            $("<a></a>")
                                                .addClass("btn btn-darkred rounded-pill py-0")
                                                .attr("href", "exh.php?eID=" + eID)
                                                .text(eName)
                                        )
                                )
                            );
                        });
                    }
                }
            });
        }else{
            $("#acc").hide();
            $("#logout").hide();
            $("#member").hide();
            $("#collect").hide();
            $("#record").hide();
        }
    }
});

// 尋覽列
$("#info").click(() => {
    $("#navbarNavAltMarkup").removeClass("show");
});
$("#col").click(() => {
    $("#navbarNavAltMarkup").removeClass("show");
});
$("#rec").click(() => {
    $("#navbarNavAltMarkup").removeClass("show");
});

// 取消收藏
$(document).on('click', '#exh_del', function(event){
    if(confirm("確定移除【" + $("#exh" + $(this).val()).text() + "】?")){
        let eID = $(this).val();
        $.ajax({
            type: "POST",
            url: "../../api/command.php",
            data: {
                key: 312,
                acc: account,
                eID: eID
            },
            success: (response) => {
                console.log(response);
            }
        });
        $(this).parent().parent().remove();
    }
});
$(document).on('click', '#pro_del', function(event){
    if(confirm("確定移除【" + $("#exh" + $(this).val()).text() + "】?")){
        let value = $(this).val().split("_");
        $.ajax({
            type: "POST",
            url: "../../api/command.php",
            data: {
                key: 512,
                acc: account,
                eID: value[0],
                pID: value[1]
            },
            success: (response) => {
                console.log(response);
            }
        });
        $(this).parent().parent().remove();
    }
});

// 篩選器
$("#exh_filter").change((e) => { 
    e.preventDefault();
    let value = $("#exh_filter").find(":selected").val();
    if(value){
        sponsors.forEach(element => {
            if(element != value){
                $("#" + element).hide();
            }else{
                $("#" + element).show();
            }
        });
    }else{
        sponsors.forEach(element => {
            $("#" + element).show();
        });
    }
});
$("#pro_filter").change((e) => { 
    e.preventDefault();
    let value = $("#pro_filter").find(":selected").val();
    console.log(value);
    if(value){
        exhibitions.forEach(element => {
            if(element != value){
                $("#" + element).hide();
            }else{
                $("#" + element).show();
            }
        });
    }else{
        exhibitions.forEach(element => {
            $("#" + element).show();
        });
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
            location.href = "/";
        }
    })
});