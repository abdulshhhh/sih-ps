import json
import os

translations = {
    "hi": {
        "sidebar": {
            "dashboard": "विक्रेता / बोलीदाता",
            "documentVault": "दस्तावेज़ वॉल्ट",
            "marketplace": "निविदा बाज़ार",
            "submissions": "मेरी प्रस्तुतियां",
            "clarifications": "स्पष्टीकरण",
            "profile": "कंपनी प्रोफाइल",
            "settings": "सेटिंग्स और प्राथमिकताएं",
            "logout": "भूमिका बदलें / लॉग आउट करें"
        },
        "dashboard": {
            "welcome": "स्वागत है, {companyName}",
            "subtitle": "यहाँ आपका खरीद अनुपालन स्वास्थ्य, सक्रिय प्रस्तुतियां, और निविदा अवसर हैं।",
            "browseTenders": "खुली निविदाएं ब्राउज़ करें",
            "complianceHealth": "अनुपालन स्वास्थ्य",
            "activeSubmissions": "सक्रिय प्रस्तुतियां",
            "actionRequired": "कार्रवाई आवश्यक",
            "marketplace": "बाज़ार",
            "findTenders": "निविदाएं खोजें",
            "browseRFPs": "खुले RFP ब्राउज़ करें",
            "recentSubmissions": "हाल की निविदा प्रस्तुतियां",
            "viewAll": "सभी प्रस्तुतियां देखें",
            "tenderTitle": "निविदा शीर्षक",
            "bidId": "बोली आईडी",
            "status": "स्थिति",
            "aiPreCheck": "AI प्री-चेक",
            "action": "कार्रवाई",
            "underEvaluation": "मूल्यांकन के अधीन",
            "evaluation": "मूल्यांकन",
            "clarification": "स्पष्टीकरण",
            "track": "प्रस्तुति ट्रैक करें",
            "respond": "जवाब दें",
            "uploadDoc": "दस्तावेज़ अपलोड करें"
        }
    },
    "ta": {
        "sidebar": {
            "dashboard": "விற்பனையாளர் / ஏலதாரர்",
            "documentVault": "ஆவண பெட்டகம்",
            "marketplace": "டெண்டர் சந்தை",
            "submissions": "எனது சமர்ப்பிப்புகள்",
            "clarifications": "விளக்கங்கள்",
            "profile": "நிறுவனத்தின் சுயவிவரம்",
            "settings": "அமைப்புகள் மற்றும் விருப்பத்தேர்வுகள்",
            "logout": "பங்கை மாற்றவும் / வெளியேறவும்"
        },
        "dashboard": {
            "welcome": "வரவேற்கிறோம், {companyName}",
            "subtitle": "உங்கள் கொள்முதல் இணக்க ஆரோக்கியம், செயலில் உள்ள சமர்ப்பிப்புகள் மற்றும் டெண்டர் வாய்ப்புகள் இங்கே உள்ளன.",
            "browseTenders": "திறந்த டெண்டர்களை உலாவுக",
            "complianceHealth": "இணக்க ஆரோக்கியம்",
            "activeSubmissions": "செயலில் உள்ள சமர்ப்பிப்புகள்",
            "actionRequired": "நடவடிக்கை தேவை",
            "marketplace": "சந்தை",
            "findTenders": "டெண்டர்களைக் கண்டறிக",
            "browseRFPs": "திறந்த RFP களை உலாவுக",
            "recentSubmissions": "சமீபத்திய டெண்டர் சமர்ப்பிப்புகள்",
            "viewAll": "அனைத்து சமர்ப்பிப்புகளையும் காண்க",
            "tenderTitle": "டெண்டர் தலைப்பு",
            "bidId": "ஏல ஐடி",
            "status": "நிலை",
            "aiPreCheck": "AI முன் சரிபார்ப்பு",
            "action": "செயல்",
            "underEvaluation": "மதிப்பீட்டில் உள்ளது",
            "evaluation": "மதிப்பீடு",
            "clarification": "விளக்கம்",
            "track": "சமர்ப்பிப்பைக் கண்காணிக்கவும்",
            "respond": "பதிலளி",
            "uploadDoc": "ஆவணத்தை பதிவேற்றவும்"
        }
    },
    "te": {
        "sidebar": {
            "dashboard": "విక్రేత / బిడ్డర్",
            "documentVault": "డాక్యుమెంట్ వాల్ట్",
            "marketplace": "టెండర్ మార్కెట్‌ప్లేస్",
            "submissions": "నా సమర్పణలు",
            "clarifications": "స్పష్టీకరణలు",
            "profile": "కంపెనీ ప్రొఫైల్",
            "settings": "సెట్టింగ్‌లు & ప్రాధాన్యతలు",
            "logout": "పాత్రను మార్చండి / లాగ్ అవుట్ చేయండి"
        },
        "dashboard": {
            "welcome": "స్వాగతం, {companyName}",
            "subtitle": "ఇక్కడ మీ సేకరణ సమ్మతి ఆరోగ్యం, క్రియాశీల సమర్పణలు మరియు టెండర్ అవకాశాలు ఉన్నాయి.",
            "browseTenders": "ఓపెన్ టెండర్లను బ్రౌజ్ చేయండి",
            "complianceHealth": "సమ్మతి ఆరోగ్యం",
            "activeSubmissions": "క్రియాశీల సమర్పణలు",
            "actionRequired": "చర్య అవసరం",
            "marketplace": "మార్కెట్‌ప్లేస్",
            "findTenders": "టెండర్లను కనుగొనండి",
            "browseRFPs": "ఓపెన్ RFPలను బ్రౌజ్ చేయండి",
            "recentSubmissions": "ఇటీవలి టెండర్ సమర్పణలు",
            "viewAll": "అన్ని సమర్పణలను వీక్షించండి",
            "tenderTitle": "టెండర్ శీర్షిక",
            "bidId": "బిడ్ ID",
            "status": "స్థితి",
            "aiPreCheck": "AI ప్రీ-చెక్",
            "action": "చర్య",
            "underEvaluation": "మూల్యాంకనంలో ఉంది",
            "evaluation": "మూల్యాంకనం",
            "clarification": "స్పష్టీకరణ",
            "track": "సమర్పణను ట్రాక్ చేయండి",
            "respond": "ప్రతిస్పందించండి",
            "uploadDoc": "డాక్యుమెంట్‌ను అప్‌లోడ్ చేయండి"
        }
    },
    "kn": {
        "sidebar": {
            "dashboard": "ಮಾರಾಟಗಾರ / ಬಿಡ್ದಾರ",
            "documentVault": "ಡಾಕ್ಯುಮೆಂಟ್ ವಾಲ್ಟ್",
            "marketplace": "ಟೆಂಡರ್ ಮಾರುಕಟ್ಟೆ",
            "submissions": "ನನ್ನ ಸಲ್ಲಿಕೆಗಳು",
            "clarifications": "ಸ್ಪಷ್ಟೀಕರಣಗಳು",
            "profile": "ಕಂಪನಿ ಪ್ರೊಫೈಲ್",
            "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಮತ್ತು ಆದ್ಯತೆಗಳು",
            "logout": "ಪಾತ್ರ ಬದಲಾಯಿಸಿ / ಲಾಗ್ ಔಟ್"
        },
        "dashboard": {
            "welcome": "ಸ್ವಾಗತ, {companyName}",
            "subtitle": "ನಿಮ್ಮ ಸಂಗ್ರಹಣೆ ಅನುಸರಣೆ ಆರೋಗ್ಯ, ಸಕ್ರಿಯ ಸಲ್ಲಿಕೆಗಳು ಮತ್ತು ಟೆಂಡರ್ ಅವಕಾಶಗಳು ಇಲ್ಲಿವೆ.",
            "browseTenders": "ಮುಕ್ತ ಟೆಂಡರ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
            "complianceHealth": "ಅನುಸರಣೆ ಆರೋಗ್ಯ",
            "activeSubmissions": "ಸಕ್ರಿಯ ಸಲ್ಲಿಕೆಗಳು",
            "actionRequired": "ಕ್ರಮದ ಅಗತ್ಯವಿದೆ",
            "marketplace": "ಮಾರುಕಟ್ಟೆ",
            "findTenders": "ಟೆಂಡರ್‌ಗಳನ್ನು ಹುಡುಕಿ",
            "browseRFPs": "ಮುಕ್ತ RFP ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
            "recentSubmissions": "ಇತ್ತೀಚಿನ ಟೆಂಡರ್ ಸಲ್ಲಿಕೆಗಳು",
            "viewAll": "ಎಲ್ಲಾ ಸಲ್ಲಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
            "tenderTitle": "ಟೆಂಡರ್ ಶೀರ್ಷಿಕೆ",
            "bidId": "ಬಿಡ್ ಐಡಿ",
            "status": "ಸ್ಥಿತಿ",
            "aiPreCheck": "AI ಪೂರ್ವ-ಪರಿಶೀಲನೆ",
            "action": "ಕ್ರಮ",
            "underEvaluation": "ಮೌಲ್ಯಮಾಪನದಲ್ಲಿದೆ",
            "evaluation": "ಮೌಲ್ಯಮಾಪನ",
            "clarification": "ಸ್ಪಷ್ಟೀಕರಣ",
            "track": "ಸಲ್ಲಿಕೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
            "respond": "ಪ್ರತಿಕ್ರಿಯಿಸಿ",
            "uploadDoc": "ಡಾಕ್ಯುಮೆಂಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
        }
    },
    "ml": {
        "sidebar": {
            "dashboard": "വില്പനക്കാരൻ / ലേലക്കാരൻ",
            "documentVault": "പ്രമാണ നിലവറ",
            "marketplace": "ടെൻഡർ വിപണി",
            "submissions": "എന്റെ സമർപ്പണങ്ങൾ",
            "clarifications": "വിശദീകരണങ്ങൾ",
            "profile": "കമ്പനി പ്രൊഫൈൽ",
            "settings": "ക്രമീകരണങ്ങളും മുൻഗണനകളും",
            "logout": "റോൾ മാറ്റുക / ലോഗ് ഔട്ട് ചെയ്യുക"
        },
        "dashboard": {
            "welcome": "സ്വാഗതം, {companyName}",
            "subtitle": "നിങ്ങളുടെ സംഭരണ പാലിക്കൽ ആരോഗ്യം, സജീവ സമർപ്പണങ്ങൾ, ടെൻഡർ അവസരങ്ങൾ എന്നിവ ഇതാ.",
            "browseTenders": "ഓപ്പൺ ടെൻഡറുകൾ ബ്രൗസ് ചെയ്യുക",
            "complianceHealth": "പാലിക്കൽ ആരോഗ്യം",
            "activeSubmissions": "സജീവ സമർപ്പണങ്ങൾ",
            "actionRequired": "നടപടി ആവശ്യമാണ്",
            "marketplace": "വിപണി",
            "findTenders": "ടെൻഡറുകൾ കണ്ടെത്തുക",
            "browseRFPs": "ഓപ്പൺ RFP-കൾ ബ്രൗസ് ചെയ്യുക",
            "recentSubmissions": "സമീപകാല ടെൻഡർ സമർപ്പണങ്ങൾ",
            "viewAll": "എല്ലാ സമർപ്പണങ്ങളും കാണുക",
            "tenderTitle": "ടെൻഡർ ശീർഷകം",
            "bidId": "ലേല ID",
            "status": "നില",
            "aiPreCheck": "AI പ്രീ-ചെക്ക്",
            "action": "നടപടി",
            "underEvaluation": "വിലയിരുത്തലിലാണ്",
            "evaluation": "വിലയിരുത്തൽ",
            "clarification": "വിശദീകരണം",
            "track": "സമർപ്പണം ട്രാക്ക് ചെയ്യുക",
            "respond": "മറുപടി നൽകുക",
            "uploadDoc": "രേഖ അപ്‌ലോഡ് ചെയ്യുക"
        }
    },
    "bn": {
        "sidebar": {
            "dashboard": "বিক্রেতা / দরদাতা",
            "documentVault": "ডকুমেন্ট ভল্ট",
            "marketplace": "দরপত্র মার্কেটপ্লেস",
            "submissions": "আমার জমাদানসমূহ",
            "clarifications": "স্পষ্টীকরণ",
            "profile": "কোম্পানির প্রোফাইল",
            "settings": "সেটিংস এবং পছন্দসমূহ",
            "logout": "ভূমিকা পরিবর্তন করুন / লগ আউট"
        },
        "dashboard": {
            "welcome": "স্বাগতম, {companyName}",
            "subtitle": "এখানে আপনার প্রকিউরমেন্ট কমপ্লায়েন্স স্বাস্থ্য, সক্রিয় জমাদান এবং দরপত্রের সুযোগ রয়েছে।",
            "browseTenders": "উন্মুক্ত দরপত্র ব্রাউজ করুন",
            "complianceHealth": "কমপ্লায়েন্স স্বাস্থ্য",
            "activeSubmissions": "সক্রিয় জমাদান",
            "actionRequired": "পদক্ষেপ প্রয়োজন",
            "marketplace": "মার্কেটপ্লেস",
            "findTenders": "দরপত্র খুঁজুন",
            "browseRFPs": "উন্মুক্ত RFP ব্রাউজ করুন",
            "recentSubmissions": "সাম্প্রতিক দরপত্র জমাদান",
            "viewAll": "সব জমাদান দেখুন",
            "tenderTitle": "দরপত্রের শিরোনাম",
            "bidId": "বিড আইডি",
            "status": "স্ট্যাটাস",
            "aiPreCheck": "AI প্রি-চেক",
            "action": "পদক্ষেপ",
            "underEvaluation": "মূল্যায়নাধীন",
            "evaluation": "মূল্যায়ন",
            "clarification": "স্পষ্টীকরণ",
            "track": "জমাদান ট্র্যাক করুন",
            "respond": "উত্তর দিন",
            "uploadDoc": "ডকুমেন্ট আপলোড করুন"
        }
    },
    "mr": {
        "sidebar": {
            "dashboard": "विक्रेता / बोलीदार",
            "documentVault": "दस्तऐवज तिजोरी",
            "marketplace": "निविदा बाजारपेठ",
            "submissions": "माझे सबमिशन",
            "clarifications": "स्पष्टीकरण",
            "profile": "कंपनी प्रोफाइल",
            "settings": "सेटिंग्ज आणि प्राधान्ये",
            "logout": "भूमिका बदला / लॉग आउट करा"
        },
        "dashboard": {
            "welcome": "स्वागत आहे, {companyName}",
            "subtitle": "येथे आपले खरेदी अनुपालन आरोग्य, सक्रिय सबमिशन आणि निविदा संधी आहेत.",
            "browseTenders": "खुल्या निविदा ब्राउझ करा",
            "complianceHealth": "अनुपालन आरोग्य",
            "activeSubmissions": "सक्रिय सबमिशन",
            "actionRequired": "कृती आवश्यक",
            "marketplace": "बाजारपेठ",
            "findTenders": "निविदा शोधा",
            "browseRFPs": "खुल्या RFP ब्राउझ करा",
            "recentSubmissions": "अलीकडील निविदा सबमिशन",
            "viewAll": "सर्व सबमिशन पहा",
            "tenderTitle": "निविदा शीर्षक",
            "bidId": "बोली आयडी",
            "status": "स्थिती",
            "aiPreCheck": "AI प्री-चेक",
            "action": "कृती",
            "underEvaluation": "मूल्यांकनांतर्गत",
            "evaluation": "मूल्यांकन",
            "clarification": "स्पष्टीकरण",
            "track": "सबमिशन ट्रॅक करा",
            "respond": "प्रतिसाद द्या",
            "uploadDoc": "दस्तऐवज अपलोड करा"
        }
    }
}

target_dir = r"c:\Users\sadha\Downloads\bidshield-ai-platform-complete (1)\src\locales"
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

for lang, data in translations.items():
    with open(os.path.join(target_dir, f"{lang}.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Translations written.")
