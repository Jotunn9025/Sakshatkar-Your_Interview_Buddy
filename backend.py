# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from config import API_KEY

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


client = OpenAI(api_key=API_KEY)

@app.route('/process', methods=['POST'])
def process_input():
    try:
        data = request.get_json()
        input_string = data.get('inputString', '')

        # ?input exists
        if not input_string:
            return jsonify({'response': 'No input provided'}), 400

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are very good at explaining data structures,their use and applications. You are also good at algorithms and optimizing them. When asked about topics other than these Respond it is out of your purview. Dont give solutions unless asked give hints instead.You Can Also Take Mock Coding Interviews for budding software engineers"},
                    {"role": "user", "content": input_string}
                ],
                max_tokens=150
            )

            gpt_response = response.choices[0].message.content.strip()
            return jsonify({'response': gpt_response})

        except openai.error.OpenAIError as e:
            return jsonify({'response': f"OpenAI API error: {str(e)}"}), 500

    except Exception as e:
        print(f"Error:{e}")
        return jsonify({'response': f"Server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
