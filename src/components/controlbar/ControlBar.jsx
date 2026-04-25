import { useRating} from "../../context/RatingProvider";
import { Button } from "@chakra-ui/react";
import classes from "./controlbar.module.css"
import {useEpisode} from "../../context/EpisodeProvider";


const ControlBar = ( ) => {
    const {resetRatings} = useRating();
    const {sort, changeSort} = useEpisode();


    return (
        <>
        <div className={classes.container}>

            <Button margin={"20px"} onClick={resetRatings} variant={"subtle"} padding="2" colorPalette={"red"} width={"100px"}>Reset Ratings</Button>
            <Button margin={"20px"} onClick={changeSort} variant={"outline"} padding="2" colorPalette={"yellow"} >Sort Episodes: {sort}</Button>
        </div>
        </>
    )
}

export default ControlBar;