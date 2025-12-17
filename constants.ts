
import { ContentType, WeekModule } from './types';

export const COURSE_CONTENT: WeekModule[] = [
  {
    id: 'week-1',
    weekRange: 'Week 1',
    title: 'What Actually IS Artificial Intelligence?',
    description: 'Let’s skip the confusing sci-fi movie stuff. We will learn how computers actually learn using a simple "Toddler" analogy.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The "Toddler" Analogy',
        body: 'Imagine you are teaching a toddler to recognize a **Cat**.\n\n**Method A (Old School Coding):**\nYou write a strict rulebook: "If it has triangular ears AND whiskers AND meows, it is a cat."\n*The Problem:* What if the cat lost an ear? Or doesn\'t meow? The computer gets confused because the rules were too strict. \n\n**Method B (Artificial Intelligence):**\nYou don\'t write rules. Instead, you show the toddler 50 photos of cats and say "Cat". Then 50 photos of dogs and say "Not Cat".\nEventually, the toddler\'s brain figures out the patterns (pointy ears, furry face) on its own.\n\n**AI is just Method B.** We stop writing rules and start showing examples.'
      },
      {
        type: ContentType.TEXT,
        heading: 'The Two Big Words You Need to Know',
        body: '1. **Training (The Studying Phase):**\nThis is when the AI is like a student in a library, looking at millions of photos or reading books to learn patterns. It is "studying".\n\n2. **Inference (The Test Phase):**\nThis is when the AI is finished studying. You show it a brand new photo it has never seen before, and it uses what it learned to make a guess ("That\'s a cat!").'
      },
      {
        type: ContentType.CASE_STUDY,
        heading: 'Real World: The Spam Filter',
        body: 'Remember when email spam filters were terrible? That\'s because they used **Rules**. Programmers told them: "Block emails with the word \'FREE MONEY\'".\n\nSo spammers just changed it to "FR33 M0N3Y". The rule broke.\n\nGoogle switched to **AI**. It fed the computer millions of spam emails. The AI learned that "Bad Grammar" + "Urgent Request" + "Weird Links" usually equals Spam. It learned the *vibe* of spam, not just the words.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Try It: The Chair Test',
        body: 'Can you write a rule to define a "Chair"?\n\n1. "It has 4 legs and you sit on it." -> *Wait, a horse has 4 legs and you sit on it. Is a horse a chair?*\n2. "Okay, it has no legs and is soft." -> *That describes a beanbag. Is a beanbag a chair?*\n\n**Lesson:** The real world is too messy for rules. That is why we need AI to learn concepts by example.'
      },
      {
        type: ContentType.LAB,
        heading: 'Lab 1: Train Your First AI',
        body: 'Let\'s build an AI in 2 minutes. We will teach your computer to tell the difference between "You" and "Your Phone".\n\n1. Open Teachable Machine.\n2. Click "Image Project".\n3. Show it your face for Class 1.\n4. Show it your phone for Class 2.\n5. Click "Train".',
        linkUrl: 'https://teachablemachine.withgoogle.com/train',
        linkText: 'Open the Lab'
      }
    ],
    quizQuestions: [
      { question: "What is the main difference between Coding and AI?", options: ["Coding is for smart people, AI is for robots", "Coding uses strict rules, AI learns from examples", "Coding is faster", "There is no difference"], correctIndex: 1, explanation: "Coding = You write the rules. AI = The computer figures out the rules from data." },
      { question: "In the Toddler analogy, what is the 'Training Data'?", options: ["The toddler", "The flashcards (photos) you show them", "The parents", "The school"], correctIndex: 1, explanation: "The photos are the examples the AI studies to learn." },
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
    description: 'An AI is only as smart as the information you feed it. If you feed it junk, it gets "sick".',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The Chef Analogy',
        body: 'Think of AI as a **Master Chef** (The Computer). \n- The **Algorithms** are the Kitchen Tools (Oven, Knives).\n- The **Data** is the Ingredients (Vegetables, Meat).\n\nYou can have the best Chef and the most expensive Oven in the world, but if you give them rotten eggs, the meal will taste bad.\n\nIn AI, we call this **"Garbage In, Garbage Out"**.'
      },
      {
        type: ContentType.TEXT,
        heading: 'Types of Data',
        body: '1. **Structured Data (Neat & Tidy):**\nThink of an Excel spreadsheet. Rows and columns. Computers LOVE this. It\'s easy to read.\n\n2. **Unstructured Data (Messy):**\nThink of a messy bedroom. Photos, voice notes, emails, videos. Computers used to hate this, but modern AI is great at organizing it.'
      },
      {
        type: ContentType.CASE_STUDY,
        heading: 'When Bad Data Cost $500 Million',
        body: 'Zillow (a real estate app) tried to use AI to buy houses automatically. \n*The Mistake:* Their data only had numbers (Square footage, number of bedrooms). It didn\'t have the "human" stuff (Does the house smell like cats? Is there a noisy highway next door?).\n\n*The Result:* The AI bought thousands of bad houses for too much money, and Zillow lost $500 Million.'
      },
      {
        type: ContentType.DATA_VISUALIZATION,
        heading: "Interactive: See Bias Happen",
        body: "If we only show the AI examples of Group A being hired, it will think Group B is 'bad'. Play with the slider to see how the data changes the AI's mind.",
        dataVisConfig: {
            type: 'BIAS_SIMULATOR',
            title: "Hiring Algorithm Simulator",
            description: "See how skewed history affects future decisions."
        }
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: The Labeling Game',
        body: 'Imagine you are teaching an AI to find "Healthy Food".\n1. Apple? -> You label it "Healthy".\n2. Donut? -> You label it "Unhealthy".\n3. **What about a Salad loaded with bacon and ranch dressing?**\n\nIf you label it "Healthy", the AI might learn that bacon is healthy!\n**Lesson:** Teaching AI is hard because real life isn\'t always black and white.'
      }
    ],
    quizQuestions: [
      { question: "What does 'Garbage In, Garbage Out' mean?", options: ["AI eats trash", "If you give AI bad data, you get bad results", "AI recycles", "Computers are dirty"], correctIndex: 1, explanation: "The quality of the AI depends entirely on the quality of the data." },
      { question: "In the Chef analogy, what represents the Data?", options: ["The Oven", "The Chef", "The Ingredients", "The Customer"], correctIndex: 2, explanation: "Data is the raw material the AI cooks with." },
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
    description: 'Computers don\'t have eyes. They see the world as a giant grid of numbers. Let\'s look under the hood.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The Mosaic Analogy',
        body: 'Zoom in really close on your phone screen. What do you see? Tiny little colored squares. These are **Pixels**.\n\nTo a computer, a photo of a banana isn\'t a fruit. It\'s just an Excel sheet of numbers.\n- **255** means "Bright White".\n- **0** means "Dark Black".\n\nThe computer finds shapes by looking for changes in these numbers. If a bunch of 255s suddenly switch to 0s, the computer thinks: "Aha! That must be an edge."'
      },
      {
        type: ContentType.TEXT,
        heading: 'Cool Vision Powers',
        body: '1. **Object Detection:** Drawing a box around things. (e.g., A self-driving car drawing a box around a pedestrian).\n2. **Facial Recognition:** Measuring the distance between your eyes and the shape of your nose to create a "Face Password".\n3. **Medical Scanning:** AI can look at X-Rays faster than doctors to find broken bones.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: The Zoom Test',
        body: '1. Open a photo on your phone.\n2. Zoom in as much as possible until it looks blocky.\n3. Those blocks are what the AI sees. \n\nNotice how a "curved" line is actually just a staircase of squares? The AI does math on those squares to figure out it\'s a curve.'
      },
      {
        type: ContentType.AI_LAB,
        heading: 'Lab: Vision Analysis',
        body: 'Upload a photo of anything on your desk. See how the AI breaks it down and describes it.',
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
    description: 'How does ChatGPT work? It\'s actually just a super-powered autocomplete, like on your phone.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The "Autocomplete" Analogy',
        body: 'When you type "Happy" on your phone, it suggests "Birthday". \nWhy? Not because it knows you have a friend with a birthday. But because it has seen the words "Happy" and "Birthday" together millions of times.\n\n**ChatGPT is the same thing.** It doesn\'t "know" facts. It just predicts the next word based on probability. It is a "Statistical Parrot".'
      },
      {
        type: ContentType.TEXT,
        heading: 'Key Words',
        body: '- **NLP (Natural Language Processing):** Teaching computers to understand human languages (English, Spanish, Emoji).\n- **Token:** Computers don\'t read words. They read chunks called Tokens. The word "Reading" might be split into "Read" and "ing".\n- **Context:** The words *surrounding* a word. \n(e.g., "I went to the **bank** to fish" vs "I went to the **bank** to get cash". The surrounding words tell the AI which "bank" you mean.)'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Game: Guess the Next Word',
        body: 'Cover the screen and ask a friend to finish this sentence:\n\n*"The quick brown fox jumps over the _____"*\n\nThey will almost certainly say **"Dog"**. Why? Because that pattern is super common. AI works exactly the same way. It chooses the most likely next word.'
      },
      {
        type: ContentType.INTERACTIVE,
        body: "Try to confuse the Robot. I've programmed it to be very literal.",
        simulationConfig: {
          persona: "I am a literal robot. I do not understand slang.",
          objective: "Explain 'Break a leg' to the robot without confusing it.",
          successCondition: "If explained as 'Good luck', say [SUCCESS].",
          initialMessage: "Human, you said 'Break a leg'. Why do you want to harm bones?"
        }
      }
    ],
    quizQuestions: [
      { question: "What does NLP stand for?", options: ["New Laptop Purchase", "Natural Language Processing", "No Long Paragraphs", "Nice Little Puppy"], correctIndex: 1, explanation: "NLP is how computers handle human language." },
      { question: "How does ChatGPT write sentences?", options: ["It copies Wikipedia", "It predicts the next word based on probability", "It has a soul", "It uses a dictionary"], correctIndex: 1, explanation: "It guesses the next word, just like autocomplete." },
      { question: "What is a 'Token'?", options: ["A coin", "A chunk of text (word or part of a word)", "A password", "A game"], correctIndex: 1, explanation: "AI breaks text into small chunks called tokens." },
      { question: "Does AI 'know' facts?", options: ["Yes, it's a genius", "No, it just remembers patterns of words", "It asks Siri", "It guesses"], correctIndex: 1, explanation: "It doesn't know truth; it knows which words usually go together." },
      { question: "Why is Sarcasm hard for AI?", options: ["It has no humor", "Sarcasm means the opposite of the literal words", "It hates jokes", "It's rude"], correctIndex: 1, explanation: "AI struggles when words don't mean their literal definition." },
      { question: "What is 'Translation'?", options: ["Moving files", "Converting text from one language to another", "Deleting text", "Typing"], correctIndex: 1, explanation: "Like Google Translate turning English into Spanish." },
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
    description: 'AI models want to please you. Sometimes, they make things up just to give you an answer.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The "Pleaser" Personality',
        body: 'Imagine a student who is terrified of saying "I don\'t know." If you ask them a question, they will invent a confident lie rather than admit they don\'t know. \n\nAI is like this. It is designed to **finish the sentence**, not to tell the truth. If the most likely sentence is a lie, it will tell the lie. We call this a **Hallucination**.'
      },
      {
        type: ContentType.CASE_STUDY,
        heading: 'The Lawyer Who Got in Trouble',
        body: 'A lawyer used ChatGPT to write a document for court. The AI listed 6 court cases as evidence. \n*The Catch:* Those cases didn\'t exist! The AI made up fake names like "Varghese v. China Airlines" because they *sounded* like real cases. The lawyer got in huge trouble.'
      },
      {
        type: ContentType.TEXT,
        heading: 'How to Fix It: Grounding',
        body: 'Think of a "Closed Book" test vs an "Open Book" test.\n\n- **Standard AI (Closed Book):** It relies on its memory. It might misremember facts.\n- **Grounding (Open Book):** You give the AI access to Google Search or a document. It looks up the facts *before* answering. This stops it from lying.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: Catch the Lie',
        body: 'Ask the AI Tutor (turn OFF search): "Who is John Smithson from Mars who invented the hoverboard in 1999?"\n\nWatch how confidently it writes a biography for a person who DOES NOT EXIST. It will invent schools, awards, and dates. It is prioritizing *storytelling* over *truth*.'
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
    description: 'AI learns from humans. And humans... aren\'t perfect. We explore the dark side of algorithms.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The Mirror Effect',
        body: 'AI is like a mirror. It reflects humanity. \nIf we train the AI on the internet, and the internet has racism or sexism, the AI will learn to be racist or sexist.\n\n**Bias** is when the AI treats some people worse than others because of the bad patterns it learned.'
      },
      {
        type: ContentType.CASE_STUDY,
        heading: 'Amazon\'s Hiring Fail',
        body: 'Amazon built an AI to pick the best resumes. But for the last 10 years, most of their hires were men.\n\nThe AI learned the pattern: "Men = Good".\nIt started throwing away resumes that had the word "Women\'s" (like "Women\'s Chess Club"). Amazon had to delete the AI because it was sexist.'
      },
      {
        type: ContentType.TEXT,
        heading: 'The "Black Box" Problem',
        body: 'Imagine a teacher gives you an F, but refuses to tell you why.\n\nThat is a **Black Box**. We can see the answer the AI gives, but we don\'t always know *how* it decided. If an AI denies your bank loan, but can\'t explain why, is that fair?'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: Google "CEO"',
        body: 'Go to Google Images and search for "CEO". \nWhat do you see? Mostly men in suits? \n\nBecause history has mostly had male CEOs, the data teaches the AI that "CEO = Man". This is how bias happens.'
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
    description: 'Old AI could only analyze. New AI can create. Let\'s make art and movies.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'Artist vs. Critic',
        body: '- **Old AI (Discriminative):** It was a Critic. You show it a painting, and it says "That is a Cat".\n- **New AI (Generative):** It is an Artist. You say "Cat", and it *paints* one from scratch.'
      },
      {
        type: ContentType.TEXT,
        heading: 'How Image Gen Works (Diffusion)',
        body: 'Imagine looking at a cloud. It looks like nothing (static noise). Then you squint, and it starts to look like a bunny.\n\n**Diffusion Models** start with a screen of static (fuzz). Then they slowly remove the fuzz until a clear image appears. They are essentially "hallucinating" a picture from the noise.'
      },
      {
        type: ContentType.TEXT,
        heading: 'Parameters: The Creativity Dial',
        body: 'You can control how crazy the AI gets.\n- **Low Temperature:** The AI is boring, safe, and predictable.\n- **High Temperature:** The AI is wild, creative, and might make mistakes.'
      },
      {
        type: ContentType.AI_LAB,
        heading: 'Lab: Magic Editor',
        body: 'Upload a photo. Tell the AI to "Add sunglasses" or "Change the background to Mars". It paints new pixels that blend in perfectly.',
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
    description: 'The AI is smart, but it can\'t read your mind. You have to learn to ask for what you want.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'Be Specific!',
        body: 'If you tell a human "Write an email", they know what you mean. \nIf you tell an AI "Write an email", it will write a generic, boring email.\n\n**Better Prompt:**\n"Write a polite email to my boss, Sarah. Ask for next Friday off for a dentist appointment. Keep it under 50 words."\n\n**The Rule:** The more specific you are, the better the result.'
      },
      {
        type: ContentType.TEXT,
        heading: 'Pro Tip: Give Examples',
        body: 'This is called **Few-Shot Prompting**.\nInstead of just saying "Write a poem", say:\n\n"Here are 3 examples of poems I like: [Example 1], [Example 2], [Example 3]. Now write a new one just like these."\n\nThe AI will copy your style perfectly.'
      },
      {
        type: ContentType.TEXT,
        heading: 'Pro Tip: "Think Step-by-Step"',
        body: 'If you ask a math question, the AI might guess wrong. \nBut if you add the magic words **"Think step-by-step"**, the AI will show its work. This makes it much smarter at logic puzzles.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: The "Too Vague" Test',
        body: '1. Ask the AI: "Plan a trip." (See how bad the answer is).\n2. Ask the AI: "Plan a 3-day trip to Tokyo for a couple who loves anime and sushi, with a budget of $100 per day."\n\nSee the difference? Context is King.'
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
    description: 'Chatbots just talk. "Agents" can actually use the internet, open apps, and do work for you.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'Brain in a Jar vs. Brain with Hands',
        body: '- **Chatbot:** It\'s a Brain in a Jar. It can give advice, but it can\'t *do* anything.\n- **Agent:** It\'s a Brain with Hands. It has "Tools" like a Web Browser, Calculator, or Calendar access.\n\nExample: You ask "Book me a flight". A Chatbot says "Here is how you book a flight". An Agent actually goes to Expedia and books it.'
      },
      {
        type: ContentType.TEXT,
        heading: 'How Agents Work (The Loop)',
        body: 'Agents think in a loop:\n1. **Think:** "To book a flight, I first need to find the price."\n2. **Act:** *Opens Google Flights*\n3. **Observe:** "Okay, the price is $300."\n4. **Think:** "Now I need to ask the user if $300 is okay."\n\nIt keeps going until the job is done.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: Roleplay',
        body: 'Pretend you are an Agent. Your friend is the "Tool".\n\n1. Goal: Find the weather.\n2. You (Agent): "Command: Open Weather App."\n3. Friend (Tool): *Mimes opening app*\n4. You (Agent): "Command: Read temperature."\n\nThis is exactly how AI software works.'
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
    description: 'Will AI take your job? Probably not. But a human using AI might.',
    content: [
      {
        type: ContentType.TEXT,
        heading: 'The Centaur Model',
        body: 'In Chess, the best player in the world isn\'t a Human. It isn\'t a Computer. \nIt is a **Human + Computer** working together. They call this a "Centaur".\n\nDon\'t try to beat the AI. Try to work WITH it. Let it do the boring stuff (data entry, emails) so you can do the creative stuff (strategy, empathy).'
      },
      {
        type: ContentType.TEXT,
        heading: 'Automation vs. Augmentation',
        body: '- **Automation:** The Robot does the work *for* you. (e.g., A factory robot).\n- **Augmentation:** The Robot helps you do the work *better*. (e.g., An Iron Man suit).\n\nAim for Augmentation. Be Iron Man.'
      },
      {
        type: ContentType.ACTIVITY,
        heading: 'Activity: Career Map',
        body: 'List 3 things you want to do in your career.\n1. Which parts are repetitive? (Give those to AI)\n2. Which parts require human connection? (Keep those for yourself)\n\nFocus your skills on the Human parts.'
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
