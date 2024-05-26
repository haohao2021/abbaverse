import requests
from bs4 import BeautifulSoup
import json
import time

def fetch_language(song_url):
    # time.sleep(5)  # 增加到5秒，根据实际情况调整
    try:
        response = requests.get(song_url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            language_tag = soup.find('span', {'itemprop': 'inLanguage'})
            if language_tag:
                return language_tag.text.strip()
            else:
                return "instrumental"  # 如果没有指定语言，则假设歌曲为纯乐器演奏
        else:
            return f"Error fetching page, Status Code: {response.status_code}"  # 显示错误状态码
    except Exception as e:
        return f"Error: {str(e)}"  # 捕获并返回异常信息

def save_data(data):
    with open('updated_data_copy.json', 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)
    print("Data saved successfully.")

# 读取更新后的 JSON 数据
with open('updated_data_copy.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 遍历每首歌并更新语言数据
count = 0  # 用于跟踪已处理的数据条数
for album, album_data in data.items():
    for country, cover_data in album_data['covers'].items():
        for detail in cover_data['details']:
            if 'language' not in detail or "Error fetching page" in detail.get('language', ''):
                song_url = detail['song_url']
                language = fetch_language(song_url)
                detail['language'] = language  # 更新每个 detail 的语言信息
                count += 1
                if count % 20 == 0:  # 每20条数据保存一次
                    save_data(data)

# 确保最后未满20条的数据也被保存
if count % 20 != 0:
    save_data(data)

print("Language data updated successfully.")
