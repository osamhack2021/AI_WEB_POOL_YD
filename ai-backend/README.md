# AI-Backend
python 기반으로 작동하는 기능들과, 고성능을 요구하는 AI 기능들을 위한 전용 백앤드 서버 코드입니다.

## 설치 안내 (Installation Process)
AI-Backend 서버 구동에 필요한 라이브러리들을 다운받아 줍니다.
```shell
$ pip install -r requirements.txt
$ gh repo clone ssut/py-hanspell
$ cd py-hanspell/
$ python setup.py install
```

[KoBART](https://github.com/SKT-AI/KoBART) 설치
```shell
$ pip install git+https://github.com/SKT-AI/KoBART#egg=kobart
```

[KoBART-summarization](https://github.com/seujung/KoBART-summarization) binary 파일 다운로드
```shell
$ gh repo clone seujung/KoBART-summarization
$ pip install gdown
$ python download_binary.py
```

[KoBART-summarization Fine-Tuened Model](https://github.com/EugeneYoo/kobart_summarization_model) 다운로드
```shell
$ wget https://github.com/EugeneYoo/kobart_summarization_model/raw/main/kobart_summary.zip
$ unzip kobart_summary.zip
```

## 백앤드 서버 구동 (Running Backend Server)
아래 명령어를 실행하면 2040 포트로 서버가 실행됩니다.
```shell
$ python api_server.py
```

## API 명세
### 자기소개서 요약 API
- 자기소개서를 문단별로 분리하고, 각 문단을 짧은 문장으로 요약해줍니다.    

#### Request
`POST /summarize/`
```shell
curl -L -v -d '{"data": "<여기에 요약할 텍스트 입력>"}' -H "Accept: application/json" -H "Content-Type: application/json" 127.0.0.1:2040/summarize
```

#### Response
```json
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 405
Server: Werkzeug/2.0.2 Python/3.8.10
Date: Sat, 16 Oct 2021 06:32:31 GMT

{"text_origin": "<원본 텍스트>", "text_summarized": "<요약된 텍스트>"}
```


### 맞춤법 검사 API
- 텍스트의 맞춤법을 검사하고, 수정해줍니다.

#### Request
`POST /checkSpell/`
```shell
curl -L -v -d '{"data": "<여기에 고칠 텍스트 입력>"}' -H "Accept: application/json" -H "Content-Type: application/json" 127.0.0.1:2040/checkSpell
```

#### Response
```json
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 405
Server: Werkzeug/2.0.2 Python/3.8.10
Date: Sat, 16 Oct 2021 06:32:31 GMT

{"text_origin": "<원본 텍스트>", "text_spell_checked": "<고쳐진 텍스트>"}
```