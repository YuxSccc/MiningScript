import requests
import json
import random
import time
import re

with open("./tokens.json") as f:
    datas = json.load(f)

chanel_list = datas["cn"]["chanel"]
auth_list = datas["cn"]["auth"]

def gen_context():
    context_list = [
      "冲",
      "升级",
      "加油，一起升级",
      "升级路漫漫",
      "家人们好啊",
      "今天听什么歌呢",
      "牛逼",
      "厉害了",
      "666",
      "666666666",
      "lol",
      "送外卖去咯",
      "升级升级升级",
      "升级升级升级啊",
      "升级升级升级，好难啊",
      "哈哈",
      "老哥们水起来",
      "啥时候能 15 级啊",
      "这尼玛",
      "努力肝",
      "大家加油",
      "我想要白名單",
      "我想白",
      "一起加油吧",
      "难受的一批",
      "刷刷，刷起来",
      "卷起来",
      "我要冲 15 级呀呀呀！！",
      "啥时候能睡觉啊",
      "15 级好难",
      "听点什么歌来熬时间呢",
      "你们真的不睡啊",
      "草，你们还不睡",
      "加油兄弟们",
      "兄弟们冲起来",
      "淦",
      "啥时候白名单啊",
      "水了多少级了兄弟们",
      "好困啊",
      "太卷了吧大佬们",
      "努力点肝啊"
    ]
    text = random.choice(context_list)
    return text

def chat():
    authorization_list = auth_list
    for authorization in authorization_list:
        header = {
            "Authorization": authorization,
            "Content-Type":"application/json",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36"
        }
        for item in chanel_list:
            chanel_id = item["id"]
            chanel_name = item["name"]
            print("- [GUA] Chanel Id: ", chanel_id)
            print("- [GUA] Chanel Name: ", chanel_name)
            print("- [GUA] Auth", authorization)

            msg = {
                "content": gen_context(),
                "nonce": "82329451214{}33232234".format(random.randrange(0, 1000)),
                "tts": False
            }

            url = 'https://discord.com/api/v9/channels/{}/messages'.format(chanel_id)
            print("- [GUA] URL:", url)
            try:
                res = requests.post(url=url, headers=header, data=json.dumps(msg))
                print(res.content)
            except:
                print("failured")
                pass
            continue

if __name__ == '__main__':
    while True:
        try:
            chat()
        except:
            pass
        sleeptime = random.randrange(200, 500)
        print(f'下次 {sleeptime}s 后启动')
        time.sleep(sleeptime)