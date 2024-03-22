/*************************************

项目名称：**********
author：chxm1023

**************************************
[rewrite_local]
^https:\/\/isi\..*\.g.*\.(com\..*|com)\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body http://192.168.8.229:8088/good_notes_pro.js
^https:\/\/isi\..*\.g.*\.(com\..*|com)\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header http://192.168.8.229:8088/good_notes_pro.js

[mitm]
hostname = isi.*.g*.com*

*************************************/
let obj = {};
let res = JSON["parse"]
  (typeof $response != "undefined" &&
    $response.body ||
    null
);
if ($response === undefined) {
	console.log("删除request的ETag")
	delete $request["headers"]["X-RevenueCat-ETag"];
	delete $request["headers"]["x-revenuecat-etag"];
	obj["headers"] = $request["headers"]
} else if ( res &&  res["subscriber"] ) {
	let body = res
	// console.log("body 之前 ===" +  JSON.stringify(body))
	let added = {
		  "subscriptions" : {
		  "com.goodnotes.gn6_one_time_unlock_3999" : {
			"Author" : "chxm1023",
			"store" : "app_store",
			"ownership_type" : "PURCHASED",
			"warning" : "仅供学习，禁止转载或售卖",
			"original_purchase_date" : "2022-09-09T09:09:09Z",
			"Telegram" : "https://t.me/chxm1023",
			"purchase_date" : "2022-09-09T09:09:09Z"
		  }
		},
		"entitlements" : {
		  "apple_access" : {
			"Telegram" : "https://t.me/chxm1023",
			"warning" : "仅供学习，禁止转载或售卖",
			"purchase_date" : "2022-09-09T09:09:09Z",
			"product_identifier" : "com.goodnotes.gn6_one_time_unlock_3999",
			"Author" : "chxm1023"
		  },
		  "crossplatform_access" : {
			"Telegram" : "https://t.me/chxm1023",
			"warning" : "仅供学习，禁止转载或售卖",
			"purchase_date" : "2022-09-09T09:09:09Z",
			"product_identifier" : "com.goodnotes.gn6_one_time_unlock_3999",
			"Author" : "chxm1023"
		  }
		},
	}
	body["subscriber"]["subscriptions"] = added["subscriptions"]
	body["subscriber"]["entitlements"] = added["entitlements"]
	// obj = JSON.stringify(body)
	// console.log("body ===" +  body)
	obj.body = JSON.stringify(body)
}
$done(obj);
