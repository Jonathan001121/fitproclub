from flask import Flask, jsonify, request
import common
from UserInventoryIOModel import UserInventoryIOModel
import pymongo
from pymongo import MongoClient
import yaml
from flask_cors import CORS
app =  Flask(__name__, static_folder='statics')
CORS(app)
exceptions = {
    "incorrect_password": {"message": "Please check your username and password"},
    "incorrect_token": {"message": "Please login"},
    "invalid_input": {"message": "Please check your input"},
    "invalid_ip": {"message": "Please check your requested ip"},
    "duplicated_request": {"message": "Requested core switch has been added"},
    "object_id_not_found": {"message": "Please check object id"},
    "duplicated_username": {'message': 'Your username has been used'},
    "duplicated_rack_number": {'message': "rack_number_i duplicated!"},
    "incorrect_rack_number": {"message": "Invalid rack string format"},
    "incorrect_rack_prefix": {"message": "Rack prefixes do not match"},
    "invalid_request_body": {"message": "Invalid request body"}
}

userObjectsList = []

@app.route('/pingFlask', methods=['GET'])
def pingFlask():
    try:
        # Example code for a successful GET request
        response = {"message": "ping dou"}
        return jsonify(response), 200

    except Exception as e:
        # Handle the error and return an error message
        error_message = {"error": str(e)}
        return jsonify(error_message), 500



@app.route('/pingMongo', methods=['GET'])
def pingMongo():
    try:
        print("ping PingMongo called")
        db = common.mongodb_connect()
        collection_names = db.list_collection_names()
        return jsonify({"Collections": collection_names}), 200
    except Exception as e:
        return jsonify({"error": "Failed to connect to MongoDB"}), 500



@app.route('/login' , methods=['POST'])
def login(): 
    db = common.mongodb_connect()
    data = request.get_json(force=True)
    if request.method == 'POST':
        username = data['username']
        password = data['password']
      
        print("Username:" +str(username))
        print("Password:" +str(password))

        print(list(db["User_Credentials"].find()))
        hashed_password = str(common.simple_hash(password, 7))
        
        # Empty Input
        if username == "" or hashed_password == "":
            return jsonify({"message": "Empty Username and/or Password Received"}), 400
        
        # User not exist
        if (username == '') or (db["User_Credentials"].find_one({"username": username}) is None):
            return jsonify({"message": "User doesn't not exist"}), 400
        
        # Password Wrong
        if (hashed_password != "") and (hashed_password != str(db["User_Credentials"].find_one({"username": username})["password"])):
            return jsonify({"message":"Wrong Password for " + username}), 400
        
       # Successful Case
        if (hashed_password != "") and (hashed_password == db["User_Credentials"].find_one({"username": username})["password"]):
            return jsonify({"message": username + " has successfully logged in"}), 200
    else: 
        return jsonify({"message": exceptions["invalid_request_body"]}), 400
    
    return jsonify({"message": "Login is somehow not successful, Try again"}), 400


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json(force=True)
    username = data['username']
    password = data['password']
    name = data['name']
    age = data['age']
    gender = data["gender"]
    city =  data['city']
    country= data['country']
    email= data['email']

    # Course Preference
    level = data["level"]
    desired_body_part =  data["desired_body_part"]


    # Metrics
    weight = data['weight']
    height = data['height']
    heart_rate = 120
    calories = 0
    muscle_mass = data['muscle_mass']
    body_fat_mass =  data["body_fat_mass"]




    password = str(common.simple_hash(password,7))
    db = common.mongodb_connect()

    if not db["User_Inventory"].find_one({"username": username}) is None:
        return jsonify(exceptions["duplicated_username"]), 500

    db["User_Credentials"].insert_one({"username": username, "password": password})
    db['User_Inventory'].insert_one(
        {
            "username": username,
            "name": name,
            "age": age,
            "weight": weight,
            "height": height,
            "muscle_mass": muscle_mass,
            "body_fat_mass": body_fat_mass,
            "calories": calories,
            "gender": gender,
            "heart_rate": heart_rate,
            "city": city,
            "country": country,
            "email" : email,
            "level" : level,
            "desired_body_part" : desired_body_part
           
        }
        
    )
    userObjectsList.append(UserInventoryIOModel(username, name, age, weight, height, muscle_mass, body_fat_mass, calories, gender, heart_rate, city, country,email, level, desired_body_part))
    print(userObjectsList[len(userObjectsList)-1].username)

    # display the person object as a dictionary
    return jsonify({'message': f'Successfully registered with {username}'}), 200




@app.route('/collectionRename', methods=['POST'])
def rename_collection():
    config = common.read_config()
    mongo_db = "mongodb+srv://{}:{}@cluster0.6jkg6p8.mongodb.net/?authMechanism={}".format(config["mongodb_user"], config["mongodb_password"], config["auth_source"])
    myclient = pymongo.MongoClient(mongo_db)
    db = myclient["FitionSwift"]

    data = request.get_json(force=True)
    from_collection_name = data['from_collection_name']
    to_collection_name = data['to_collection_name']
  

    try:
        db[from_collection_name].rename(to_collection_name)
        return f"Collection renamed from '{from_collection_name}' to '{to_collection_name}'"
    except Exception as e:
        return f"Error renaming collection: {str(e)}"


@app.route('/getHealthMetric', methods=['GET'])
def get_health_metric():
    db = common.mongodb_connect()
    result = db['User_Inventory'].find_one({}, {'_id': 0})
    return result


@app.route('/getInventory', methods=['POST'])
def get_inventory():
    data = request.get_json(force=True)
    username =data.get("username")
    db = common.mongodb_connect()
    
    result = db['User_Inventory'].find_one({'username': username}, {'_id': 0})
    result['username'] = username
    if result == None:
        return jsonify({"error": "username is not exist in the inventory"}), 400
    
    return result, 200



@app.route('/adminGetRegisteredCourses/<username>', methods=['GET'])
def admin_get_registered_courses(username):
    db = common.mongodb_connect()

    record = db['User_Program_Data'].find_one({'username': username})
    print(record)

    if record:
        registered_courses = record.get('registered_course', {})
        return registered_courses
    else:
        return {}
  

@app.route('/getRegisteredCourses', methods=['POST'])
def get_registered_courses():
    data = request.get_json(force=True)
    username =data.get("username")
    db = common.mongodb_connect()

    record = db['User_Program_Data'].find_one({'username': username})


    if record:
        registered_courses = record.get('registered_course', {})
        return registered_courses
    else:
        return {}
    







if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0",port=9000)




