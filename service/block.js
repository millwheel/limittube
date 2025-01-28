export function checkBlockTimeCondition(spentSecond, maximumUsageSecond) {
    if (spentSecond === maximumUsageSecond) {
        blockYoutube(maximumUsageSecond);
        return true;
    }
    return false;
}

export function blockYoutube(maximumUsageSecond) {
    chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
        const hours = Math.floor(maximumUsageSecond / 3600);
        const minutes = Math.floor((maximumUsageSecond % 3600) / 60);
        let maximumUsageTimeSetting;
        if (hours > 0 && minutes > 0) {
            maximumUsageTimeSetting = `${hours} hour(s) and ${minutes} minute(s)`;
        } else if (hours > 0) {
            maximumUsageTimeSetting = `${hours} hour(s)`;
        } else if (minutes > 0) {
            maximumUsageTimeSetting = `${minutes} minute(s)`;
        }
        tabs.forEach((tab) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                args: [maximumUsageTimeSetting],
                func: injectBlockOverlay,
            });
        });
    });
}


function injectBlockOverlay(maximumUsageTimeSetting) {
    const blocker = document.createElement("div");
    blocker.id = "youtube-usage-blocker";
    blocker.innerText = `You have reached your maximum daily YouTube usage time: ${maximumUsageTimeSetting} \n\nVisit YouTube Tomorrow!`;
    blocker.style.position = "fixed";
    blocker.style.width = "100%";
    blocker.style.height = "100%";
    blocker.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    blocker.style.zIndex = "9999";
    blocker.style.color = "white";
    blocker.style.fontSize = "30px";
    blocker.style.display = "flex";
    blocker.style.justifyContent = "center";
    blocker.style.alignItems = "center";
    blocker.style.textAlign = "center";

    if (!document.getElementById("youtube-usage-blocker")) {
        document.body.appendChild(blocker);
    }
}
