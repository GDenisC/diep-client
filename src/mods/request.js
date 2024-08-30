export default function sendRequest(url) {
    return new Promise(resolve => {
        const req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    resolve(req.responseText);
                } else {
                    throw new Error('Request `' + url + '` failed with status ' + req.status);
                }
            }
        };
        req.onerror = () => {
            throw new Error('Request `' + url + '` failed');
        }
        req.ontimeout = () => {
            throw new Error('Request `' + url + '` timed out');
        }
        req.send();
    });
}