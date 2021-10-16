from flask import Flask, request
from flask_restx import Api, Resource
from cv_summarizer import summarize_after_split
from hanspell import spell_checker


app = Flask(__name__)
api = Api(app)

# 자기소개서 요약 API
@api.route("/summarize")
class Summarizer(Resource):
    def post(self):
        text = request.json.get("data")
        return {"text_origin": text, "text_summarized": summarize_after_split(text)}


# 맞춤법 검사 API
@api.route("/checkSpell")
class SpellChecker(Resource):
    def post(self):
        text = request.json.get("data")
        if len(text) > 500:
            raise Exception("맞춤법 검사 API에 들어가는 텍스트는 500자 미만이어야 합니다.")

        return {
            "text_origin": text,
            "text_spell_checked": spell_checker.check(text).checked,
        }


# API SERVER 실행 코드
if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=2040)
