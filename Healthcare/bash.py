from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import nltk

# Initialize Flask app
app = Flask(__name__)

# Sample data for illnesses, symptoms, remedies, and appointments
symptom_data = {
    'fever': ['flu', 'cold', 'infection'],
    'cough': ['flu', 'cold'],
    'headache': ['migraine', 'flu'],
    'fatigue': ['anemia', 'flu', 'cold']
}

remedy_data = {
    'flu': 'Rest, fluids, over-the-counter medication',
    'cold': 'Drink warm fluids, rest, take vitamin C',
    'infection': 'Consult a doctor for antibiotics',
    'migraine': 'Pain relievers, relaxation, avoid triggers',
    'anemia': 'Iron supplements, diet change, see a doctor'
}

appointments = []

# Training a basic Decision Tree Model to simulate diagnosis
df = pd.DataFrame({
    'fever': [1, 1, 0, 0],
    'cough': [1, 1, 1, 0],
    'headache': [0, 0, 1, 1],
    'fatigue': [1, 0, 0, 1],
    'illness': ['flu', 'cold', 'migraine', 'anemia']
})

X = df[['fever', 'cough', 'headache', 'fatigue']]
y = df['illness']

# Train the decision tree classifier
model = DecisionTreeClassifier()
model.fit(X, y)

# NLP function for symptom extraction
def extract_symptoms(user_input):
    tokens = nltk.word_tokenize(user_input.lower())
    symptoms = [symptom for symptom in symptom_data if symptom in tokens]
    return symptoms

# Diagnosis based on extracted symptoms
def diagnose(symptoms):
    symptom_vector = [1 if symptom in symptoms else 0 for symptom in ['fever', 'cough', 'headache', 'fatigue']]
    illness_prediction = model.predict([symptom_vector])
    return illness_prediction[0]

# API Endpoints

@app.route('/diagnose', methods=['POST'])
def diagnose_illness():
    user_input = request.json['input']
    symptoms = extract_symptoms(user_input)
    
    if not symptoms:
        return jsonify({"message": "No symptoms recognized, please try again with different symptoms."})
    
    illness = diagnose(symptoms)
    remedy = remedy_data.get(illness, "Please consult a doctor for further advice.")
    
    return jsonify({
        'symptoms': symptoms,
        'diagnosis': illness,
        'remedy': remedy
    })

@app.route('/schedule_appointment', methods=['POST'])
def schedule_appointment():
    name = request.json['name']
    time = request.json['time']
    doctor = request.json['doctor']
    
    appointments.append({'name': name, 'time': time, 'doctor': doctor})
    
    return jsonify({"message": f"Appointment scheduled for {name} with Dr. {doctor} at {time}."})

@app.route('/appointments', methods=['GET'])
def get_appointments():
    return jsonify({"appointments": appointments})

# Main function to run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

