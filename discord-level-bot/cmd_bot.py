import requests
import json
import random
import time
import re

with open("./tokens.json") as f:
    datas = json.load(f)

chanel_list = datas["cmd"]["chanel"]
auth_list = datas["cmd"]["auth"]

def gen_context():
    context_list = [
      "-invite",
      "!rank"
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
        sleeptime = random.randrange(500, 850)
        print(f'下次 {sleeptime}s 后启动')
        time.sleep(sleeptime)