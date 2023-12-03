let setInput = (text, name, type, maxlen, col_sm, req, def) => {
    let div = $("<div></div>")
        .addClass("col-12" + (col_sm != 12 ? " col-sm-" + col_sm : ""));
    let label = $("<label></label>")
        .addClass("form-label")
        .attr("for", name)
        .text(text);
    let input = $("<input></input>")
        .addClass("form-control")
        .attr("type", type)
        .attr("name", name)
        .attr("id", name)
        .prop("required", req);
    maxlen == 0 ? null : input.attr("maxlength", maxlen);
    def == null ? null : input.val(def);
    div.append(label, input);
    return div;
}

let id = "";
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
            id = res.result[1];
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 201,
                    id: id,
                    acc: account
                },
                success: (response) => {
                    let info = JSON.parse(response).result;
                    // 取得GET值
                    let context = $("<div></div>")
                        .addClass("p-4 mx-auto")
                        .css("max-width", "500px");
                    // 標題
                    let title = $("<h5></h5>")
                        .addClass("me-auto");
                    // 表單
                    let form = $("<form></form>")
                        .addClass("row g-3 my-3")
                        .attr("method", "POST");
                    let list = $("<div></div>")
                        .addClass("list-group p-2")
                        .attr("id", "pw_list");
                    if (id == 'm') { // 一般會員
                        // setTitle
                        title.append($("<i></i>").addClass("bi bi-person-lines-fill me-3"), account);
                        // setInput
                        let btn_pw = $("<button></button>")
                            .addClass("list-group-item list-group-item-action")
                            .attr("type", "button")
                            .attr("data-bs-toggle", "collapse")
                            .attr("data-bs-target", "#pw")
                            .attr("aria-expanded", "false")
                            .attr("aria-controls", "pw")
                            .append(
                                "設定密碼",
                                $("<i></i>").addClass("bi bi-chevron-down float-end")   
                            )
                        let li_pw = $("<div></div>")
                            .attr("id", "pw")
                            .addClass("list-group-item collapse")
                            .append(
                                setInput('新密碼', 'password', 'password', 30, 12, false),
                                setInput('確認密碼', 'pw2', 'password', 30, 12, false));
                        let name = setInput('中文姓名', 'name', 'text', 4, 6, false);
                        let sex = $("<div></div>")
                            .addClass("col-12 col-sm-6")
                            .append(
                                $("<label></label>")
                                    .addClass("form-label")
                                    .attr("for", "sex")
                                    .text("性別"),
                                $("<div></div>")
                                    .addClass("row row-cols-3 row-cols-sm-2 px-3")
                                    .attr('id', 'sex')
                                    .append(
                                        $("<div></div>")
                                            .addClass("col form-check")
                                            .append(
                                                $("<input></input>")
                                                    .addClass("form-check-input")
                                                    .attr("type", "radio")
                                                    .attr("name", "sex")
                                                    .attr("id", "male")
                                                    .val("m")
                                                    .prop("required", true)
                                                    .prop("checked", info.sex == 'm'),
                                                $("<label></label>")
                                                    .addClass("form-check-label")
                                                    .attr("for", "male")
                                                    .text("男性")),
                                        $("<div></div>")
                                            .addClass("col form-check")
                                            .append(
                                                $("<input></input>")
                                                    .addClass("form-check-input")
                                                    .attr("type", "radio")
                                                    .attr("name", "sex")
                                                    .attr("id", "female")
                                                    .val("f")
                                                    .prop("required", true)
                                                    .prop("checked", info.sex == 'f'),
                                                $("<label></label>")
                                                    .addClass("form-check-label")
                                                    .attr("for", "female")
                                                    .text("女性"))
                                ));
                        let birth = setInput('生日', 'birth', 'date', 0, 5, true, info.birth);
                        let phone = setInput("電話", "phone", "tel", 0, 7, false);
                        phone.find("input")
                            .attr("placeholder", "0912345678")
                            .attr("pattern", "[0-9]{10}");
                        let confirm = setInput('身分驗證', 'confirm', 'password', 30, 12, true).addClass("mt-5");
                        confirm.find("input")
                            .attr("placeholder", "目前密碼");
                        // 加入表單
                        list.append(btn_pw, li_pw);
                        if (/FB[0-9]{16}/.test(account)){
                            form.append(name, sex, birth, phone);
                        }else {
                            list.append(btn_pw, li_pw);
                            form.append(name, sex, birth, phone, list, confirm);
                        }

                    } else { // 主辦方
                        // setTitle
                        title.append($("<i></i>").addClass("bi bi-person-lines-fill me-3"), account);
                        // setInput
                        let btn_pw = $("<button></button>")
                            .addClass("list-group-item list-group-item-action")
                            .attr("type", "button")
                            .attr("data-bs-toggle", "collapse")
                            .attr("data-bs-target", "#pw")
                            .attr("aria-expanded", "false")
                            .attr("aria-controls", "pw")
                            .append(
                                "設定密碼",
                                $("<i></i>").addClass("bi bi-chevron-down float-end")   
                            )
                        let li_pw = $("<div></div>")
                            .attr("id", "pw")
                            .addClass("list-group-item collapse")
                            .append(
                                setInput('新密碼', 'password', 'password', 30, 12, false),
                                setInput('確認密碼', 'pw2', 'password', 30, 12, false)
                            );
                        let name = setInput('單位名稱', 'sName', 'text', 30, 12, false, info.sName);
                        let address = setInput('地址', 'address', 'text', 0, 12, false, info.address);
                        let phone = setInput("電話", "phone", "tel", 0, 12, false, info.phone);
                        phone.find("input")
                            .attr("placeholder", "04-22190000")
                            .attr("pattern", "[0-9]{2,4}-[0-9]{4,8}");
                        let intro = setInput('簡介標題', 'title', 'text', 30, 12, false, info.title);
                        let confirm = setInput('身分驗證', 'confirm', 'password', 30, 12).addClass("mt-5");
                        confirm.find("input")
                            .attr("placeholder", "目前密碼");
                        let descript = $("<div></div>")
                            .addClass("col-12")
                            .append(
                                $("<label></label>")
                                    .attr("for", "textarea")
                                    .addClass("form-label")
                                    .text("簡介內容"),
                                $("<textarea></textarea>")
                                    .addClass("form-control")
                                    .attr("id", "textarea")
                                    .attr("name", "descript")
                                    .attr("rows", "3")
                                    .val(info.descript)
                        );
                        // 加入表單
                        list.append(btn_pw, li_pw);
                        form.append(name, address, phone, list, intro, descript, confirm);
                    }
                    let submit = $("<div></div>")
                        .addClass("col-12")
                        .append(
                            $("<button></button>")
                                .addClass("btn btn-primary w-100")
                                .attr("id", "submit")
                                .attr("type", "submit")
                                .text("確認更改")
                        );
                    form.append(submit);
                    $(".container").append(
                        context.append(title, form)
                    );
                    $(document).ready(() => {
                        // 密碼長度
                        $("#password").blur(() => {
                            $("#pwTS").remove();
                            $("#pwError").remove();
                            if ($("#password").val() == "") {
                                $("#submit").prop("disabled", false);
                                $("#password")
                                    .removeClass("is-invalid")
                                    .removeClass("is-valid");
                                $("#pw2")
                                    .val("")
                                    .removeClass("is-invalid")
                                    .removeClass("is-valid");
                            }else{
                                $("#pw2")
                                    .val("")
                                    .addClass("is-invalid")
                                    .after(
                                        $("<div></div>")
                                            .addClass("invalid-feedback")
                                            .attr("id", "pwError")
                                            .text("密碼不符！")
                                    );
                                $("#submit").prop("disabled", true);
                                if ($("#password").val().length < 8) {
                                    $("#password")
                                        .addClass("is-invalid")
                                        .after(
                                            $("<div></div>")
                                                .addClass("invalid-feedback")
                                                .attr("id", "pwTS")
                                                .text("密碼太短！請設定為８個字元以上")
                                        );
                                } else {
                                    $("#password")
                                        .removeClass("is-invalid")
                                        .addClass("is-valid");
                                }
                            }
                        });
                        // 密碼確認
                        $("#pw2").blur(() => {
                            $("#pwError").remove();
                            if ($("#pw2").val() != $("#password").val()) {
                                $("#pw2")
                                    .addClass("is-invalid")
                                    .after(
                                        $("<div></div>")
                                            .addClass("invalid-feedback")
                                            .attr("id", "pwError")
                                            .text("密碼不符！")
                                    );
                                $("#submit").prop("disabled", true);
                            } else {
                                $("#pw2")
                                    .removeClass("is-invalid")
                                    .addClass("is-valid");
                                $("#submit").prop("disabled", false);
                            }
                        });
                        // 電話
                        $("#phone").blur(() => {
                            $("#phoneError").remove();
                            let tel = $("#phone").val();
                            if (id == "m"){
                                if (tel.length != 10 || isNaN(tel)) {
                                    $("#phone")
                                        .addClass("is-invalid")
                                        .after(
                                            $("<div></div>")
                                                .addClass("invalid-feedback")
                                                .attr("id", "phoneError")
                                                .text("電話格式錯誤！格式：0912345678"));
                                } else {
                                    $("#phone")
                                        .removeClass("is-invalid")
                                        .addClass("is-valid");
                                }
                            }        
                        });
                    });
                    $("form").submit((event) => {
                        $("#pwError").remove();
                        event.preventDefault();
                        // 序列化
                        let data = {};
                        $("form").serializeArray().forEach(e => {
                            if(e.value !== "") {
                                data[e.name] = e.value;
                            }
                        });
                        let confirm = "";
                        if (/FB[0-9]{16}/.test(account)){
                            confirm = 'f';
                        }else{
                            confirm = data.confirm;
                            delete data.pw2;
                            delete data.confirm;
                        }
                        $.ajax({
                            type: "POST",
                            url: "../../api/command.php",
                            data: {
                                key: 130,
                                id: id,
                                acc: account,
                                pw: confirm,
                                data: JSON.stringify(data)
                            },
                            success: (response) => {
                                let state = JSON.parse(response).stateCode
                                console.log(state);
                                res = JSON.parse(response).result;
                                if (res && state == 100) {
                                    alert("修改成功！");
                                    if($("#password").val() != "" && confirm != 'f'){
                                        $.ajax({
                                            type: "POST",
                                            url: "../../api/command.php",
                                            data: {
                                                key: 120
                                            },
                                            success: (response) => {
                                                account = "";
                                                alert("帳號已登出！");
                                                location.href = "index.php";
                                            }
                                        });
                                    }else{
                                        location.href = "acc.php";
                                    }
                                }else if(state == 99){
                                    $("#confirm")
                                        .addClass("is-invalid")
                                        .after(
                                            $("<div></div>")
                                                .addClass("invalid-feedback")
                                                .attr("id", "pwError")
                                                .text("密碼錯誤！"));
                                }
                            }
                        });
                    });
                }
            });
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
            location.href = "/";
        }
    })
});