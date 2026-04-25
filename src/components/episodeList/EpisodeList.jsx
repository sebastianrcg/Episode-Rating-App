import Episode from "../episode/Episode";
import { useEpisode } from "../../context/EpisodeProvider";

const EpisodeList = ({episodes}) => {

    const {sort} = useEpisode();

    let sortedEpisodes = episodes;
    if (sort === "ascending"){
        sortedEpisodes = sortedEpisodes.sort((a,b)=> b.id - a.id);
    } else {
        sortedEpisodes = sortedEpisodes.sort((a,b)=> a.id - b.id);
    }

    return (
        <>
        {sortedEpisodes.map(episode=> {
            return (
                <Episode key={episode.id} id={episode.id} name={episode.name} episode={episode.episode} airDate={episode.air_date}/>
            )
        })}
        </>
    )
}

export default EpisodeList;