from typing import Callable, Coroutine, Any
import json
import dataclasses
import shutil
import os

import pydantic

import do
import enums
from download import download_task, unzip
from judge import Judge


class EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        return super().default(o)


def unmarshal_task(body: bytes) -> do.JudgeTask:
    return pydantic.parse_raw_as(do.JudgeTask, body.decode())


def marshal(obj) -> bytes:
    return json.dumps(obj, cls=EnhancedJSONEncoder).encode()


async def handle_report(directory_path: str, submission_id: int,
                        publish_func: Callable[[bytes, str], Coroutine[Any, Any, None]]):
    print('start handling report')
    filenames = os.listdir(directory_path)

    for filename in filenames:
        with open(directory_path + '/' + filename, 'r', encoding='utf-8') as file:
            file = json.load(file)
            title = file['results'][0]['suites'][0]['title']
            judge_cases = [do.JudgeCaseReport(title=title,
                                              description=test['title'],
                                              state=enums.JudgeCaseState.pass_
                                              if test['pass'] is True else enums.JudgeCaseState.fail,
                                              error_message=test['err']['message'] if 'message' in test[
                                                  'err'] else None)
                           for test in file['results'][0]['suites'][0]['tests']]

            judge_report = do.JudgeReport(submission_id=submission_id, total_passes=file['stats']['passes'],
                                          total_failures=file['stats']['failures'], judge_cases=judge_cases)

            judge_report = marshal(judge_report)
            print('report arranged, publishing...')
            await publish_func(judge_report, 'cypress_report_local')
            print('report published')

    print('finish handling report')


async def fail_report(submission_id: int, publish_func: Callable[[bytes, str], Coroutine[Any, Any, None]], error):
    judge_cases = [do.JudgeCaseReport(title='Compile Err', description=str(error), state=enums.JudgeCaseState.fail,
                                      error_message=None)]

    judge_report = do.JudgeReport(submission_id=submission_id, total_passes=0,
                                  total_failures=1, judge_cases=judge_cases)
    judge_report = marshal(judge_report)
    print('compiled error report arranged, publishing...')
    await publish_func(judge_report, 'cypress_report_local')
    print('compiled error report published')
    return


async def receive_task(body: bytes, publish_func: Callable[[bytes, str], Coroutine[Any, Any, None]]):
    task = unmarshal_task(body)
    try:
        if os.path.exists('/app/temp'):
            shutil.rmtree('/app/temp')
        print('making temp dir')

        os.mkdir('/app/temp')

        print('downloading task file')
        download_task(task)
        print('task file downloaded')

        print('unzipping files')
        unzip(from_path='/app/temp/src.zip', to_path='/app/hack1')
        unzip(from_path='/app/temp/cypress.zip', to_path='/app/hack1')
        print('files unzipped')

        if os.path.exists('/app/hack1/results'):
            shutil.rmtree('/app/hack1/results')
        os.mkdir('/app/hack1/results')

        with Judge():
            pass

        await handle_report(submission_id=task.submission_id, directory_path='/app/hack1/results',
                            publish_func=publish_func)

    except Exception as e:
        await fail_report(submission_id=task.submission_id, publish_func=publish_func, error=e)
        print(e)

    finally:
        shutil.rmtree('/app/temp')
        shutil.rmtree('/app/hack1/src')
        shutil.rmtree('/app/hack1/cypress')
        shutil.rmtree('/app/hack1/results')
