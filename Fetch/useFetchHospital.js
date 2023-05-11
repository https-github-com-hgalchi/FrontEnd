// import { useEffect } from "react";
// import axios from "axios";

// export const useFetchHospital = (address, setHospitalMarkers) => {
//     useEffect(() => {
//         if (address && address.length > 0) {
//             const fetchHospitals = async () => {
//                 try {
//                     const response = await axios.get(
//                         `http://localhost:8080/map/getLocationNear/HOSPITAL?addr=${encodeURIComponent(address)}`
//                     );
//                     const data = response.data;
//                     if (data.status === "OK" && data.body) {
//                         setHospitalMarkers(data.body);
//                     }
//                     console.log(encodeURIComponent(address))
//                 } catch (error) {
//                     console.log("Error fetching hospitals:", error);
//                 }
//             };
//             fetchHospitals();
//         }
//     }, [address, setHospitalMarkers]);
// };
