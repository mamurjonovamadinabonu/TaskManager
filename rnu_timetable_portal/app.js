const CURRENT_VERSION = "rnu_v19";
if (localStorage.getItem('rn_version') !== CURRENT_VERSION) {
    localStorage.clear();
    localStorage.setItem('rn_version', CURRENT_VERSION);
}

const groupsData = {
    "IT": {
        "1": ["Information Systems A (4251 A)", "Information Systems B (4251 B)"],
        "2": ["Information Systems"],
        "3": ["Information Systems (3rd Year)"],
        "4": ["Group IT (4th Year)"]
    },
    "Business": {
        "1": [
            "Business Administration ENG (3160F) / Tourism ENG (5160F)",
            "Business Administration (3161 A, B) / Tourism (5161)"
        ],
        "2": ["Business Administration (3151 A, B, C) / Tourism (5151)", "Business Administration (3150 F) / Tourism (5050 F)"],
        "3": ["Business Administration (3131)"],
        "4": ["Business Administration (4th Year)"]
    },
    "Tourism": {
        "3": ["Tourism-31"],
        "4": ["Tourism-41"]
    }
};

let teachersList = JSON.parse(localStorage.getItem('rn_teachers')) || [
    { name: "M. Umarov", slots: 20 },
    { name: "J. Khodijimatov", slots: 20 },
    { name: "G. Tillaboeva", slots: 20 },
    { name: "B. Khoshimov", slots: 20 },
    { name: "V. Obukhov", slots: 20 },
    { name: "A. Bondarenko", slots: 20 },
    { name: "Kh. Sadirova", slots: 20 },
    { name: "G. Akramova", slots: 20 },
    { name: "J. Rozikov", slots: 20 },
    { name: "E. Khamidov", slots: 20 },
    { name: "E. Kodirov", slots: 20 },
    { name: "O. Rakhmanova", slots: 20 },
    { name: "N. Matkholikova", slots: 20 },
    { name: "R. Tukhtasinov", slots: 20 },
    { name: "M. Khudoykulova", slots: 20 },
    { name: "M. Gaevskaya", slots: 20 },
    { name: "Kh. Isroilov", slots: 20 },
    { name: "S. Paramonov", slots: 20 },
    { name: "Z. Oborenko", slots: 20 },
    { name: "M. Storozhuka", slots: 20 },
    { name: "V. Shcherbak", slots: 20 },
    { name: "J. Kojuhina", slots: 20 },
    { name: "M. Pochchoev", slots: 20 },
    { name: "S. Ismoilova", slots: 20 },
    { name: "Z. Abdurakhimova", slots: 20 },
    { name: "D. Ismoilov", slots: 20 },
    { name: "K. Kurpayanidi", slots: 20 },
    { name: "Kh. Abduraxmonov", slots: 20 },
    { name: "M. Isakova", slots: 20 },
    { name: "Sh. Abdusattorova", slots: 20 },
    { name: "D. Teshabayev", slots: 20 },
    { name: "P. Ismailova", slots: 20 },
    { name: "M. Aloydinov", slots: 20 },
    { name: "D. Mirzakarimova", slots: 20 },
    { name: "G. Tashmatova", slots: 20 },
    { name: "D. Usmanova", slots: 20 },
    { name: "A. Komilov", slots: 20 },
    { name: "N. Olimova", slots: 20 },
    { name: "S. Ataxanov", slots: 20 }
];

let subjectsList = JSON.parse(localStorage.getItem('rn_subjects')) || [
    "Religious studies",
    "Java Development Fundamentals",
    "Mathematical and Numeral Methods",
    "System and Object-Oriented Programming",
    "Computer Networks Architecture and Operating Systems",
    "AI Systems Engineering",
    "Information Protection, Reliability and Cryptography",
    "Basics of Electronics and Radio Communication"
];

let facultySubjects = JSON.parse(localStorage.getItem('rn_faculty_subjects')) || {
    "IT": {
        "1": [
            "Internet and Web Basics",
            "API Foundation",
            "Introduction to Programming Using Python",
            "The Modern History of Uzbekistan",
            "Philosophy, World Culture and Ethics",
            "Mathematics",
            "Business English (IELTS group)",
            "Physics",
            "\"Future Hour\" educational and awareness session",
            "C++",
            "Business English"
        ],
        "2": ["Religious studies", "Java Development Fundamentals", "Mathematical and Numeral Methods", "System and Object-Oriented Programming", "Computer Networks Architecture and Operating Systems"],
        "3": [
            "Mathematical Modelling",
            "Optimization Theory and Scientific Forecasting",
            "System Theory and System Analysis",
            "Physics",
            "Basics of Electronics and Radio Communication",
            "Cloud and IoT"
        ],
        "4": ["AI Systems Engineering", "Information Protection, Reliability and Cryptography", "Basics of Electronics and Radio Communication", "Cloud Computing", "Diploma Project"]
    },
    "Business": {
        "1": ["Business Mathematics", "Introduction to Business", "Business English 1", "Principles of Economics", "Religious studies"],
        "2": ["Microeconomics & Macroeconomics", "Financial Accounting", "Business English 2", "Management and Leadership", "Business Law"],
        "3": ["Corporate Finance", "Marketing Management", "Human Resource Management", "Operations Management", "Business Ethics"],
        "4": ["Strategic Management", "International Business", "Investment Analysis", "Entrepreneurship", "Business Research Methods"]
    },
    "Tourism": {
        "1": ["Introduction to Tourism", "Geography of Tourism", "Hospitality Basics", "English for Tourism", "Religious studies"],
        "2": ["Tourism & Hospitality Management", "Hotel Management", "Tourism Marketing", "Cultural Heritage Tourism", "Service Quality Management"],
        "3": ["Tour Operations", "Airline and Transport Management", "Event Management", "Sustainable Tourism", "Financial Management in Tourism"],
        "4": ["Strategic Tourism Planning", "Destination Management", "International Tourism Policy", "Tourism Research", "Diploma Thesis"]
    }
};

function getGroupFaculty(groupName) {
    for(let fac in groupsData) {
        for(let course in groupsData[fac]) {
            if(groupsData[fac][course].includes(groupName)) {
                return fac;
            }
        }
    }
    return "IT";
}

function getGroupCourse(groupName) {
    for(let fac in groupsData) {
        for(let course in groupsData[fac]) {
            if(groupsData[fac][course].includes(groupName)) {
                return course;
            }
        }
    }
    return "4";
}

function getSubjectsForGroup(groupName) {
    try {
        const fac = getGroupFaculty(groupName);
        const course = getGroupCourse(groupName);
        if (facultySubjects && typeof facultySubjects === 'object') {
            if (facultySubjects[fac] && typeof facultySubjects[fac] === 'object' && facultySubjects[fac][course]) {
                return facultySubjects[fac][course];
            }
            if (Array.isArray(facultySubjects[fac])) {
                return facultySubjects[fac];
            }
        }
        return ["Religious studies", "Java Development Fundamentals", "Mathematical and Numeral Methods"];
    } catch(e) {
        return ["Religious studies", "Java Development Fundamentals"];
    }
}

