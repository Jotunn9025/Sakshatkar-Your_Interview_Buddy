# Sakshatkar - Your Interview Buddy

## Inspiration
The software industry is projected to grow 31% globally in the next few years. The number of opportunities for budding developers is very high. Yet, the competition for getting into top tech companies is very stiff. Technical interviews form a big challenge. Therefore, we are inspired to come up with a solution that would help them prepare for interviews but also helps solve the problem that candidates usually face: no proper guidance, limited time, and anxiety about interviews.

## What We Learned
During the development of **Sakshatkar**, we gained insights into the nuances of interview preparation and the potential of AI in personalizing the learning experience. We learned:
- The importance of real-time doubt clearing to mimic actual interview scenarios.
- Techniques to manage and reduce interview anxiety through guided practice.
- The value of context-aware responses in AI to make the preparation more relevant and efficient.

## How We Built Sakshatkar
**Sakshatkar** is built to facilitate a seamless, distraction-free experience for interview preparation. Here is how it is done:

1. **Fetch Question**: A facility was designed for users to input links from the likes of LeetCode or CodeChef. Applying web scraping methods and using DevTools, the relevant HTML elements containing the question details were determined, and these could be fetched in a recursive manner.

2. **Integrated Code IDE**: For making the preparation smoother, we added a text editor in which a user can write and test the code while being assisted by our AI Chatbot.
 
3. **AI-Powered Interaction**: Our advanced NLP model powered AI chatbot interacts with users by giving hints, answering questions, or giving feedback to them. To make sure the chatbot preserves context across sessions, we gave responses tailored according to the requirements of the users.

## Challenges Faced

### Challenge #1: Preserving Chat Sessions
- **Problem**: Maintaining chat history between various sessions and questions.
- **Solution**: We used `localStorage` to store messages, and each conversation was tied to the question title and platform URL to make unique storage objects.

### Challenge #2: Designing Good Prompts
- **Problem**: Creating prompts that will encourage the AI model to produce the desired responses without giving away full solutions when only hints are required.
- **Solution**: Through research and experimentation, we fine-tuned our prompts, using public resources and creating placeholder texts to enhance user experience.

Conclusion
Sakshatkar - Your Interview Buddy is designed to be a holistic solution for software developers preparing for technical interviews. It integrates question fetching, a code IDE, and AI-driven guidance to deliver a personalized and efficient preparation experience. Our journey in building Sakshatkar has taught us a lot about problem-solving, user experience design, and the potential of AI in education.

---
