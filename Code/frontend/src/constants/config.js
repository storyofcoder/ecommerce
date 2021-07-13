import deepExtend from "deep-extend";
let isProductionEnv = (process.env.ENVIROMENT === "production") ? true : false, url = {};

if (isProductionEnv) {
    url = {
        accountsUrl: "https://ecom99.herokuapp.com/v1/",
    }
} else {
    url = {
        accountsUrl: "https://ecom99.herokuapp.com/v1/",
    };
}

let config = {
    Google_anylatic: 'G-QZ4P222RJ8',
    reCaptchaKey: url.reCaptchaKey,
    debug: !isProductionEnv,
};

deepExtend(config, url);
export default config;