let roomsList = JSON.parse(localStorage.getItem('rn_rooms')) || [
    { number: "208", capacity: 40, type: "Regular" },
    { number: "205", capacity: 40, type: "Regular" },
    { number: "207", capacity: 40, type: "Regular" },
    { number: "108", capacity: 40, type: "Regular" },
    { number: "110", capacity: 40, type: "Regular" },
    { number: "111", capacity: 40, type: "Regular" },
    { number: "206", capacity: 40, type: "Regular" },
    { number: "107", capacity: 30, type: "Regular" },
    { number: "102", capacity: 30, type: "Regular" },
    { number: "101", capacity: 30, type: "Regular" },
    { number: "202", capacity: 50, type: "Regular" },
    { number: "305", capacity: 40, type: "Regular" },
    { number: "Lab-1", capacity: 25, type: "Computer Lab" },
    { number: "Hall-1", capacity: 120, type: "Lecture Hall" }
];

let holidaysList = JSON.parse(localStorage.getItem('rn_holidays')) || [];

let defaultStudentCounts = {
    "Group IT (4th Year)": 4,
    "Information Systems A (4251 A)": 19,
    "Information Systems B (4251 B)": 18,
    "Information Systems": 22,
    "Information Systems (3rd Year)": 4,
    "Business Administration ENG (3160F) / Tourism ENG (5160F)": 96,
    "Business Administration (3161 A, B) / Tourism (5161)": 100,
    "Business Administration (3151 A, B, C) / Tourism (5151)": 94,
    "Business Administration (3150 F) / Tourism (5050 F)": 64,
    "Business Administration / Tourism": 16,
    "Business Administration (3131)": 23,
    "Tourism-31": 25,
    "Tourism-41": 25
};

let groupStudentCounts = JSON.parse(localStorage.getItem('rn_group_counts')) || {};
for (let k in defaultStudentCounts) {
    groupStudentCounts[k] = defaultStudentCounts[k];
}
localStorage.setItem('rn_group_counts', JSON.stringify(groupStudentCounts));

let workloadsList = JSON.parse(localStorage.getItem('rn_workloads')) || [];

