import time
import cv2
from flask import Flask, Response, jsonify
import mediapipe as mp
import numpy as np
from flask_cors import CORS





app = Flask(__name__, static_folder='statics', static_url_path='/statics')
CORS(app)
app.add_url_rule('/statics/<path:filename>',
                 endpoint='statics', view_func=app.send_static_file)
app.secret_key = "the secret key"

def calculate_joint_angle_mediapipe(a, b, c):
    number_az=a.z
    az= round(number_az, 5)
    number_bz=b.z
    bz= round(number_bz, 5)
    number_cz=b.z
    cz= round(number_cz, 5)
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

start = False
middle = False
end = False
count=0

def gen(model):
    previous_time = 0
    mpDraw = mp.solutions.drawing_utils
    my_pose = mp.solutions.pose
    pose = my_pose.Pose(min_detection_confidence=0.1,
                        min_tracking_confidence=0.1)
    connections = list(my_pose.POSE_CONNECTIONS)

    cap = cv2.VideoCapture(0)
    prev_keypoints = None
   
    global count, start, middle, end
    start = False
    middle = False
    end = False
    count=0
    while True:
        success, img = cap.read()
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        result = pose.process(imgRGB)

        if result.pose_landmarks:
                # print(result.pose_landmarks)
                # if prev_keypoints is not None:
                #     for i, (prev_kp, kp) in enumerate(zip(prev_keypoints, result.pose_landmarks)):
                
                #         smoothed_kp_x = 0.6 * prev_kp[0] + 0.4 * kp[0]
                #         smoothed_kp_y = 0.6 * prev_kp[1] + 0.4 * kp[1]
                #         smoothed_kp_z = 0.6 * prev_kp[2] + 0.4 * kp[2]
                #         result.pose_landmarks[i] = [smoothed_kp_x, smoothed_kp_y, smoothed_kp_z]
                # prev_keypoints = result.pose_landmarks
                if prev_keypoints is not None:
                    result_pose_landmarks = list(result.pose_landmarks)  # Convert to list
                    for i, (prev_kp, kp) in enumerate(zip(prev_keypoints, result_pose_landmarks)):
                        smoothed_kp_x = 0.5 * prev_kp.x + 0.5 * kp.x
                        smoothed_kp_y = 0.5 * prev_kp.y + 0.5 * kp.y
                        smoothed_kp_z = 0.5 * prev_kp.z + 0.5 * kp.z
                        result_pose_landmarks[i].x = smoothed_kp_x
                        result_pose_landmarks[i].y = smoothed_kp_y
                        result_pose_landmarks[i].z = smoothed_kp_z
                    prev_keypoints = result_pose_landmarks
                mpDraw.draw_landmarks(img, result.pose_landmarks, connections)
              
                
                # print(result.pose_landmarks.landmark[11])
                # print(result.pose_landmarks.landmark[13])
                # print(result.pose_landmarks.landmark[15])
                if(model==1):
               
        
                    #bicep
                    # wrist,elbow, shoulder(left)
                    elbow_angles = calculate_joint_angle_mediapipe(result.pose_landmarks.landmark[11],result.pose_landmarks.landmark[13],result.pose_landmarks.landmark[15])
                    angle_text = str(round(elbow_angles, 1))
                    x = int(result.pose_landmarks.landmark[13].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[13].y * img.shape[0])
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                   
                    #hip shoulder, elbow(left)
                    shoulder_angles = calculate_joint_angle_mediapipe(result.pose_landmarks.landmark[23],result.pose_landmarks.landmark[11],result.pose_landmarks.landmark[13])
                    angle_text = str(round(shoulder_angles, 1))
             

                    x = int(result.pose_landmarks.landmark[11].x * img.shape[1]+20)
                    y = int(result.pose_landmarks.landmark[11].y * img.shape[0]+20)
                    
                    # if(angles<27 ):
                    #     cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2)  # for angle in angles:
                 
                    # else:
                    #     cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)  # for angle in angles:
                    #     print("wrong shoulder detected")

                    # Start position
                    if shoulder_angles <35  and elbow_angles > 160 and start==False:
                        start = True
                        print("Start flag done")  
                       


                    if shoulder_angles <35  and elbow_angles < 45 and start == True and middle == False:
                        middle = True 
                        print("MIddle flag done")


                    if shoulder_angles <35  and elbow_angles > 160 and start == True and middle == True and end== False:
                   
                        end = True
                        print("End flag done")
                        count = count + 1
                        start = False
                        middle = False
                        end = False
                        print(count)

                   
                    


                   
                    
                    










                elif(model==2):
                    #bicep for row 
                    # wrist,elbow, shoulder(left)
                    angles = calculate_joint_angle_mediapipe(result.pose_landmarks.landmark[11],result.pose_landmarks.landmark[13],result.pose_landmarks.landmark[15])
                    angle_text = str(round(angles, 1))
                    x = int(result.pose_landmarks.landmark[13].x * img.shape[1])
                    y = int(result.pose_landmarks.landmark[13].y * img.shape[0])
                    if(angles<80):
                        cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)  # for angle in angles:
                    else:
                        cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                    


                    #hip shoulder, elbow(left) for row
                    angles = calculate_joint_angle_mediapipe(result.pose_landmarks.landmark[23],result.pose_landmarks.landmark[11],result.pose_landmarks.landmark[13])
                    angle_text = str(round(angles, 1))
                    isFront = False
                    if (int(result.pose_landmarks.landmark[13].x*img.shape[1]) < int(result.pose_landmarks.landmark[23].x*img.shape[1])):
                        isFront = True
                    # print(isFront)
                    x = int(result.pose_landmarks.landmark[11].x * img.shape[1]+20)
                    y = int(result.pose_landmarks.landmark[11].y * img.shape[0]+20)
                    
                    if((angles<50 and angles>0 and isFront) or (angles<20 and angles>0 and not isFront)):
                        cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2)  # for angle in angles:
                    else:
                        cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)  # for angle in angles:
               




                #ear, shoulder, hip(left)
                angles = calculate_joint_angle_mediapipe(result.pose_landmarks.landmark[7],result.pose_landmarks.landmark[11],result.pose_landmarks.landmark[23])
                angle_text = str(round(angles, 1))
                x = int(result.pose_landmarks.landmark[11].x * img.shape[1])
                y = int(result.pose_landmarks.landmark[11].y * img.shape[0])
                if(angles>180 and angles<200):
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                else:
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)  # for angle in angles:

                #shoulder, hip, knee(left)
                angles = calculate_joint_angle_mediapipe(result.pose_landmarks.landmark[11],result.pose_landmarks.landmark[23],result.pose_landmarks.landmark[25])
                angle_text = str(round(angles, 1))
                x = int(result.pose_landmarks.landmark[23].x * img.shape[1])
                y = int(result.pose_landmarks.landmark[23].y * img.shape[0])
                if(angles>170 and angles<190):
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                else:
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)  # for angle in angles:

                #hip, knee, ankle(left)
                angles = calculate_joint_angle_mediapipe(result.pose_landmarks.landmark[23],result.pose_landmarks.landmark[25],result.pose_landmarks.landmark[27])
                angle_text = str(round(angles, 1))
                x = int(result.pose_landmarks.landmark[25].x * img.shape[1])
                y = int(result.pose_landmarks.landmark[25].y * img.shape[0])
                if(angles>=170 and angles<180):
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # for angle in angles:
                else:
                    cv2.putText(img, angle_text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)  # for angle in angles:



        current_time = time.time()
        fps = 1 / (current_time - previous_time)
        previous_time = current_time

        cv2.putText(img, str(int(fps)), (70, 50), cv2.FONT_HERSHEY_PLAIN, 3, (255, 0, 0), 3)
        # img = cv2.flip(img,1)
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
        'end': end
    }
    return jsonify(data)




@app.route('/video_feed_for_curl')
def video_feed_for_curl():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("curl is called ")
    return Response(gen(1),
                    mimetype='multipart/x-mixed-replace; boundary=frame')




@app.route('/video_feed_for_row')
def video_feed_for_row():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print("row is called ")
    return Response(gen(2),
                    mimetype='multipart/x-mixed-replace; boundary=frame')







if __name__ == "__main__":
    app.run(port=8000, debug=True)