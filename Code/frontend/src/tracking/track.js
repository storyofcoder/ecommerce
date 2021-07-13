import ReactGA from "react-ga";
import config from "../constants/config";

const ID = config.Google_anylatic;
    
export function initializeReactGA() {
    ReactGA.initialize(ID);
}
export function trackPage(page) {
    ReactGA.pageview(page);
}