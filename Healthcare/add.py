import random
import re
import secrets
import pandas as pd
import numpy as np
from flask import Flask, render_template, flash, redirect, url_for, session, request, jsonify

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from joblib import load

# Flask App Configuration


# User Database Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

# Helper Functions
def make_token():
    """Creates a cryptographically-secure, URL-safe string"""
    return secrets.token_urlsafe(16)

# Routes
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        uname = request.form.get("uname")
        passw = request.form.get("passw")
        user = User.query.filter_by(username=uname, password=passw).first()
        if user:
            session['user_id'] = user.id
            return redirect(url_for("index_auth"))
        else:
            flash("Invalid username or password")
    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        uname = request.form['uname']
        mail = request.form['mail']
        passw = request.form['passw']
        new_user = User(username=uname, email=mail, password=passw)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for("login"))
    return render_template("register.html")

# Disease Prediction Function
def predict_disease_from_symptom(symptom_list):
    try:
        # Load pre-trained model
        clf = load("path/to/random_forest.joblib")
        symptoms = {s: 0 for s in symptom_list}
        
        # Set symptoms based on input
        for symptom in symptom_list:
            if symptom in symptoms:
                symptoms[symptom] = 1
        
        # Create DataFrame for model prediction
        df_test = pd.DataFrame([symptoms])
        result = clf.predict(df_test)[0]
        return f"Disease: {result}"
    except Exception as e:
        print(f"Prediction error: {e}")
        return "Prediction failed. Please try again."

# Chat Message Route
@app.route('/ask', methods=['GET', 'POST'])
def chat_msg():
    user_message = request.args.get("message", "").lower()
    session_id = request.args.get("sessionId")

    # Chatbot Logic
    if user_message == "undefined":
        response = ["Welcome! Please enter your name to start."]
    else:
        response = handle_chatbot_response(user_message, session_id)

    return jsonify({'status': 'OK', 'answer': response})

# Running the Flask app
if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