let defaultTimetable = {
    "Information Systems": [
        { day: "Monday", time: "9:00-10:30", subject: "Religious studies", teacher: "M. Umarov", room: "208" },
        { day: "Monday", time: "10:40-12:10", subject: "Religious studies", teacher: "M. Umarov", room: "208" },
        { day: "Monday", time: "13:00-14:30", subject: "Java Development Fundamentals", teacher: "J. Khodijimatov", room: "208" },
        { day: "Tuesday", time: "9:00-10:30", subject: "Mathematical and Numeral Methods", teacher: "G. Tillaboeva", room: "208" },
        { day: "Tuesday", time: "10:40-12:10", subject: "Mathematical and Numeral Methods", teacher: "G. Tillaboeva", room: "208" },
        { day: "Wednesday", time: "9:00-10:30", subject: "System and Object-Oriented Programming", teacher: "B. Khoshimov", room: "108" },
        { day: "Wednesday", time: "10:40-12:10", subject: "System and Object-Oriented Programming", teacher: "B. Khoshimov", room: "108" },
        { day: "Thursday", time: "9:00-10:30", subject: "Computer Networks Architecture and Operating Systems", teacher: "V. Obukhov", room: "110" },
        { day: "Thursday", time: "10:40-12:10", subject: "Computer Networks Architecture and Operating Systems", teacher: "V. Obukhov", room: "110" },
        { day: "Friday", time: "9:00-10:30", subject: "Java Development Fundamentals", teacher: "J. Khodijimatov", room: "208" }
    ],
    "Information Systems (3rd Year)": [
        { day: "Monday", time: "13:00-14:30", subject: "Mathematical Modelling", teacher: "G. Tillaboeva", room: "202" },
        { day: "Tuesday", time: "13:00-14:30", subject: "Optimization Theory and Scientific Forecasting", teacher: "G. Tillaboeva", room: "202" },
        { day: "Tuesday", time: "14:40-16:10", subject: "Optimization Theory and Scientific Forecasting", teacher: "G. Tillaboeva", room: "202" },
        { day: "Wednesday", time: "13:00-14:30", subject: "System Theory and System Analysis", teacher: "G. Akramova", room: "202" },
        { day: "Wednesday", time: "14:40-16:10", subject: "System Theory and System Analysis", teacher: "G. Akramova", room: "202" },
        { day: "Thursday", time: "13:00-14:30", subject: "Physics", teacher: "J. Rozikov", room: "111" },
        { day: "Thursday", time: "14:40-16:10", subject: "Physics", teacher: "J. Rozikov", room: "111" },
        { day: "Friday", time: "9:00-10:30", subject: "Basics of Electronics and Radio Communication", teacher: "V. Obukhov", room: "202" },
        { day: "Friday", time: "10:40-12:10", subject: "Cloud and IoT", teacher: "V. Obukhov", room: "202" }
    ],
    "Group IT (4th Year)": [
        { day: "Monday", time: "9:00-10:30", subject: "AI Systems Engineering (zoom)", teacher: "A. Bondarenko", room: "🌐 Online [Zoom]" },
        { day: "Tuesday", time: "9:00-10:30", subject: "AI Systems Engineering (zoom)", teacher: "A. Bondarenko", room: "🌐 Online [Zoom]" },
        { day: "Wednesday", time: "9:00-10:30", subject: "Information Protection, Reliability and Cryptography", teacher: "Kh. Sadirova", room: "202" },
        { day: "Wednesday", time: "10:40-12:10", subject: "Information Protection, Reliability and Cryptography", teacher: "Kh. Sadirova", room: "202" },
        { day: "Friday", time: "9:00-10:30", subject: "Basics of Electronics and Radio Communication", teacher: "V. Obukhov", room: "202" },
        { day: "Friday", time: "10:40-12:10", subject: "Basics of Electronics and Radio Communication", teacher: "V. Obukhov", room: "202" }
    ],
    "Information Systems B (4251 B)": [
        { day: "Monday", time: "13:00-14:30", subject: "Internet and Web Basics", teacher: "E.Khamidov", room: "108" },
        { day: "Monday", time: "14:40-16:10", subject: "API Foundation", teacher: "E.Khamidov", room: "108" },
        { day: "Tuesday", time: "9:00-10:30", subject: "Introduction to Programming Using Python", teacher: "E.Kodirov", room: "108" },
        { day: "Tuesday", time: "10:40-12:10", subject: "Introduction to Programming Using Python", teacher: "E.Kodirov", room: "108" },
        { day: "Tuesday", time: "13:00-14:30", subject: "The Modern History of Uzbekistan", teacher: "M.Umarov", room: "206" },
        { day: "Wednesday", time: "9:00-10:30", subject: "Philosophy, World Culture and Ethics", teacher: "O.Rakhmanova", room: "111" },
        { day: "Wednesday", time: "10:40-12:10", subject: "Mathematics", teacher: "G.Tillaboeva", room: "111" },
        { day: "Wednesday", time: "13:00-14:30", subject: "Business English (IELTS group)", teacher: "N.Matkholikova", room: "102" },
        { day: "Thursday", time: "9:00-10:30", subject: "Introduction to Programming Using Python", teacher: "E.Kodirov", room: "108" },
        { day: "Thursday", time: "10:40-12:10", subject: "Introduction to Programming Using Python", teacher: "E.Kodirov", room: "108" },
        { day: "Thursday", time: "13:00-14:30", subject: "Physics", teacher: "J.Rozikov", room: "111" },
        { day: "Thursday", time: "14:40-16:10", subject: "Physics", teacher: "J.Rozikov", room: "111" },
        { day: "Friday", time: "9:30-10:30", subject: "\"Future Hour\" educational and awareness session", teacher: "R.Tukhtasinov", room: "Hall-1" },
        { day: "Friday", time: "10:40-12:10", subject: "C++", teacher: "B.Khoshimov", room: "110" },
        { day: "Friday", time: "13:00-14:30", subject: "Business English", teacher: "N.Matkholikova", room: "101" }
    ],
    "Information Systems A (4251 A)": [
        { day: "Monday", time: "9:00-10:30", subject: "Introduction to Programming Using Python", teacher: "E.Kodirov", room: "108" },
        { day: "Monday", time: "10:40-12:10", subject: "Introduction to Programming Using Python", teacher: "E.Kodirov", room: "108" },
        { day: "Monday", time: "13:00-14:30", subject: "Business English", teacher: "N.Matkholikova", room: "107" },
        { day: "Tuesday", time: "9:00-10:30", subject: "Internet and Web Basics", teacher: "E.Khamidov", room: "110" },
        { day: "Tuesday", time: "10:40-12:10", subject: "API Foundation", teacher: "E.Khamidov", room: "110" },
        { day: "Tuesday", time: "13:00-14:30", subject: "The Modern History of Uzbekistan", teacher: "M.Umarov", room: "206" },
        { day: "Wednesday", time: "9:00-10:30", subject: "Philosophy, World Culture and Ethics", teacher: "O.Rakhmanova", room: "111" },
        { day: "Wednesday", time: "10:40-12:10", subject: "Mathematics", teacher: "G.Tillaboeva", room: "111" },
        { day: "Wednesday", time: "13:00-14:30", subject: "Business English (IELTS group)", teacher: "N.Matkholikova", room: "102" },
        { day: "Thursday", time: "11:00-12:10", subject: "\"Future Hour\" educational and awareness session", teacher: "R.Tukhtasinov", room: "Hall-1" },
        { day: "Thursday", time: "13:00-14:30", subject: "Physics", teacher: "J.Rozikov", room: "111" },
        { day: "Thursday", time: "14:40-16:10", subject: "Physics", teacher: "J.Rozikov", room: "111" },
        { day: "Friday", time: "9:00-10:30", subject: "C++", teacher: "B.Khoshimov", room: "110" },
        { day: "Friday", time: "10:40-12:10", subject: "Introduction to Programming Using Python", teacher: "E.Kodirov", room: "108" },
        { day: "Friday", time: "13:00-14:30", subject: "Introduction to Programming Using Python", teacher: "E.Kodirov", room: "108" }
    ],
    "Business Administration / Tourism": [
        { day: "Monday", time: "9:00-10:30", subject: "Digital Marketing", teacher: "M.Khudoykulova", room: "102" },
        { day: "Monday", time: "18:30-20:00", subject: "Social Entrepreneurship", teacher: "M.Gaevskaya", room: "🌐 Online [Zoom]" },
        { day: "Tuesday", time: "9:00-10:30", subject: "Investment and Risk Management", teacher: "Kh.Isroilov", room: "102" },
        { day: "Tuesday", time: "10:40-12:10", subject: "Investment and Risk Management", teacher: "Kh.Isroilov", room: "102" },
        { day: "Tuesday", time: "13:00-14:30", subject: "Preparing diploma project", teacher: "S.Paramonov", room: "102" },
        { day: "Wednesday", time: "10:40-12:10", subject: "Digital Marketing (final lesson)", teacher: "M.Khudoykulova", room: "102" },
        { day: "Wednesday", time: "13:00-14:30", subject: "Marketing Research (moodle)", teacher: "Z.Oborenko", room: "102" },
        { day: "Wednesday", time: "14:40-16:10", subject: "Innovation Management (moodle)", teacher: "M.Storozhuka", room: "102" },
        { day: "Thursday", time: "9:00-10:30", subject: "Electronic Commerce", teacher: "M.Khudoykulova", room: "102" },
        { day: "Thursday", time: "10:40-12:10", subject: "Electronic Commerce", teacher: "M.Khudoykulova", room: "102" },
        { day: "Thursday", time: "16:45-18:15", subject: "Startup Business Management", teacher: "V.Shcherbak", room: "🌐 Online [Zoom]" },
        { day: "Friday", time: "9:00-10:30", subject: "Marketing Visual Communication (moodle)", teacher: "M.Storozhuka", room: "102" },
        { day: "Friday", time: "10:40-12:10", subject: "Total Quality Management (moodle)", teacher: "J.Kojuhina", room: "102" },
        { day: "Friday", time: "13:00-14:30", subject: "Electronic Commerce", teacher: "M.Khudoykulova", room: "102" },
        { day: "Friday", time: "14:30-16:10", subject: "Electronic Commerce", teacher: "M.Khudoykulova", room: "102" }
    ],
    "Business Administration (3131)": [
        { day: "Monday", time: "9:00-10:30", subject: "Public Relations Management", teacher: "M.Pochchoev", room: "101" },
        { day: "Monday", time: "10:40-12:10", subject: "Public Relations Management", teacher: "M.Pochchoev", room: "101" },
        { day: "Monday", time: "13:00-14:30", subject: "\"Future Hour\" educational and awareness session", teacher: "S.Ismoilova", room: "101" },
        { day: "Tuesday", time: "9:00-10:30", subject: "Business Communication", teacher: "Z.Abdurakhimova", room: "101" },
        { day: "Tuesday", time: "10:40-12:10", subject: "Business Communication", teacher: "Z.Abdurakhimova", room: "101" },
        { day: "Wednesday", time: "9:00-10:30", subject: "Civil Law", teacher: "D.Ismoilov", room: "101" },
        { day: "Wednesday", time: "10:40-12:10", subject: "Financial Management", teacher: "S.Ismoilova", room: "101" },
        { day: "Wednesday", time: "13:00-14:30", subject: "Financial Management", teacher: "S.Ismoilova", room: "101" },
        { day: "Thursday", time: "10:40-12:10", subject: "Business Correspondence", teacher: "Z.Abdurakhimova", room: "101" },
        { day: "Thursday", time: "13:00-14:30", subject: "Management Information Technologies", teacher: "G.Akramova", room: "110" },
        { day: "Thursday", time: "14:40-16:10", subject: "Artificial Intelligence", teacher: "G.Akramova", room: "110" },
        { day: "Friday", time: "9:00-10:30", subject: "Logistics", teacher: "K.Kurpayanidi", room: "101" },
        { day: "Friday", time: "10:40-12:10", subject: "Logistics", teacher: "K.Kurpayanidi", room: "101" }
    ],
    "Business Administration (3151 A, B, C) / Tourism (5151)": [
        { day: "Monday", time: "9:00-10:30", subject: "Spanish (C/tourism group)", teacher: "Kh.Abduraxmonov", room: "205" },
        { day: "Monday", time: "10:40-12:10", subject: "Spanish (A group)", teacher: "Kh.Abduraxmonov", room: "205" },
        { day: "Monday", time: "13:00-14:30", subject: "Religious Studies", teacher: "M.Umarov", room: "111" },
        { day: "Tuesday", time: "9:00-10:30", subject: "Accountancy", teacher: "S.Ismoilova", room: "207" },
        { day: "Tuesday", time: "10:40-12:10", subject: "Accountancy", teacher: "S.Ismoilova", room: "207" },
        { day: "Tuesday", time: "13:00-14:30", subject: "Spanish (B group) / For Tourism: Hospitality Industry", teacher: "Kh.Abduraxmonov", room: "205", isPotok: true },
        { day: "Wednesday", time: "13:00-14:30", subject: "Marketing", teacher: "M.Khudaykulova", room: "111" },
        { day: "Wednesday", time: "14:40-16:10", subject: "Marketing", teacher: "M.Khudaykulova", room: "111" },
        { day: "Thursday", time: "9:00-10:30", subject: "Management Psychology and Sociology", teacher: "M.Isakova", room: "207" },
        { day: "Thursday", time: "10:40-12:10", subject: "Management Psychology and Sociology", teacher: "M.Isakova", room: "207" },
        { day: "Thursday", time: "13:00-14:30", subject: "For BA: Social Media Branding", teacher: "Z.Abdurakhimova", room: "Hall-1" },
        { day: "Friday", time: "9:00-10:30", subject: "Management Theory", teacher: "M.Khudaykulova", room: "207" },
        { day: "Friday", time: "10:40-12:10", subject: "Management Theory", teacher: "M.Khudaykulova", room: "207" },
        { day: "Friday", time: "13:00-14:30", subject: "\"Future Hour\" educational and awareness session", teacher: "Sh.Abdusattorova", room: "206" }
    ],
    "Business Administration (3150 F) / Tourism (5050 F)": [
        { day: "Monday", time: "9:00-10:30", subject: "Management Psychology and Sociology", teacher: "S.Paramonov", room: "206" },
        { day: "Monday", time: "10:40-12:10", subject: "Management Psychology and Sociology", teacher: "S.Paramonov", room: "206" },
        { day: "Monday", time: "13:00-14:30", subject: "Management Theory", teacher: "M.Khudaykulova", room: "206" },
        { day: "Monday", time: "14:40-16:10", subject: "Management Theory", teacher: "M.Khudaykulova", room: "206" },
        { day: "Tuesday", time: "9:00-10:30", subject: "Management Psychology and Sociology", teacher: "S.Paramonov", room: "206" },
        { day: "Tuesday", time: "10:40-12:10", subject: "Management Psychology and Sociology", teacher: "S.Paramonov", room: "206" },
        { day: "Tuesday", time: "13:00-14:30", subject: "For Tourism: Hospitality Industry", teacher: "Z.Abdurakhimova", room: "205" },
        { day: "Wednesday", time: "9:00-10:30", subject: "Management Psychology and Sociology", teacher: "S.Paramonov", room: "206" },
        { day: "Wednesday", time: "10:40-12:10", subject: "Management Psychology and Sociology", teacher: "S.Paramonov", room: "206" },
        { day: "Wednesday", time: "13:00-14:30", subject: "Accountancy", teacher: "D.Teshabayev", room: "206" },
        { day: "Wednesday", time: "14:40-16:10", subject: "Accountancy", teacher: "D.Teshabayev", room: "206" },
        { day: "Thursday", time: "9:00-10:30", subject: "Management Psychology and Sociology", teacher: "S.Paramonov", room: "206" },
        { day: "Thursday", time: "10:40-12:10", subject: "Management Psychology and Sociology", teacher: "S.Paramonov", room: "206" },
        { day: "Thursday", time: "13:00-14:30", subject: "Accountancy", teacher: "D.Teshabayev", room: "206" },
        { day: "Thursday", time: "14:40-16:10", subject: "Accountancy", teacher: "D.Teshabayev", room: "206" },
        { day: "Friday", time: "9:00-10:30", subject: "Management Psychology and Sociology", teacher: "S.Paramonov", room: "206" },
        { day: "Friday", time: "10:40-12:10", subject: "Spanish", teacher: "Kh.Abduraxmonov", room: "205" },
        { day: "Friday", time: "13:00-14:30", subject: "Religious Studies", teacher: "P.Ismailova", room: "111" }
    ],
    "Business Administration ENG (3160F) / Tourism ENG (5160F)": [
        { day: "Monday", time: "9:00-10:30", subject: "Economics", teacher: "Kh.Isroilov", room: "107" },
        { day: "Monday", time: "10:40-12:10", subject: "Introduction to Entrepreneurship", teacher: "M.Khudaykulova", room: "107" },
        { day: "Monday", time: "13:00-14:30", subject: "Applied Informatics (A)", teacher: "M.Aloydinov", room: "110" },
        { day: "Monday", time: "14:40-16:10", subject: "Applied Informatics (B)", teacher: "M.Aloydinov", room: "110" },
        { day: "Tuesday", time: "9:00-10:30", subject: "Introduction to Entrepreneurship", teacher: "M.Khudaykulova", room: "107" },
        { day: "Tuesday", time: "10:40-12:10", subject: "Introduction to Entrepreneurship", teacher: "M.Khudaykulova", room: "107" },
        { day: "Tuesday", time: "13:00-14:30", subject: "Quantitative Methods and Statistics", teacher: "G.Tillaboeva", room: "107" },
        { day: "Wednesday", time: "9:00-10:30", subject: "Introduction to Entrepreneurship", teacher: "M.Khudaykulova", room: "107" },
        { day: "Wednesday", time: "10:40-12:10", subject: "Legal Regulation of Enterprise Activity", teacher: "D.Mirzakarimova", room: "107" },
        { day: "Wednesday", time: "13:00-14:30", subject: "Philosophy, World Culture and Ethics", teacher: "S.Paramonov", room: "107" },
        { day: "Thursday", time: "9:00-10:30", subject: "Philosophy, World Culture and Ethics", teacher: "S.Paramonov", room: "107" },
        { day: "Thursday", time: "10:40-12:10", subject: "Philosophy, World Culture and Ethics", teacher: "S.Paramonov", room: "107" },
        { day: "Thursday", time: "13:00-14:30", subject: "Applied Informatics (B)", teacher: "M.Aloydinov", room: "108" },
        { day: "Thursday", time: "14:30-16:10", subject: "Applied Informatics (A)", teacher: "M.Aloydinov", room: "108" },
        { day: "Friday", time: "9:00-10:30", subject: "Philosophy, World Culture and Ethics", teacher: "S.Paramonov", room: "107" },
        { day: "Friday", time: "10:40-12:10", subject: "Business English", teacher: "G.Tashmatova", room: "107" },
        { day: "Friday", time: "13:00-14:30", subject: "Legal Regulation of Enterprise Activity", teacher: "D.Mirzakarimova", room: "107" }
    ],
    "Business Administration (3161 A, B) / Tourism (5161)": [
        { day: "Monday", time: "9:00-10:30", subject: "Legal Regulation of Enterprise Activity", teacher: "D.Ismailov", room: "111" },
        { day: "Monday", time: "10:40-12:10", subject: "Introduction to Entrepreneurship", teacher: "S.Ismoilova", room: "111" },
        { day: "Monday", time: "13:00-14:30", subject: "Business English (C)", teacher: "D.Usmanova", room: "102" },
        { day: "Monday", time: "14:40-16:10", subject: "\"Future Hour\" educational and awareness session", teacher: "A.Komilov", room: "111" },
        { day: "Tuesday", time: "9:00-10:30", subject: "The Modern History of Uzbekistan", teacher: "M.Umarov", room: "111" },
        { day: "Tuesday", time: "10:40-12:10", subject: "Legal Regulation of Enterprise Activity", teacher: "D.Ismailov", room: "111" },
        { day: "Tuesday", time: "13:00-14:30", subject: "Philosophy, World Culture and Ethics", teacher: "O.Rakhmanova", room: "111" },
        { day: "Wednesday", time: "10:40-12:10", subject: "Business English (B)", teacher: "G.Tashmatova", room: "104" },
        { day: "Wednesday", time: "13:00-14:30", subject: "Applied Informatics (A)", teacher: "S.Ataxanov", room: "108" },
        { day: "Wednesday", time: "14:40-16:10", subject: "Applied Informatics (B)", teacher: "S.Ataxanov", room: "108" },
        { day: "Thursday", time: "9:00-10:30", subject: "Economics", teacher: "N.Olimova", room: "111" },
        { day: "Thursday", time: "10:40-12:10", subject: "Legal Regulation of Enterprise Activity", teacher: "D.Ismailov", room: "111" },
        { day: "Thursday", time: "13:00-14:30", subject: "Introduction to Entrepreneurship", teacher: "S.Ismoilova", room: "208", isPotok: true },
        { day: "Friday", time: "9:00-10:30", subject: "Introduction to Entrepreneurship", teacher: "S.Ismoilova", room: "111" },
        { day: "Friday", time: "10:40-12:10", subject: "Economics", teacher: "N.Olimova", room: "111" },
        { day: "Friday", time: "13:00-14:30", subject: "Business English (A)", teacher: "D.Usmanova", room: "205" }
    ]
};

