import time
import cv2
from flask import Flask, Response, jsonify
import mediapipe as mp
import numpy as np
from flask_cors import CORS
import math
import time
import threading
from mediapipe.framework.formats import landmark_pb2



app = Flask(__name__, static_folder='statics', static_url_path='/statics')
CORS(app)
app.add_url_rule('/statics/<path:filename>',
                 endpoint='statics', view_func=app.send_static_file)
app.secret_key = "the secret key"

def calculate_joint_angle_mediapipe(a, b, c):

    az=round(a.z,8)
    bz=round(b.z,8)
    cz=round(c.z,8)

   
    a_coords = np.array([a.x, a.y, az])  # First
    b_coords = np.array([b.x, b.y, bz])  # Mid
    c_coords = np.array([c.x, c.y, cz])  # End
    

    # Calculate the vectors AB and BC
    AB = b_coords - a_coords
    BC = b_coords - c_coords

    # Calculate the dot product of AB and BC
    dot_product = np.dot(AB, BC)

    # Calculate the magnitudes of AB and BC
    magnitude_AB = np.linalg.norm(AB)
    magnitude_BC = np.linalg.norm(BC)

    # Calculate the angle in radians using the dot product
    theta = dot_product / (magnitude_AB * magnitude_BC)
    angle = np.arccos(theta)

    # Convert the angle to degrees
    angle_degrees = np.degrees(angle)


    return angle_degrees
def calculate_imaginary_joint_angle_mediapipe(a, b, c):

    az=round(a.z,8)
    bz=round(b.z,8)
    cz=round(c.z,8)
    ax=b.x+100

   
    a_coords = np.array([ax, a.y, az])  # First
    b_coords = np.array([b.x, b.y, bz])  # Mid
    c_coords = np.array([c.x, c.y, cz])  # End
    

    # Calculate the vectors AB and BC
    AB = b_coords - a_coords
    BC = b_coords - c_coords

    # Calculate the dot product of AB and BC
    dot_product = np.dot(AB, BC)

    # Calculate the magnitudes of AB and BC
    magnitude_AB = np.linalg.norm(AB)
    magnitude_BC = np.linalg.norm(BC)

    # Calculate the angle in radians using the dot product
    theta = dot_product / (magnitude_AB * magnitude_BC)
    angle = np.arccos(theta)

    # Convert the angle to degrees
    angle_degrees = np.degrees(angle)


    return angle_degrees

def calculate_2d_angle(a,b,c):
    a = np.array([a.x, a.y, a.z]) # First
    b = np.array([b.x, b.y, b.z]) # Mid
    c = np.array([c.x, c.y, c.z]) # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle >180.0:
        angle = 360-angle
        
    return angle
def calculate_imaginary_2d_angle(a,b,c):
    ay= b.y - 1000
    a = np.array([a.x, ay, a.z]) # First
    b = np.array([b.x, b.y, b.z]) # Mid
    c = np.array([c.x, c.y, c.z]) # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle >180.0:
        angle = 360-angle
        
    return angle

def calculate_imaginary_2dYPlus_angle(a,b,c):
    ay= b.y + 1000
    a = np.array([a.x, ay, a.z]) # First
    b = np.array([b.x, b.y, b.z]) # Mid
    c = np.array([c.x, c.y, c.z]) # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle >180.0:
        angle = 360-angle
        
    return angle

def calculate_imaginary_2d_angle_x(a,b,c):
    ax= b.x - 1000
    a = np.array([ax, a.y, a.z]) # First
    b = np.array([b.x, b.y, b.z]) # Mid
    c = np.array([c.x, c.y, c.z]) # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle >180.0:
        angle = 360-angle
        
    return angle

