import urllib.request
import zipfile

import do


def unzip(from_path, to_path):
    with zipfile.ZipFile(from_path, 'r') as zip_ref:
        zip_ref.extractall(to_path)


def download_task(task: do.JudgeTask):
    print(task.submission_url, task.problem_url)
    urllib.request.urlretrieve(task.submission_url, '/app/temp/src.zip')
    urllib.request.urlretrieve(task.problem_url, '/app/temp/cypress.zip')
