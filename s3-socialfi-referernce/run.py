import json
from os import error
import random
import time
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains

with open("./../pvts/wallets_list.json") as f:
  wallets = json.load(f)

used_cache = {}

with open("./used_cache.json") as f:
  used_cache = json.load(f)

chrome_driver = "./chromedriver"

def write_to_file():
  with open("./used_cache.json", "w") as f:
    json.dump(used_cache, f, ensure_ascii=True)

def all_flow(wallet, key):
  try:

    email = f'desgard.duan+{key}@gmail.com'

    if wallet in used_cache:
      print(f'{wallet} 已经使用')

    print('\n')
    print(f'正在注册:{wallet}, 邮箱: {email}')

    driver = webdriver.Chrome(chrome_driver)

    driver.get('https://socialfi.ai?invite=7Jz6JF')

    time.sleep(5)

    address_input = driver.find_element_by_xpath("/html/body/div[1]/div[1]/div[3]/div/div[2]/div[1]/div[3]/div/div[1]/div[2]/input")
    address_input.send_keys(wallet)

    email_input = driver.find_element_by_xpath("/html/body/div[1]/div[1]/div[3]/div/div[2]/div[1]/div[3]/div/div[1]/div[4]/input")
    email_input.send_keys(email)

    submit_btn = driver.find_element_by_xpath("/html/body/div[1]/div[1]/div[3]/div/div[2]/div[1]/div[3]/div/div[2]/div[2]")
    ActionChains(driver).move_to_element(submit_btn).click().perform()
    # print("请输入验证链接：")
    # verify_url = str(sys.stdin.readline())
    # driver.get(verify_url)
    time.sleep(5)
    print(f'Email: {email}, Address: {wallet} Pass ✅')

    driver.close()
  except error:
    print(error)

for i in range(340, 1001):
  key = f'{i + 46327}'
  add = wallets[i]["address"]
  all_flow(add, key)