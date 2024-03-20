let body = $request.body;
// "cost_time" : 3217,
body = body.replace(/"cost_time" : \d+/,"\"cost_time\" : \"0.00\"");
// body = body.replace(/&locale=zh_CN/,"&locale=zh_PH");
// body = body.replace(/&s_locale=zh-Hans_[A-Z]{2}/,"&s_locale=zh-Hans_PH");

console.log(body)

$done({body});
