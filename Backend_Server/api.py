from flask import Flask, jsonify, request
import common
import metric
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
        
     
        if username == "" or hashed_password == "":
            return jsonify({"message": "Empty Username and/or Password Received"}), 400
        
    
        if (username == '') or (db["User_Credentials"].find_one({"username": username}) is None):
            return jsonify({"message": "User doesn't not exist"}), 400
        

        if (hashed_password != "") and (hashed_password != str(db["User_Credentials"].find_one({"username": username})["password"])):
            return jsonify({"message":"Wrong Password for " + username}), 400
        
 
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
    age = int(data['age'])
    gender = data["gender"]
    city =  data['city']
    country= data['country']
    email= data['email']


    level = data["level"]
    desired_body_part =  data["desired_body_part"]


   
    weight = float(data['weight'])
    height = float(data['height'])
    heart_rate = 120
    calories = 0
    muscle_mass = float(data['muscle_mass'])
    body_fat_mass =  float(data["body_fat_mass"])




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
    db['User_Program_Data'].insert_one(
        {
            "username": username,
            "registered_course" : {
                "Fitness_101" : {
                    "overall" : 0,
                    "sub_progress":{
                        "shoulder_press" : 0,
                        "dumbbell_bicepcurl" : 0,
                        "squat" : 0,
                        "deadlift_with_dumbbell" : 0,
                        "lying_leg_raise" : 0,
                        "plank" :0 
                    }
                  
                },
                "Best_Program_for_Elderly" : {
                    "overall" : 0,
                    "sub_progress":{
                        "row_with_resistance_band" : 0,
                        "shoulder_press" : 0,
                        "dumbbell_bicepcurl" : 0,
                        "squat" : 0,
                        "standing_side_leg_lift" : 0,
                        "lying_leg_raise" :0 
                    }
                  
                }

            }
           
        }
        
    )
    db['User_Metric_Archive'].insert_one(
        {
             "username": username,
            "calories": {
                "1st": 0,
                "2nd": 0,
                "3rd": 0,
                "4th": 0,
                "5th": 0,
                "6th": 0,
                "7th": 0,
                "8th": 0,
                "9th": 0,
                "10th": 0,
                "11th": 0,
                "12th": 0,
                "13th": 0,
                "14th": 0,
                "15th": 0,
                "16th": 0,
                "17th": 0,
                "18th": 0,
                "19th": 0,
                "20th": 0,
                "21st": 0,
                "22nd": 0,
                "23rd": 0,
                "24th": 0,
                "25th": 0,
                "26th": 0,
                "27th": 0,
                "28th": 0,
                "29th": 0,
                "30th": 0,
                "31st": 0
                }
        }
    )
    userObjectsList.append(UserInventoryIOModel(username, name, age, weight, height, muscle_mass, body_fat_mass, calories, gender, heart_rate, city, country,email, level, desired_body_part))
   


    return jsonify({'message': f'Successfully registered with {username}'}), 200

@app.route('/updateInventoryAttr', methods=['POST'])
def updateInventoryAttr():
    data = request.get_json(force=True)
    username = data['username']
    
    # Check if the user exists
    db = common.mongodb_connect()
    user = db["User_Inventory"].find_one({"username": username})
    if user is None:
        return jsonify({'message': f'User {username} does not exist'}), 500
    
    # Update the attribute with the new value
    for key, value in data.items():
        if key != 'username':
            if key not in user:
                return jsonify({'message': f'Inventory {key} is not in the {username} User Inventory'}), 500
            # Convert number attributes to int or float
            if key in ['age', 'weight', 'height', 'muscle_mass', 'body_fat_mass', 'calories', 'heart_rate']:
                try:
                    value = int(value)  # Convert to int
                except ValueError:
                    try:
                        value = float(value)  # Convert to float
                    except ValueError:
                        return jsonify({'message': f'Invalid value for {key}'})
            db["User_Inventory"].update_one({"username": username}, {"$set": {key: value}})
    
    return jsonify({'message': f'Inventory attributes updated successfully for user {username}'}), 200

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
    if result == None:
        return jsonify({"error": "username is not exist in the inventory"}), 400
    
    return result, 200



@app.route('/adminGetRegisteredCourses/<username>', methods=['GET'])
def admin_get_registered_courses(username):
    db = common.mongodb_connect()

    record = db['User_Program_Data'].find_one({'username': username})


    if record:
        registered_courses = record.get('registered_course', {})
        return registered_courses
    else:
        return {}
  

@app.route('/getRegisteredCourses', methods=['POST'])
def get_registered_courses():
    data = request.get_json(force=True)
    username = data.get("username")
    db = common.mongodb_connect()

    record = db['User_Program_Data'].find_one({'username': username})

    if record == None:
        return jsonify({"error": "username is not exist in the course directories"}), 400
    
    if record:
        registered_courses = record.get('registered_course', {})
        return registered_courses



@app.route('/update_progress', methods=['POST'])
def update_progress():
    data = request.get_json(force=True)

    username = data.get("username")
    program = data.get("program")
    exercise_progress = {k: v for k, v in data.items() if k not in ["username", "program"]}

    db = common.mongodb_connect()

    # Find the user's record in the User_Program_Data collection
    record = db['User_Program_Data'].find_one({'username': username})
    registered_courses = record.get('registered_course', {})
    print(registered_courses)

    if registered_courses is None:
        return jsonify({"error": "Username does not exist in the course directories"}), 400

  
    if program in registered_courses:
        print(program)
        print(exercise_progress)
        registered_courses[program]["sub_progress"].update(exercise_progress)

    
        overall_progress = sum(registered_courses[program]["sub_progress"].values()) / (len(registered_courses[program]["sub_progress"]) * 4)
        print (overall_progress)
        registered_courses[program]["overall"] = overall_progress


        db['User_Program_Data'].update_one({'username': username}, {'$set': {'registered_course': registered_courses}})
        record = db['User_Program_Data'].find_one({'username': username})
        print(record)
    else:
        return jsonify({"error": "Program does not exist in the User_Program_Data"}), 400

    return jsonify({"message": "Exercise progress updated successfully."})

@app.route('/getDailyCaloriesBurnt', methods=['POST'])
def get_daily_calories_burnt():
    data = request.get_json(force=True)
    username = data.get("username")

    db = common.mongodb_connect()
    personal_inventory = db['User_Inventory'].find_one({'username': username}, {'_id': 0})
    gender = personal_inventory.get('gender')
    weight = personal_inventory.get('weight')
 

    program_record = db['User_Program_Data'].find_one({'username': username}, {'_id': 0})
    minutes_total = 0

    for course in program_record['registered_course'].values():
        minutes_total += sum(course['sub_progress'].values())
    
    calories_burnt_today = metric.calculate_calories_burned_weight(weight,minutes_total,gender)
    
   
    
    db['User_Inventory'].update_one({'username': username}, {'$set': {'calories': calories_burnt_today}})


    return jsonify({"calories_burnt_today": calories_burnt_today}), 200

@app.route('/getCaloriesArchive', methods=['POST'])
def get_calories_archive():
    data = request.get_json(force=True)
    username = data.get("username")
    db = common.mongodb_connect()
    record = db['User_Metric_Archive'].find_one({"username": username})
    
    if record is None:
        return jsonify({"error": "User not found in the Metric Directory"}), 404

    calories = record.get("calories",{})

    return jsonify(calories), 200

    







if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0",port=9000)





