import { message } from "antd"
import React, { useState, useEffect } from "react"

function ConnectNetwork() {

    const [isOnline, setIsOnline] = useState(window.navigator.onLine)

    useEffect(() => {
        function updateOnlineStatus() {
            setIsOnline(window.navigator.onLine)
        }

        window.addEventListener("online", updateOnlineStatus)
        window.addEventListener("offline", updateOnlineStatus)

        return () => {
            window.removeEventListener("online", updateOnlineStatus)
            window.removeEventListener("offline", updateOnlineStatus)
        }
    }, [])

    useEffect(() => {
        if (!isOnline) {
            message.warning("Có vẻ kết nối mạng của bạn không ổn định !")
        }
    }, [isOnline])

    return <></>
}

export default ConnectNetwork
