import os
import openai
from dotenv import load_dotenv
from flask import Flask,request,jsonify


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app=Flask(__name__)

@app.route('/webhook',methods = ['GET','POST'])
def webhook():
    try:
        data = request.get_json()
        input = data['queryResult']['queryText']
        result = text_completion(input)
        if result['status'] == 1:
            return jsonify({
                'fulfillmentText' : result['response']
            })
    except Exception as e:
        print(e)
        pass
    return jsonify({
        'fulfillmentText' :'Something went wrong'
    })

def text_completion(input):
    try:
        response = openai.Completion.create(
        model="text-davinci-003",
        prompt=input,
        max_tokens=300,
        temperature=0
        )
        print(response.choices[0].text)
        return {
            'status':1,
            'response':response.choices[0].text
        }
    except Exception as e:
        print(e)
        return {
            'status':0
        }

if __name__ == '__main__':
    app.run(debug=True)