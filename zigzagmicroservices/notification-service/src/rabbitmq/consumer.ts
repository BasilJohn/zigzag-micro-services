import {connectRabbitMQ} from '../rabbitmq/rabbitmq'
import { sendNotification } from '../services/notificationService'

export const consumeEventNotification= async ()=>{
    const channel = await connectRabbitMQ()

    channel.consume('EVENT_NOTIFICATIONS',(message)=>{
        if(message){
            const eventData = JSON.parse(message.content.toString())
            sendNotification(eventData)
            //Important! Tell RabbitMQ: "I received and processed it"
            channel.ack(message)
        }
    })

    console.log('🚀 Notification Service is listening for event notifications...');

}