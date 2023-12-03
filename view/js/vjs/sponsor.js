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
        }else{
            $("#acc").hide();
            $("#logout").hide();
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
$("#exh").click(() => {
    $("#navbarNavAltMarkup").removeClass("show");
});
// 取得GET值
let sAcc = new URL(location.href).searchParams.get('sAcc');
// 帳號資訊
$.ajax({
    type: "POST",
    url: "../../api/command.php",
    data: {
        key: 201,
        id: 's',
        acc: sAcc
    },
    success: (response) => {
        let res = JSON.parse(response).result;
        // 展覽資訊
        $("#sName").text(res.sName);
        $("#address").text("地址：" + res.address);
        $("#phone").text("電話：" + res.phone);
        $("#title").text(res.title);
        if(res.descript){
            $("#descript").html(res.descript.replace(/\n/g,'<br/>'));
        }else{
            $("#descript").text("");
        }
        
    }
});
// 展覽資訊
$.ajax({
    type: "POST",
    url: "../../api/command.php",
    data: {
        key: 303,
        acc: sAcc
    },
    success: (response) => {
        let res = JSON.parse(response).result;
        console.log(res);
        let row = $("<div></div>").addClass("row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3");
        res.forEach(e => {
            if(e == null){
                $("#info").hide();
                $("#exh").hide();
                $("#exhibition").hide();
            }else{
                let pro = $("<div></div>")
                    .addClass("col px-1 px-sm-2")
                    .append(
                        $("<div></div>")
                            .addClass("card border-dark h-100")
                            .append(
                                $("<img></img>")
                                    .addClass("card-img-top")
                                    .attr("src", "../img/" + e.eID + "/exh.jpg")
                                ,
                                $("<div></div>")
                                    .addClass("card-body")
                                    .append(
                                        $("<h5></h5>")
                                            .addClass("card-title text-truncate")
                                            .text(e.eName),
                                        $("<a></a>")
                                            .addClass("stretched-link")
                                            .attr("href", "exh.php?eID=" + e.eID)
                                ),
                                $("<div></div>")
                                    .addClass("card-footer text-truncate")
                                    .append(                    
                                        $("<div></div>")
                                            .addClass("text-truncate")
                                            .append(
                                                $("<i></i>")
                                                    .addClass("bi bi-calendar2-minus-fill me-2"),
                                                e["start"] + "～" + e['end']    
                                        ),
                                        $("<div></div>")
                                            .addClass("text-truncate")
                                            .append(
                                                $("<i></i>")
                                                    .addClass("bi bi-geo-alt-fill me-2"),
                                                e["ePlace"]    
                                        )
                                    )
                            )
                );
                row.append(pro);
            }
        });
        $("#exhibition").append(row);
    }
});