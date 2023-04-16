import { useEffect } from "react";
import axios from "axios";

export const useFetchData = (location, setMarkers) => {
    useEffect(() => {
        if (location) {
            // axios 사용 버전
            const { latitude
                , longitude } = location;
            axios
                .get("http://localhost:8080/map/location", {
                    params: {
                        latitude,
                        longitude,
                    },
                })
                .then((response) => {
                    console.log(latitude, longitude);
                    console.log("suc");
                    setMarkers(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [location]);
};