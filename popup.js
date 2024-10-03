// Helper function to run the code in the active tab
function executeScript(func) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: func
        });
    });
}

// Robots.txt Finder
document.getElementById('robots').addEventListener('click', function () {
    executeScript(function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/robots.txt';
    });
});

// Sitemap Finder
document.getElementById('sitemap').addEventListener('click', function () {
    executeScript(function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/sitemap.xml';
    });
});

// Site Domain Search
document.getElementById('siteSearch').addEventListener('click', function () {
    executeScript(function () {
        window.location.href = 'https://www.google.com/search?q=site:' + window.location.host.replace(/^www\./, '');
    });
});

// Schema Validator
document.getElementById('schemaValidator').addEventListener('click', function () {
    executeScript(function () {
        var url = encodeURIComponent(window.location.href);
        window.open('https://validator.schema.org/#url=' + url);
    });
});

// Site Speed Checker
document.getElementById('speedChecker').addEventListener('click', function () {
    executeScript(function () {
        var url = encodeURIComponent(window.location.href);
        window.open('https://developers.google.com/speed/pagespeed/insights/?url=' + url);
    });
});

// All URLs on a Page
document.getElementById('urlSummary').addEventListener('click', function () {
    executeScript(function () {
        var links = document.getElementsByTagName('a');
        var internalLinks = [];
        var externalLinks = [];
        
        function isInternalLink(url) {
            return url.indexOf(window.location.hostname) > -1;
        }

        for (var i = 0; i < links.length; i++) {
            var href = links[i].href;
            var anchorText = links[i].innerText.trim() || links[i].textContent.trim();
            if (href) {
                if (isInternalLink(href)) {
                    internalLinks.push({ href: href, text: anchorText });
                } else {
                    externalLinks.push({ href: href, text: anchorText });
                }
            }
        }

        var newWindow = window.open();
        newWindow.document.write('<html><head><title>Link Summary</title></head><body>');
        newWindow.document.write('<h1>Link Summary</h1>');
        newWindow.document.write('<h2>Total Links: ' + links.length + '</h2>');
        newWindow.document.write('<h2>Internal Links (' + internalLinks.length + '):</h2>');
        newWindow.document.write('<ul>');
        for (var i = 0; i < internalLinks.length; i++) {
            newWindow.document.write('<li>' + internalLinks[i].text + ' - <a href="' + internalLinks[i].href + '" target="_blank">' + internalLinks[i].href + '</a></li>');
        }
        newWindow.document.write('</ul>');
        newWindow.document.write('<h2>External Links (' + externalLinks.length + '):</h2>');
        newWindow.document.write('<ul>');
        for (var i = 0; i < externalLinks.length; i++) {
            newWindow.document.write('<li>' + externalLinks[i].text + ' - <a href="' + externalLinks[i].href + '" target="_blank">' + externalLinks[i].href + '</a></li>');
        }
        newWindow.document.write('</ul>');
        newWindow.document.write('</body></html>');
    });
});
