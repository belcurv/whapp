/* jshint esversion:6, devel:true, browser:true */

///* a get JSON function using callbacks
//*/
//const getJSON = (url, success, error) => {
//    const xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = () => {
//        if (xhr.readyState === 4) {
//            if (xhr.status === 200) {
//                success(JSON.parse(xhr.responseText));
//            } else {
//                error(xhr.responseText);
//            }
//        }
//    };
//    xhr.open('GET', url);
//    xhr.send();
//};


/* a get JSON function using promises
*/
const getJSON = (url) => {
    const xhr = new XMLHttpRequest();
    return new Promise( (resolve, reject) => {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            }
        };
        xhr.open('GET', url);
        xhr.send();
    });
};


export { getJSON };
