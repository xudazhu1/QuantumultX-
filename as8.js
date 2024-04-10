/*************************************

项目名称：**********
author：xdz1

**************************************
[rewrite_local]
#! ^https:([\S\s]*?)gameloft.com/scripts/general/sync_all.php url script-response-body https://raw.githubusercontent.com/xudazhu1/QuantumultX-/main/as8.js
#! ^https:([\S\s]*?)gameloft.com/scripts/energy/pre_tle_race.php url script-response-body https://raw.githubusercontent.com/xudazhu1/QuantumultX-/main/as8.js

^https:([\S\s]*?)gameloft.com/scripts([\S\s]*?) url script-response-body https://raw.githubusercontent.com/xudazhu1/QuantumultX-/main/as8.js
^https://iap-eur.gameloft.com/inapp_crm/index.php url script-response-body https://raw.githubusercontent.com/xudazhu1/QuantumultX-/main/as8.js
#! ^https:([\S\s]*?)gameloft.com/authorize url script-request-body https://raw.githubusercontent.com/xudazhu1/QuantumultX-/main/as8.js
#! 下面是去广告
^https:([\S\s]*?)unityads.unity3d.com url reject
^https://a4.applovin.com/4.0/ad url reject
^https:([\S\s]*?)iads.unity3d.com url reject
^https:([\S\s]*?)ads.vungle.com url reject
[mitm]
hostname = *.gameloft.com,ads.vungle.com,*.unity3d.com,*.applovin.com

*************************************/
let obj = {};
let res = JSON["parse"]
(typeof $response != "undefined" &&
    $response.body ||
    null
);

const restore = /inapp_crm\/index.php/;

if (restore.test($request.url) ) {
	console.log("恢复购买?")
	console.log($request.body)
	if ( ! /action/.test($request.url)  ) {
		console.log("恢复购买!")
		let obj = [
			{
				"status": "delivered",
				"id": "Car_Bundle_350_iinm",
				"info": [
					{
						"quantity": 1,
						"item": "Nissan_Leaf_Nismo_RC___CAR_PRICE"
					}
				],
				"transaction_id": "310156474458",
				"subscription": true,
				"item_id": "com.gameloft.asphalt8.iOS_car_bundle_350"
			},
			{
				"status": "delivered",
				"id": "Car_Bundle_356_s6pe",
				"info": [
					{
						"quantity": 1,
						"item": "Ariel_Atom_V8___CAR_PRICE"
					}
				],
				"transaction_id": "310156424684",
				"subscription": true,
				"item_id": "com.gameloft.asphalt8.iOS_car_bundle_356"
			}
		]
		
		let body = JSON.stringify(obj);
		$done({body})
	}

    $done({res})
}


const authorize = /^https:([\S\s]*?)gameloft.com\/authorize/;

if (authorize.test($request.url)) {
	
    let regex = /username([\S\s]+?)[\&]/;
    let body = $request.body.replace(regex, "username=anonymous%2FOtMyt5EPkvgRcxM%3AdjNjQ3MjEwM1fMT%dr2BkYZ71D&");
    // console.log("改完222 = " + body)
    regex = /password([\S\s]+?)[\&]/;
    body = body.replace(regex, "password=GIHI7x9ofH5q55vJ&");
    // console.log("改完 = " + body)
    $done({body});

}



// sync start
let pre_tle_race = /^https:([\S\s]*?)energy\/pre_tle_race.php/;
if (pre_tle_race.test($request.url)) {


    if ($response === undefined) {
        // console.log("删除request的ETag")
        // delete $request["headers"]["X-RevenueCat-ETag"];
        // delete $request["headers"]["x-revenuecat-etag"];
        // obj["headers"] = $request["headers"]
    } else if (res && res["body"]) {
        let body = res
        // console.log("body 之前 ===" +  JSON.stringify(body))

        // 修改积分 credits_sync
        // body["body"]["credits_sync"]["body"]["credits_spent"] = -1


        // 30天后时间戳
        let timestamp = new Date().getTime();
        timestamp = Math.floor((timestamp + (1000 * 60 * 60 * 24 * 364)) / 1000)

		
		// 删除违规同步 infractions_sync
		body["body"]["infractions_sync"]["body"]["infractions"] = ""


        // 修改增益
        body["body"]["boosters_sync"]["body"]["active"] = {
            "extra_tank": {
                "min": timestamp
            },
            "performance": {
                "min": timestamp
            },
            "nitro": {
                "min": timestamp
            },
            "credits": {
                "min": timestamp
            }
        }

        obj.body = JSON.stringify(body)
    }
    $done(obj);

}



