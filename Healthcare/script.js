
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatContainer = document.getElementById('chatContainer'); // Reference to chat container
    const healthBtn = document.querySelector('.health-btn'); // Reference to button

    // Show chat container when button is clicked
    healthBtn.addEventListener('click', () => {
        chatContainer.style.display = 'block'; // Show the chat container
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    });

    // Symptom to remedy mapping
    const symptomRemedies = {
        "headache": {
            remedy: "Try resting in a quiet room and drinking plenty of water.",
            medicines: ["Ibuprofen", "Acetaminophen"]
        },
        "cough": {
            remedy: "Stay hydrated and consider using a humidifier.",
            medicines: ["Dextromethorphan", "Guaifenesin"]
        },
        "fever": {
            remedy: "Rest and stay hydrated. You can take a cool bath.",
            medicines: ["Acetaminophen", "Ibuprofen"]
        },
        "nausea": {
            remedy: "Try ginger tea or peppermint tea.",
            medicines: ["Ondansetron", "Meclizine"]
        },
        "sore throat": {
            remedy: "Gargle with warm salt water and stay hydrated.",
            medicines: ["Throat lozenges", "Acetaminophen"]
        },
        "stomach ache": {
            remedy: "Try eating bland foods and avoid spicy or fatty foods.",
            medicines: ["Pepto-Bismol", "Omeprazole"]
        },
        "cold": {
            remedy: "Rest, drink warm fluids, and consider using a saline nasal spray.",
            medicines: ["Pseudoephedrine", "Antihistamines"]
        },
        "back pain": {
            remedy: "Apply a hot or cold compress, and try gentle stretching.",
            medicines: ["Ibuprofen", "Muscle relaxants"]
        },
        "indigestion": {
            remedy: "Avoid heavy meals and try drinking ginger or chamomile tea.",
            medicines: ["Antacids", "Ranitidine"]
        },
        "allergy": {
            remedy: "Avoid allergens and consider over-the-counter antihistamines.",
            medicines: ["Loratadine", "Cetirizine"]
        },
        "toothache": {
            remedy: "Rinse with warm salt water, and apply a cold compress on your cheek.",
            medicines: ["Ibuprofen", "Acetaminophen"]
        },
        "muscle cramps": {
            remedy: "Stretch gently and stay hydrated. You can apply a heating pad.",
            medicines: ["Magnesium supplements", "Ibuprofen"]
        },
        "insomnia": {
            remedy: "Try relaxation techniques, limit screen time before bed, and consider a warm bath.",
            medicines: ["Melatonin", "Diphenhydramine"]
        },
        "constipation": {
            remedy: "Increase fiber intake and drink plenty of water.",
            medicines: ["Laxatives", "Stool softeners"]
        },
        "diarrhea": {
            remedy: "Stay hydrated, avoid dairy, and consider eating plain foods.",
            medicines: ["Loperamide", "Bismuth subsalicylate"]
        },
        "heartburn": {
            remedy: "Avoid spicy foods, don't lie down immediately after eating.",
            medicines: ["Antacids", "Ranitidine", "Omeprazole"]
        },
        "sinus congestion": {
            remedy: "Use steam inhalation or a saline nasal spray.",
            medicines: ["Pseudoephedrine", "Oxymetazoline"]
        },
        "dizziness": {
            remedy: "Sit or lie down until the feeling passes, and stay hydrated.",
            medicines: ["Meclizine"]
        },
        "itchy skin": {
            remedy: "Apply a cold compress and use moisturizing lotion.",
            medicines: ["Hydrocortisone cream", "Antihistamines"]
        },
        "fatigue": {
            remedy: "Ensure sufficient rest, balanced nutrition, and hydration.",
            medicines: ["Multivitamins", "B-complex vitamins"]
        },
        "anxiety": {
            remedy: "Practice deep breathing exercises and consider a short walk.",
            medicines: ["Diazepam", "Alprazolam"]
        },
        "eye strain": {
            remedy: "Take breaks from screens, adjust lighting, and practice the 20-20-20 rule.",
            medicines: ["Lubricating eye drops"]
        },
        "sunburn": {
            remedy: "Apply aloe vera gel and stay hydrated.",
            medicines: ["Ibuprofen", "Hydrocortisone cream"]
        },
        "acne": {
            remedy: "Wash your face with a gentle cleanser and avoid oily foods.",
            medicines: ["Benzoyl peroxide", "Salicylic acid"]
        },
        "joint pain": {
            remedy: "Rest, apply a cold or warm compress, and try gentle exercises.",
            medicines: ["Ibuprofen", "Naproxen"]
        },
        "migraine": {
            remedy: "Rest in a dark room, and consider using a cold compress on your forehead.",
            medicines: ["Sumatriptan", "Rizatriptan"]
        },
        // Add additional symptoms as needed
    };
    
    // Function to send a message
    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            // Display user message
            displayMessage(userMessage, 'user');
            userInput.value = ''; // Clear input field

            // Simulate bot response after a short delay
            setTimeout(() => {
                const botResponse = generateBotResponse(userMessage);
                displayMessage(botResponse, 'bot');
            }, 1000);
        }
    }

    // Function to display message in chat box
    function displayMessage(message, sender) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat-message');

        const messageContent = document.createElement('div');
        messageContent.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
        messageContent.innerHTML = `<div class="message-content">${message}</div>`;

        messageContainer.appendChild(messageContent);
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    // Function to generate bot responses based on user input
    function generateBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let response;

        // Check for symptoms in the user message
        for (const symptom in symptomRemedies) {
            if (lowerCaseMessage.includes(symptom)) {
                const remedy = symptomRemedies[symptom].remedy;
                const medicines = symptomRemedies[symptom].medicines.join(", ");
                response = `For ${symptom}, ${remedy} You can consider the following medicines: ${medicines}.`;
                return response;
            }
        }

        // Default responses for greetings and other queries
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            response = "Hello! How can I assist you today?";
        } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
            response = "You're welcome! If you have any other questions, feel free to ask.";
        } else {
            response = "I'm sorry, I didn't understand that. Can you please rephrase?";
        }

        return response; // Return the generated response
    }

    // Event listener for send button
    sendButton.addEventListener('click', sendMessage);

    // Event listener for pressing Enter key
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
function toggleChatbot() {
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "block"; // Show the chatbot
    } else {
        chatContainer.style.display = "none"; // Hide the chatbot
    }
}

