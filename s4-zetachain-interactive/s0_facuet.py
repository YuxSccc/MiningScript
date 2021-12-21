import requests
import schedule
import time
import json

wallets = {}

with open("./../pvts/wallets_list.json") as f:
  wallets = json.load(f)

def claim(wallet):

  try:
    url = f'https://faucet.zetachain.link/eth/{wallet}'

    payload = {}
    payload={}
    headers = {
      'authority': 'faucet.zetachain.link',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      'accept': 'application/json, text/plain, */*',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'sec-ch-ua-platform': '"macOS"',
      'origin': 'https://app.zetachain.com',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://app.zetachain.com/',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    print(wallet, "<====>", response.text)
  except:
    print("retry")
    return


def job():
  # claim("0xa5eBf7d82eD61e2B716141Df9e68c34F5D0c854c")
  for w in wallets:
    print("solve", w["address"])
    claim(w["address"])

schedule.every(1).seconds.do(job)

while True:
  schedule.run_pending()
  time.sleep(1)