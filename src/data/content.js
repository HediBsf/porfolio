export const profile = {
  name: 'Mohamed Hedi Boussoffara',
  role: 'AI engineer building models that learn from signals, text, and images.',
  summary:
    'Final-year ICT Engineering student at ENISO, looking for a 4–6 month research internship in Artificial Intelligence and Machine Learning.',
  email: 'bousofaramed@gmail.com',
  github: 'https://github.com/HediBsf',
  linkedin: 'https://www.linkedin.com/in/mohamed-hedi-bousofara',
}

export const nav = [
  { label: 'Projects', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const projects = [
  {
    title: 'Bearing fault detection with deep learning',
    period: 'Jan – Apr 2026',
    description:
      'Detects bearing anomalies from vibration and sound signals. Compares raw 1D models against 2D models built on Gramian Angular Fields, reaching over 90% accuracy.',
    tags: ['Python', 'TensorFlow/Keras', 'Conv1D', 'Conv2D', 'GAF'],
  },
  {
    title: 'AI RAG assistant for ENISO students',
    period: 'Mar – May 2026',
    description:
      'A conversational assistant that answers questions on registration, internships, PFE, and reports from official documents. It shows its sources and offers PDF downloads.',
    tags: ['Mistral via Ollama', 'RAG', 'FastAPI', 'React', 'TF-IDF', 'Docker'],
  },
  {
    title: 'Intelligent weather forecasting app',
    period: 'Nov 2025 – Feb 2026',
    description:
      'A real-time weather web app that combines live API data with machine learning to improve forecast accuracy.',
    tags: ['React', 'Python', 'Machine Learning', 'Docker'],
  },
  {
    title: 'Big Data and IoT patient monitoring',
    period: 'Sep – Nov 2025',
    description:
      'Collects, processes, and analyzes vital signs continuously, and raises automated alerts when readings turn abnormal.',
    tags: ['Kafka', 'Spark Streaming', 'MongoDB', 'Docker'],
  },
  {
    title: 'Smart parking with ESP32-CAM',
    period: 'Mar – May 2025',
    description:
      'Reads license plates with computer vision and checks them against a database to grant secure vehicle access.',
    tags: ['ESP32-CAM', 'OpenCV', 'Python', 'IoT'],
  },
]

export const experience = [
  {
    role: 'DevSecOps Intern',
    org: 'Nouvelair',
    location: 'Monastir, Tunisia',
    period: 'Jul – Sep 2026',
    points: [
      'Designed a centralized DevSecOps platform covering 5 stages of the software lifecycle and integrating 7 tools.',
      'Automated CI/CD, security, and code-quality checks, with an estimated 30–40% cut in repetitive manual tasks.',
      'Built an AI-assisted module with Ollama that analyzes pipeline failures to speed up CI/CD troubleshooting.',
    ],
  },
  {
    role: 'IoT and AI Developer Intern',
    org: 'YuccaInfo',
    location: 'Sousse, Tunisia',
    period: 'Jun – Aug 2025',
    points: [
      'Built an IoT monitoring system on ESP32, Flask, React/Tauri, and Supabase for real-time acquisition and control.',
      'Delivered a live dashboard with historical tracking of sensor data.',
      'Integrated an AI prediction model that detects anomalies and forecasts behavior.',
    ],
  },
]

export const skills = [
  { title: 'AI and data', body: 'Machine Learning, Deep Learning, NLP, RAG, OpenCV, Ollama, CNN' },
  { title: 'Main stack', body: 'Python, JavaScript, React, Node.js' },
  { title: 'Embedded and IoT', body: 'ESP32, Arduino, STM32, FPGA' },
  { title: 'Real-time systems', body: 'Kafka, Spark Streaming, MQTT, WebSocket' },
  { title: 'Databases', body: 'PostgreSQL, MongoDB, Supabase' },
  {
    title: 'Certifications and leadership',
    body: 'NVIDIA: Data Parallelism on Multiple GPUs; AI for Predictive Maintenance. Led a 250+ member committee at Forum de Convergences ENISO; Treasurer of ACM ENISO.',
  },
]
