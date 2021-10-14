import sqlite3

con = sqlite3.connect("Data/intents.db")
print("Database opened successfully")

con.execute("create table Intents (id INTEGER PRIMARY KEY AUTOINCREMENT, tag TEXT UNIQUE NOT NULL, patterns TEXT NOT NULL,responses TEXT NOT NULL,context TEXT,urls TEXT, imgs TEXT)")
print("Table created successfully")
con.close()
