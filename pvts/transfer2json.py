import openpyxl
import json
from pathlib import Path

xlsx_file = Path('.', 'wallets.xlsx')
wb_obj = openpyxl.load_workbook(xlsx_file) 

fo_cache = []

def write_to_file():
    with open("./wallets_list.json", 'w') as f:
        json.dump(fo_cache, f, ensure_ascii=True, indent=4, sort_keys=True)

# Read the active sheet:
sheet = wb_obj.active

for i in range(2, 1003):
    address = sheet[f'A{i}'].value
    pvt = sheet[f'B{i}'].value
    if address is None or pvt is None:
        continue
    user = {
        "address": address,
        "pvt": pvt[2:] if pvt.startswith("0x") else pvt,
    }
    fo_cache.append(user)
    
write_to_file()