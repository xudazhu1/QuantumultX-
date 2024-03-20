// console.log($request.body);
let body = $request.body;

// body = JSON.stringify(body).replace(/"cost_time":"?[\d|.]+"?[,]/g,"\"cost_time\":\"0.00\","); 
for (let obj of body.events) {
    if (obj.ext) {
        obj.ext.cost_time = "0.00";
    }
}


$done({body});
