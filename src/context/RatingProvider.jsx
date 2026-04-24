import { useState, createContext, useContext, Children, useEffect } from "react";

const RantingContext = createContext();


const RatingProviver = ({ children }) => {
    const [ratings, setRatings] = useState( () => {
        if (localStorage.getItem("ratings")) {
            return JSON.parse(localStorage.getItem("ratings"))
        } else {
            return {}
        }
    }
    );

    const addRating = (id, newRating) => {
        const addedRating = ratings[id] ? [...ratings[id], newRating] : [newRating]; 
        console.log(addedRating)

        setRatings(prev=> {
            return({
            ...prev, [id]: addedRating
            }
        )});

        // localStorage.removeItem("ratings");
        // localStorage.setItem("ratings", JSON.stringify(ratings));
    };

    const resetRatings = () =>{
        setRatings({});
        
    }

    useEffect(()=> {
        localStorage.setItem("ratings", JSON.stringify(ratings));
    }, [ratings])

    return (
        <RantingContext value={{ratings, addRating, resetRatings}}>
            {children}
        </RantingContext>
    )
}

export default RatingProviver;


export const useRating = () => {
    return useContext(RantingContext);
}