def calculate_torsor_angle_mediapipe(a, b, c ): 
    # [11][11][12]
    # make a point upper than 11
    az=round(a.z,8)
    bz=round(b.z,8)
    cz=round(c.z,8)
    
    ay= b.y - 1000

   
    a_coords = np.array([a.x, ay, az])  # First
    b_coords = np.array([b.x, b.y, bz])  # Mid
    c_coords = np.array([c.x, c.y, az])  # End
    

    # Calculate the vectors AB and BC
    AB = b_coords - a_coords
    BC = b_coords - c_coords

    # Calculate the dot product of AB and BC
    dot_product = np.dot(AB, BC)

    # Calculate the magnitudes of AB and BC
    magnitude_AB = np.linalg.norm(AB)
    magnitude_BC = np.linalg.norm(BC)

    # Calculate the angle in radians using the dot product
    theta = dot_product / (magnitude_AB * magnitude_BC)
    angle = np.arccos(theta)

    # Convert the angle to degrees
    angle_degrees = np.degrees(angle)


    return angle_degrees




start = False
middle = False
end = False
count=0
isTimerStart = False
errorMessages = ""
def countdown(seconds):
    global isTimerStart, errorMessages
    isTimerStart = True
    while seconds > 0:
        
        time.sleep(1)
        seconds -= 1
    isTimerStart = False
    errorMessages = ""

