// import axios from "axios";

// export const fetchDirections = async (origin, destination) => {
//     try {
//         const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=AIzaSyD3weTrIItxYGaJK-h4EUDIX_xrVLxGKX0`
//         );

//         if (response.data.status === "OK") {
//             const route = response.data.routes[0].overview_polyline.points;
//             return route;
//         }
//     } catch (error) {
//         console.error("Error fetching directions:", error);
//     }

//     return null;
// };
