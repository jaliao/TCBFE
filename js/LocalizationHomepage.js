if (location.pathname == "/") {
    var CookieCulture = getCookie('.AspNetCore.Culture');

    console.log("CookieCulture=",CookieCulture)


    var HomePageCulture = CookieCulture;
    if (HomePageCulture == '') {
        HomePageCulture = navigator.language;
    }
    if (HomePageCulture.indexOf('zh-CN') >= 0) {
        window.location.href = '/zh-cn';
    }
    else {
        window.location.href = '/en-us';
    }
}

// console.log("location",location.pathname,location.pathname == "/")
// console.log("CookieCulture=",CookieCulture)

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


