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
                    id: "s",
                    acc: account
                },
                success: (response) => {
                    let info = JSON.parse(response).result;
                    $("#sAcc").text(account);
                    $("#name").text(info.sName);
                    $("#address").text(info.address);
                    $("#phone").text(info.phone);
                    if(info.title){
                        $("#title").text(info.title);
                    }
                    if(info.descript){
                        $("#descript").text(info.descript);
                    }
                }
            });
            // 展覽列表
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 303,
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
                            let eID = element.eID;
                            let start = element.start;
                            let end = element.end;
                            let date = "";
                            if (start.slice(0, 4) == end.slice(0, 4)){
                                date = start + ' ~ ' + end.slice(5);    
                            } else{
                                date = start + ' ~ ' + end;
                            }
                            let eName = element.eName;
                            let place = element.ePlace;
                            let cnt = element.c_cnt;
                            $("#exh_list").append(
                                $("<tr></tr>")
                                    .attr("onClick", "exhAdmin(" + eID + ")")
                                    .css("cursor", "pointer")
                                    .append(
                                        $("<td></td>").text(date),
                                        $("<td></td>")
                                            .addClass("fw-bold")
                                            .text(eName),
                                        $("<td></td>").text (place),
                                        $("<td></td>")
                                            .addClass("text-center")
                                            .append (
                                                $("<i></i>").addClass("bi bi-heart-fill text-danger me-2"),
                                                cnt
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
        }
    }
});

let exhAdmin = (id) => {
    console.log(id);
    location.href = "exhAdmin.php?eID=" + id;
}

// 尋覽列
$("#info").click(() => {
    $("#navbarNavAltMarkup").removeClass("show");
});
$("#exh").click(() => {
    $("#navbarNavAltMarkup").removeClass("show");
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