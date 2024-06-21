function refreshCaptcha() {
    var newCaptcha = generateCaptcha();
    document.getElementById("captcha").innerText = newCaptcha;
}
function generateCaptcha() {
    var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var captcha = "";

    for (var i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}
document.addEventListener("DOMContentLoaded", function () {
    refreshCaptcha();
});

function RR(name, nationalId, mobile, email, captcha) {
    var isValid = validateInput(name, nationalId, mobile, email, captcha);
    if (isValid) {
        var selectedRadio = document.querySelector('input[name="radio"]:checked'); // بجيب زر الراديو يلي انغط عليه
        if (selectedRadio) {
            var radioId = selectedRadio.id;  //  هون باخد ال id تبعه 
            var elementsWithSameClass = document.querySelectorAll('.' + radioId);  // هون انا عامل انو اسم الراديو من اسم الديف يلي فيه بيانات
            // ف بجيب الديف تبعه
            elementsWithSameClass.forEach(function (element) { 
                var h2Elements = element.querySelectorAll('h2');  // هون عم استدعي ال متغير يلي فيه البيانات
                var all = " تم حجز العقار الذي يحمل المواصفات :  ";   //  هاد المتغير يلي بدي حط فيه البيانات بس حطيتله هاد النص وكلشي بيانات بضيفا بعده
                h2Elements.forEach(function (h2) {  // حلقة فور منشان جمع كل البيانات
                    all += h2.textContent + "   "; // جمعتن جوا العنصر 
                });
                alert(all.trim()); 
            });
        }
    }
    else
        event.preventDefault();
}
function validateInput(name, nationalId, mobile, email, captcha) {
    if (!name || !nationalId || !mobile || !email || !captcha) {
        alert('يجب ملء جميع الحقول.');
        return false;
    }
    if (!/^[\u0621-\u064A\u0600-\u0604\s]+$/.test(name)) {
        alert('يجب أن يكون الاسم باللغة العربية.');
        return false;
    }
    var numberPattern = /^(0[1-9]|1[0-5])[0-9]{9}$/;
    if (!numberPattern.test(nationalId)) {
        alert("يرجى إدخال رقم وطني صالح بين 01 و 15");
        return false;
    }
    var mobilePattern = /^09(3|4|5|6|8|9)[0-9]{7}$/;
    if (!mobilePattern.test(mobile)) {
        alert("يرجى إدخال رقم هاتف صالح مع رمز البلد (مثال: 0931234567)");
        return false;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("يرجى إدخال عنوان بريد إلكتروني صالح");
        return false;
    }
    if (captcha !== document.getElementById('captcha').textContent) {
        alert('رمز التحقق غير صحيح.');
        return false;
    }
    return true;
}
document.querySelectorAll('input[name="radio"]').forEach(function (radio) {
    radio.addEventListener('change', function (event) {
        document.querySelector('.btn1').disabled = false;
    });
});