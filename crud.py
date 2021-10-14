from flask import *
import sqlite3

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html");

@app.route("/add")
def add():
    return render_template("add.html")

@app.route("/savedetails",methods = ["POST","GET"])
def saveDetails():
    msg = "msg"
    if request.method == "POST":
        try:
            tag = request.form["tag"]
            patterns = request.form["patterns"]
            responses = request.form["responses"]
            context = request.form["context"]
            urls = request.form["urls"]
            imgs = request.form["imgs"]
            msg = "Patterns and Responses can't be empty!"
            if(patterns!="" and responses!=""):
                with sqlite3.connect("Data/intents.db") as con:
                    cur = con.cursor()
                    cur.execute("INSERT into Intents (tag, patterns, responses, context, urls, imgs) values (?,?,?,?,?,?)",(tag,patterns,responses,context,urls,imgs))
                    con.commit()
                    msg = "Intent successfully Added for Marg-ChatBot"
        except:
            con.rollback()
            msg = "We can not add the intents to the list"
        finally:
            return render_template("success.html",msg = msg)
            con.close()

@app.route("/view")
def view():
    con = sqlite3.connect("Data/intents.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("select * from Intents")
    rows = cur.fetchall()
    return render_template("view.html",rows = rows)

@app.route("/delete")
def delete():
    return render_template("delete.html")

@app.route("/deleterecord",methods = ["POST"])
def deleterecord():
    id = request.form["id"]
    with sqlite3.connect("Data/intents.db") as con:
        try:
            cur = con.cursor()
            cur.execute("delete from Intents where id = ?",(id,))
            con.commit()
            msg = "record successfully deleted"
        except:
            msg = "can't be deleted"
        finally:
            return render_template("delete_record.html",msg = msg)


@app.route("/edit")
def edit():
    return render_template("edit.html")

@app.route("/editrecord",methods = ["POST","GET"])
def editrecord():
    id = request.form["id"]
    con = sqlite3.connect("Data/intents.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("select * from Intents where id = ?",(id,))
    rows = cur.fetchall()
    return render_template("editview.html",rows = rows)

@app.route("/updtdetails",methods = ["POST","GET"])
def updtDetails():
    msg = "msg"
    if request.method == "POST":
        try:
            id = request.form["id"]
            tag = request.form["tag"]
            patterns = request.form["patterns"]
            responses = request.form["responses"]
            context = request.form["context"]
            urls = request.form["urls"]
            imgs = request.form["imgs"]
            with sqlite3.connect("Data/intents.db") as con:
                cur = con.cursor()
                cur.execute("UPDATE Intents SET tag=?, patterns=?, responses=?, context=?, urls=?, imgs=?  WHERE id=?", (tag,patterns,responses,context,urls,imgs,id))
                con.commit()
                msg = "Intent successfully Updated for Marg-ChatBot"
        except:
            con.rollback()
            msg = "We can not update the intents to the list"
        finally:
            return render_template("success.html",msg = msg)
            con.close()

@app.route("/datatfd")
def dataTfd():
    import app as appdata
    return render_template("transfer.html")


if __name__ == "__main__":
    #app.run(debug = True)
    app.run(host='0.0.0.0', port=5000)
