class UserInventoryIOModel:
    def __init__(self, username, name, age, weight, height, muscle_mass, body_fat_mass, calories, gender, heart_rate, city, country,email, level, desired_body_part):
        self.username = username
        self.name = name
        self.age = age
        self.weight = weight
        self.height = height
        self.muscle_mass = muscle_mass
        self.body_fat_mass = body_fat_mass
        self.calories = calories
        self.gender = gender
        self.heart_rate = heart_rate
        self.city = city
        self.country = country
        self.email = email
        self.level = level
        self.desired_body_part = desired_body_part

    def map_to_dict(self):
        new_dict = {
            "username": self.username,
            "name": self.name,
            "age": self.age,
            "weight": self.weight,
            "height": self.height,
            "muscle_mass": self.muscle_mass,
            "body_fat_mass": self.body_fat_mass,
            "calories": self.calories,
            "gender": self.gender,
            "heart_rate": self.heart_rate,
            "city": self.city,
            "country": self.country,
            "email" : self.email,
            "level": self.level,
            "desired_body_part": self.desired_body_part
        }
        return new_dict