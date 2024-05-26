import json
import requests
from bs4 import BeautifulSoup

# Load data from the provided data.json file
with open('data.json', 'r') as file:
    data = json.load(file)

# Define a function to scrape the language from the song_url
def scrape_language(song_url):
    try:
        response = requests.get(song_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        # Assuming the language is contained in an element with class 'language'
        language_element = soup.find(class_='language')
        if language_element:
            return language_element.get_text(strip=True)
    except Exception as e:
        return f"Error: {str(e)}"
    return "Unknown"

# Iterate through the data and update the language for entries with "Error: ..."
for song, song_data in data.items():
    for country, country_data in song_data['covers'].items():
        for detail in country_data['details']:
            if 'language' in detail and detail['language'].startswith("Error:"):
                new_language = scrape_language(detail['song_url'])
                detail['language'] = new_language

# Save the updated data back to the JSON file
with open('updated_data.json', 'w') as file:
    json.dump(data, file, indent=4)

print("Updated data has been saved to updated_data.json")
