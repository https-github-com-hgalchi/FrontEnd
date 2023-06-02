import { useEffect } from "react";
import axios from "axios";

export const useFetchEmergency = (location, setEmergencyMarkers) => {
    useEffect(() => {
        if (location) {
            const fetchData = async () => {
                try {
                    // const addr =
                    // address.body &&
                    //     address.body[0] &&
                    //     address.body[0].formatted_address
                    //     ? address.body[0].formatted_address.split(" ")[1]
                    //     : "";
                    const response = await axios.get(
                        `http://localhost:8080/map/getLocationNear/EMERGENCY?lat=${location.latitude}&lng=${location.longitude}`
                    );
                    // lat=${location.latitude}&lng=${location.longitude}
                    //${address.body[0].formatted_address.split(" ")[1]}
                    // ${address}
                    // lat=37.336059&lng=127.249637
                    // 37.541895 127.188426 =>이 주소로 실행하면 안나옴=>주위 반경 일정 부분 안에 병원 없으면 아예 안나오는 경우 있음
                    //위도 경도 소수점 너무 길어지는 주소면 오류 나옴
                    // console.log(address.body[0].formatted_address.split(" ")[1])
                    console.log("Emergency data", response.data);
                    console.log(location.latitude, location.longitude, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    setEmergencyMarkers(response.data.body1);
                } catch (error) {
                    console.error("Error fetching emergency markers:", error);
                }
            };

            fetchData();
        }
    }, [location, setEmergencyMarkers]);
};
