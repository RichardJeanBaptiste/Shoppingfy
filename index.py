import os
from bson import ObjectId
from flask import Flask, request, session, jsonify
from flask_session import Session
#from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

CORS(app, origins='http://localhost:3000')

client = MongoClient(os.environ['MONGO_URI'])
db = client['Users'] 
collection = db['User'] 


@app.route("/register" , methods = ['GET','POST'])
def register():
    ## GET request redirect to homepage
    data = request.get_json()
    username = data['username']
    password = data['password']
    collection.insert_one({"username": username, "password": password, 
        "items": {  
            "Chicken": [ ["a", "img", "note"] , ["b", "imgurl", "note"], ["c", "img", "note"]] , 
            "Beverages" : [ ["d", "img", "note"], ["e", "img", "note"], ["f", "img", "note"]] 
        },
        "lists": {
            #"test" : { "Category" : [["item", "amt"]]}
        },
        "history": {
            #["title", "date", "status", "list"]
        }
    
    })
    return "Registered"

@app.route("/login", methods = ['POST'])
def login():
    ## Get request redirect to homepage
    data = request.get_json()
    username = data['username']
    password = data['password']
    x = collection.find_one({"username": username, "password": password})

    session['username'] = "qwerty_keyboard"
    
    try:
        if x == None:
            return "Not Found"
        else:
            session['id'] = str(x['_id'])
            return str(x['_id']) , 200
    except:
        return "Server Error"

    
        

@app.route("/logout", methods=['POST'])
def logout():
    data = request.get_json()
    userid = data['USERID']

    #session.pop(userid , None)
    return "logout successful", 200


@app.route("/check_access", methods = ['POST'])
def check_session():
    # check if session exists
    data = request.get_json()
    userid = data['USERID']

    return f"Session id: {session.get('username')}" , 200

    
@app.route("/get_items", methods = ['POST'])
def get_login():
    data = request.get_json()
    userid = data['USERID']

    for x in collection.find({"_id": ObjectId(userid)}):
        return jsonify(x['items']), 200
    
@app.route("/add_items", methods = ['POST'])
def add_items():
    data = request.get_json()
    userid = data['USERID']
    category = data['Category']
    new_item = [data['New_Item'], data['IMG'], data["Note"]]
  
    try:
        ### if category exists
        filter_query = { "_id": ObjectId(userid)}
        update_query = {"$push": { f"items.{category}" : new_item}}
        collection.update_one(filter_query, update_query)
        return "Items added", 200
    except:
        return "Server error"

@app.route("/get_list", methods = ['GET'])
def get_list():
    data = request.get_json()
    userid = data['USERID']

    try:
        for x in collection.find({"_id": ObjectId(userid)}):
            return jsonify(x['lists']), 200
    except:
        return "Server error"
    
    

@app.route("/edit_list", methods = ['PUT', 'POST'])
def edit_list():
    data = request.get_json()
    userid = data['USERID']
    listname = data['Listname']
    listObj = data['ListObj']
    new_List = {listname : listObj}
    #{ "Chicken" : [["item", "amt"]]}
    
    try:
        filter_query = {"_id": ObjectId(userid)}
        update_query = {"$push": {"lists" : new_List} }
        collection.update_one(filter_query, update_query)
        return "list", 200
    except:
        return "Server error"
    
    

# @app.route("/get_history", methods = ['GET'])
# def get_history():
#     data = request.get_json()
#     return "history"

@app.route("/edit_history", methods = ['POST'])
def edit_history():
    data = request.get_json()
    userid = data['USERID']
    title =  data['Title']
    date = data['Date']
    status = data['Status']
    listObj = data['ListObj']
    new_list = [title , date, status, listObj]

    filter_query = {"_id": ObjectId(userid)}
    update_query = {"$push": {"lists" : new_list}}
    collection.update_one(filter_query, update_query)
    return "list" , 200



#@app.route('/set', methods= ['POST'])
# def index():
#     # Set a session variable

#     session['username'] = "qwerty_keyboard"
#     print('set')
#     return 'Session variable set!'

# @app.route('/get', methods= ['POST'])
# def get_session():
#     # Get the session variable
#     return f"Session username: {session.get('username')}"

# @app.route('/delete')
# def delete_session():
#     # Delete the session variable
#     session.pop('username', None)
#     return 'Session variable deleted!'
