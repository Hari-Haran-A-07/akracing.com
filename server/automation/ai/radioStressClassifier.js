/**
 * Ajith Kumar Racing - Driver Voice Acoustic Stress Classifier
 */
export class RadioStressClassifier {
    classifyTranscript(messageText, speechRateWpm, voicePitchHz) {
        const urgentKeywords = ['traffic', 'puncture', 'box', 'vibration', 'overheating', 'lost power'];
        const matched = urgentKeywords.filter(k => messageText.toLowerCase().includes(k));

        const isElevatedPitch = voicePitchHz > 195; // Hz
        const isRapidSpeech = speechRateWpm > 175; // WPM

        let stressLevel = 'CALM';
        if (matched.length > 0 || (isElevatedPitch && isRapidSpeech)) {
            stressLevel = matched.length > 1 ? 'HIGH_ALERT' : 'MODERATE_TENSION';
        }

        return {
            messageText,
            matchedKeywords: matched,
            speechRateWpm,
            voicePitchHz,
            stressLevel,
            priorityRadioChannel: stressLevel === 'HIGH_ALERT'
        };
    }
}
