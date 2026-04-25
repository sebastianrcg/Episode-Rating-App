import { useState, createContext, useContext } from "react";

const EpisodeContext = createContext();

const EpisodeProvider = ({children})=>{
    const [sort, setSort] = useState("descending");

    const changeSort = ()=> {
        setSort(prev=> prev === "ascending" ? "descending" : "ascending" );
    }


    return (
        <EpisodeContext value={{sort, changeSort}}>
            {children}
        </EpisodeContext>
    )
}

export default EpisodeProvider;

export const useEpisode = () => {
    return useContext(EpisodeContext);
}