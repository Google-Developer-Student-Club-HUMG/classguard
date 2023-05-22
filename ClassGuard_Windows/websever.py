import cv2
import flask

# Create a Flask app
app = flask.Flask(__name__)

# Get the camera
camera = cv2.VideoCapture(0)

# Define a route to stream the camera feed
@app.route("/")
def stream():
    # Read a frame from the camera
    ret, frame = camera.read()

    # Convert the frame to a JPEG image
    jpeg_image = cv2.imencode(".jpg", frame)[1]

    # Return the image as a response
    return flask.send_file(jpeg_image, mimetype="image/jpeg")

# Start the web server
app.run(host="0.0.0.0", port=8080)