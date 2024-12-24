import navigator from 'navigator'
import platform from 'platform'

class BrowserInfo {

    browserinformation() {
        var objappVersion = navigator.appVersion;
        var browserAgent = navigator.userAgent;
        var browserName = navigator.appName;
        var browserVersion = '' + parseFloat(objappVersion);
        var browserMajorVersion = parseInt(objappVersion, 10);
        var Offset, OffsetVersion, ix;
        // For Chrome
        if ((OffsetVersion = browserAgent.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
            browserVersion = browserAgent.substring(OffsetVersion + 7);
        }

        // For Microsoft internet explorer
        else if ((OffsetVersion = browserAgent.indexOf("MSIE")) != -1) {
            browserName = "Microsoft Internet Explorer";
            browserVersion = browserAgent.substring(OffsetVersion + 5);
        }

        // For Firefox
        else if ((OffsetVersion = browserAgent.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
        }

        // For Safari
        else if ((OffsetVersion = browserAgent.indexOf("Safari")) != -1) {
            browserName = "Safari";
            browserVersion = browserAgent.substring(OffsetVersion + 7);
            if ((OffsetVersion = browserAgent.indexOf("Version")) != -1)
                browserVersion = browserAgent.substring(OffsetVersion + 8);
        }

        // For other browser "name/version" is at the end of userAgent
        else if ((Offset = browserAgent.lastIndexOf(' ') + 1) <
            (OffsetVersion = browserAgent.lastIndexOf('/'))) {
            browserName = browserAgent.substring(Offset, OffsetVersion);
            browserVersion = browserAgent.substring(OffsetVersion + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }

        // Trimming the fullVersion string at
        // semicolon/space if present
        if ((ix = browserVersion.indexOf(";")) != -1)
            browserVersion = browserVersion.substring(0, ix);
        if ((ix = browserVersion.indexOf(" ")) != -1)
            browserVersion = browserVersion.substring(0, ix);


        browserMajorVersion = parseInt('' + browserVersion, 10);
        if (isNaN(browserMajorVersion)) {
            browserVersion = '' + parseFloat(navigator.appVersion);
            browserMajorVersion = parseInt(navigator.appVersion, 10);
        }


        console.log('Name of Browser = ' + browserName)
        console.log('Full version = ' + browserVersion)
        console.log('Major version = ' + browserMajorVersion)
        console.log('navigator.appName = ' + navigator.appName)
        console.log('navigator.userAgent = ' + navigator.userAgent)

        //Platform Information
        console.log("Platform Name: ", platform.name)
        console.log("Platform Version: ", platform.version)
        console.log("Platform description: ", platform.description)
        console.log("Platform os: ", platform.os)
    }
};

export default new BrowserInfo()