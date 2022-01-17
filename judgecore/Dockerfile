FROM nikolaik/python-nodejs

RUN apt-get -y update && apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb

RUN apt-get install -y psmisc

COPY . ./app
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
