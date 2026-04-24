import { useRating} from "../../context/RatingProvider";
import { Button } from "@chakra-ui/react";


const ControlBar = ( ) => {
    const {resetRatings} = useRating();

    return (
        <>
            <Button margin={"20px"} onClick={resetRatings} variant={"outline"} padding="2" colorPalette={"blue"} width={"100px"}>Reset</Button>
        </>
    )
}

export default ControlBar;