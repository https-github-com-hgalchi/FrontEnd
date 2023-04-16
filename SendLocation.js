import { useEffect } from "react";
import axios from "axios";

export const useSendLocation = (location) => {
    useEffect(() => {
        const sendLocationData = async (location) => {
            try {
                const response = await axios.post("http://localhost:8080/map/location", {
                    latitude: location.latitude,
                    longitude: location.longitude,
                });

                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (location) {
            sendLocationData(location);
        }
    }, [location]);
};
