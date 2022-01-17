import subprocess
import time
from datetime import datetime


class Judge:
    def __init__(self):
        pass

    def __enter__(self):
        try:
            print('judge start, time:', datetime.now())
            subprocess.Popen('cd /app/hack1 && yarn start', shell=True)

            time.sleep(40)  # FIXME: buffer for build, need further discussion or modify implementation

            subprocess.call('cd /app/hack1 && yarn test', shell=True)
        except:
            subprocess.call('cd /app/hack1 && yarn stop', shell=True)

    def __exit__(self, exc_type, exc_value, traceback):
        print(f'{exc_type=}, {exc_value=}, {traceback=}')
        subprocess.call('cd /app/hack1 && yarn stop', shell=True)
        print('judge finished, time:', datetime.now())
