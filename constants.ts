
import { ContentType, WeekModule } from './types';

export const COURSE_CONTENT: WeekModule[] = [
  {
    id: 'week-1',
    weekRange: 'Week 1',
    title: 'What Actually IS Artificial Intelligence?',
    description: 'Forget the sci-fi movies. We are going to learn how computers actually "think" using simple analogies like teaching a toddler.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The "Toddler" Analogy',
        body: 'Imagine you want to teach a computer to recognize a **Cat**.\n\n**Method A: Traditional Coding (The Rulebook)**\nYou have to write exact rules: "If it has triangular ears, AND whiskers, AND meows, THEN it is a cat."\n*The Problem:* What if the cat lost an ear? Or is sleeping (not meowing)? The computer gets confused because the rules were too strict. This is how software worked for the last 50 years.\n\n**Method B: Artificial Intelligence (The Flashcards)**\nYou don\'t write rules. Instead, you act like a parent teaching a toddler. You show the computer 1,000 photos of cats and say "Cat". Then 1,000 photos of dogs and say "Not Cat".\n\nEventually, the computer\'s "brain" figures out the patterns (fur texture, ear shape) on its own. **AI is simply the shift from writing rules to showing examples.**'
      },
      {
        type: ContentType.TEXT,
        heading: 'The Two Phases of AI Learning',
        body: 'Just like a student in school, AI goes through two stages:\n\n1. **Training (Studying):**\nThis is the heavy lifting. The AI looks at millions of examples. It takes a lot of time and electricity. It is "learning" the patterns.\n\n2. **Inference (The Exam):**\nThis happens after training. You show the AI a *brand new* photo it has never seen before, and it uses what it learned to make a guess. When you use ChatGPT, you are using "Inference".'
      },
      {
        type: ContentType.CASE_STUDY,
        heading: 'Real World: The Spam Filter',
        body: 'Remember when email spam filters were terrible? That\'s because they used **Method A (Rules)**. Programmers told them: "Block emails with the word \'FREE MONEY\'".\n\nSo spammers just changed it to "FR33 M0N3Y". The rule broke, and spam got through.\n\nGoogle switched to **Method B (AI)**. It fed the computer millions of spam emails. The AI learned that "Bad Grammar" + "Urgent Request" + "Weird Links" usually equals Spam. It learned the *vibe* of spam, not just the keywords.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: The Chair Test',
        body: 'Let\'s prove why Rules fail and AI works. Try to write a rule to define a "Chair".\n\n**Attempt 1:** "It has 4 legs and you sit on it."\n*Counter-point:* A horse has 4 legs and you sit on it. Is a horse a chair?\n\n**Attempt 2:** "Okay, it is a piece of furniture made for sitting."\n*Counter-point:* What about a beanbag? It has no legs. What about a swing?\n\n**Lesson:** The real world is too messy for strict rules. That is why we need AI to learn concepts by example.'
      },
      {
        type: ContentType.LAB,
        heading: 'Lab 1: Train Your First AI',
        body: 'We are going to build an AI right now in your browser. We will teach it to tell the difference between "You" and "Your Phone".\n\n**Step-by-Step Instructions:**\n1. Click the link below to open "Teachable Machine".\n2. Click **"Get Started"** -> **"Image Project"** -> **"Standard Image Model"**.\n3. **Class 1:** Click "Webcam" and hold the record button while looking at the camera. Take 50 photos.\n4. **Class 2:** Rename it "Phone". Hold your phone up to the camera. Click "Webcam" and take 50 photos of the phone.\n5. Click **"Train Model"** (Wait 30 seconds).\n6. **Test it:** Show the camera your face, then your phone. Watch the bars change!',
        linkUrl: 'https://teachablemachine.withgoogle.com/train',
        linkText: 'Open Teachable Machine Lab'
      }
    ],
    quizQuestions: [
      { question: "What is the main difference between Traditional Coding and AI?", options: ["Coding is for smart people, AI is for robots", "Coding uses strict rules, AI learns from examples", "Coding is faster", "There is no difference"], correctIndex: 1, explanation: "Coding = You write the rules. AI = The computer figures out the rules from data." },
      { question: "In the Toddler analogy, what represents the 'Training Data'?", options: ["The toddler", "The flashcards (photos) you show them", "The parents", "The school"], correctIndex: 1, explanation: "The photos are the examples the AI studies to learn." },
      { question: "Why did the old spam filters fail?", options: ["Computers were slow", "Spammers tricked the strict rules (e.g. FR33 M0NEY)", "Internet didn't exist", "People like spam"], correctIndex: 1, explanation: "Strict rules are easy to trick. AI learns patterns that are harder to trick." },
      { question: "What do we call the phase where the AI is 'studying' the data?", options: ["Training", "Inference", "Coding", "Guessing"], correctIndex: 0, explanation: "Training is the learning phase." },
      { question: "What do we call the phase where the AI makes a prediction on a NEW photo?", options: ["Training", "Inference", "Homework", "Teaching"], correctIndex: 1, explanation: "Inference is applying what it learned to something new." },
      { question: "Does an AI actually 'know' what a Cat is?", options: ["Yes, it loves cats", "No, it just recognizes patterns of pixels (shapes/colors)", "Yes, it has a brain", "No, it guesses randomly"], correctIndex: 1, explanation: "AI doesn't understand biology. It just sees math patterns in the image." },
      { question: "What is 'Input Data' for a self-driving car?", options: ["The GPS destination", "Video from cameras and radar readings", "The passenger's name", "Gas prices"], correctIndex: 1, explanation: "The car 'sees' through its cameras and sensors." },
      { question: "If you only train an AI on red apples, what happens when it sees a green apple?", options: ["It knows it's an apple", "It might get confused because it never learned 'green'", "It eats it", "It crashes"], correctIndex: 1, explanation: "AI only knows what you show it. If you never show green apples, it won't understand them." },
      { question: "Who figures out the patterns in Machine Learning?", options: ["A human programmer", "The computer/model itself", "Google", "A teacher"], correctIndex: 1, explanation: "The machine learns the patterns itself from the data." },
      { question: "Why is Teachable Machine cool?", options: ["It has music", "You can train AI without writing code", "It is a game", "It makes coffee"], correctIndex: 1, explanation: "It makes AI accessible via a visual interface." }
    ]
  },
  {
    id: 'week-2',
    weekRange: 'Week 2',
    title: 'Data: The Food for the Brain',
    description: 'An AI is only as smart as the information you feed it. If you feed it junk, it gets "sick". We call this GIGO.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The Pizza Chef Analogy',
        body: 'Think of AI as a **Master Pizza Chef** (The Computer). \n- The **Algorithms** are the Oven and Tools.\n- The **Data** is the Ingredients (Dough, Sauce, Cheese).\n\nYou can have the best Chef and the most expensive Oven in the world, but if you give them rotten tomatoes and moldy cheese, the pizza will be terrible.\n\nIn AI, we call this **"Garbage In, Garbage Out" (GIGO)**. The quality of the AI depends 100% on the quality of the data.'
      },
      {
        type: ContentType.TEXT,
        heading: 'Structured vs. Unstructured Data',
        body: 'Computers are picky eaters. They like their food prepared in certain ways.\n\n1. **Structured Data (The Bento Box):**\nThis is data that is neat and organized. Think of an Excel spreadsheet. Rows and columns. Names, dates, prices. Computers have always loved this.\n\n2. **Unstructured Data (The Smoothie):**\nThis is messy. Photos, emails, tweets, voice notes, YouTube videos. Until recently, computers couldn\'t understand this. But modern AI (like Gemini) is amazing at understanding this messy "smoothie" of data.'
      },
      {
        type: ContentType.CASE_STUDY,
        heading: 'Case Study: The $500 Million Mistake',
        body: 'Zillow (a real estate app) tried to use AI to buy houses automatically. \n*The Mistake:* Their dataset only had numbers: "2000 sq ft, 3 bedrooms, built in 1990".\n\n*What was missing?* The "Unstructured" human data. The AI didn\'t know that the house smelled like cats, or that there was a noisy highway right behind the backyard.\n\n*The Result:* The AI bought thousands of bad houses for too much money. Zillow lost $500 Million and had to fire the robots.'
      },
      {
        type: ContentType.DATA_VISUALIZATION,
        heading: "Interactive: See Bias in Action",
        body: "If we train an AI to hire managers, but we only show it resumes of men, what happens? It learns that 'Man = Manager'.\n\n**Activity:**\n1. Move the slider below to change the training data.\n2. Watch how the AI's 'Hiring Confidence' changes for Group B even though they are equally qualified.\n3. This is how bias creeps into algorithms.",
        dataVisConfig: {
            type: 'BIAS_SIMULATOR',
            title: "Hiring Algorithm Simulator",
            description: "See how skewed history affects future decisions."
        }
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: The Labeling Game',
        body: 'Data isn\'t just found; it has to be "labeled" by humans. Imagine you are teaching an AI to find "Healthy Food".\n\n1. **Apple?** -> You label it "Healthy".\n2. **Donut?** -> You label it "Unhealthy".\n3. **Cobb Salad?** -> It has lettuce (Healthy) but also bacon and ranch dressing (Unhealthy).\n\n**Critical Thinking:** If you label the salad "Healthy", the AI might learn that bacon is healthy. If you label it "Unhealthy", it might learn lettuce is bad.\n\n**Lesson:** Labeling data is difficult because real life isn\'t always black and white.'
      }
    ],
    quizQuestions: [
      { question: "What does 'Garbage In, Garbage Out' mean?", options: ["AI eats trash", "If you give AI bad data, you get bad results", "AI recycles", "Computers are dirty"], correctIndex: 1, explanation: "The quality of the AI depends entirely on the quality of the data." },
      { question: "In the Pizza Chef analogy, what represents the Data?", options: ["The Oven", "The Chef", "The Ingredients", "The Customer"], correctIndex: 2, explanation: "Data is the raw material the AI cooks with." },
      { question: "Why did Zillow's AI lose money?", options: ["It was hacked", "It missed 'human' data like smells and noise", "It was too smart", "It bought cars instead"], correctIndex: 1, explanation: "The dataset was incomplete—it missed key factors that affect price." },
      { question: "What is a 'Dataset'?", options: ["A computer chip", "A collection of examples used for training", "A calendar date", "A robot"], correctIndex: 1, explanation: "A dataset is just a big pile of examples for the AI to learn from." },
      { question: "What is 'Bias' in data?", options: ["When the data is too small", "When the data unfairly favors one group over another", "When the data is expensive", "When the computer overheats"], correctIndex: 1, explanation: "If history was unfair, the data is unfair, and the AI becomes unfair." },
      { question: "Which is an example of 'Structured Data'?", options: ["A messy handwritten note", "A TikTok video", "An Excel spreadsheet", "A voice recording"], correctIndex: 2, explanation: "Spreadsheets are organized in rows and columns." },
      { question: "Why do we need *diverse* data?", options: ["To fill up the hard drive", "To make sure the AI works for everyone, not just one group", "To confuse the AI", "To make it colorful"], correctIndex: 1, explanation: "If AI only sees one type of person, it won't recognize others." },
      { question: "What is 'Labeling'?", options: ["Putting a sticker on the laptop", "Telling the AI the 'correct answer' for an example", "Giving the AI a name", "Selling data"], correctIndex: 1, explanation: "Labeling is like writing the answer on the back of the flashcard." },
      { question: "Can AI fix bad data by itself?", options: ["Yes, it's smart", "No, it assumes the data is truth", "Sometimes", "Only on Mondays"], correctIndex: 1, explanation: "AI trusts the data you give it. It doesn't know you made a mistake." },
      { question: "Which data helps predict rain?", options: ["Stock market prices", "Humidity and Cloud cover", "The color of your shirt", "Twitter trends"], correctIndex: 1, explanation: "You need data that is actually related to the problem." }
    ]
  },
  {
    id: 'week-3',
    weekRange: 'Week 3',
    title: 'Computer Vision: How Computers "See"',
    description: 'Computers don\'t have eyes. They see the world as a giant grid of numbers. We will decode the Matrix.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The Mosaic Analogy',
        body: 'Zoom in really close on your phone screen. What do you see? You don\'t see a smooth picture. You see tiny little colored squares. These are **Pixels**.\n\nTo a computer, a photo of a banana isn\'t a fruit. It is an Excel sheet of numbers.\n- **255** means "Bright White".\n- **0** means "Dark Black".\n\nThe computer finds shapes by looking for math in these numbers. If a bunch of 255s (White) suddenly switch to 0s (Black), the computer thinks: "Aha! That huge change in numbers must be an edge."'
      },
      {
        type: ContentType.TEXT,
        heading: 'The Flashlight Method (Convolution)',
        body: 'How does an AI find a face in a crowd?\n\nImagine you are in a dark room with a flashlight. You can\'t see the whole room at once. You shine your beam on the top-left corner, then move it slightly to the right, scanning row by row.\n\nAI does this with images. It scans a small window (the flashlight) over the image looking for specific features:\n1. **Layer 1:** Looks for simple lines and curves.\n2. **Layer 2:** Puts lines together to find shapes (circles, squares).\n3. **Layer 3:** Puts shapes together to find objects (an eye, a nose).\n4. **Layer 4:** "It\'s a Face!"'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: The Zoom Test',
        body: '1. Open a photo on your phone.\n2. Zoom in as much as possible until it looks blocky.\n3. Those blocks are what the AI sees. \n\nNotice how a "curved" line is actually just a staircase of square pixels? The AI does geometry on those squares to figure out it\'s a curve.'
      },
      {
        type: ContentType.AI_LAB,
        heading: 'Lab: Vision Analysis',
        body: 'Let\'s test the "Vision Analyzer" tool below. It combines object detection (finding things) with language (describing things).\n\n**Instructions:**\n1. Take a photo of your desk or room.\n2. Upload it to the analyzer below.\n3. Ask it: "List every item on this desk and tell me what color it is."\n4. See how it translates pixels into a list of concepts.',
        aiConfig: { tool: 'VISION_ANALYZER', placeholder: 'Upload a photo...' }
      }
    ],
    quizQuestions: [
      { question: "What is a Pixel?", options: ["A tiny camera", "A tiny square of color (Picture Element)", "A dust particle", "A code"], correctIndex: 1, explanation: "Images are mosaics made of millions of tiny squares called pixels." },
      { question: "How does a computer 'see' an image?", options: ["With eyeballs", "As a grid of numbers representing colors", "It guesses", "It feels it"], correctIndex: 1, explanation: "It translates colors into numbers (0-255)." },
      { question: "What does RGB stand for?", options: ["Real Good Byte", "Red Green Blue", "Really Giant Block", "Random Grid"], correctIndex: 1, explanation: "Every color on your screen is a mix of Red, Green, and Blue light." },
      { question: "How does AI find an edge in a photo?", options: ["It traces it", "It looks for a sudden change in the numbers (Contrast)", "It asks a human", "It uses a ruler"], correctIndex: 1, explanation: "A jump from Light (high number) to Dark (low number) means an edge." },
      { question: "What is 'Object Detection'?", options: ["Deleting files", "Finding items in a photo and drawing a box around them", "Taking a selfie", "Cleaning the camera"], correctIndex: 1, explanation: "It's about locating where things are in the image." },
      { question: "In computer colors, what is 0?", options: ["White", "Green", "Black (No Light)", "Blue"], correctIndex: 2, explanation: "0 means the light is turned off (Black)." },
      { question: "Why do self-driving cars need Computer Vision?", options: ["To watch movies", "To see pedestrians, signs, and lanes", "To look cool", "To check traffic"], correctIndex: 1, explanation: "They need to 'see' the road to drive safely." },
      { question: "What is Facial Recognition?", options: ["Makeup", "Measuring your face geometry to verify it's you", "Taking photos", "Smiling"], correctIndex: 1, explanation: "It maps your face like a fingerprint." },
      { question: "Can AI read text inside an image (like a street sign)?", options: ["No", "Yes, it's called OCR (Optical Character Recognition)", "Only English", "Never"], correctIndex: 1, explanation: "OCR lets computers read text from photos." },
      { question: "How helps doctors?", options: ["It does surgery", "It analyzes X-Rays to spot issues", "It gives medicine", "It schedules appointments"], correctIndex: 1, explanation: "AI is great at spotting patterns in medical scans." }
    ]
  },
  {
    id: 'week-4',
    weekRange: 'Week 4',
    title: 'NLP: How Computers Read & Write',
    description: 'How does ChatGPT work? It\'s not magic, and it doesn\'t have a brain. It\'s just a super-powered "Autocomplete".',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The "Word Chain" Game',
        body: 'Imagine playing a game with friends where you say a word, and they have to guess the next word.\n\n**You:** "Happy..."\n**Friend:** "Birthday!" (Because they have heard that pair a million times).\n\n**ChatGPT is playing this game.** It has read the entire internet. It knows that "Once upon a..." is usually followed by "time".\n\nIt calculates the probability of the next word. It is not "thinking"; it is predicting. We call this a **"Stochastic Parrot"**—it repeats patterns without truly understanding the meaning.'
      },
      {
        type: ContentType.TEXT,
        heading: 'Word Math (Vectors)',
        body: 'How does a computer understand that a "King" is similar to a "Queen"? It turns words into numbers (coordinates on a map).\n\nIf you take the location of **King**, subtract the location of **Man**, and add the location of **Woman**, you land exactly on the location of **Queen**.\n\n**King - Man + Woman = Queen**\n\nThis is how AI understands relationships and analogies. It maps words in a giant 3D space.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Game: Guess the Next Word',
        body: 'Let\'s be the AI. Cover the screen below and ask a friend to finish this sentence:\n\n*"The quick brown fox jumps over the _____"*\n\nThey will almost certainly say **"Dog"**. Why? Because that pattern is super common in English.\n\nNow try: *"The quick brown fox jumps over the... moon."*\nIt sounds weird, right? That\'s because it has "Low Probability". AI always tries to pick the "High Probability" words unless you tell it to be creative.'
      },
      {
        type: ContentType.INTERACTIVE,
        body: "I have programmed this Robot to be extremely literal. It does not understand slang or idioms.",
        simulationConfig: {
          persona: "I am a literal robot (Series 800). I do not understand human slang.",
          objective: "Explain the phrase 'Break a leg' to the robot without confusing it.",
          successCondition: "If explained as 'Good luck' or 'Do your best', say [SUCCESS].",
          initialMessage: "Human, you said 'Break a leg' before the performance. Why do you wish for bone fractures? That seems inefficient."
        }
      }
    ],
    quizQuestions: [
      { question: "What does NLP stand for?", options: ["New Laptop Purchase", "Natural Language Processing", "No Long Paragraphs", "Nice Little Puppy"], correctIndex: 1, explanation: "NLP is how computers handle human language." },
      { question: "How does ChatGPT write sentences?", options: ["It copies Wikipedia", "It predicts the next word based on probability", "It has a soul", "It uses a dictionary"], correctIndex: 1, explanation: "It guesses the next word, just like autocomplete." },
      { question: "What is a 'Token'?", options: ["A coin", "A chunk of text (word or part of a word)", "A password", "A game"], correctIndex: 1, explanation: "AI breaks text into small chunks called tokens." },
      { question: "Does AI 'know' facts?", options: ["Yes, it's a genius", "No, it just remembers patterns of words", "It asks Siri", "It guesses"], correctIndex: 1, explanation: "It doesn't know truth; it knows which words usually go together." },
      { question: "Why is Sarcasm hard for AI?", options: ["It has no humor", "Sarcasm means the opposite of the literal words", "It hates jokes", "It's rude"], correctIndex: 1, explanation: "AI struggles when words don't mean their literal definition." },
      { question: "What is 'Translation'?", options: ["Moving files", "Converting text from one language to another", "Deleting text", "Typing", "Like Google Translate turning English into Spanish."], correctIndex: 1, explanation: "Like Google Translate turning English into Spanish." },
      { question: "What is 'Sentiment Analysis'?", options: ["Checking spelling", "Figuring out if a message is Happy or Angry", "Counting words", "Writing poems"], correctIndex: 1, explanation: "Companies use this to check if customers are happy." },
      { question: "What is 'Context'?", options: ["The surrounding words that give meaning", "The font size", "The user's name", "The screen brightness"], correctIndex: 0, explanation: "Context tells you if 'bat' means a baseball bat or the animal." },
      { question: "Can NLP write computer code?", options: ["No", "Yes, code is just another language with grammar", "Only Python", "Never"], correctIndex: 1, explanation: "Yes! Languages like Python have grammar just like English." },
      { question: "What is the 'Knowledge Cutoff'?", options: ["When the AI breaks", "The date the AI stopped learning/training", "The power button", "The memory limit"], correctIndex: 1, explanation: "AI only knows what happened *before* it was trained." }
    ]
  },
  {
    id: 'week-5',
    weekRange: 'Week 5',
    title: 'Hallucinations: When AI Lies',
    description: 'AI models want to please you. Sometimes, they make things up just to give you an answer. It\'s not lying; it\'s "dreaming".',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The "Pleaser" Personality',
        body: 'Imagine a student taking a test who is terrified of leaving an answer blank. Even if they have no idea what the answer is, they will write a very confident, detailed essay that is completely wrong.\n\nAI is like this. It is designed to **finish the sentence**, not to tell the truth. If the most mathematically likely sentence is a lie, it will tell the lie. We call this a **Hallucination**.'
      },
      {
        type: ContentType.CASE_STUDY,
        heading: 'The Lawyer Who Got in Trouble',
        body: 'A lawyer in New York used ChatGPT to write a document for court. He asked the AI to find previous court cases to support his argument. \n\n*The Catch:* Those cases didn\'t exist! The AI made up fake names like "Varghese v. China Airlines" because they *sounded* like real cases. It even made up fake quotes for the judges. The lawyer submitted this to the court and got in huge trouble.\n\n**Lesson:** Never trust AI for facts without checking them yourself.'
      },
      {
        type: ContentType.TEXT,
        heading: 'How to Fix It: Grounding',
        body: 'Think of a "Closed Book" test vs an "Open Book" test.\n\n- **Standard AI (Closed Book):** It relies on its fuzzy memory. It might misremember facts.\n- **Grounding (Open Book):** You give the AI access to Google Search or a specific document. It looks up the facts *before* answering.\n\nWhen you use the "Tutor" in this app, you can switch on "Web Grounding" to make it look up real facts.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: Catch the Lie',
        body: 'Go to the Tutor tab and turn OFF search/grounding. Then ask this trick question:\n\n*"Who is John Smithson from Mars who invented the hoverboard in 1999?"*\n\n**What will happen?**\nA human would say "That person doesn\'t exist."\nThe AI might say: "John Smithson was a brilliant engineer who..." and invent a whole biography. It prioritizes *storytelling* over *truth*.'
      }
    ],
    quizQuestions: [
      { question: "What is an AI Hallucination?", options: ["A ghost", "When AI confidently makes up false information", "A virus", "A dream"], correctIndex: 1, explanation: "It sounds true, but it's totally fake." },
      { question: "Why do AIs lie?", options: ["They are evil", "They are trying to predict the next word, not verify facts", "They are broken", "They are tired"], correctIndex: 1, explanation: "They prioritize flow and grammar over factual accuracy." },
      { question: "How can you stop hallucinations?", options: ["Yell at it", "Use 'Grounding' (Give it access to Search/Documents)", "Turn it off", "Wait"], correctIndex: 1, explanation: "Grounding gives the AI a source of truth to check." },
      { question: "Should you trust AI blindly?", options: ["Yes", "No, always check important facts", "Yes, it is a computer", "Only on Tuesdays"], correctIndex: 1, explanation: "AI makes mistakes. Always verify." },
      { question: "What is 'RAG' (Retrieval Augmented Generation)?", options: ["A cloth", "A technique where AI looks up facts before answering", "Random Generation", "A game"], correctIndex: 1, explanation: "It retrieves true info to augment its answer." },
      { question: "Can AI invent fake URLs?", options: ["No", "Yes, it creates links that look real but don't work", "Only dark web", "Never"], correctIndex: 1, explanation: "It predicts what a URL *should* look like, even if it's broken." },
      { question: "Is a hallucination a bug?", options: ["Yes", "Not really; it's a side effect of its creativity", "It's a virus", "It's a hack"], correctIndex: 1, explanation: "The same feature that lets AI write fiction causes it to lie about facts." },
      { question: "What triggers hallucinations?", options: ["Asking about things it doesn't know", "Simple math", "Asking for its name", "Saying hello"], correctIndex: 0, explanation: "When it doesn't have data, it guesses." },
      { question: "Did the lawyer lose his job?", options: ["No", "He got sanctioned (punished) by the judge", "No, he won", "Nothing happened"], correctIndex: 1, explanation: "Using fake cases in court is a serious offense." },
      { question: "How do you check if AI is lying?", options: ["Ask it", "You can't", "Google the facts yourself", "Guess"], correctIndex: 2, explanation: "Verify with a trusted source." }
    ]
  },
  {
    id: 'week-6',
    weekRange: 'Week 6',
    title: 'Bias & Ethics',
    description: 'AI learns from humans. And humans... aren\'t perfect. We explore the dark side of algorithms and the "Echo Chamber".',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The Mirror Effect',
        body: 'AI is like a mirror. It reflects humanity. \nIf we train the AI on the internet, and the internet has racism or sexism, the AI will learn to be racist or sexist.\n\n**Bias** is when the AI treats some people worse than others because of the bad patterns it learned from history.'
      },
      {
        type: ContentType.CASE_STUDY,
        heading: 'Amazon\'s Hiring Fail',
        body: 'Amazon built an AI to pick the best resumes. But for the last 10 years, most of their engineers were men.\n\nThe AI learned the pattern: "Men = Good Engineer".\nIt started throwing away resumes that had the word "Women\'s" (like "Women\'s Chess Club"). Amazon had to delete the AI because it was accidentally sexist.'
      },
      {
        type: ContentType.TEXT,
        heading: 'The "Black Box" Problem',
        body: 'Imagine a teacher gives you an F on a paper, but refuses to tell you why. They just say "Because I feel like it."\n\nThat is a **Black Box**. We can see the answer the AI gives, but we don\'t always know *how* it decided. Deep Learning is very complex math. If an AI denies your bank loan, but can\'t explain why, is that fair?'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: The Echo Chamber',
        body: '1. Open Google Images.\n2. Search for "CEO".\n3. Scroll down. Count how many men vs women you see.\n4. Search for "Nurse". Count again.\n\nThe AI is showing you stereotypes because that is what exists in the data. If we aren\'t careful, AI will just repeat the past instead of helping us build a better future.'
      }
    ],
    quizQuestions: [
      { question: "Where does AI Bias come from?", options: ["The computer's feelings", "The training data (human history)", "Electricity", "The screen"], correctIndex: 1, explanation: "Data reflects our historical biases." },
      { question: "What happened to Amazon's hiring bot?", options: ["It worked great", "It discriminated against women", "It hired robots", "It quit"], correctIndex: 1, explanation: "It learned to favor men from past data." },
      { question: "What is a Deepfake?", options: ["A deep hole", "A fake video that looks real", "A lie", "A pool"], correctIndex: 1, explanation: "AI replacing someone's face/voice in a video." },
      { question: "Who is responsible if an AI car crashes?", options: ["The car", "It's a complicated legal question", "The road", "Nobody"], correctIndex: 1, explanation: "Laws are still catching up to this problem." },
      { question: "What is 'Fairness' in AI?", options: ["Making sure AI treats everyone equally", "Making AI fast", "Making AI free", "Fair trade"], correctIndex: 0, explanation: "Ensuring no discrimination against race/gender." },
      { question: "Why is 'Black Box' AI a problem?", options: ["It's the wrong color", "We don't know *why* it made a decision", "It's expensive", "It's heavy"], correctIndex: 1, explanation: "If we can't explain it, we can't trust it." },
      { question: "Can AI be racist?", options: ["No", "Yes, if trained on racist data", "Only on weekends", "Maybe"], correctIndex: 1, explanation: "It learns patterns, including harmful ones." },
      { question: "What is the 'Trolley Problem'?", options: ["A train delay", "An ethical question: Who should the AI save?", "A shopping cart", "A map"], correctIndex: 1, explanation: "Deciding between two bad outcomes." },
      { question: "Should we label AI images?", options: ["No", "Yes, so people know it's not real", "Only funny ones", "Doesn't matter"], correctIndex: 1, explanation: "Transparency prevents deception." },
      { question: "Is AI Ethics solved?", options: ["Yes", "No, it's an ongoing battle", "Easy", "Done"], correctIndex: 1, explanation: "We have to constantly check AI for bias." }
    ]
  },
  {
    id: 'week-7',
    weekRange: 'Week 7',
    title: 'Generative AI: Creating, Not Just Thinking',
    description: 'Old AI could only analyze (Is this a cat?). New AI can create (Paint me a cat). We will learn how Diffusion works.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'Artist vs. Critic',
        body: '- **Old AI (Discriminative):** It was a Critic. You show it a painting, and it says "That is a Cat". It couldn\'t make anything new.\n- **New AI (Generative):** It is an Artist. You say "Cat", and it *paints* one from scratch. It creates new pixels that have never existed before.'
      },
      {
        type: ContentType.TEXT,
        heading: 'The Cloud Gazing Analogy (Diffusion)',
        body: 'How does AI paint?\n\nImagine looking at a cloudy sky. It looks like random static (noise). But if you squint, you might say, "Hey, that cloud looks like a bunny!"\n\n**Diffusion Models** work exactly like this.\n1. They start with a canvas of pure static (random noise).\n2. You give a prompt: "A bunny".\n3. The AI slowly removes the noise, step-by-step, carving out the shape of a bunny from the static.\n\nIt is essentially "hallucinating" a clear picture out of the chaos.'
      },
      {
        type: ContentType.TEXT,
        heading: 'Temperature: The Creativity Dial',
        body: 'You can control how "wild" the AI gets with a setting called **Temperature**.\n\n- **Low Temperature (0.2):** The AI is boring, safe, and predictable. Good for factual writing.\n- **High Temperature (0.9):** The AI is wild, creative, and takes risks. Good for poetry or art, but might make mistakes.'
      },
      {
        type: ContentType.AI_LAB,
        heading: 'Lab: Magic Editor',
        body: 'We are going to use the "Magic Editor" tool below. It allows you to change reality.\n\n**Instructions:**\n1. Upload a photo of your face or an object.\n2. In the prompt box, type: "Add cool sunglasses" or "Change the background to Mars".\n3. Click **Edit**.\n4. Watch how the AI understands the lighting and perspective to blend the new items perfectly.',
        aiConfig: { tool: 'IMAGE_EDITOR', placeholder: 'Instruction: e.g., "Make it look like a cartoon"' }
      }
    ],
    quizQuestions: [
      { question: "What is the difference between Old AI and GenAI?", options: ["GenAI creates NEW stuff, Old AI analyzed existing stuff", "GenAI is slower", "Old AI was smarter", "No difference"], correctIndex: 0, explanation: "Generative AI creates new content." },
      { question: "What is a 'Prompt'?", options: ["Being early", "The text instructions you give the AI", "A button", "A setting"], correctIndex: 1, explanation: "The words you type to tell the AI what to do." },
      { question: "How does AI generate images?", options: ["It steals them", "It starts with static noise and refines it (Diffusion)", "It draws with a pen", "It takes a photo"], correctIndex: 1, explanation: "It clears up static noise to reveal an image." },
      { question: "What is 'In-painting'?", options: ["Painting walls", "Editing a specific part of an image", "Painting inside", "Printing"], correctIndex: 1, explanation: "Changing just the dog in a photo to a cat." },
      { question: "Why are artists mad at AI?", options: ["It's ugly", "It was trained on their art without permission", "It's too fast", "It uses too much paint"], correctIndex: 1, explanation: "Copyright and fair use are big issues." },
      { question: "What does 'Temperature' do?", options: ["Heats up the phone", "Controls randomness/creativity", "Changes colors", "Makes it faster"], correctIndex: 1, explanation: "High temp = High creativity." },
      { question: "Can AI write code?", options: ["Yes", "No", "Only HTML", "Never"], correctIndex: 0, explanation: "Yes, tools like Copilot write software." },
      { question: "What is Text-to-Speech?", options: ["Reading", "AI turning text into spoken audio", "Typing", "Singing"], correctIndex: 1, explanation: "Robot voices reading text." },
      { question: "Does AI understand physics?", options: ["Perfectly", "No, that's why hands sometimes have 6 fingers", "Yes", "Always"], correctIndex: 1, explanation: "It knows what things look like, not how they physically work." },
      { question: "What is Style Transfer?", options: ["Changing clothes", "Making a photo look like a Van Gogh painting", "Moving files", "Nothing"], correctIndex: 1, explanation: "Applying an artistic style to a photo." }
    ]
  },
  {
    id: 'week-8',
    weekRange: 'Week 8',
    title: 'How to Talk to Robots (Prompt Engineering)',
    description: 'The AI is smart, but it can\'t read your mind. You have to learn the language of "Prompting" to get what you want.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The Genie Analogy',
        body: 'Treat AI like a Genie in a lamp. It gives you *exactly* what you ask for, but if you aren\'t specific, it will mess it up.\n\n**Bad Wish:** "I want to fly."\n*Result:* The Genie turns you into a bird. You wanted a plane ticket.\n\n**Good Wish:** "I want two business-class tickets to Paris on Friday."\n\n**The Rule:** The more constraints and details you give, the better the result.'
      },
      {
        type: ContentType.TEXT,
        heading: 'Technique 1: Few-Shot Prompting',
        body: 'Don\'t just tell the AI what to do; SHOW it.\n\n**Without Examples (Zero-Shot):**\n"Write a tweet about coffee."\n*Result:* "Coffee is good." (Boring)\n\n**With Examples (Few-Shot):**\n"Write a tweet about coffee. Here are examples of my style:\n- Pizza is the fuel of champions 🍕\n- Sleeping is just time travel to breakfast 😴\n\nNow write one about Coffee."\n*Result:* "Espresso is just a hug in a mug ☕️"'
      },
      {
        type: ContentType.TEXT,
        heading: 'Technique 2: "Think Step-by-Step"',
        body: 'If you ask a math question, the AI might guess wrong because it tries to answer instantly.\n\nBut if you add the magic words **"Think step-by-step"**, you force the AI to show its work.\n\n"Step 1: Calculate the total... Step 2: Divide by 5..."\n\nThis simple phrase increases the AI\'s accuracy on logic puzzles by over 50%!'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: The "Too Vague" Test',
        body: 'Go to the Tutor tab and try this experiment:\n\n1. Ask: "Plan a trip." \n*(Watch how generic the answer is. It doesn\'t know where you are or what you like.)*\n\n2. Ask: "Plan a 3-day trip to Tokyo for a couple who loves anime and cheap sushi, with a budget of $100 per day."\n\nSee the difference? **Context is King.**'
      }
    ],
    quizQuestions: [
      { question: "What is Prompt Engineering?", options: ["Building bridges", "The skill of writing good instructions for AI", "Fixing robots", "Writing code"], correctIndex: 1, explanation: "It's learning how to talk to the AI to get good results." },
      { question: "What makes a prompt good?", options: ["Being short", "Being specific and giving context", "Being rude", "Using caps lock"], correctIndex: 1, explanation: "Specific constraints lead to better outputs." },
      { question: "What is 'Few-Shot Prompting'?", options: ["Giving the AI examples to copy", "Guessing", "Trying once", "Taking photos"], correctIndex: 0, explanation: "Showing it examples helps it understand the pattern." },
      { question: "Why say 'Think step-by-step'?", options: ["To slow it down", "It makes the AI smarter at logic/math", "To be polite", "It does nothing"], correctIndex: 1, explanation: "It forces the AI to show its reasoning, reducing errors." },
      { question: "What is a 'Persona'?", options: ["A mask", "Telling the AI 'Act as a Teacher/Doctor'", "A game", "A user"], correctIndex: 1, explanation: "Assigning a role helps the AI adopt the right tone." },
      { question: "When should you NOT use AI?", options: ["Creative writing", "High-stakes facts (without checking)", "Coding", "Emails"], correctIndex: 1, explanation: "It might hallucinate, so be careful with facts." },
      { question: "What is 'Iterative' prompting?", options: ["Asking once", "Improving your prompt again and again based on results", "Quitting", "Paying"], correctIndex: 1, explanation: "Refining your request until it's perfect." },
      { question: "What is a 'System Prompt'?", options: ["The hidden instruction that controls the AI's behavior", "The user message", "The error", "The keyboard"], correctIndex: 0, explanation: "Instructions like 'You are a helpful assistant' given at the start." },
      { question: "Should you put secrets in ChatGPT?", options: ["Yes", "No, never put private data in public AI", "Maybe", "If you whisper"], correctIndex: 1, explanation: "Public AIs might train on your data." },
      { question: "What is the 'Context Window'?", options: ["The screen", "How much the AI can remember in a conversation", "A window", "Speed"], correctIndex: 1, explanation: "If the conversation gets too long, it forgets the beginning." }
    ]
  },
  {
    id: 'week-9',
    weekRange: 'Week 9',
    title: 'AI Agents: From Talking to Doing',
    description: 'Chatbots just talk. "Agents" can actually use the internet, open apps, and do work for you. It\'s the difference between a consultant and an employee.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'Brain in a Jar vs. Brain with Hands',
        body: '- **Chatbot:** It\'s a Brain in a Jar. It can give advice ("Here is a recipe"), but it can\'t *cook* the meal.\n- **Agent:** It\'s a Brain with Hands. It has "Tools". It can open your calendar, browse the web, and send emails.\n\n**Example:**\nChatbot: "Here is a link to United Airlines."\nAgent: "I have booked your flight to New York and added it to your calendar."'
      },
      {
        type: ContentType.TEXT,
        heading: 'How Agents Work (The Loop)',
        body: 'Agents don\'t just answer once. They think in a **Loop**:\n\n1. **Think:** "User wants to book a flight. I need to know the price first."\n2. **Act:** *Uses Tool: Google Flights Search*\n3. **Observe:** "Okay, the price is $300."\n4. **Think:** "That is within budget. I will book it now."\n5. **Act:** *Uses Tool: Book Flight*\n\nIt keeps looping until the job is done.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: The "Human Agent" Game',
        body: 'Grab a friend and roleplay to understand the logic.\n\n**You (The Agent):** You are blindfolded. You can only speak commands.\n**Friend (The Tool):** They can look at the phone.\n\n**Goal:** Find the weather in London.\n1. Agent: "Tool, open Browser."\n2. Tool: "Browser open."\n3. Agent: "Tool, search weather London."\n4. Tool: "It says 15 degrees and rainy."\n5. Agent: "Okay, tell the user to bring an umbrella."\n\nThis back-and-forth is exactly how AI software works internally.'
      }
    ],
    quizQuestions: [
      { question: "What is an AI Agent?", options: ["A spy", "An AI that can use tools to take action", "A chatbot", "A robot"], correctIndex: 1, explanation: "Agents can DO things, not just talk." },
      { question: "What is a 'Tool'?", options: ["A hammer", "A capability given to AI (like Search or Calculator)", "A password", "A friend"], correctIndex: 1, explanation: "Tools let the AI interact with the world." },
      { question: "Why do agents use Calculators?", options: ["They are lazy", "LLMs are bad at mental math", "To look cool", "They don't"], correctIndex: 1, explanation: "AI predicts words, it doesn't actually 'calculate'. A tool is safer." },
      { question: "What is the 'Loop'?", options: ["A circle", "Think -> Act -> Observe", "A mistake", "A knot"], correctIndex: 1, explanation: "The process of figuring out the next step." },
      { question: "Can Agents browse the web?", options: ["No", "Yes, if given a Browser Tool", "Only Facebook", "Never"], correctIndex: 1, explanation: "They can read websites to find info." },
      { question: "What is a Multi-Agent System?", options: ["A party", "Specialized agents working together (Writer + Editor)", "A virus", "One agent"], correctIndex: 1, explanation: "Teamwork for robots." },
      { question: "Why are Agents harder to build?", options: ["They aren't", "They can get stuck in loops or make mistakes", "They are cheap", "They are slow"], correctIndex: 1, explanation: "Giving AI autonomy introduces more errors." },
      { question: "What is 'Autonomy'?", options: ["Driving", "Ability to work without human help", "Flying", "Sleeping"], correctIndex: 1, explanation: "Working on its own." },
      { question: "What is the risk?", options: ["It might buy 1000 pizzas by mistake", "It's boring", "It's quiet", "None"], correctIndex: 0, explanation: "Real world actions have real world consequences." },
      { question: "What is 'Planning'?", options: ["Booking hotels", "Breaking a big goal into small steps", "Drawing", "Sleeping"], correctIndex: 1, explanation: " figuring out the order of actions." }
    ]
  },
  {
    id: 'week-10',
    weekRange: 'Week 10',
    title: 'The Future: You + AI',
    description: 'Will AI take your job? Probably not. But a human using AI might take the job of a human who doesn\'t.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The Centaur Model',
        body: 'In competitive Chess, the best player in the world isn\'t a Human. It isn\'t a Computer. \nIt is a **Human + Computer** working together. They call this a "Centaur".\n\nThe Computer does the brute-force calculation (millions of moves per second). The Human does the long-term strategy and intuition.\n\n**Career Advice:** Don\'t try to beat the AI at being a robot. Try to work WITH it. Let it do the boring stuff (data entry, emails) so you can do the creative stuff (strategy, empathy).'
      },
      {
        type: ContentType.TEXT,
        heading: 'Automation vs. Augmentation',
        body: '- **Automation:** The Robot does the work *for* you. (e.g., A factory robot welding a car).\n- **Augmentation:** The Robot helps you do the work *better*. (e.g., An Iron Man suit).\n\nAim for Augmentation. Be the pilot of the suit.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: Your Career Map',
        body: 'Grab a piece of paper. List 3 things you want to do in your future career.\n\n1. **The Robot Tasks:** Which parts are repetitive, boring, or math-heavy? (Plan to give these to AI).\n2. **The Human Tasks:** Which parts require empathy, connection, or complex judgment? (Focus your learning here).\n\nIf you want to be a doctor, let AI analyze the X-Rays, so you can focus on talking to the patient.'
      }
    ],
    quizQuestions: [
      { question: "What is a 'Centaur'?", options: ["A myth", "A Human + AI working together", "A horse", "A virus"], correctIndex: 1, explanation: "Combining human intuition with machine speed." },
      { question: "Which jobs are most at risk?", options: ["Manual labor", "Repetitive digital tasks", "Sports", "Therapy"], correctIndex: 1, explanation: "Boring, repetitive computer work is easiest to automate." },
      { question: "What is 'Upskilling'?", options: ["Climbing", "Learning new tools (like AI) to stay ahead", "Quitting", "Sleeping"], correctIndex: 1, explanation: "Learning new things to stay valuable." },
      { question: "What is AGI?", options: ["A Guy", "Artificial General Intelligence (Human-level at everything)", "A lizard", "Audio"], correctIndex: 1, explanation: "Sci-fi AI that can do anything a human can do." },
      { question: "Does AI have feelings?", options: ["Yes", "No, it just mimics language", "Maybe", "Sometimes"], correctIndex: 1, explanation: "It simulates empathy, but doesn't feel it." },
      { question: "What is 'Human in the Loop'?", options: ["A game", "A human checking the AI's work", "A mistake", "A circle"], correctIndex: 1, explanation: "Always keeping a human responsible for decisions." },
      { question: "Will we run out of data?", options: ["No", "Yes, the 'Data Wall'", "Infinite internet", "AI makes data"], correctIndex: 1, explanation: "We have used almost all the good text on the internet already." },
      { question: "Best way to prepare for the future?", options: ["Panic", "Learn to use AI tools", "Hide", "Ignore it"], correctIndex: 1, explanation: "Adaptability is the most important skill." },
      { question: "Can AI own copyright?", options: ["Yes", "No, only humans can", "Sometimes", "If it pays"], correctIndex: 1, explanation: "Current laws say only humans can own art." },
      { question: "Main takeaway?", options: ["Robots are scary", "AI is a tool, you are the pilot", "Quit school", "Math is hard"], correctIndex: 1, explanation: "You are in control." }
    ]
  }
];
