import random

def run_quiz():
    questions = [
        {"question": "What is the purpose of loops in programming?", "options": ["To execute code repeatedly", "To define variables", "To store data", "To create classes"], "answer": "To execute code repeatedly"},
        {"question": "Which search method continuously halves the search space?", "options": ["Linear Search", "Bisection Search", "Brute Force", "Recursive Search"], "answer": "Bisection Search"},
        {"question": "What is a lambda function in Python?", "options": ["A function without a name", "A recursive function", "A loop structure", "A type of class"], "answer": "A function without a name"},
        {"question": "Which of the following data types are mutable?", "options": ["Tuples", "Strings", "Lists", "Integers"], "answer": "Lists"},
        {"question": "What is the purpose of assertions in Python?", "options": ["To raise errors in case of false conditions", "To create loops", "To define dictionaries", "To sort lists"], "answer": "To raise errors in case of false conditions"},
        {"question": "Which concept allows one class to inherit attributes from another class?", "options": ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"], "answer": "Inheritance"},
        {"question": "What is aliasing in Python?", "options": ["Creating a duplicate object", "Two variables referring to the same object", "Changing object properties", "A type of function"], "answer": "Two variables referring to the same object"},
        {"question": "What is the base case in recursion?", "options": ["The simplest case that stops recursion", "A loop that calls itself", "A function parameter", "A variable assignment"], "answer": "The simplest case that stops recursion"},
        {"question": "What is Big O notation used for?", "options": ["Measuring code complexity", "Sorting lists", "Defining loops", "Creating functions"], "answer": "Measuring code complexity"},
        {"question": "Which sorting algorithm has the worst-case complexity of O(n^2)?", "options": ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"], "answer": "Bubble Sort"},
        {"question": "What does the `hash()` function do in Python?", "options": ["Returns a unique integer for immutable objects", "Sorts a list", "Creates a new object", "Returns the size of an object"], "answer": "Returns a unique integer for immutable objects"},
        {"question": "Which library is commonly used for data visualization in Python?", "options": ["NumPy", "Pandas", "Matplotlib", "Requests"], "answer": "Matplotlib"},
        {"question": "What does multithreading allow a program to do?", "options": ["Run multiple tasks concurrently", "Store multiple values in a list", "Sort a dictionary", "Create a function"], "answer": "Run multiple tasks concurrently"},
        {"question": "What is a real-life example of a queue data structure?", "options": ["A stack of plates", "A line at a supermarket", "A bookshelf", "A dictionary lookup"], "answer": "A line at a supermarket"},
        {"question": "What is an example of an immutable data type?", "options": ["List", "Dictionary", "Tuple", "Set"], "answer": "Tuple"},
        {"question": "What is the purpose of file handling in Python?", "options": ["To read and write files", "To create loops", "To store variables", "To define classes"], "answer": "To read and write files"},
        {"question": "Which Python keyword is used to handle exceptions?", "options": ["catch", "handle", "try", "error"], "answer": "try"},
        {"question": "What does OOP stand for?", "options": ["Only Odd Programs", "Object-Oriented Programming", "Overriding Operator Precedence", "Optimized Output Processing"], "answer": "Object-Oriented Programming"},
        {"question": "Which sorting algorithm is the fastest on average?", "options": ["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort"], "answer": "Quick Sort"},
        {"question": "What is the purpose of the 'self' keyword in Python classes?", "options": ["To define a static method", "To reference the instance of a class", "To create a loop", "To handle exceptions"], "answer": "To reference the instance of a class"},
        {"question": "What is the difference between '==' and 'is' in Python?", "options": ["They are the same", "'==' checks value equality, 'is' checks identity", "'is' checks value equality, '==' checks identity", "None of the above"], "answer": "'==' checks value equality, 'is' checks identity"},
        {"question": "What is the primary purpose of a loop in programming?", "options": ["To execute a block of code repeatedly", "To store data", "To define functions", "To handle errors"], "answer": "To execute a block of code repeatedly"},
        {"question": "How does binary search work?", "options": ["By checking each element sequentially", "By dividing the search space in half each time", "By randomly guessing an index", "By using a hash table"], "answer": "By dividing the search space in half each time"},
        {"question": "Which data type is prone to precision errors?", "options": ["Integers", "Booleans", "Floats", "Strings"], "answer": "Floats"},
        {"question": "What is bisection search used for?", "options": ["Sorting elements", "Finding approximate solutions", "Encrypting data", "Checking loops"], "answer": "Finding approximate solutions"},
        {"question": "What does decomposition help with in problem-solving?", "options": ["Making a problem harder", "Breaking a complex problem into smaller parts", "Skipping steps in solving", "Avoiding coding"], "answer": "Breaking a complex problem into smaller parts"},
        {"question": "Which of the following is immutable?", "options": ["List", "Dictionary", "Tuple", "Set"], "answer": "Tuple"},
        {"question": "What is the main benefit of using lambda functions?", "options": ["They run faster than normal functions", "They allow one-line anonymous functions", "They replace all functions", "They modify tuples"], "answer": "They allow one-line anonymous functions"},
        {"question": "Which of the following is a key-value data structure?", "options": ["List", "Dictionary", "Tuple", "Set"], "answer": "Dictionary"},
        {"question": "What is an assertion used for in Python?", "options": ["To handle errors", "To check a condition that must be true", "To store values", "To repeat a loop"], "answer": "To check a condition that must be true"},
        {"question": "What is the purpose of classes in Python?", "options": ["To store functions only", "To structure code using objects", "To loop through lists", "To optimize execution speed"], "answer": "To structure code using objects"},
        {"question": "What is inheritance in Object-Oriented Programming?", "options": ["Copying a function", "Deriving properties from a parent class", "Looping through a dataset", "Sorting data"], "answer": "Deriving properties from a parent class"},
        {"question": "What problem does aliasing cause?", "options": ["Slower performance", "Accidental changes to shared data", "Syntax errors", "Excessive memory use"], "answer": "Accidental changes to shared data"},
        {"question": "What is a common debugging technique?", "options": ["Print statements", "Ignoring errors", "Skipping tests", "Deleting files"], "answer": "Print statements"},
        {"question": "What does Big O notation measure?", "options": ["Code readability", "Worst-case time complexity", "Programming style", "Memory usage only"], "answer": "Worst-case time complexity"},
        {"question": "Which sorting algorithm is fastest in most cases?", "options": ["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort"], "answer": "Quick Sort"},
        {"question": "What is recursion?", "options": ["A function calling itself", "A loop repeating a process", "A debugging technique", "A method for sorting lists"], "answer": "A function calling itself"},
        {"question": "What does hashing help with?", "options": ["Loop execution", "Quick data retrieval", "Sorting lists", "Memory allocation"], "answer": "Quick data retrieval"},
        {"question": "Why do we use simulations?", "options": ["To create real-world scenarios", "To avoid using algorithms", "To eliminate debugging", "To make programs slower"], "answer": "To create real-world scenarios"},
        {"question": "What is the purpose of unit testing?", "options": ["To test a single part of code", "To slow down execution", "To delete bugs automatically", "To create new functions"], "answer": "To test a single part of code"},
        {"question": "Which function measures execution time in Python?", "options": ["print()", "time.time()", "debug()", "log()"], "answer": "time.time()"},
        {"question": "What does the term 'mutability' refer to?", "options": ["The ability to be changed", "The ability to store large data", "The execution speed of functions", "The efficiency of a loop"], "answer": "The ability to be changed"},
        {"question": "How does binary search improve efficiency?", "options": ["By checking elements randomly", "By reducing the search space by half each step", "By sorting data automatically", "By using multiple loops"], "answer": "By reducing the search space by half each step"},
        {"question": "What is the main advantage of list comprehension?", "options": ["It makes code more readable and concise", "It speeds up execution significantly", "It eliminates the need for loops", "It works only with numbers"], "answer": "It makes code more readable and concise"},
        {"question": "What is an example of an iterative process?", "options": ["Solving a Sudoku puzzle systematically", "Guessing randomly", "Instantly knowing the answer", "Ignoring the problem"], "answer": "Solving a Sudoku puzzle systematically"},
        {"question": "Which loop is best for iterating over a known range?", "options": ["for loop", "while loop", "do-while loop", "recursive function"], "answer": "for loop"},
        {"question": "What does binary search require to function correctly?", "options": ["An unordered dataset", "A sorted dataset", "A random dataset", "A small dataset"], "answer": "A sorted dataset"},
        {"question": "What is the main limitation of floating-point numbers?", "options": ["They use too much memory", "They have precision errors", "They can't represent whole numbers", "They are always accurate"], "answer": "They have precision errors"},
        {"question": "What does the bisection search method help with?", "options": ["Finding exact solutions only", "Finding approximate solutions efficiently", "Sorting numbers in a list", "Multiplying numbers"], "answer": "Finding approximate solutions efficiently"},
        {"question": "What does decomposition help with in problem-solving?", "options": ["Breaking a problem into smaller parts", "Making a problem more complicated", "Ignoring unnecessary details", "Speeding up calculations"], "answer": "Breaking a problem into smaller parts"},
        {"question": "Which of the following is immutable?", "options": ["Lists", "Tuples", "Dictionaries", "Sets"], "answer": "Tuples"},
        {"question": "What is a lambda function in Python?", "options": ["A named function", "An anonymous one-line function", "A loop construct", "A class method"], "answer": "An anonymous one-line function"},
        {"question": "How does exception handling improve programs?", "options": ["By crashing the program", "By handling errors gracefully", "By making debugging harder", "By making code slower"], "answer": "By handling errors gracefully"},
        {"question": "What is the main benefit of using classes in Python?", "options": ["They speed up execution", "They improve reusability and organization", "They make code longer", "They eliminate bugs"], "answer": "They improve reusability and organization"},
        {"question": "Which concept allows child classes to use methods from parent classes?", "options": ["Encapsulation", "Inheritance", "Recursion", "Iteration"], "answer": "Inheritance"},
        {"question": "What does aliasing in Python refer to?", "options": ["Copying a list", "Referencing the same object with different names", "Deleting a variable", "Creating a new object"], "answer": "Referencing the same object with different names"},
        {"question": "What is the advantage of list comprehension?", "options": ["It makes loops unnecessary", "It provides a concise way to create lists", "It makes code harder to read", "It is slower than loops"], "answer": "It provides a concise way to create lists"},
        {"question": "Which of the following is an example of recursion?", "options": ["A function calling itself", "A function running in a loop", "A function returning a value", "A function with multiple parameters"], "answer": "A function calling itself"},
        {"question": "Which algorithmic notation describes the worst-case performance of an algorithm?", "options": ["Theta", "Big O", "Lambda", "Alpha"], "answer": "Big O"},
        {"question": "Which sorting algorithm generally has the best average-case time complexity?", "options": ["Bubble Sort", "QuickSort", "Selection Sort", "Insertion Sort"], "answer": "QuickSort"},
        {"question": "What is hashing primarily used for?", "options": ["Sorting numbers", "Quick data retrieval", "Encrypting passwords", "Generating random numbers"], "answer": "Quick data retrieval"},
        {"question": "What is the purpose of unit testing?", "options": ["To slow down execution", "To verify individual components of a program", "To obfuscate code", "To make debugging harder"], "answer": "To verify individual components of a program"},
        {"question": "What does plotting help with in data analysis?", "options": ["Making data visualization easier", "Adding complexity to data", "Eliminating the need for data analysis", "Hiding trends in data"], "answer": "Making data visualization easier"}
    ]

    # No additional questions are added; all existing questions will be used.
    score = 0
    for index, q in enumerate(questions, start=1):  # Ask all questions without shuffling
        print(f"{index}. {q['question']}")
        for i, option in enumerate(q['options'], start=1):
            print(f"  {i}. {option}")
        
        while True:
            try:
                user_answer = int(input("Your answer (1-4): "))
                if 1 <= user_answer <= 4:
                    break
                else:
                    print("Invalid choice, please choose a number between 1 and 4.")
            except ValueError:
                print("Invalid input, please enter a number.")
        
        if q['options'][user_answer - 1] == q['answer']:
            print("Correct! ✅")
            score += 1
        else:
            print(f"Wrong ❌. The correct answer is: {q['answer']}")
        print("\n")
    
    print(f"Quiz Complete! Your final score: {score}/100")
    percentage = (score / 100) * 100
    print(f"Percentage: {percentage:.2f}%")
    if percentage >= 75:
        print("Great job! 🎉")
    elif percentage >= 50:
        print("Good effort! 👍 Keep practicing.")
    else:
        print("Keep studying! 💡 You'll get better with practice.")

if __name__ == "__main__":
    run_quiz()
