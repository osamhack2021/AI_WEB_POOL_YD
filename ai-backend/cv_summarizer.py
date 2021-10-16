# 자소서 요약 API
# KoBART 기반
import torch
from kobart import get_kobart_tokenizer
from transformers.models.bart import BartForConditionalGeneration


def load_model():
    model = BartForConditionalGeneration.from_pretrained("./kobart_summary")
    return model


# 텍스트 요약
def summarize(text_origin):
    model = load_model()
    tokenizer = get_kobart_tokenizer()

    text = text_origin.replace("\n", "")
    input_ids = tokenizer.encode(text)
    input_ids = torch.tensor(input_ids)
    input_ids = input_ids.unsqueeze(0)
    output = model.generate(
        input_ids,
        eos_token_id=1,
        max_length=1024,
        num_beams=10,
        no_repeat_ngram_size=5,
    )
    output = tokenizer.decode(output[0], skip_special_tokens=True)
    return output


# 텍스트를 문단별로 분리
def split_paragraph(text_origin):
    paragraphs = text_origin.split("\n\n")
    return paragraphs


# 텍스트를 문단별로 분리하여 요약
def summarize_after_split(text_origin):
    splited_paragraphs = split_paragraph(text_origin)
    summarized_text = ""
    for paragraph in splited_paragraphs:
        summarized_paragraph = summarize(paragraph)
        summarized_text = summarized_text + " " + summarized_paragraph
    return summarized_text


# TEST CODE
if __name__ == "__main__":
    import pandas as pd

    cv_data = pd.read_csv("data/cover-letter.csv")
    single_data = cv_data.loc[0]
    text_origin = single_data["answers"].replace("<", "").split(">")[2]

    output = summarize(text_origin)

    print("원문")
    print(text_origin)

    print("\n요약")
    print(output)
