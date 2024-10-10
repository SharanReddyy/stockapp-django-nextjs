FROM python:3.10-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    pkg-config \
    default-libmysqlclient-dev \
    cron \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN echo "*/2 * * * * cd /app && /usr/local/bin/python manage.py fetch_data >> /var/log/cron.log 2>&1" > /etc/cron.d/fetch_data \
    && chmod 0644 /etc/cron.d/fetch_data \
    && crontab /etc/cron.d/fetch_data

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate && cron && python manage.py runserver 0.0.0.0:8000"]