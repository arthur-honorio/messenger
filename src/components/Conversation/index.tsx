import { DocumentData } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { getRealtimeData } from "../../firebase/firestoreFunctions"
import { useContactsStore } from "../../states/contacts"
import { useLoggedUserStore } from "../../states/loggedUser"
import { MessagePropsTypes } from "../../types/types"
import { MessageInput } from "../MessageInput"
import { MessagesHeader } from "../MessagesHeader"
import { MessagesList } from "../MessagesList"
import moment from "moment"

import { Container } from "./style"

export const Conversation: React.FC = () => {
    const { selectedContact } = useContactsStore(state => state)
    const { loggedUser } = useLoggedUserStore(state => state)
    const [messages, setMessages] = useState<DocumentData>([])

    useEffect(() => {
        if (loggedUser && selectedContact) {
            const converstionId =
                selectedContact.uid > loggedUser.uid
                    ? selectedContact.uid + loggedUser.uid
                    : loggedUser.uid + selectedContact.uid

            getRealtimeData(
                data => getRealtimeMessages(data, setMessages),
                "messages",
                converstionId
            )
        }
    }, [selectedContact, loggedUser])

    const orderedMessages: MessagePropsTypes[] = messages.sort(
        (a: MessagePropsTypes, b: MessagePropsTypes) => {
            return +a.created_at - +b.created_at
        }
    )
    return (
        <Container className="conversation">
            <MessagesHeader />
            <hr />
            <MessagesList messages={orderedMessages} />
            <hr />
            <MessageInput />
        </Container>
    )
}

export const getRealtimeMessages = (
    data: DocumentData,
    callback: (arg: any) => void
) => {
    if (data) {
        const resultMessage: DocumentData[] = []
        Object.values(data)
            .sort((a, b) => a.created_at - b.created_at)
            .forEach((message, index, array) => {
                const isToday = moment(message.created_at).isSame(
                    moment(),
                    "day"
                )
                const isYesterday =
                    moment(message.created_at).diff(moment(), "day") === -1
                if (
                    index > 0 &&
                    !moment(array[index - 1].created_at).isSame(
                        moment(message.created_at),
                        "day"
                    )
                ) {
                    resultMessage.push(
                        {
                            divisor: `${moment(message.created_at).format(
                                `${
                                    isToday
                                        ? "[Hoje]"
                                        : isYesterday
                                        ? "[Ontem]"
                                        : "DD MMMM"
                                }`
                            )}`,
                        },
                        message
                    )
                } else {
                    resultMessage.push(message)
                }
            })
        callback(resultMessage)
    }
}
