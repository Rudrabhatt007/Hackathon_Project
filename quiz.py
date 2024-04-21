from pprint import pprint
import nltk
nltk.download('stopwords')
from Questgen import main
# payload = {
#             "input_text": "Sachin Ramesh Tendulkar is a former international cricketer from India and a former captain of the Indian national team. He is widely regarded as one of the greatest batsmen in the history of cricket. He is the highest run scorer of all time in International cricket."
#         }
def quiz():
    with open("transcript.txt", "r") as f:
        content = f.read()
        payload = {
                    "input_text": content
                }
        qg = main.QGen()
        output = qg.predict_mcq(payload)
        with open("quiz.txt", "w") as f:
                f.write("Question: ")
                f.write(output["questions"][0]["question_statement"])
                f.write("\n")
                f.write("Options: ")
                f.write(output["questions"][0]["options"][0])
                f.write(" , ")
                f.write(output["questions"][0]["options"][1])
                f.write(" , ")
                f.write(output["questions"][0]["options"][2])
                f.write(" , ")
                f.write(output["questions"][0]["answer"])
                f.write("")
                f.write("\n")
                f.write("Answer: ")
                f.write(output["questions"][0]["answer"])
        pprint (output)
        return None;
