const fs = require('fs');
const path = require('path');

const translations = {
  en: {
    sidebar: {
      client: {
        dashboard: "Procurement Desk",
        bids: "Bid Evaluations",
        tenders: "Tenders & Blueprints",
        comparison: "Comparison Matrix",
        clarifications: "Clarification Hub",
        decisions: "Final Decisions",
        reports: "BI Analytics",
        audit: "Audit Trail"
      },
      admin: {
        dashboard: "System Overview",
        users: "User Governance",
        clients: "PSU & Ministry Buyers",
        organizations: "Organizations",
        tenders: "Tender Oversight",
        bids: "Bid Governance",
        connectors: "Govt. Gateways (12)",
        rules: "Compliance Rules",
        risk: "Risk Configuration",
        audit: "Master Audit Trail",
        reports: "Platform Reports",
        settings: "System Settings"
      },
      settings: "Settings & Preferences",
      logout: "Switch Role / Logout"
    },
    dashboard: {
      client: {
        createTender: "Create Tender"
      },
      admin: {
        diagnostics: "Diagnostics"
      }
    }
  },
  hi: {
    sidebar: {
      client: {
        dashboard: "खरीद डेस्क",
        bids: "बोली मूल्यांकन",
        tenders: "निविदाएं और ब्लूप्रिंट",
        comparison: "तुलना मैट्रिक्स",
        clarifications: "स्पष्टीकरण हब",
        decisions: "अंतिम निर्णय",
        reports: "बीआई एनालिटिक्स",
        audit: "ऑडिट ट्रेल"
      },
      admin: {
        dashboard: "सिस्टम अवलोकन",
        users: "उपयोगकर्ता प्रशासन",
        clients: "पीएसयू और मंत्रालय खरीदार",
        organizations: "संगठन",
        tenders: "निविदा निगरानी",
        bids: "बोली प्रशासन",
        connectors: "सरकारी गेटवे (12)",
        rules: "अनुपालन नियम",
        risk: "जोखिम विन्यास",
        audit: "मास्टर ऑडिट ट्रेल",
        reports: "प्लेटफॉर्म रिपोर्ट",
        settings: "सिस्टम सेटिंग्स"
      },
      settings: "सेटिंग्स और प्राथमिकताएं",
      logout: "भूमिका बदलें / लॉग आउट करें"
    },
    dashboard: {
      client: {
        createTender: "निविदा बनाएं"
      },
      admin: {
        diagnostics: "निदान"
      }
    }
  },
  ta: {
    sidebar: {
      client: {
        dashboard: "கொள்முதல் மேசை",
        bids: "ஏல மதிப்பீடுகள்",
        tenders: "ஒப்பந்தங்கள் மற்றும் வரைபடங்கள்",
        comparison: "ஒப்பீட்டு அணி",
        clarifications: "விளக்க மையம்",
        decisions: "இறுதி முடிவுகள்",
        reports: "பிஐ பகுப்பாய்வு",
        audit: "தணிக்கை பாதை"
      },
      admin: {
        dashboard: "கணினி மேலோட்டம்",
        users: "பயனர் நிர்வாகம்",
        clients: "பிஎஸ்யு மற்றும் அமைச்சக வாங்குவோர்",
        organizations: "நிறுவனங்கள்",
        tenders: "ஒப்பந்த கண்காணிப்பு",
        bids: "ஏல நிர்வாகம்",
        connectors: "அரசு நுழைவாயில்கள் (12)",
        rules: "இணக்க விதிகள்",
        risk: "ஆபத்து கட்டமைப்பு",
        audit: "முக்கிய தணிக்கை பாதை",
        reports: "தள அறிக்கைகள்",
        settings: "கணினி அமைப்புகள்"
      },
      settings: "அமைப்புகள் மற்றும் விருப்பத்தேர்வுகள்",
      logout: "பாத்திரத்தை மாற்று / வெளியேறு"
    },
    dashboard: {
      client: {
        createTender: "ஒப்பந்தம் உருவாக்கு"
      },
      admin: {
        diagnostics: "நோயறிதல்"
      }
    }
  },
  te: {
    sidebar: {
      client: {
        dashboard: "ప్రొక్యూర్‌మెంట్ డెస్క్",
        bids: "బిడ్ మూల్యాంకనాలు",
        tenders: "టెండర్లు & బ్లూప్రింట్లు",
        comparison: "పోలిక మ్యాట్రిక్స్",
        clarifications: "వివరణ హబ్",
        decisions: "తుది నిర్ణయాలు",
        reports: "బిఐ ఎనాలిటిక్స్",
        audit: "ఆడిట్ ట్రెయిల్"
      },
      admin: {
        dashboard: "సిస్టమ్ అవలోకనం",
        users: "వినియోగదారు పాలన",
        clients: "పిఎస్‌యు & మంత్రిత్వ శాఖ కొనుగోలుదారులు",
        organizations: "సంస్థలు",
        tenders: "టెండర్ పర్యవేక్షణ",
        bids: "బిడ్ పాలన",
        connectors: "ప్రభుత్వ గేట్‌వేలు (12)",
        rules: "సమ్మతి నియమాలు",
        risk: "రిస్క్ కాన్ఫిగరేషన్",
        audit: "మాస్టర్ ఆడిట్ ట్రెయిల్",
        reports: "ప్లాట్‌ఫారమ్ నివేదికలు",
        settings: "సిస్టమ్ సెట్టింగ్‌లు"
      },
      settings: "సెట్టింగ్‌లు & ప్రాధాన్యతలు",
      logout: "పాత్ర మార్చు / లాగ్ అవుట్"
    },
    dashboard: {
      client: {
        createTender: "టెండర్ సృష్టించు"
      },
      admin: {
        diagnostics: "డయాగ్నోస్టిక్స్"
      }
    }
  },
  kn: {
    sidebar: {
      client: {
        dashboard: "ಖರೀದಿ ಡೆಸ್ಕ್",
        bids: "ಬಿಡ್ ಮೌಲ್ಯಮಾಪನಗಳು",
        tenders: "ಟೆಂಡರ್‌ಗಳು ಮತ್ತು ಬ್ಲೂಪ್ರಿಂಟ್‌ಗಳು",
        comparison: "ಹೋಲಿಕೆ ಮ್ಯಾಟ್ರಿಕ್ಸ್",
        clarifications: "ಸ್ಪಷ್ಟೀಕರಣ ಹಬ್",
        decisions: "ಅಂತಿಮ ನಿರ್ಧಾರಗಳು",
        reports: "ಬಿಐ ಅನಾಲಿಟಿಕ್ಸ್",
        audit: "ಆಡಿಟ್ ಟ್ರೇಲ್"
      },
      admin: {
        dashboard: "ಸಿಸ್ಟಮ್ ಅವಲೋಕನ",
        users: "ಬಳಕೆದಾರ ಆಡಳಿತ",
        clients: "ಪಿಎಸ್‌ಯು ಮತ್ತು ಸಚಿವಾಲಯ ಖರೀದಿದಾರರು",
        organizations: "ಸಂಸ್ಥೆಗಳು",
        tenders: "ಟೆಂಡರ್ ಮೇಲ್ವಿಚಾರಣೆ",
        bids: "ಬಿಡ್ ಆಡಳಿತ",
        connectors: "ಸರ್ಕಾರಿ ಗೇಟ್‌ವೇಗಳು (12)",
        rules: "ಅನುಸರಣೆ ನಿಯಮಗಳು",
        risk: "ಅಪಾಯದ ಸಂರಚನೆ",
        audit: "ಮಾಸ್ಟರ್ ಆಡಿಟ್ ಟ್ರೇಲ್",
        reports: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ವರದಿಗಳು",
        settings: "ಸಿಸ್ಟಮ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು"
      },
      settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಮತ್ತು ಆದ್ಯತೆಗಳು",
      logout: "ಪಾತ್ರ ಬದಲಾಯಿಸಿ / ಲಾಗ್ ಔಟ್"
    },
    dashboard: {
      client: {
        createTender: "ಟೆಂಡರ್ ರಚಿಸಿ"
      },
      admin: {
        diagnostics: "ರೋಗನಿರ್ಣಯ"
      }
    }
  },
  ml: {
    sidebar: {
      client: {
        dashboard: "പ്രൊക്യുർമെൻ്റ് ഡെസ്ക്",
        bids: "ബിഡ് മൂല്യനിർണ്ണയങ്ങൾ",
        tenders: "ടെൻഡറുകളും ബ്ലൂപ്രിൻ്റുകളും",
        comparison: "താരതമ്യ മാട്രിക്സ്",
        clarifications: "വിശദീകരണ ഹബ്",
        decisions: "അന്തിമ തീരുമാനങ്ങൾ",
        reports: "ബിഐ അനലിറ്റിക്സ്",
        audit: "ഓഡിറ്റ് ട്രെയിൽ"
      },
      admin: {
        dashboard: "സിസ്റ്റം അവലോകനം",
        users: "ഉപയോക്തൃ ഭരണം",
        clients: "പിഎസ്‌യു & മന്ത്രാലയ വാങ്ങലുകാർ",
        organizations: "സ്ഥാപനങ്ങൾ",
        tenders: "ടെൻഡർ മേൽനോട്ടം",
        bids: "ബിഡ് ഭരണം",
        connectors: "സർക്കാർ ഗേറ്റ്‌വേകൾ (12)",
        rules: "പാലിക്കൽ നിയമങ്ങൾ",
        risk: "അപകടസാധ്യത കോൺഫിഗറേഷൻ",
        audit: "മാസ്റ്റർ ഓഡിറ്റ് ട്രെയിൽ",
        reports: "പ്ലാറ്റ്ഫോം റിപ്പോർട്ടുകൾ",
        settings: "സിസ്റ്റം ക്രമീകരണങ്ങൾ"
      },
      settings: "ക്രമീകരണങ്ങളും മുൻഗണനകളും",
      logout: "റോൾ മാറ്റുക / ലോഗ് ഔട്ട് ചെയ്യുക"
    },
    dashboard: {
      client: {
        createTender: "ടെൻഡർ സൃഷ്ടിക്കുക"
      },
      admin: {
        diagnostics: "ഡയഗ്നോസ്റ്റിക്സ്"
      }
    }
  },
  bn: {
    sidebar: {
      client: {
        dashboard: "ক্রয় ডেস্ক",
        bids: "বিড মূল্যায়ন",
        tenders: "দরপত্র এবং ব্লুপ্রিন্ট",
        comparison: "তুলনা ম্যাট্রিক্স",
        clarifications: "স্পষ্টীকরণ হাব",
        decisions: "চূড়ান্ত সিদ্ধান্ত",
        reports: "বিআই অ্যানালিটিক্স",
        audit: "অডিট ট্রেইল"
      },
      admin: {
        dashboard: "সিস্টেম ওভারভিউ",
        users: "ব্যবহারকারী প্রশাসন",
        clients: "পিএসইউ এবং মন্ত্রণালয় ক্রেতা",
        organizations: "সংস্থা",
        tenders: "দরপত্র তদারকি",
        bids: "বিড প্রশাসন",
        connectors: "সরকারি গেটওয়ে (১২)",
        rules: "সম্মতি নিয়ম",
        risk: "ঝুঁকি কনফিগারেশন",
        audit: "মাস্টার অডিট ট্রেইল",
        reports: "প্ল্যাটফর্ম রিপোর্ট",
        settings: "সিস্টেম সেটিংস"
      },
      settings: "সেটিংস এবং পছন্দসমূহ",
      logout: "ভূমিকা পরিবর্তন / লগ আউট"
    },
    dashboard: {
      client: {
        createTender: "দরপত্র তৈরি করুন"
      },
      admin: {
        diagnostics: "ডায়াগনস্টিকস"
      }
    }
  },
  mr: {
    sidebar: {
      client: {
        dashboard: "खरेदी डेस्क",
        bids: "बोली मूल्यांकन",
        tenders: "निविदा आणि ब्लूप्रिंट्स",
        comparison: "तुलना मॅट्रिक्स",
        clarifications: "स्पष्टीकरण हब",
        decisions: "अंतिम निर्णय",
        reports: "बीआय ॲनालिटिक्स",
        audit: "ऑडिट ट्रेल"
      },
      admin: {
        dashboard: "सिस्टम विहंगावलोकन",
        users: "वापरकर्ता प्रशासन",
        clients: "पीएसयू आणि मंत्रालय खरेदीदार",
        organizations: "संस्था",
        tenders: "निविदा देखरेख",
        bids: "बोली प्रशासन",
        connectors: "सरकारी गेटवे (12)",
        rules: "अनुपालन नियम",
        risk: "जोखीम कॉन्फिगरेशन",
        audit: "मास्टर ऑडिट ट्रेल",
        reports: "प्लॅटफॉर्म अहवाल",
        settings: "सिस्टम सेटिंग्ज"
      },
      settings: "सेटिंग्ज आणि प्राधान्ये",
      logout: "भूमिका बदला / लॉग आउट करा"
    },
    dashboard: {
      client: {
        createTender: "निविदा तयार करा"
      },
      admin: {
        diagnostics: "निदान"
      }
    }
  }
};

const localesDir = path.join(__dirname, 'src', 'locales');

Object.entries(translations).forEach(([lang, data]) => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Merge nested objects properly
    if (!fileData.sidebar) fileData.sidebar = {};
    if (!fileData.sidebar.client) fileData.sidebar.client = {};
    if (!fileData.sidebar.admin) fileData.sidebar.admin = {};
    
    if (!fileData.dashboard) fileData.dashboard = {};
    if (!fileData.dashboard.client) fileData.dashboard.client = {};
    if (!fileData.dashboard.admin) fileData.dashboard.admin = {};

    Object.assign(fileData.sidebar.client, data.sidebar.client);
    Object.assign(fileData.sidebar.admin, data.sidebar.admin);
    fileData.sidebar.settings = data.sidebar.settings;
    fileData.sidebar.logout = data.sidebar.logout;
    
    Object.assign(fileData.dashboard.client, data.dashboard.client);
    Object.assign(fileData.dashboard.admin, data.dashboard.admin);

    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});
