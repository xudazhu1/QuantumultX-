/*************************************

项目名称：Xmind-思维导图
脚本作者：easy修改基于chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：先登录Xmind账号在恢复购买
适用版本: Xmind 23.07.1479
旧版教程: https://www.52pojie.cn/thread-1756628-1-1.html
**************************************

[rewrite_local]
^https:\/\/www\.xmind\.(cn|app|com)\/_res\/(devices|token\/.+) url script-response-body https://raw.githubusercontent.com/xudazhu1/QuantumultX-/main/xmind.js

[mitm]
hostname = *xmind.*

*************************************/


var chxm1023 = JSON.parse($response.body);
const vip = /https:\/\/www\.xmind\.(cn|app|com)\/_res\/devices/;
const token = /https:\/\/xmind\.(cn|app|com)\/_res\/token\/.+/;

if (vip.test($request.url)) {
    chxm1023 = {
      "license" : {
        "status" : "sub",
        "expireTime" : 4092599349000
      },
      "_code" : 200,
      "raw_data" : "GfxYgAqnrQ\/ggD9UwqnZyAj6FKnopXzM8s5m3eZLOsmVr4FwCzv41qTmgi\/u72cv+jpaAoljaEPti1twzOS7X7KUPY1KNJ2xalbS7SXbvFHSvs21QXjaUtIOkeJWAl4\/vHl4IvMeHTBVqD8mFCXOmvnBPLRMAJEPgHEJYF1InvQ="};
}

if (token.test($request.url)) {
    chxm1023.expireDate = 4092599349;
    chxm1023.token = "f50633ea8eb04cbb85962b99c47045d7AjOobEGo";
}

$done({body : JSON.stringify(chxm1023)});
