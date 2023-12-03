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
let c = 0;
let exhs = [];
let futures = [];
let nows = [];
let pasts = [];
let sponsors = [];
let sp_exhs = [];
$.ajax({
    type: "POST",
    url: "../../api/command.php",
    data: {
        key: 301
    },
    success: (response) => {
        let res = JSON.parse(response).result;
        // today
        let today = new Date();
        let d = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0");
        // row
        let row = $("<div></div>")
            .addClass("row row-cols-1 row-cols-lg-2 row-cols-xl-3 p-4 g-4");
        res.forEach(e => {
            c++;
            exhs.push(e.eID);
            // date
            if (e.start > d){
                futures.push(e.eID);
            }else if (e.end < d){
                pasts.push(e.eID);
            }else{
                nows.push(e.eID);
            }
            // sponsor
            if (sponsors.includes(e.sAccount) == false){
                sponsors.push(e.sAccount);
                sp_exhs.push([]);
                $("#sponsor_filter")
                    .append(
                        $("<option></option>")
                            .val(sponsors.indexOf(e.sAccount))
                            .text(e.sName)
                );
            }
            sp_exhs[sponsors.indexOf(e.sAccount)].push(e.eID);
            // row col
            // document.createElement('div')
            let col = $("<div></div>")
                .addClass("col")
                .attr("id", e["eID"]);
            // row col card
            let card = $("<div></div>")
                .addClass("card border-dark h-100");
            // row col card img
            let img = $("<img></img>")
                .addClass("card-img-top img-fluid")
                .attr("src", "../img/" + e["eID"] + "/exh.jpg");
            // row col card cardBody
            let cBody = $("<div></div>")
                .addClass("card-body")
                .append(
                    $("<div></div>")
                        .addClass("d-flex flex-column h-100")
                        .append(
                            // row col card cardBody cardText
                            $("<div></div>")
                                .addClass("card-text h-100")
                                .append(
                                    $("<h5></h5>")
                                        .addClass("card-title")
                                        .text(e["eName"])
                                )
                            ),
                            $("<a></a>")
                                .addClass("stretched-link")
                                .attr("href", "exh.php?eID=" + e["eID"])
                );
            let cFoot = $("<div></div>")
                .addClass("card-footer")
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
                );
            row.append(
                col.append(
                    card.append(img, cBody, cFoot)
                )
            );
        });
        $(".container-lg").append(row);
        $("#num").text("共有 " + c + " 筆資料");
    }
});
// 篩選器
$("#date_filter").change((e) => { 
    e.preventDefault();
    c = 0;
    let sp_f = $("#sponsor_filter").find(":selected").val();
    let value = $("#date_filter").find(":selected").val();
    if(sp_f){
        if(value == "future"){
            exhs.forEach(element => {
                if(futures.includes(element) && sp_exhs[sp_f].includes(element)){
                    c++;
                    $("#" + element).show();
                }else{
                    $("#" + element).hide();
                }
            });
        }else if(value == "past"){
            exhs.forEach(element => {
                if(pasts.includes(element) && sp_exhs[sp_f].includes(element)){
                    c++;
                    $("#" + element).show();
                }else{
                    $("#" + element).hide();
                }
            });
        }else if(value == "during"){
            exhs.forEach(element => {
                if(nows.includes(element) && sp_exhs[sp_f].includes(element)){
                    c++;
                    $("#" + element).show();
                }else{
                    $("#" + element).hide();
                }
            });
        }else{
            exhs.forEach(element => {
                if(sp_exhs[sp_f].includes(element)){
                    c++;
                    $("#" + element).show();
                }else{
                    $("#" + element).hide();
                }
            });
        }
    }else{
        if(value == "future"){
            exhs.forEach(element => {
                if(futures.includes(element)){
                    c++;
                    $("#" + element).show();
                }else{
                    $("#" + element).hide();
                }
            });
        }else if(value == "past"){
            exhs.forEach(element => {
                if(pasts.includes(element)){
                    c++;
                    $("#" + element).show();
                }else{
                    $("#" + element).hide();
                }
            });
        }else if(value == "during"){
            exhs.forEach(element => {
                if(nows.includes(element)){
                    c++;
                    $("#" + element).show();
                }else{
                    $("#" + element).hide();
                }
            });
        }else{
            exhs.forEach(element => {
                c++;
                $("#" + element).show();
            });
        }
    }
    if(c == 0){        
        $("#num").text("查無符合資料！");
    }else {
        $("#num").text("共有 " + c + " 筆資料");
    }
});
$("#sponsor_filter").change((e) => { 
    e.preventDefault();
    c = 0;
    let date_f = $("#date_filter").find(":selected").val();
    let value = $("#sponsor_filter").find(":selected").val();
    console.log(value);
    if(date_f){
        if(value){
            if(date_f == "future"){
                exhs.forEach(element => {
                    if(futures.includes(element) && sp_exhs[value].includes(element)){
                        c++;
                        $("#" + element).show();
                    }else{
                        $("#" + element).hide();
                    }
                });
            }else if(date_f == "past"){
                exhs.forEach(element => {
                    if(pasts.includes(element) && sp_exhs[value].includes(element)){
                        c++;
                        $("#" + element).show();
                    }else{
                        $("#" + element).hide();
                    }
                });
            }else if(date_f == "during"){
                exhs.forEach(element => {
                    if(nows.includes(element) && sp_exhs[value].includes(element)){
                        c++;
                        $("#" + element).show();
                    }else{
                        $("#" + element).hide();
                    }
                });
            }
        }else{
            if(date_f == "future"){
                exhs.forEach(element => {
                    if(futures.includes(element)){
                        c++;
                        $("#" + element).show();
                    }else{
                        $("#" + element).hide();
                    }
                });
            }else if(date_f == "past"){
                exhs.forEach(element => {
                    if(pasts.includes(element)){
                        c++;
                        $("#" + element).show();
                    }else{
                        $("#" + element).hide();
                    }
                });
            }else if(date_f == "during"){
                exhs.forEach(element => {
                    if(nows.includes(element)){
                        c++;
                        $("#" + element).show();
                    }else{
                        $("#" + element).hide();
                    }
                });
            }
        }
    }else{
        if(value){
            exhs.forEach(element => {
                if(sp_exhs[value].includes(element)){
                    c++;
                    $("#" + element).show();
                }else{
                    $("#" + element).hide();
                }
            });
        }else{
            exhs.forEach(element => {
                c++;
                $("#" + element).show();
            });
        }
    }
    if(c == 0){        
        $("#num").text("查無符合資料！");
    }else {
        $("#num").text("共有 " + c + " 筆資料");
    }
});