def gen(model):
    previous_time = 0
    cap = cv2.VideoCapture(0)
    mpDraw = mp.solutions.drawing_utils
    my_pose = mp.solutions.pose
    pose = my_pose.Pose(min_detection_confidence=0.5,
                        min_tracking_confidence=0.5)
    connections = list(my_pose.POSE_CONNECTIONS)
    print(connections)


    global count, start, middle, end, isTimerStart, errorMessages
    start = False
    middle = False
    end = False
    count=0
    errorMessages=""
    while True:
        
        success, img = cap.read()
        img = cv2.flip(img,1)
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        result = pose.process(imgRGB)


        if result.pose_world_landmarks:
                mpDraw.draw_landmarks(
                    image=img,
                    landmark_list=result.pose_landmarks,
                    connections=connections,
                    landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0), thickness=10),
                )

                
                # bicep curl
                if(model==1):

                    # wrist,elbow, shoulder(right)
                    r_elbow_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[13],result.pose_world_landmarks.landmark[15])
                    #hip shoulder, elbow(right)
                    r_shoulder_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[13])
                    #shoulder, hip, knee(right)
                    r_hip_angles = calculate_torsor_angle_mediapipe(result.pose_landmarks.landmark[23],result.pose_landmarks.landmark[23],result.pose_landmarks.landmark[11])
                    # Start position
                    if   r_elbow_angles > 140 and start==False:
                        start = True
                    if   r_elbow_angles < 80 and start == True and middle == False:
                        middle = True 
                    if   r_elbow_angles > 140 and start == True and middle == True and end== False:
                        end = True
                        count = count + 1
                        start = False
                        middle = False
                        end = False
                        print(count)
                    if  r_shoulder_angles >40:
                        start = False
                        middle = False
                        end = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[11,13]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        ) 
                    if  r_shoulder_angles >40 and isTimerStart == False:
                        errorMessages = "Elbow not in line"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if  r_hip_angles > 10:
                        start = False
                        middle = False
                        end = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[23,11]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )

             

                        
                    if  r_hip_angles > 10 and isTimerStart == False:
                        errorMessages = "Upper body leaning forward"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    
                # row with resistance band
                elif(model==2):
                    
                    # wrist,elbow, shoulder(right)
                    r_elbow_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[13],result.pose_world_landmarks.landmark[15])
                    #hip shoulder, elbow(right)
                    r_shoulder_angles = calculate_imaginary_joint_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[13])
                    #shoulder, hip, knee(right)
                    r_hip_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25])
                    imaginary_hip_angle = calculate_imaginary_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[11])
                    neck_angles =  calculate_imaginary_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[7])
                    neck_angles=imaginary_hip_angle-neck_angles
                    # Start position
                    if r_elbow_angles > 140 and  r_shoulder_angles > 135 and start==False:
                        start = True
                    if r_shoulder_angles < 90 and  r_elbow_angles < 110 and start == True and middle == False:
                        middle = True 
                    if r_elbow_angles > 140 and  r_shoulder_angles > 135 and start == True and middle == True and end== False:
                        end = True
                        count = count + 1
                        start = False
                        middle = False
                        end = False



                    # if neck_angles <-4:
                    #     mpDraw.draw_landmarks(
                    #         image=img,
                    #         landmark_list=result.pose_landmarks,
                    #         connections=[[11,13]],
                    #         landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                    #         connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                    #     ) 
                    if neck_angles <-4 and isTimerStart == False :
                        errorMessages = "head not facing forward"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if neck_angles <-4  :
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                        image=img,
                        landmark_list=result.pose_landmarks,
                        connections=[[7,11],[8,12]],
                        landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                        connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )
                    if neck_angles <-4 :
                        start = False
                        middle = False
                        end  = False
                        
                    if r_elbow_angles <75:
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[13,15]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        ) 
                    if r_elbow_angles <75 and isTimerStart == False :
                        errorMessages = "Arm bending too much"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if r_shoulder_angles <65:
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[11,13]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        ) 
                    if r_shoulder_angles <65 and isTimerStart == False :
                        errorMessages = "pulling back too far"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()

                # plank
                elif(model==3):
                    #hip, hip, knee(right)
                    r_hiptoknee_angles = calculate_torsor_angle_mediapipe(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25])
                    #hip, hip, shoulder(right)
                    r_hiptoshoulder_angles = calculate_torsor_angle_mediapipe(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[11])
                    # hip, knee(right), ankle
                    r_knee_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[27])
                    if  r_hiptoknee_angles >95 and  r_knee_angles > 155 and start==False:
                        start = True 
                    if  r_knee_angles < 155 and isTimerStart == False  :
                        errorMessages = "knee not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start() 
                    if  r_knee_angles < 155:
                        start = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[23,25]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        ) 
                    if  r_hiptoknee_angles >95 and isTimerStart == False  :
                        errorMessages = "hip too low"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start() 
                    if  r_hiptoshoulder_angles >100 and isTimerStart == False  :
                        errorMessages = "hip too high"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start() 
                    if  r_hiptoknee_angles <95 or r_hiptoshoulder_angles >100:
                        start = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[23,11]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )

               
               #Dumbell Overhead Press
                elif (model==4):
                    # # wrist,elbow, shoulder(right)
                    r_ppd_elbow_angles = calculate_imaginary_joint_angle_mediapipe(result.pose_world_landmarks.landmark[13],result.pose_world_landmarks.landmark[13],result.pose_world_landmarks.landmark[15])
                    l_ppd_elbow_angles = calculate_imaginary_joint_angle_mediapipe(result.pose_world_landmarks.landmark[14],result.pose_world_landmarks.landmark[14],result.pose_world_landmarks.landmark[16])
                    hip_ppd_angle= calculate_torsor_angle_mediapipe(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[24])
                    shoudler_ppd_angle= calculate_torsor_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[12])
                    # wrist,elbow, shoulder(right)
                    r_elbow_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[13],result.pose_world_landmarks.landmark[15])
                    # wrist,elbow, shoulder(left)
                    l_elbow_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[12],result.pose_world_landmarks.landmark[14],result.pose_world_landmarks.landmark[16])
                    #hip shoulder, elbow(right)
                    r_shoulder_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[13])
                    #hip shoulder, elbow(left)
                    l_shoulder_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[24],result.pose_world_landmarks.landmark[12],result.pose_world_landmarks.landmark[14])
                    # Start position
                    if l_elbow_angles < 70 and  r_elbow_angles < 70 and l_shoulder_angles < 70 and  r_shoulder_angles< 70 and start==False:
                        start = True
                    # Middle position
                    if l_elbow_angles > 150 and  r_elbow_angles >150  and l_shoulder_angles >140 and  r_shoulder_angles> 140 and start == True and middle == False:
                        middle = True 
                    # End position
                    if l_elbow_angles < 70 and  r_elbow_angles < 70 and l_shoulder_angles < 70 and  r_shoulder_angles< 70 and start == True and middle == True and end== False:
                        end = True
                        count = count + 1
                        start = False
                        middle = False
                        end = False
                    if  (r_ppd_elbow_angles >110 or r_ppd_elbow_angles <70)  and isTimerStart == False  :
                        errorMessages = "Right forearm not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if  (r_ppd_elbow_angles >110 or r_ppd_elbow_angles <70):
                        start = False
                        middle = False
                        end = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[13,15]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )
                    if  (l_ppd_elbow_angles >110 or l_ppd_elbow_angles <70)  and isTimerStart == False  :
                        errorMessages = "Left forearm not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if  (l_ppd_elbow_angles >110 or l_ppd_elbow_angles <70):
                        start = False
                        middle = False
                        end = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[14,16]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )

                    if  (shoudler_ppd_angle >100 or shoudler_ppd_angle <80 or hip_ppd_angle <80  or  hip_ppd_angle >100) and isTimerStart == False :
                        errorMessages = "Torso not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if  (shoudler_ppd_angle >100 or shoudler_ppd_angle <80 or hip_ppd_angle <80  or  hip_ppd_angle >100):
                        start = False
                        middle = False
                        end = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[11,23],[12,24]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )

                #Standing Side Leg Raise 
                elif (model==5):  
                    # hip, knee(left), ankle
                    l_knee_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[24],result.pose_world_landmarks.landmark[26],result.pose_world_landmarks.landmark[28])
                    # hip, knee(left), ankle
                    r_knee_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[27])
                    hip_ppd_angle= calculate_torsor_angle_mediapipe(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[24])
                    #shoulder, hip, knee(right)
                    r_hip_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25])
                    shoudler_ppd_angle= calculate_torsor_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[12])
                    # Start position
                    if r_hip_angles > 150 and r_knee_angles > 140 and l_knee_angles > 140  and start==False: 
                        start = True
                    # Middle position
                    if r_hip_angles < 135  and start==True and middle==False: 
                        middle = True
                    # End position
                    if r_hip_angles > 150 and r_knee_angles > 140 and l_knee_angles > 140  and start == True and middle == True and end == False:
                        end = True
                        count = count + 1
                        start = False
                        middle = False
                        end = False
                        print(count)
                    if l_knee_angles < 140 and isTimerStart == False:
                        errorMessages = "left knee not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if l_knee_angles < 140:
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[24,26]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )

                    if r_knee_angles < 140 and isTimerStart == False:
                        errorMessages = "right knee not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if r_knee_angles < 140:
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[23,25]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )
                    if ( shoudler_ppd_angle >105 or shoudler_ppd_angle <75 ) and isTimerStart == False: 
                        errorMessages = "torso not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if ( shoudler_ppd_angle >105 or shoudler_ppd_angle <75 ):
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[11,23],[12,24]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )
                # lying leg raise
                elif (model==6):  
                    # hip, knee(left), ankle
                    r_knee_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[27])
                    #shoulder, hip, knee(right)
                    r_hip_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25])
                    imaginary_hip_angle = calculate_imaginary_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[11])
                    neck_angles =  calculate_imaginary_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[7])
                    neck_angles=imaginary_hip_angle-neck_angles
                    # Start position
                    if r_hip_angles > 165  and start==False: 
                        start = True
                    # Middle position
                    if r_hip_angles < 100  and start==True and middle==False: 
                        middle = True
                    # End position
                    if r_hip_angles > 165 and start == True and middle == True and end == False:
                        end = True
                        count = count + 1
                        start = False
                        middle = False
                        end = False


                    if r_knee_angles < 130 and isTimerStart == False :
                        errorMessages = "knee not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if r_knee_angles < 130:
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[23,25]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )
                    if neck_angles > 8 and isTimerStart == False :
                        errorMessages = "neck not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if neck_angles > 8 :
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[7,11],[8,12]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )
                    
                # Squad front view
                elif (model==7):  
                    # hip, knee(left), ankle
                    l_knee_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[24],result.pose_world_landmarks.landmark[26],result.pose_world_landmarks.landmark[28])
                    angle_text = str(round(l_knee_angles, 1))
                    x = int(result.pose_landmarks.landmark[26].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[26].y * img.shape[0])
                    
                    # cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                    
                    # hip, knee(left), ankle
                    r_knee_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[27])
                    angle_text = str(round(r_knee_angles, 1))
                    x = int(result.pose_landmarks.landmark[25].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[25].y * img.shape[0])
                    
                    # cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                
                       # hip, knee(left), ankle
                    l_knee_angles_imga = calculate_imaginary_2d_angle_x(result.pose_world_landmarks.landmark[26],result.pose_world_landmarks.landmark[26],result.pose_world_landmarks.landmark[24])
                    angle_text = str(round(l_knee_angles_imga, 1))
                    x = int(result.pose_landmarks.landmark[26].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[26].y * img.shape[0])
                    
                    cv2.putText(img, angle_text, (x+500, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                    
                    # hip, knee(left), ankle
                    r_knee_angles_imga = calculate_imaginary_2d_angle_x(result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[23])
                    angle_text = str(round(r_knee_angles_imga, 1))
                    x = int(result.pose_landmarks.landmark[25].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[25].y * img.shape[0])
                    
                    cv2.putText(img, angle_text, (x+500, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                
                        #shoulder, hip, knee(right)
                    r_hip_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25])
                    angle_text = str(round(r_hip_angles, 1))
                    x = int(result.pose_landmarks.landmark[23].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[23].y * img.shape[0])
                    
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                    
                    #shoulder, hip, knee(left)
                    l_hip_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[12],result.pose_world_landmarks.landmark[24],result.pose_world_landmarks.landmark[26])
                    angle_text = str(round(l_hip_angles, 1))
                    x = int(result.pose_landmarks.landmark[24].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[24].y * img.shape[0])
                
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:


                    #ankle, heel, foot index(right)
                    r_heel_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[27],result.pose_world_landmarks.landmark[29],result.pose_world_landmarks.landmark[31] )
                    angle_text = str(round(r_heel_angles, 1))
                    x = int(result.pose_landmarks.landmark[29].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[29].y * img.shape[0])
                
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:

                    r_kneetogd_angles =calculate_imaginary_2d_angle_x(result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[27])
                    angle_text = str(round(r_kneetogd_angles, 1))
                    x = int(result.pose_landmarks.landmark[25].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[25].y * img.shape[0])
                    cv2.putText(img, angle_text, (x+100, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)  # for angle in angles:
                  
                  
                  
                    l_kneetogd_angles =calculate_imaginary_2dYPlus_angle(result.pose_world_landmarks.landmark[26],result.pose_world_landmarks.landmark[26],result.pose_world_landmarks.landmark[28])
                    angle_text = str(round(l_kneetogd_angles, 1))
                    x = int(result.pose_landmarks.landmark[26].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[26].y * img.shape[0])
                
                    cv2.putText(img, angle_text, (x+100, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)  # for angle in angles:

                    #ankle, heel, foot index(left)
                    l_heel_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[28],result.pose_world_landmarks.landmark[30],result.pose_world_landmarks.landmark[32] )
                    angle_text = str(round(l_heel_angles, 1))
                    x = int(result.pose_landmarks.landmark[30].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[30].y * img.shape[0])
                
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:


                    # hip_distance = result.pose_world_landmarks.landmark[23].x - result.pose_world_landmarks.landmark[24].x
                    # hip_distance = hip_distance + 3
                    # x = int(result.pose_landmarks.landmark[23].x * img.shape[1])
                    # y = int(result.pose_landmarks.landmark[23].y * img.shape[1])
                    # cv2.putText(img, angle_text, (x, y-100), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)  # for angle in angles:
                   
                    # knee_distance = result.pose_world_landmarks.landmark[25].x - result.pose_world_landmarks.landmark[26].x
                    # x = int(result.pose_landmarks.landmark[25].x * img.shape[1])
                    # y = int(result.pose_landmarks.landmark[25].y * img.shape[1])
                    # cv2.putText(img, angle_text, (x, y-100), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)  # for angle in angles:


                        # Start position
                    if l_knee_angles > 155 and r_knee_angles > 155 and l_hip_angles >160 and r_hip_angles >160  and start==False: 
                        start = True
                        print("Start flag done")  
                    
                    # Middle position
                    if l_knee_angles < 110 and r_knee_angles < 110 and l_hip_angles < 100 and r_hip_angles < 100  and start==True and middle==False: 
                        middle = True
                        print("middle flag done")  


                    # End position
                    if l_knee_angles > 155 and r_knee_angles > 155 and l_hip_angles >160 and r_hip_angles >160 and start==True and middle==True and end ==False:
                        end = True
                        print("End flag done")
                        count = count + 1
                        start = False
                        middle = False
                        end = False
                        print(count)
                    
                    # if r_heel_angles >160 or l_heel_angles > 160  and isTimerStart == False:
                    #     start = False
                    #     middle = False
                    #     end  = False
                    #     print("Resetting flags")
                    #     errorMessages = "heel too inward"
                    #     countdown_Thread=threading.Thread(target=countdown, args=(4,))
                    #     countdown_Thread.start()
                   
                    
                    if  (r_kneetogd_angles>105 )and isTimerStart == False :
                        start = False
                        middle = False
                        end  = False
                        print("Resetting flags")
                        errorMessages = "knee inward"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()    


                # ===========================     Squat (Profile View)  =================================
                # #    shoulder, hip, knee(right)
                #     r_hip_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25])
                #     angle_text = str(round(r_hip_angles, 1))
                #     x = int(result.pose_landmarks.landmark[23].x * img.shape[1])
                #     y = int(result.pose_landmarks.landmark[23].y * img.shape[0])
                #     cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                    
                #     # hip, knee(left), ankle
                #     r_knee_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[27])
                #     angle_text = str(round(r_knee_angles, 1))
                #     x = int(result.pose_landmarks.landmark[25].x * img.shape[1])
                #     y = int(result.pose_landmarks.landmark[25].y * img.shape[0])
                #     cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                    

                #     imaginary_hip_angle = calculate_imaginary_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[11])
                #     angle_text = str(round(imaginary_hip_angle, 1))
                #     x = int(result.pose_landmarks.landmark[23].x * img.shape[1])
                #     y = int(result.pose_landmarks.landmark[23].y * img.shape[0])
                #     cv2.putText(img, angle_text, (x+60, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:

                #     neck_angles =  calculate_imaginary_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[7])
                #     neck_angles=imaginary_hip_angle-neck_angles
                #     angle_text = str(round(neck_angles, 1))
                #     x = int(result.pose_landmarks.landmark[11].x * img.shape[1])
                #     y = int(result.pose_landmarks.landmark[11].y * img.shape[0])
                #     cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:

                #     # Start position
                #     if r_hip_angles > 160 and r_knee_angles > 150 and start==False: 
                #         start = True
                #         print("Start flag done")  
                    
                #     # # Middle position
                #     if  r_knee_angles < 80 and r_hip_angles < 80  and start==True and middle==False: 
                #         middle = True
                #         print("middle flag done")  


                #     # # End position
                #     if  r_knee_angles > 150 and r_hip_angles >160 and start==True and middle==True and end ==False:
                #         end = True
                #         print("End flag done")
                #         count = count + 1
                #         start = False
                #         middle = False
                #         end = False
                #         print(count)  

                #     if imaginary_hip_angle >50 and isTimerStart == False :
                #         start = False
                #         middle = False
                #         end  = False
                #         print("Resetting flags")
                #         errorMessages = "lean too forward"
                #         countdown_Thread=threading.Thread(target=countdown, args=(4,))
                #         countdown_Thread.start()

                    
                #     if neck_angles < -8 and isTimerStart == False :
                #         start = False
                #         middle = False
                #         end  = False
                #         print("Resetting flags")
                #         errorMessages = "neck not straight"
                #         countdown_Thread=threading.Thread(target=countdown, args=(4,))
                #         countdown_Thread.start()
                # Deadlift
                elif (model==8):     
                    r_hip_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25])
                    # hip, knee(left), ankle
                    r_knee_angles = calculate_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[25],result.pose_world_landmarks.landmark[27])
                    imaginary_hip_angle = calculate_imaginary_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[11])
                    neck_angles =  calculate_imaginary_2d_angle(result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[23],result.pose_world_landmarks.landmark[7])
                    neck_angles=imaginary_hip_angle-neck_angles
                    # wrist,elbow, shoulder(right)
                    r_elbow_angles = calculate_joint_angle_mediapipe(result.pose_world_landmarks.landmark[11],result.pose_world_landmarks.landmark[13],result.pose_world_landmarks.landmark[15])
                    # Start position
                    if r_hip_angles > 160 and r_knee_angles > 150 and start==False: 
                        start = True
                    # # Middle position
                    if  r_knee_angles < 120 and r_hip_angles < 70  and start==True and middle==False: 
                        middle = True
                    # # End position
                    if  r_knee_angles > 150 and r_hip_angles >160 and start==True and middle==True and end ==False:
                        end = True
                        count = count + 1
                        start = False
                        middle = False
                        end = False
                    
                    if imaginary_hip_angle >75 and isTimerStart == False :
                        errorMessages = "lean too forward"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if imaginary_hip_angle >75:
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[11,23]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )
                    if neck_angles <-8 and isTimerStart == False :
                        errorMessages = "neck not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()

                    if neck_angles <-8 :
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[7,11],[8,12]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )
                    if r_elbow_angles <145 and isTimerStart == False :
                        errorMessages = "Arm not straight"
                        countdown_Thread=threading.Thread(target=countdown, args=(4,))
                        countdown_Thread.start()
                    if r_elbow_angles <145:
                        start = False
                        middle = False
                        end  = False
                        mpDraw.draw_landmarks(
                            image=img,
                            landmark_list=result.pose_landmarks,
                            connections=[[11,13]],
                            landmark_drawing_spec=mpDraw.DrawingSpec(color=(0, 255, 0)),
                            connection_drawing_spec=mpDraw.DrawingSpec(color=(0, 0, 255), thickness=30)
                        )

        
                    


        current_time = time.time()
        fps = 1 / (current_time - previous_time)
        previous_time = current_time

        cv2.putText(img, str(int(fps)), (70, 50), cv2.FONT_HERSHEY_PLAIN, 3, (255, 0, 0), 3)
     
        frame = cv2.imencode('.jpg', img)[1].tobytes()
        yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        key = cv2.waitKey(20)
        if key == 27:
            break



