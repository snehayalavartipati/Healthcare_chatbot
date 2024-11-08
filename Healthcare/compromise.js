
function analyzeMessage(message) {
    // Check for entities like symptoms
    let doc = nlp(message);
    let symptoms = doc.match('#Noun').out('array');  // Grabs nouns like 'headache'
    return symptoms.length ? symptoms[0] : null;
}
function generateBotResponse(message) {
    const symptom = analyzeMessage(message);
    if (symptom && symptomRemedies[symptom]) {
        return `For ${symptom}, try this remedy: ${symptomRemedies[symptom].remedy}. Consider these medicines: ${symptomRemedies[symptom].medicines.join(', ')}`;
    } else {
        return "I'm sorry, I couldn't understand. Could you describe your symptoms again?";
    }
}
