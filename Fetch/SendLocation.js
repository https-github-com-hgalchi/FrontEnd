import { useEffect } from "react";
import axios from "axios";

const useSendLocation = (location) => {
    useEffect(() => {
        const sendLocationData = async (location) => {
            try {
                const response = await axios.post("http://localhost:8080/map/getLocation", {
                    latitude: location.latitude,
                    longitude: location.longitude,
                });

                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (location) {
            sendLocationData(location);
        }
    }, [location]);
};

export default useSendLocation;