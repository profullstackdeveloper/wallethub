//@ts-check
/** 
 * run from root folder as : node ./npm-tests/test-02.js
 * 
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */
import https from "https";


https.get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
    let data = "";
    
    // parse json and print "hobbies" property as ITEM1, ITEM2,...
    resp.on('data', (responseData) => {
        data += responseData;
    });

    resp.on('end', () => {
        const parseObj = JSON.parse(data);

        let result = "";
        
        parseObj.hobbies.forEach((hobby, index) => {
            result = index < parseObj.hobbies.length - 1 ? result + hobby + ", " : result + hobby;    
        })

        console.log(result);
    });

})