// sync start  gameloft.com/scripts
const script_g = /^https:([\S\s]*?)gameloft.com/scripts([\S\s]*?).php/;
const sync = /^https:([\S\s]*?)sync_all.php/;
if (sync.test($request.url) || script_g.test($request.url)) {


    if ($response === undefined) {
        // console.log("删除request的ETag")
        // delete $request["headers"]["X-RevenueCat-ETag"];
        // delete $request["headers"]["x-revenuecat-etag"];
        // obj["headers"] = $request["headers"]
    } else if (res && res["body"]) {
        let body = res
        // console.log("body 之前 ===" +  JSON.stringify(body))

        // 修改积分 credits_sync
        // body["body"]["credits_sync"]["body"]["credits_spent"] = -1


        // 30天后时间戳
        let timestamp = new Date().getTime();
        timestamp = Math.floor((timestamp + (1000 * 60 * 60 * 24 * 364)) / 1000)

        // 添加所有改装为最大 prokits_car_parts_full_sync body cars_parts

        let cars = []

        let cars_parts = {}
        cars_parts["171"] = {
            "tyres": 10,
            "suspension": 10,
            "drive train": 10,
            "exhaust": 10,
            "top_speed": 10,
            "nitro": 10,
            "acceleration": 10,
            "handling": 10,
            "updated_ts": 1712265302
        }


        let moto_ids = [
            // todo 
        ]

        let qu = [40, 43, 141, 208, 380, 381, 331];
        // 320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339
        let qu2 = [];

        for (let i = 1; i <= 393; i++) {
            if (qu.includes(i) || qu2.includes(i)) {
                continue;
            }


            // let ge = i%10 || 10;
            // let shi = Math.floor( (i / 10) % 10 ) || 10;
            // let bai = Math.floor( (i / 100) % 10 ) || 10;
            let ge = 10
            let shi = 10
            let bai = 10


            cars_parts[i + ""] = {
                "tyres": bai,
                "suspension": shi,
                "drive train": ge,
                "exhaust": 10,
                "acceleration": bai,
                "top_speed": shi,
                "handling": ge,
                "nitro": 10,
                "updated_ts": 1712265302
            }
            cars.push(i)
        }
        // cars_parts["308"] = cars_parts["171"]

        body["body"]["upgrades_full_sync"]["body"]["upgrades"] = cars_parts

        // 赋值车辆
		if ( undefined != body["body"]["server_items_full_sync"] ) {
			body["body"]["server_items_full_sync"]["body"]["cars"] = cars
		}
        


        body["body"]["prokits_car_parts_full_sync"] = {
            "body": {
                "cars_parts": cars_parts,
                "up_to_date": false,
                "sync_key": "1712288961"
            }
        }
		
		// 删除违规同步 infractions_sync
		if ( undefined != body["body"]["infractions_sync"] ) {
			body["body"]["infractions_sync"]["body"]["infractions"] = ""
		}
		


        // 修改增益
		if ( undefined != body["body"]["boosters_sync"] ) {
			body["body"]["boosters_sync"]["body"]["active"] = {
            "extra_tank": {
                "min": timestamp
            },
            "performance": {
                "min": timestamp
            },
            "nitro": {
                "min": timestamp
            },
            "credits": {
                "min": timestamp
            }
        }
		}
        


        // body["body"]["ad_rewards_status"]["ads_ads_extra_fusion_points_reward"] = 200000
        // let amount = body["body"]["fusion_points_partial_sync"]["body"]["balance"] + 190000
        // body["body"]["fusion_points_partial_sync"]["body"]["balance"] = amount
        // body["body"]["rewards_received"]["ads"][0]["quantity"] = 200000

        // body["subscriber"]["entitlements"] = added["entitlements"]
        // obj = JSON.stringify(body)
        // console.log("body ===" +  body)
    	console.log("修改A8成功!!!")
        obj.body = JSON.stringify(body)
    }
    $done(obj);

}
// ############### sync end 
