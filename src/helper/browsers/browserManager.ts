import { LaunchOptions, chromium, firefox, webkit } from "playwright-core";

const options: LaunchOptions = {
    headless: !false,
   // proxy: { server: 'http://36.93.163.219:8080' }
    //channel: "chrome",
 
    // args:['--start-maximized'],   
}
export const invokeBrowser = () => {
    const browserType = process.env.BROWSER || "firefox";
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!")
    }

}