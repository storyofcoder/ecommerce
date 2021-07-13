export const addItemInCookies = (id) => {
    let cookies = getCookie('ecom_s_h') || "";
    cookies = cookies ? cookies.split(',') : [];
    if (cookies.includes(id)) return;
    cookies.push(id);
    cookies.slice(0, 17);
    cookies = cookies.join(',');
    setCookie('ecom_s_h', cookies, 100);
    return true;
}
export const deleteItemInCookies = (id) => {
    let cookies = getCookie('ecom_s_h') || "";
    cookies = cookies ? cookies.split(',') : [];
    var index = cookies.indexOf(id);
    if (index > -1) {
        cookies.splice(index, 1);
    }
    cookies = cookies.join(',');
    setCookie('ecom_s_h', cookies, 100);
}

export const getItemInCookies = (id) => {
    let cookies = getCookie('ecom_s_h') || "";
    cookies = cookies ? cookies.split(',') : [];
    return cookies.filter((value) => { return value != id }).slice(0, 12);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