let timetableData = JSON.parse(localStorage.getItem('rn_timetable')) || {};
for (let key in defaultTimetable) {
    if (!timetableData[key] || timetableData[key].length === 0) {
        timetableData[key] = defaultTimetable[key];
    }
}
localStorage.setItem('rn_timetable', JSON.stringify(timetableData));

function saveToLocalStorage() {
    localStorage.setItem('rn_teachers', JSON.stringify(teachersList));
    localStorage.setItem('rn_subjects', JSON.stringify(subjectsList));
    localStorage.setItem('rn_rooms', JSON.stringify(roomsList));
    localStorage.setItem('rn_group_counts', JSON.stringify(groupStudentCounts));
    localStorage.setItem('rn_workloads', JSON.stringify(workloadsList));
    localStorage.setItem('rn_timetable', JSON.stringify(timetableData));
}

function updateDropdownsAndLists() {
    try {
        const tSelect = document.getElementById('workloadTeacher');
        const tDisplay = document.getElementById('teachersListDisplay');
        if(tSelect && tDisplay) {
            tSelect.innerHTML = '';
            teachersList.forEach(t => {
                const opt = document.createElement('option');
                opt.value = t.name;
                opt.textContent = t.name;
                tSelect.appendChild(opt);
            });
            tDisplay.innerHTML = '';
            teachersList.forEach(t => {
                tDisplay.innerHTML += `<li>• ${t.name} (${t.slots} ta bo'sh para)</li>`;
            });
        }

        const sSelect = document.getElementById('workloadSubject');
        const sDisplay = document.getElementById('subjectsListDisplay');
        if(sSelect && sDisplay) {
            sSelect.innerHTML = '';
            subjectsList.forEach(s => {
                const opt = document.createElement('option');
                opt.value = s;
                opt.textContent = s;
                sSelect.appendChild(opt);
            });
            sDisplay.innerHTML = '';
            subjectsList.forEach(s => {
                sDisplay.innerHTML += `<li>• ${s}</li>`;
            });
        }
        updateWorkloadDisplay();
        updateWorkloadGroups();
        updateRoomsDisplay();
    } catch(e) {
        console.error("updateDropdownsAndLists error:", e);
    }
}

