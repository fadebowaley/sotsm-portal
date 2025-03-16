# Python Interactive Quiz

# Define the questions, options, and correct answers
questions = [
    {
        "question": "Which of the following is used for **iterating over a sequence**?",
        "options": ["A) if-else", "B) while loop", "C) try-except", "D) def function"],
        "answer": "B"
    },
    {
        "question": "What is the **approximation method** used to find square roots efficiently?",
        "options": ["A) Newton’s Method", "B) Bubble Sort", "C) Recursion", "D) Brute Force"],
        "answer": "A"
    },
    {
        "question": "Which **search algorithm** works by halving the search space each step?",
        "options": ["A) Linear Search", "B) Binary Search", "C) DFS", "D) BFS"],
        "answer": "B"
    },
    {
        "question": "Which Python function allows defining a function **without a name**?",
        "options": ["A) def", "B) lambda", "C) return", "D) map"],
        "answer": "B"
    },
    {
        "question": "What is a **mutable** Python data structure?",
        "options": ["A) Tuple", "B) List", "C) String", "D) Float"],
        "answer": "B"
    },
    {
        "question": "Which data structure **stores key-value pairs**?",
        "options": ["A) List", "B) Set", "C) Dictionary", "D) Tuple"],
        "answer": "C"
    },
    {
        "question": "What does **OOP inheritance** enable?",
        "options": ["A) Code duplication", "B) Code reuse", "C) Faster loops", "D) Debugging"],
        "answer": "B"
    },
    {
        "question": "What is the **base class** in Python?",
        "options": ["A) Parent class", "B) Child class", "C) Function", "D) Object"],
        "answer": "A"
    },
    {
        "question": "Which of the following is a **sorting algorithm**?",
        "options": ["A) Quick Sort", "B) Recursion", "C) BFS", "D) Hashing"],
        "answer": "A"
    },
    {
        "question": "Which **complexity class** represents exponential growth?",
        "options": ["A) O(1)", "B) O(log n)", "C) O(n^2)", "D) O(2^n)"],
        "answer": "D"
    },
]

# Initialize score counter
score = 0

print("\n🔥 Welcome to the Python Interactive Quiz! 🔥\n")
print("Type A, B, C, or D for each question.\n")

# Loop through questions
for i, q in enumerate(questions):
    print(f"📌 Question {i+1}: {q['question']}")
    for option in q["options"]:
        print(option)
    
    # Get user input
    user_answer = input("Your Answer: ").strip().upper()

    # Validate input
    while user_answer not in ["A", "B", "C", "D"]:
        print("❌ Invalid choice. Please enter A, B, C, or D.")
        user_answer = input("Your Answer: ").strip().upper()

    # Check answer
    if user_answer == q["answer"]:
        print("✅ Correct!\n")
        score += 1
    else:
        print(f"❌ Wrong! The correct answer was {q['answer']}.\n")

# Show final score
print(f"🎯 Quiz Completed! Your final score: {score}/{len(questions)}")

if score == len(questions):
    print("🏆 Excellent! You mastered the topic.")
elif score >= len(questions) * 0.7:
    print("👍 Great job! Keep practicing.")
elif score >= len(questions) * 0.5:
    print("📖 Good effort! Review the concepts again.")
else:
    print("😞 Keep learning! Try again.")
