import { useEffect } from "react";
import axios from "axios";

export const useFetchEmergency = (address, setEmergencyMarkers) => {
    useEffect(() => {
        if (address) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8080/map/getLocationNear/EMERGENCY?addr=${address.body[0].formatted_address.split(" ")[1]}`
                    );
                    // ${address}
                    console.log(address.body[0].formatted_address.split(" ")[1])
                    // console.log("Emergency data", response.data);
                    setEmergencyMarkers(response.data.body);
                } catch (error) {
                    console.error("Error fetching emergency markers:", error);
                }
            };

            fetchData();
        }
    }, [address, setEmergencyMarkers]);
};
