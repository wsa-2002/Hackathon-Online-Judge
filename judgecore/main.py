from amqp import receive_task, unmarshal_task, fail_report
from config import amqp_config

import asyncio
import aio_pika
from aio_pika.pool import Pool


async def main():

    loop = asyncio.get_running_loop()

    async def get_connection():
        return await aio_pika.connect_robust(
            host=amqp_config.host,
            port=amqp_config.port,
            login=amqp_config.username,
            password=amqp_config.password,
            timeout=300,
        )
    print('amqp connecting...')
    connection_pool = Pool(get_connection, max_size=10, loop=loop)

    async def get_channel() -> aio_pika.Channel:
        async with connection_pool.acquire() as connection:
            return await connection.channel()

    channel_pool = Pool(get_channel, max_size=10, loop=loop)
    consume_name = "cypress_local"

    print('amqp connected')

    async def consume():
        async with channel_pool.acquire() as channel:  # type: aio_pika.Channel
            await channel.set_qos(10)

            queue = await channel.declare_queue(
                consume_name, durable=True, auto_delete=False
            )

            async with queue.iterator() as queue_iter:
                async for message in queue_iter:
                    try:
                        print('task received, handling')
                        await receive_task(message.body, publish_func=publish)
                    except Exception as e:
                        print('message nacked, exception=', e)
                        task = unmarshal_task(message.body)
                        await fail_report(submission_id=task.submission_id, publish_func=publish, error=e)
                        await message.nack(requeue=False)
                    else:
                        print('task finished')
                        try:
                            await message.ack()
                        except:
                            await channel.reopen()

    async def publish(message: bytes, queue_name: str) -> None:
        async with channel_pool.acquire() as channel:  # type: aio_pika.Channel
            await channel.default_exchange.publish(
                aio_pika.Message(body=message),
                routing_key=queue_name,
            )

    print('amqp consumer creating')
    async with connection_pool, channel_pool:
        task = loop.create_task(consume())
        print('amqp consumer created, waiting for task...')
        await task

if __name__ == "__main__":
    asyncio.run(main())
