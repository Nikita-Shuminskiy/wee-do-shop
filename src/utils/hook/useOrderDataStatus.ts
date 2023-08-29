import {useEffect, useState} from "react";
import io from "socket.io-client";
import {BASE_URL} from "../../api/config";
import {StatusType} from "../../api/ordersApi";

export const useOrderDataStatus = ({orderId}) => {
    const [status, setStatus] = useState<StatusType>()
    useEffect(() => {
        const socket = io(BASE_URL);
        socket.on('connect', () => {

        });
        socket.on(`orderStatusUpdated:${orderId}`, (data: { orderId: string, status: StatusType }) => {
            setStatus(data.status)
        })
    }, []);

    return {
        status
    }
}
