import { useState } from "react"
import { useParams} from "react-router-dom";


export const BookingFile = () => {

    const [dataBookin, setDataBooking] = useState([]);

    const { id } = useParams();

    console.log(id);

    return(
        <>
            <h2>Ficha de reserva</h2>
        </>
    )

}