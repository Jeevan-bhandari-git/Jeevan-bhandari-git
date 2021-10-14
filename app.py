
#import pandas as pd
import sqlite3
import sys
import time
import json
#import os
import io
try:
    to_unicode = unicode
except NameError:
    to_unicode = str

myPath = "Data\Intents.db";

connection = sqlite3.connect(myPath)
cursor = connection.cursor()
#query = "Select * from Intents"
query = "Select tag,patterns,responses,context,urls,imgs from Intents"
result = cursor.execute(query)
items = []

#for row in result:
#	for key in cursor.description:
#		items.append({key[0]: value for value in row})
items = [dict(zip([key[0] for key in cursor.description], row)) for row in result]

#print(json.dumps({'items': items}))
##print(json.dumps(items, indent = 4));

# Serializing json
data = json.dumps({'intents': items})
# Write JSON file
with io.open('data.json', 'w', encoding='utf8') as outfile:
    str_ = json.dumps(data,
                      indent=4, sort_keys=True,
                      separators=(',', ': '), ensure_ascii=False)
    outfile.write(to_unicode(str_))

#os.remove(r'../pyjschat/intents.json')
fin = open('data.json')
fout = open(r'../pyjschat/intents.json', "w+")
#fout = open('intents.json', "w+")

text = fin.read()
text = text.replace('\\', '').replace(': ""', ': ["').replace('"",', '"],')
text = text.replace(': [",', ': [""],').replace(': ["}', ': [""]}').replace('}"', '}').replace('"{', '{')
fin.close()
fout.write(text)
fout.close()

#f = open("demofile2.txt", "a")
#f.write("See you soon!")
#f.close()