@app.route('/data',methods=["GET"])
def get_data():
    global count, start, middle, end
    data = {
        'count': count,
        'start': start,
        'middle': middle,
        'end': end,
        'errorMessages': errorMessages
        
    }
    return jsonify(data)




@app.route('/dumbbellbicepcurl')
def video_feed_for_curl():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("curl is called ")
    return Response(gen(1),
                    mimetype='multipart/x-mixed-replace; boundary=frame')




@app.route('/rowwithresistanceband')
def video_feed_for_row():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("row is called ")
    return Response(gen(2),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/plank')
def video_feed_for_plank():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("plank is called ")
    return Response(gen(3),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/dumbbelloverheadpress')
def video_feed_for_dumbbelloverheadpress():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("dumbbelloverheadpress is called ")
    return Response(gen(4),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/standingsideleglift')
def video_feed_for_standingsideleglift():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("standingsideleglift is called ")
    return Response(gen(5),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
@app.route('/lyinglegraise')
def video_feed_for_lyinglegraise():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("lyinglegraise is called ")
    return Response(gen(6),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
@app.route('/squat')
def video_feed_for_squat():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("squat is called ")
    return Response(gen(7),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
@app.route('/deadliftwithdumbbell')
def video_feed_for_deadliftwithdumbbell():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("deadliftwithdumbbell is called ")
    return Response(gen(8),
                    mimetype='multipart/x-mixed-replace; boundary=frame')









if __name__ == "__main__":
    app.run(port=8000, debug=True)