import pandas as pd
import requests
import csv
req = requests.get('https://covid19.who.int/WHO-COVID-19-global-table-data.csv')
url_content = req.content
csv_file = open('downloaded.csv', 'wb')
csv_file.write(url_content)
csv_file.close()
df1 = pd.read_csv('downloaded.csv')
df1 = df1.drop([0])
df1 = df1.drop(columns=['WHO Region','Cases - cumulative total','Cases - newly reported in last 7 days','Cases - cumulative total per 100000 population','Cases - newly reported in last 24 hours','Deaths - cumulative total','Deaths - cumulative total per 100000 population','Deaths - newly reported in last 7 days','Deaths - newly reported in last 7 days per 100000 population','Deaths - newly reported in last 24 hours','Transmission Classification'])
df1 = df1.rename(columns={ 'Cases - newly reported in last 7 days per 100000 population' : 'Cases7D'}) 
df1['Name'] = df1['Name'].replace(['United States of America','Russian Federation','The United Kingdom','Iran (Islamic Republic of)','Czechia','Bolivia (Plurinational State of)','Republic of Moldova','Venezuela (Bolivarian Republic of)','Kosovo[1]','Republic of Korea'],['USA','Russia','Great Britain','Iran','Czech Republic','Bolivia','Moldova','Venezuela','Kosovo','South Korea'])
df1 = df1.dropna(axis = 0)
df1.to_json('COVID.json' , orient = 'records')
