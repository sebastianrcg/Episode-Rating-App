import Episode from "../episode/Episode";

const EpisodeList = ({episodes}) => {

    return (
        <>
        {episodes.map(episode=> {
            return (
                <Episode key={episode.id} id={episode.id} name={episode.name} episode={episode.episode} airDate={episode.air_date}/>
            )
        })}
        </>
    )
}

export default EpisodeList;