document.getElementById("sendButton").addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value;
    if (userInput) {
        // Add the user message to the chat
        const chatBox = document.getElementById("chatBox");
        const userMessageDiv = document.createElement("div");
        userMessageDiv.className = "chat-message";
        userMessageDiv.innerHTML = `
            <div class="user-message">
                <img src="person-icon.png" alt="User" class="chat-icon">
                ${userInput}
            </div>
        `;
        chatBox.appendChild(userMessageDiv);

        // Clear input field
        document.getElementById("userInput").value = "";

        // You can add a function to generate the bot's response here
        // For now, just add a placeholder response
        const botResponseDiv = document.createElement("div");
        botResponseDiv.className = "chat-message";
        botResponseDiv.innerHTML = `
            <div class="bot-message">
                <img src="robot-icon.png" alt="Robot" class="chat-icon">
                I'm here to help you with your healthcare questions!
            </div>
        `;
        chatBox.appendChild(botResponseDiv);

        // Scroll to the bottom of chat
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
document.getElementById('scheduleAppointmentBtn').addEventListener('click', () => {
    document.getElementById('appointmentForm').style.display = 'block'; // Show the appointment form
});

document.getElementById('scheduleButton').addEventListener('click', () => {
    const patientName = document.getElementById('patientName').value;
    const doctorName = document.getElementById('doctorName').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    if (patientName && doctorName && appointmentDate && appointmentTime) {
        // Display a confirmation or save data
        alert(`Appointment scheduled with Dr. ${doctorName} on ${appointmentDate} at ${appointmentTime}`);
        
        // Hide the form
        document.getElementById('appointmentForm').style.display = 'none';

        // Optionally, store data or send it to a backend server
        // Example: storeAppointment(patientName, doctorName, appointmentDate, appointmentTime);
    } else {
        alert('Please fill in all fields.');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const appointmentButton = document.getElementById('appointmentButton');
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentTime = document.getElementById('appointmentTime');

    // Show appointment form
    appointmentButton.addEventListener('click', () => {
        appointmentForm.style.display = 'block';
    });

    // Send appointment data to backend
    async function scheduleAppointment() {
        const date = appointmentDate.value;
        const time = appointmentTime.value;

        const response = await fetch('https://your-backend-url.com/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time })
        });

        if (response.ok) {
            alert('Appointment scheduled successfully!');
        } else {
            alert('Failed to schedule appointment.');
        }
    }

    // Trigger schedule on form submission
    appointmentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        scheduleAppointment();
    });
});