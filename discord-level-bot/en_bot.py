# -*- coding: utf-8 -*-

import requests
import json
import random
import time
import re

with open("./tokens.json") as f:
    datas = json.load(f)

chanel_list = datas["en"]["chanel"]
auth_list = datas["en"]["auth"]

def gen_context():
    context_list = [
        "hello bro",
        "to the moon!",
        "nice",
        "have a good day",
        "gm",
        "1",
        "hi~",
        "of course",
        "hello~",
        "really",
        "cool~",
        "what?",
        "why?",
        "not bad",
        "well done",
        "great",
        "perferct",
        "yes",
        "here",
        "interesting",
        "��",
        "��",
        "��",
    ]
    text = random.choice(context_list)
    return text

# def get_context(chanel_list, auth):
#     headr = {
#         "Authorization": auth,
#         "Content-Type": "application/json",
#         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36"
#     }
#     chanel_id = random.choice(chanel_list)
#     url = "https://discord.com/api/v9/channels/{}/messages?limit=100".format(chanel_id)
#     res = requests.get(url=url, headers=headr)
#     print(res.content)
#     result = json.loads(res.content)
#     result_list = []
#     for context in result:
#         if ('<') not in context['content'] :
#             if ('@') not in context['content'] :
#                 if ('http') not in context['content']:
#                     if ('?') not in context['content']:
#                         result_list.append(context['content'])
#     print("result list")
#     print(result_list)

#     return random.choice(result_list)


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
        sleeptime = random.randrange(300, 600)
        print(f'下次 {sleeptime}s 后启动')
        time.sleep(sleeptime)