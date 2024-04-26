
import pymongo
from pymongo import MongoClient
from flask import jsonify
import yaml

def read_config():
    with open("config.yaml") as stream:
        config = yaml.safe_load(stream)
    stream.close()
    return config

def mongodb_connect():
    config = read_config()
 
    mongo_db = "mongodb+srv://{}:{}@cluster0.6jkg6p8.mongodb.net/?authMechanism={}".format(config["mongodb_user"], config["mongodb_password"],config["auth_source"]) # Replace with your MongoDB server URL
    myclient = pymongo.MongoClient(mongo_db)
    db = myclient["FitionSwift"]
    return db

mongodb_connect()

def simple_hash(password, pad=7):
    return pow(1279 ** 2, run_back(convert_bin(password, pad)) * 7654321, 11233333)

def convert_to_bit(n, pad):
    result = ""
    while n > 0:
        if n % 2 == 0:
            result = "0" + result
        else:
            result = "1" + result
        n = n // 2
    while len(result) < pad:
        result = "0" + result
    return result

def convert_bin(string, pad):
    output = ""
    for i in string:
        output = output + convert_to_bit(ord(i), pad)
    return output

def run_back(_):
    longbit = str(_[0])
    for i in range(len(_) - 1):
        longbit = longbit + str(_[i + 1])
    return int(longbit, 2)