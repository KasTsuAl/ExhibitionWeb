let setInput = (text, name, type, maxlen, col_sm, req = true, def) => {
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
if(location.href.includes('register.php')){
    id = "m";
}else{
    id = "s";
}
let context = $("<div></div>")
    .addClass("p-4 mx-auto")
    .css("max-width", "500px");
// 標題
let fHead = $("<div></div>")
    .addClass("d-flex flex-wrap align-items-end");
let title = $("<h5></h5>")
    .addClass("me-auto");
// 表單
let form = $("<form></form>")
    .addClass("row g-3 my-3")
    .attr("method", "POST");
if (id == 'm') { // 一般會員
    // setTitle
    title.text("註冊");
    // setInput
    let acc = setInput('帳號', 'account', 'text', 30, 12);
    let pw = setInput('密碼', 'password', 'password', 30, 12);
    let pw2 = setInput('確認密碼', 'pw2', 'password', 30, 12);
    let name = setInput('中文姓名', 'name', 'text', 4, 6);
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
                                .prop("required", true),
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
                                .prop("required", true),
                            $("<label></label>")
                                .addClass("form-check-label")
                                .attr("for", "female")
                                .text("女性"))
            ));
    let birth = setInput('生日', 'birth', 'date', 0, 5);
    let phone = setInput("電話", "phone", "tel", 0, 7);
    phone.find("input")
        .attr("placeholder", "0912345678")
        .attr("pattern", "[0-9]{10}");
    // 加入表單
    form.append(acc, pw, pw2, name, sex, birth, phone);
} else { // 主辦方
    // setTitle
    title.text("註冊（主辦方）");
    // setInput
    let acc = setInput('帳號', 'sAccount', 'text', 30, 12);
    acc.attr("id", "account");
    let pw = setInput('密碼', 'password', 'password', 30, 12);
    let pw2 = setInput('確認密碼', 'pw2', 'password', 30, 12);
    let name = setInput('單位名稱', 'sName', 'text', 30, 12);
    let address = setInput('地址', 'address', 'text', 0, 12);
    let phone = setInput("電話", "phone", "tel", 0, 12);
    phone.find("input")
        .attr("placeholder", "04-22190000")
        .attr("pattern", "[0-9]{2,4}-[0-9]{4,8}");
    let intro = setInput('簡介標題', 'title', 'text', 30, 12, false);
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
    );
    // 加入表單
    form.append(acc, pw, pw2, name, address, phone, intro, descript);
}
let submit = $("<div></div>")
    .addClass("col-12 mt-5")
    .append(
        $("<button></button>")
            .addClass("btn btn-primary w-100")
            .attr("id", "submit")
            .attr("type", "submit")
            .prop("disabled", true)
            .text("註　冊")
);
form.append(submit);
$(".container").append(
    context.append(fHead.append(title, form))
);
$(document).ready(() => {
    // 密碼長度
    $("#password").blur(() => {
        $("#pwTS").remove();
        $("#pwError").remove();
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
    // 刪除帳號提示
    $("#account").blur(() => {
        $("#account").removeClass("is-invalid");
        $("#accError").remove();
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
    event.preventDefault();
    // 序列化
    let data = {};
    $("form").serializeArray().forEach(e => {
        data[e.name] = e.value;
    });
    delete data['pw2'];
    $.ajax({
        type: "POST",
        url: "../../api/command.php",
        data: {
            key: 200,
            id: id,
            data: JSON.stringify(data)
        },
        success: (response) => {
            let state = JSON.parse(response).stateCode;
            if (state == 100) {
                alert("註冊成功！");
                location.href = (id == 's' ? "login_s.php" : "login.php");
            }else if(state == 89){
                $("#accError").remove();
                $("#account")
                    .addClass("is-invalid")
                    .after(
                        $("<div></div>")
                            .addClass("invalid-feedback")
                            .attr("id", "accError")
                            .text("此帳號已存在！"));
            }
        }
    });
});