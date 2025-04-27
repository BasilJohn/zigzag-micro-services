import { consumeEventNotification } from "./rabbitmq/consumer"

const start = async ()=>{
    await consumeEventNotification()
}

export default start