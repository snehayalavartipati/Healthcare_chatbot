from flask import Flask, render_template, request, jsonify
import spacy
import random

# Load spaCy model for NLP
nlp = spacy.load("en_core_web_sm")

# Initialize Flask app
app = Flask(__name__)

# Dummy symptom remedies
symptomRemedies = {
    "headache": {"remedy": "Rest in a dark, quiet room and hydrate.", "medicines": ["Ibuprofen", "Aspirin"]},
    "fever": {"remedy": "Stay hydrated and rest.", "medicines": ["Paracetamol", "Ibuprofen"]},
    "cough": {"remedy": "Drink warm fluids and use a humidifier.", "medicines": ["Cough syrup", "Honey"]},
}

# Dummy diagnosis model
def diagnose(symptoms):
    if "headache" in symptoms:
        return "Migraine or Tension headache"
    elif "fever" in symptoms:
        return "Flu or Viral Infection"
    else:
        return "Consult a doctor for further diagnosis"

# Render the HTML template for the homepage
@app.route('/')
def home():
    return render_template('index.html')  # Renders the HTML file

# Symptom Checker API
@app.route('/check-symptoms', methods=['POST'])
def check_symptoms():
    data = request.get_json()
    user_input = data.get('symptoms', '')

    # NLP processing to extract symptoms
    doc = nlp(user_input)
    recognized_symptoms = []
    for token in doc:
        if token.text.lower() in symptomRemedies:
            recognized_symptoms.append(token.text.lower())
    
    if not recognized_symptoms:
        return jsonify({"message": "No symptoms recognized. Please provide more details."}), 400
    
    # Get diagnosis prediction
    diagnosis = diagnose(recognized_symptoms)
    
    # Provide remedies for recognized symptoms
    remedies = []
    for symptom in recognized_symptoms:
        remedy = symptomRemedies.get(symptom, {})
        remedies.append({
            "symptom": symptom,
            "remedy": remedy.get("remedy", "No specific remedy available"),
            "medicines": remedy.get("medicines", [])
        })
    
    response = {
        "diagnosis": diagnosis,
        "remedies": remedies
    }
    
    return jsonify(response)

# Appointment Scheduling API
@app.route('/schedule-appointment', methods=['POST'])
def schedule_appointment():
    data = request.get_json()
    name = data.get('name')
    symptoms = data.get('symptoms', '')
    appointment_time = data.get('appointment_time')
    
    if not name or not symptoms or not appointment_time:
        return jsonify({"message": "Missing required fields."}), 400
    
    # Simulate appointment scheduling
    appointment_id = random.randint(1000, 9999)
    response = {
        "message": f"Appointment scheduled successfully for {name} at {appointment_time}.",
        "appointment_id": appointment_id
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
