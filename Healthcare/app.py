# Knowledge Base of Common Illnesses
class HealthKnowledgeBase:
    def __init__(self):
        # Dictionary to store illnesses, remedies, and medications
        self.illnesses = {
            "cold": {
                "symptoms": ["runny nose", "sore throat", "cough"],
                "remedies": [
                    "Drink warm fluids",
                    "Rest and stay hydrated",
                    "Inhale steam"
                ],
                "medications": [
                    "Paracetamol for fever",
                    "Cough syrup"
                ],
                "advice": "If symptoms persist for more than a week, consult a doctor."
            },
            "fever": {
                "symptoms": ["high temperature", "chills", "sweating"],
                "remedies": [
                    "Stay hydrated",
                    "Rest as much as possible",
                    "Use a cool cloth on the forehead"
                ],
                "medications": [
                    "Paracetamol or ibuprofen to reduce fever"
                ],
                "advice": "Seek medical help if fever exceeds 102°F or lasts more than three days."
            },
            "headache": {
                "symptoms": ["pain in head", "sensitivity to light"],
                "remedies": [
                    "Rest in a dark, quiet room",
                    "Drink plenty of water",
                    "Apply a cool compress on the forehead"
                ],
                "medications": [
                    "Ibuprofen or acetaminophen for pain relief"
                ],
                "advice": "Persistent headaches should be discussed with a healthcare provider."
            },
            "indigestion": {
                "symptoms": ["bloating", "nausea", "heartburn"],
                "remedies": [
                    "Avoid spicy and fatty foods",
                    "Eat small, frequent meals",
                    "Drink ginger or peppermint tea"
                ],
                "medications": [
                    "Antacids like Tums or Rolaids"
                ],
                "advice": "If indigestion persists or is accompanied by severe pain, consult a doctor."
            }
        }

    def get_illness_info(self, illness):
        """Fetch information about an illness."""
        return self.illnesses.get(illness.lower(), "Illness not found in the knowledge base.")

    def list_illnesses(self):
        """List all known illnesses."""
        return list(self.illnesses.keys())


# Appointment Scheduling
def schedule_appointment():
    """Collects details to schedule a doctor appointment."""
    print("Let's set up your doctor appointment.")
    name = input("Enter your name: ")
    contact = input("Enter your contact number: ")
    preferred_date = input("Enter preferred date for the appointment (DD-MM-YYYY): ")
    symptoms = input("Briefly describe your symptoms: ")

    # Confirming the appointment details
    appointment_details = {
        "name": name,
        "contact": contact,
        "preferred_date": preferred_date,
        "symptoms": symptoms
    }
    print("Appointment scheduled successfully with the following details:")
    for key, value in appointment_details.items():
        print(f"{key.capitalize()}: {value}")

    return appointment_details


# Testing the Knowledge Base and Appointment Scheduling
health_kb = HealthKnowledgeBase()

# Fetch illness information
illness = "cold"
illness_info = health_kb.get_illness_info(illness)
print(f"Information on {illness.capitalize()}: {illness_info}")

# List all illnesses
print("\nKnown illnesses:", health_kb.list_illnesses())

# Schedule an appointment
appointment_details = schedule_appointment()