function updateWorkloadGroups() {
    const workloadGroupSelect = document.getElementById('workloadGroup');
    if(!workloadGroupSelect) return;
    const currentVal = workloadGroupSelect.value;
    workloadGroupSelect.innerHTML = '';
    for(let faculty in groupsData) {
        for(let course in groupsData[faculty]) {
            groupsData[faculty][course].forEach(g => {
                const opt = document.createElement('option');
                opt.value = g;
                opt.textContent = `${faculty} — ${g} (${course}-kurs)`;
                if(g === currentVal) opt.selected = true;
                workloadGroupSelect.appendChild(opt);
            });
        }
    }
    updateWorkloadDisplay();
}

function updateWorkloadDisplay() {
    const groupSelect = document.getElementById('workloadGroup');
    const workloadDisplay = document.getElementById('groupWorkloadDisplay');
    if(!groupSelect || !workloadDisplay) return;

    const selectedGroup = groupSelect.value;
    workloadDisplay.innerHTML = '';

    const groupItems = workloadsList.filter(w => w.group === selectedGroup);
    if(groupItems.length === 0) {
        workloadDisplay.innerHTML = `<li class="text-slate-400 italic">Bu guruh uchun hali yuklama kiritilmagan</li>`;
    } else {
        groupItems.forEach(w => {
            let badge = w.isOnline ? '<span class="text-purple-600 font-bold">[Online]</span>' : (w.isLab ? '<span class="text-blue-600 font-bold">[Lab]</span>' : '');
            workloadDisplay.innerHTML += `<li>• <b>${w.subject}</b> (${w.teacher}) — ${w.hours} para/hafta ${badge}</li>`;
        });
    }
}

function updateGroupDropdown() {
    try {
        const dirEl = document.getElementById('selectDirection');
        const courseEl = document.getElementById('selectCourse');
        const groupSelect = document.getElementById('selectGroup');
        if(!dirEl || !courseEl || !groupSelect) return;

        const dir = dirEl.value;
        const course = courseEl.value;
        groupSelect.innerHTML = '';

        const list = (groupsData[dir] && groupsData[dir][course]) ? groupsData[dir][course] : [`${dir}-${course}1`];
        list.forEach((g, idx) => {
            const opt = document.createElement('option');
            opt.value = g;
            opt.textContent = `Group ${g}`;
            if(idx === 0) opt.selected = true;
            groupSelect.appendChild(opt);
        });
        renderGroupTimetable();
    } catch(e) {
        console.error("updateGroupDropdown error:", e);
    }
}

