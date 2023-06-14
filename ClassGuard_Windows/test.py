import tensorflow as tf
import cv2
import numpy as np

# Load the video
cap = cv2.VideoCapture(0)
 
# cap = cv2.VideoCapture("videos/nonv.mp4")

# Load the trained model
model = tf.keras.models.load_model('model/modelnew.h5')

# Loop through the video frames
while(cap.isOpened()):
    ret, frame = cap.read()

    if ret == True:
        # Preprocess the frame
        frame1= frame
        frame = cv2.resize(frame, (128, 128))
        frame = frame / 255.0
        frame = tf.expand_dims(frame, axis=0)

        # Predict the label
        prediction = model.predict(frame)

        # Get the label with the highest probability
        print(prediction)

        # Draw the label on the frame
        if(prediction > 0.5):
            cv2.putText(frame1, "Phat hien bao luc", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        else:
            cv2.putText(frame1, "Khong phat hien bao luc", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Display the frame
        cv2.imshow("Test", frame1)
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    else:
        break

# Release the video capture and close all windows
cap.release()
cv2.destroyAllWindows()