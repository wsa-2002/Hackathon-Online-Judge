import os

from dotenv import dotenv_values

env_values = {
    **dotenv_values(".env"),
    **os.environ,
}


class AMQPConfig:
    host = env_values.get('AMQP_HOST')
    port = env_values.get('AMQP_PORT')
    username = env_values.get('AMQP_USERNAME')
    password = env_values.get('AMQP_PASSWORD')


amqp_config = AMQPConfig()