import { Card, CardBody } from "@chakra-ui/react";
import classes from "./episode.module.css";
import { RatingGroup } from "@chakra-ui/react";
import { Separator } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { CiStar } from "react-icons/ci";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react";
import { useRating } from "../../context/RatingProvider";
import { Box, Collapsible, Stack } from "@chakra-ui/react"
import { GoComment } from "react-icons/go";
import { useComment } from "../../context/CommentProvider";

const Episode = ({ id, name, airDate, episode }) => {
    const [openModal, setOpenModal] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [openComment, setOpenComment] = useState(false);

    const [comment, setComment] = useState("");


    const {addComment} = useComment();



    const { ratings, addRating } = useRating();


    const getAverage = (episodeId) => {
        if (!ratings[episodeId]) {
            return 0
        } else {
            const episodeRatings = ratings[episodeId];
            const ratingsSum = episodeRatings.reduce((total, value) => total + value, 0);
            const avg = (ratingsSum / (episodeRatings.length))
            // round to nearest 0.5
            return Math.round(avg * 2) / 2;
        }
    }

    const onSubmitRating = (episodeId, rating) => {
        addRating(episodeId, rating);
        setNewRating(0);
        setOpenModal(false);
    }

    const onSubmitComment = (episodeId, newComment) => {
        addComment(episodeId, newComment);
        setComment("");
        setOpenComment(false)
    }

    return (
        <>
            <Card.Root className={classes.cardContainer} width="600px" padding="2">
                <Card.Header>
                    <Card.Title textAlign="center">{`${episode} - ${name}`}</Card.Title>
                </Card.Header>
                <Card.Body padding="1">
                    <p>{`Air Date: ${airDate}`}</p>
                </Card.Body>
                <Card.Footer>
                    <RatingGroup.Root color="yellow" size="lg" count={5} readOnly value={getAverage(id)} allowHalf colorPalette={"yellow"}>
                        <RatingGroup.Label />
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control>
                            {/* <RatingGroup.Item>
                                <RatingGroup.ItemIndicator />
                            </RatingGroup.Item> */}
                        </RatingGroup.Control>
                    </RatingGroup.Root>
                    <Separator orientation="vertical" height="6" />

                    {`#Ratings: ${ratings[id] ? ratings[id].length : 0}`}
                    <Separator orientation="vertical" height="6" />


                    {/* <Button variant={"outline"} padding="2" colorPalette={"blue"}><CiStar /> Rate</Button> */}

                    <Dialog.Root lazyMount open={openModal} onOpenChange={(e) => setOpenModal(e.open)} placement="center">
                        <Dialog.Trigger asChild>
                            {/* <Button variant="outline">Open</Button> */}
                            <Button variant={"outline"} padding="2" colorPalette={"blue"}><CiStar /> Rate</Button>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                {/* dialog content */}
                                <Dialog.Content padding="2" width="400px">
                                    <Dialog.Header display="flex" justifyContent="center" marginBottom="2">
                                        <Dialog.Title textAlign="center">{`Rate: ${episode} - ${name} `}</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body display={"flex"} justifyContent="space-between" padding={"2"}>

                                        {/* {Modal rating} */}
                                        <RatingGroup.Root color="yellow" size="lg" count={5} value={newRating} onValueChange={(e) => setNewRating(e.value)} allowHalf colorPalette={"yellow"}>
                                            <RatingGroup.Label />
                                            <RatingGroup.HiddenInput />
                                            <RatingGroup.Control>
                                                {/* <RatingGroup.Item>
                                <RatingGroup.ItemIndicator />
                            </RatingGroup.Item> */}
                                            </RatingGroup.Control>
                                        </RatingGroup.Root>


                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger asChild>
                                                <Button padding={"2"} variant="outline">Cancel</Button>
                                            </Dialog.ActionTrigger>
                                            <Button onClick={() => onSubmitRating(id, newRating)} variant={"outline"} padding="2" colorPalette={"blue"}>Rate</Button>
                                        </Dialog.Footer>

                                    </Dialog.Body>

                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>

                    {/* {end of modal} */}

                    <Separator orientation="vertical" height="6" />
                    <Button onClick={()=> setOpenComment(!openComment)} variant={"outline"} padding="2" colorPalette={"blue"}><GoComment /> Comment</Button>


                </Card.Footer>
                <Collapsible.Root marginTop={"10px"} open={openComment} onOpenChange={(e) => setOpenComment(e.open)}>
                    

                    <Collapsible.Content>
                        {/* <Box padding="4" borderWidth="1px">
                            This collapsible is controlled by external state. You can open and
                            close it using the buttons above or by clicking the trigger.
                        </Box> */}
                        <textarea value={comment} onChange={(e)=> setComment(e.target.value)} className={classes.comment}></textarea>
                        <Button size={"sm"} marginTop={"10px"} marginLeft={"15px"} onClick={() => onSubmitComment(id, comment)} variant={"outline"} padding="2" colorPalette={"blue"}><GoComment /> Comment</Button>
                    </Collapsible.Content>
                </Collapsible.Root>
            </Card.Root>


        </>
    )
};

export default Episode;