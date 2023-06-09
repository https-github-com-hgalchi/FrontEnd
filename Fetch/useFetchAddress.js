import { useEffect } from "react";
import axios from "axios";

export const useFetchAddress = (location, setAddress) => {
    useEffect(() => {
        if (location) {
            const { latitude, longitude } = location;

            axios
                .get("http://localhost:8080/map/getLocation", {
                    params: {
                        lat: latitude,
                        lng: longitude,
                    },
                })
                .then((response) => {
                    console.log(latitude, longitude);
                    console.log("Address data", response.data.body[0].formatted_address);
                    setAddress(response.data.body[0].formatted_address);
                })
                .catch((error) => {
                    // console.log(latitude, longitude, "asdf")
                    console.log("Error fetching Address data:", error);
                });
        }
    }, [location]);
};