function switchTab(tabId) {
    try {
        console.log("Switching tab to:", tabId);
        const tabs = ['timetable', 'teachers', 'subjects', 'ai', 'rooms', 'analytics'];

        tabs.forEach(t => {
            const pane = document.getElementById('tab-' + t);
            if (pane) {
                pane.style.display = (t === tabId) ? 'block' : 'none';
            }
            const btn = document.getElementById('btn-' + t);
            if (btn) {
                if (t === tabId) {
                    btn.className = "px-3 py-2 bg-rigaNavy text-white rounded-xl font-medium text-xs transition shadow";
                } else {
                    btn.className = "px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-xs transition border border-slate-300";
                }
            }
        });

        if (tabId === 'timetable') {
            updateGroupDropdown();
        }
        if (tabId === 'teachers' || tabId === 'subjects' || tabId === 'rooms') {
            updateDropdownsAndLists();
        }
    } catch(e) {
        console.error("switchTab error:", e);
        alert("Sahifaga o'tishda xatolik: " + e.message);
    }
}

function handleLogin() {
    const u = document.getElementById('loginUser').value.trim();
    const p = document.getElementById('loginPass').value.trim();
    if(u === "fergana_dean" && p === "NordicFergana2025!") {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('loginUser').value = '';
        document.getElementById('loginPass').value = '';
    } else {
        alert("Login yoki parol noto'g'ri! Iltimos, qaytadan kiriting.");
    }
}

function handleLogout() {
    document.getElementById('loginOverlay').style.display = 'flex';
}

window.onload = function() {
    const loginOverlay = document.getElementById('loginOverlay');
    if(loginOverlay) loginOverlay.style.display = 'none';
    updateGroupDropdown();
    switchTab('timetable');
};

function addDays(dateStr, days) {
    let d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    let day = String(d.getDate()).padStart(2, '0');
    let month = String(d.getMonth() + 1).padStart(2, '0');
    let year = d.getFullYear();
    return `${day}.${month}.${year}`;
}

function validateRoom(groupName, day, time, roomNum, isPotok = false) {
    if(!roomNum || roomNum.includes("Online") || roomNum.includes("Zoom")) {
        return { valid: true, text: "🌐 Online [Zoom]", badgeClass: "bg-purple-100 text-purple-800 border-purple-300" };
    }

    const room = roomsList.find(r => r.number === roomNum);
    const studentCount = groupStudentCounts[groupName] || 30;

    if(!room) {
        return { valid: true, text: roomNum, badgeClass: "bg-slate-100 text-slate-800 border-slate-300" };
    }

    if(room.capacity < studentCount && !isPotok) {
        return {
            valid: false,
            text: `❌ Sig'im yetarli emas (${room.capacity} o'rin, guruhda ${studentCount} talaba)`,
            badgeClass: "bg-rose-100 text-rose-800 border-rose-300 font-bold"
        };
    }

    let busyGroup = null;
    for(let g in timetableData) {
        if(g !== groupName) {
            timetableData[g].forEach(item => {
                if(item.day === day && item.time === time && item.room && item.room.includes(roomNum)) {
                    busyGroup = g;
                }
            });
        }
    }

    if(busyGroup && !isPotok) {
        return {
            valid: false,
            text: `❌ Xona band (${busyGroup} darsida)`,
            badgeClass: "bg-amber-100 text-amber-800 border-amber-300 font-bold"
        };
    }

    if(isPotok) {
        return {
            valid: true,
            text: `👥 Potok (Umumiy dars) — ${room.capacity} o'rin`,
            badgeClass: "bg-indigo-100 text-indigo-800 border-indigo-300 font-bold"
        };
    }

    return {
        valid: true,
        text: `✅ ${roomNum} (Bo'sh & Sig'imi yetarli: ${room.capacity} o'rin)`,
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold"
    };
}

function changeSubject(day, time, newSub) {
    const groupName = document.getElementById('selectGroup').value;
    if(!timetableData[groupName]) timetableData[groupName] = [];
    let item = timetableData[groupName].find(i => i.day === day && i.time === time);
    if(item) {
        item.subject = newSub;
    } else {
        timetableData[groupName].push({
            day: day,
            time: time,
            subject: newSub,
            teacher: teachersList[0] ? teachersList[0].name : "M. Umarov",
            room: "208",
            isPotok: false
        });
    }
    saveToLocalStorage();
    renderGroupTimetable();
}

function changeTeacher(day, time, newTeacher) {
    const groupName = document.getElementById('selectGroup').value;
    if(!timetableData[groupName]) timetableData[groupName] = [];
    let item = timetableData[groupName].find(i => i.day === day && i.time === time);
    if(item) {
        item.teacher = newTeacher;
    } else {
        timetableData[groupName].push({
            day: day,
            time: time,
            subject: getSubjectsForGroup(groupName)[0] || "Religious studies",
            teacher: newTeacher,
            room: "208",
            isPotok: false
        });
    }
    saveToLocalStorage();
    renderGroupTimetable();
}

function changeRoom(day, time, newRoom) {
    const groupName = document.getElementById('selectGroup').value;
    if(!timetableData[groupName]) timetableData[groupName] = [];
    let item = timetableData[groupName].find(i => i.day === day && i.time === time);
    if(item) {
        item.room = newRoom;
    } else {
        timetableData[groupName].push({
            day: day,
            time: time,
            subject: getSubjectsForGroup(groupName)[0] || "Religious studies",
            teacher: teachersList[0] ? teachersList[0].name : "M. Umarov",
            room: newRoom,
            isPotok: false
        });
    }
    saveToLocalStorage();
    renderGroupTimetable();
}

function togglePotok(day, time) {
    const groupName = document.getElementById('selectGroup').value;
    if(!timetableData[groupName]) timetableData[groupName] = [];
    let item = timetableData[groupName].find(i => i.day === day && i.time === time);
    if(item) {
        item.isPotok = !item.isPotok;
        saveToLocalStorage();
        renderGroupTimetable();
    }
}

function removeLesson(day, time) {
    const groupName = document.getElementById('selectGroup').value;
    if(timetableData[groupName]) {
        timetableData[groupName] = timetableData[groupName].filter(i => !(i.day === day && i.time === time));
        saveToLocalStorage();
        renderGroupTimetable();
    }
}

