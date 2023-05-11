import { useEffect } from "react";
import axios from "axios";

export const useFetchAddress = (location, setAddress) => {
    useEffect(() => {
        if (location) {
            const { latitude, longitude } = location;

            axios
                .get("http://localhost:8080/map/getLocation", {
                    params: {
                        latitude,
                        longitude,
                    },
                })
                .then((response) => {
                    // console.log(latitude, longitude);
                    // console.log("Address data", response.data);
                    setAddress(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [location]);
};