function renderGroupTimetable() {
    try {
        const groupName = document.getElementById('selectGroup').value;
        const dir = document.getElementById('selectDirection').value;
        const course = document.getElementById('selectCourse').value;
        const startDateVal = document.getElementById('startDateInput').value || "2026-11-09";

        const docCourseTitle = document.getElementById('docCourseTitle');
        if(docCourseTitle) {
            docCourseTitle.innerHTML = `${course}${course == 1 ? 'ST' : course == 2 ? 'ND' : course == 3 ? 'RD' : 'TH'} year students TIMETABLE`;
        }
        const docGroupName = document.getElementById('docGroupName');
        if(docGroupName) {
            docGroupName.innerText = `Group ${groupName} (${groupStudentCounts[groupName] || 30} ta talaba)`;
        }

        const tbody = document.getElementById('timetableTableBody');
        if(!tbody) return;
        tbody.innerHTML = '';

        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const slots = ["9:00-10:30", "10:40-12:10", "13:00-14:30", "14:40-16:10"];
        const dayOffset = { "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4 };

        if(!timetableData[groupName]) {
            timetableData[groupName] = [];
        }

        days.forEach((day) => {
            let formattedDate = addDays(startDateVal, dayOffset[day]);
            let isHoliday = holidaysList.includes(formattedDate);

            slots.forEach((time, slotIdx) => {
                let item = timetableData[groupName].find(i => i.day === day && i.time === time);

                let holidayBadge = isHoliday ? `<br><span class="bg-rose-100 text-rose-800 text-[10px] px-1.5 py-0.5 rounded font-bold">🎉 BAYRAM</span>` : '';
                let dayDetail = `<div class="font-bold text-rigaNavy">${day}</div><div class="text-[11px] text-slate-500">${formattedDate}</div>${holidayBadge}`;

                const isLastRowOfDay = (slotIdx === slots.length - 1);
                const rowClass = isLastRowOfDay ? "hover:bg-slate-50 transition text-center border-b-4 border-rigaNavy day-divider text-slate-900" : "hover:bg-slate-50 transition text-center border-b border-slate-400 text-slate-900";

                if(isHoliday) {
                    if(slotIdx === 0) {
                        tbody.innerHTML += `
                            <tr class="${rowClass} bg-rose-50/50">
                                <td class="p-3 border-r border-slate-400 font-semibold">${dayDetail}</td>
                                <td colspan="4" class="p-4 text-center font-bold text-rose-700 text-sm">
                                    🎉 Ushbu kun (<b>${formattedDate}</b>) bayram / dam olish kuni deb belgilangan. Darslar o'tkazilmaydi! 🌴
                                </td>
                            </tr>
                        `;
                    }
                    return;
                }

                if(!item) {
                    tbody.innerHTML += `
                        <tr class="${rowClass} bg-slate-50/30 empty-slot-row">
                            <td class="p-3 border-r border-slate-400 font-semibold">${dayDetail}</td>
                            <td class="p-3 border-r border-slate-400 font-mono text-slate-500 text-xs">${time}</td>
                            <td colspan="3" class="p-3 text-center text-xs text-slate-400 italic">
                                Bo'sh para (Dars qo'shish uchun <button onclick="addEmptySlot('${day}', '${time}')" class="delete-btn text-rigaNavy font-bold underline hover:text-blue-800">➕ Dars tayinlash</button>)
                            </td>
                        </tr>
                    `;
                } else {
                    let currentRoomNum = item.room || "202";
                    if(currentRoomNum.includes("[")) {
                        currentRoomNum = currentRoomNum.split(" ")[0];
                    }
                    const validation = validateRoom(groupName, item.day, item.time, currentRoomNum, item.isPotok);

                    let roomOptions = `<option value="🌐 Online [Zoom]">🌐 Online [Zoom]</option>`;
                    roomsList.forEach(r => {
                        let selected = (item.room === r.number || item.room.startsWith(r.number)) ? 'selected' : '';
                        roomOptions += `<option value="${r.number}" ${selected}>Xona ${r.number} (Sig'imi: ${r.capacity})</option>`;
                    });
                    if(item.room && item.room.includes("Online")) {
                        roomOptions = `<option value="🌐 Online [Zoom]" selected>🌐 Online [Zoom]</option>` + roomOptions.replace('selected', '');
                    }

                    let groupSubjects = getSubjectsForGroup(groupName);
                    let subjectOptions = '';
                    groupSubjects.forEach(s => {
                        let selected = (item.subject === s || item.subject.startsWith(s)) ? 'selected' : '';
                        subjectOptions += `<option value="${s}" ${selected}>${s}</option>`;
                    });
                    if(!groupSubjects.includes(item.subject)) {
                        subjectOptions += `<option value="${item.subject}" selected>${item.subject}</option>`;
                    }

                    let teacherOptions = '';
                    teachersList.forEach(t => {
                        let selected = (item.teacher === t.name) ? 'selected' : '';
                        teacherOptions += `<option value="${t.name}" ${selected}>${t.name}</option>`;
                    });
                    if(!teachersList.some(t => t.name === item.teacher)) {
                        teacherOptions += `<option value="${item.teacher}" selected>${item.teacher}</option>`;
                    }

                    tbody.innerHTML += `
                        <tr class="${rowClass}">
                            <td class="p-3 border-r border-slate-400 font-semibold">${dayDetail}</td>
                            <td class="p-3 border-r border-slate-400 font-mono text-slate-800 font-semibold">${time}</td>
                            <td class="p-3 border-r border-slate-400 text-left">
                                <select onchange="changeSubject('${day}', '${time}', this.value)" class="w-full bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none focus:border-rigaNavy">
                                    ${subjectOptions}
                                </select>
                            </td>
                            <td class="p-3 border-r border-slate-400">
                                <select onchange="changeTeacher('${day}', '${time}', this.value)" class="w-full bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-rigaNavy focus:outline-none focus:border-rigaNavy">
                                    ${teacherOptions}
                                </select>
                            </td>
                            <td class="p-3 text-center space-y-1">
                                <select onchange="changeRoom('${day}', '${time}', this.value)" class="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none focus:border-rigaNavy">
                                    ${roomOptions}
                                </select>
                                <div><span class="validation-badge px-2 py-0.5 rounded text-[10px] border ${validation.badgeClass}">${validation.text}</span></div>
                                <div class="print-hide">
                                    <label class="text-[11px] font-semibold text-indigo-700 flex items-center justify-center gap-1 cursor-pointer pt-1">
                                        <input type="checkbox" ${item.isPotok ? 'checked' : ''} onchange="togglePotok('${day}', '${time}')" class="w-3.5 h-3.5 rounded border-indigo-300 text-indigo-600"> 👥 Potok (Umumiy)
                                    </label>
                                </div>
                                <button onclick="removeLesson('${day}', '${time}')" class="delete-btn text-[10px] text-rose-600 hover:underline">O'chirish</button>
                            </td>
                        </tr>
                    `;
                }
            });
        });
    } catch(e) {
        console.error("renderGroupTimetable error:", e);
    }
}

function addEmptySlot(day, time) {
    const groupName = document.getElementById('selectGroup').value;
    if(!timetableData[groupName]) timetableData[groupName] = [];
    const groupSubs = getSubjectsForGroup(groupName);
    timetableData[groupName].push({
        day: day,
        time: time,
        subject: groupSubs[0] || "Religious studies",
        teacher: teachersList[0] ? teachersList[0].name : "M. Umarov",
        room: "208",
        isPotok: false
    });
    saveToLocalStorage();
    renderGroupTimetable();
}

function addTeacher() {
    const name = document.getElementById('teacherNameInput').value;
    if(!name) { alert("O'qituvchi ismini kiriting!"); return; }

    const checkedSlots = document.querySelectorAll('.t-slot:checked').length;
    if(!teachersList.some(t => t.name === name)) {
        teachersList.push({ name, slots: checkedSlots });
        saveToLocalStorage();
    }
    alert(`O'qituvchi saqlandi: ${name} ✅`);
    document.getElementById('teacherNameInput').value = '';
    updateDropdownsAndLists();
}

function addNewSubject() {
    const sName = document.getElementById('newSubjectInput').value;
    if(!sName) { alert("Fan nomini kiriting!"); return; }
    if(!subjectsList.includes(sName)) {
        subjectsList.push(sName);
        saveToLocalStorage();
    }
    alert(`Fan saqlandi: ${sName} ✅`);
    document.getElementById('newSubjectInput').value = '';
    updateDropdownsAndLists();
}

function addWorkload() {
    const group = document.getElementById('workloadGroup').value;
    const subject = document.getElementById('workloadSubject').value;
    const teacher = document.getElementById('workloadTeacher').value;
    const hours = document.getElementById('workloadHours').value;
    const isLab = document.getElementById('requiresLab').checked;
    const isOnline = document.getElementById('isOnline').checked;

    if(!subject || !teacher) { alert("Fan va o'qituvchini tanlang!"); return; }

    workloadsList.push({ group, subject, teacher, hours: parseInt(hours), isLab, isOnline });
    saveToLocalStorage();
    alert(`Yuklama saqlandi: ${group} — ${subject} (${teacher}, haftasiga ${hours} para) ✅`);
    updateWorkloadDisplay();
}

function runAiScheduler() {
    timetableData = {};
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const slots = ["9:00-10:30", "10:40-12:10", "13:00-14:30", "14:40-16:10"];

    const grouped = {};
    workloadsList.forEach(w => {
        if(!grouped[w.group]) grouped[w.group] = [];
        grouped[w.group].push(w);
    });

    for(let group in grouped) {
        timetableData[group] = [];
        let d = 0, s = 0;
        grouped[group].forEach(w => {
            for(let i = 0; i < w.hours; i++) {
                if(d >= days.length) d = 0;
                if(s >= slots.length) { s = 0; d++; }
                if(d >= days.length) d = 0;

                let roomStr = "202";
                if(w.isOnline) {
                    roomStr = "🌐 Online [Zoom]";
                } else if(w.isLab) {
                    roomStr = "Lab-1";
                }

                timetableData[group].push({
                    day: days[d],
                    time: slots[s],
                    subject: w.subject,
                    teacher: w.teacher,
                    room: roomStr
                });
                s++;
            }
        });
    }

    saveToLocalStorage();
    alert("⚡ Barcha guruhlar uchun AI orqali dars jadvali tuzildi va xonalar tekshirildi! 🎉");
    switchTab('timetable');
}

function addRoom() {
    let num = document.getElementById('roomNumberInput').value.trim();
    let cap = parseInt(document.getElementById('roomCapacityInput').value);
    let type = document.getElementById('roomTypeSelect').value;
    if(!num || isNaN(cap)) { alert("Xona raqami va to'g'ri sig'imini kiriting!"); return; }

    if(roomsList.some(r => r.number === num)) {
        alert("Bu raqamdagi xona allaqachon mavjud!");
        return;
    }

    roomsList.push({ number: num, capacity: cap, type: type });
    saveToLocalStorage();
    alert(`Xona saqlandi: ${num}-xona (${type}, Sig'imi: ${cap}) ✅`);
    document.getElementById('roomNumberInput').value = '';
    document.getElementById('roomCapacityInput').value = '';
    updateRoomsDisplay();
}

function updateRoomsDisplay() {
    const display = document.getElementById('roomsListDisplay');
    if(display) {
        display.innerHTML = '';
        roomsList.forEach((r, idx) => {
            display.innerHTML += `
                <li class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                    <span>🏢 <b>${r.number}</b> (${r.type}) — <span class="font-bold text-emerald-600">${r.capacity} o'rin</span></span>
                    <div class="space-x-2">
                        <button onclick="editRoom(${idx})" class="text-blue-600 font-bold hover:underline">Tahrirlash</button>
                        <button onclick="deleteRoom(${idx})" class="text-rose-600 font-bold hover:underline">O'chirish</button>
                    </div>
                </li>
            `;
        });
    }
    updateHolidaysDisplay();
}

function deleteRoom(index) {
    if(confirm("Haqiqatan ham bu xonani o'chirmoqchimisiz?")) {
        roomsList.splice(index, 1);
        saveToLocalStorage();
        updateRoomsDisplay();
    }
}

function editRoom(index) {
    const r = roomsList[index];
    const newNum = prompt("Xona raqami / nomi:", r.number);
    if(newNum === null) return;
    const newCap = parseInt(prompt("Xona sig'imi (talabalar soni):", r.capacity));
    if(isNaN(newCap)) { alert("Noto'g'ri sig'im kiritilgan!"); return; }
    const newType = prompt("Xona turi (Regular / Lecture Hall / Computer Lab):", r.type) || r.type;

    roomsList[index] = { number: newNum, capacity: newCap, type: newType };
    saveToLocalStorage();
    updateRoomsDisplay();
}

function addHoliday() {
    const dateVal = document.getElementById('holidayDateInput').value;
    if(!dateVal) { alert("Bayram sanasini tanlang!"); return; }

    let parts = dateVal.split("-");
    let formatted = `${parts[2]}.${parts[1]}.${parts[0]}`;

    if(!holidaysList.includes(formatted)) {
        holidaysList.push(formatted);
        localStorage.setItem('rn_holidays', JSON.stringify(holidaysList));
        alert(`Dam olish kuni qo'shildi: ${formatted} 🎉`);
        document.getElementById('holidayDateInput').value = '';
        updateHolidaysDisplay();
        renderGroupTimetable();
    } else {
        alert("Bu sana allaqachon bayram sifatida kiritilgan!");
    }
}

function removeHoliday(dateStr) {
    holidaysList = holidaysList.filter(h => h !== dateStr);
    localStorage.setItem('rn_holidays', JSON.stringify(holidaysList));
    updateHolidaysDisplay();
    renderGroupTimetable();
}

function updateHolidaysDisplay() {
    const display = document.getElementById('holidaysListDisplay');
    if(display) {
        display.innerHTML = '';
        if(holidaysList.length === 0) {
            display.innerHTML = '<li class="text-slate-400 italic">Hali bayram kunlari kiritilmagan</li>';
        } else {
            holidaysList.forEach(h => {
                display.innerHTML += `<li class="p-2 bg-rose-50 border border-rose-200 rounded-xl flex justify-between items-center text-xs"><span>🎉 <b>${h}</b> (Dam olish kuni)</span><button onclick="removeHoliday('${h}')" class="text-rose-600 font-bold hover:underline">O'chirish</button></li>`;
            });
        }
    }
}

try {
    updateGroupDropdown();
} catch(e) {
    console.error("Auto init error:", e);
}
