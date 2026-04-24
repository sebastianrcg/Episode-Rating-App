import { useEffect, useState } from 'react';
import { HStack, Button, Heading } from '@chakra-ui/react';
import classes from "./app.module.css";
import EpisodeList from './components/episodeList/EpisodeList';
import RatingProviver from './context/RatingProvider';
import ControlBar from './components/controlbar/ControlBar';


function App() {
  const [episodes, setEpisodes] = useState([{}])

  const getEpisodes = async () => {
    try {

      const response1 = await fetch("https://rickandmortyapi.com/api/episode?page=1");
      const response2 = await fetch("https://rickandmortyapi.com/api/episode?page=2");
      const response3 = await fetch("https://rickandmortyapi.com/api/episode?page=3");

      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();


      setEpisodes([...data1.results, ...data2.results, ...data3.results]);
      // console.log([...data1.results, ...data2.results, ...data3.results]);
      // console.log("Test");

    } catch (error) {
      console.log("Something went wrong.", error);
    }
  }

  useEffect(() => {
    getEpisodes();
  }, [])

  return (
    <>
      <Heading size="5xl" padding="5" textAlign="center">Rick and Morty Episodes</Heading>
      <hr className={classes.break} />

      <RatingProviver>
        <ControlBar />
        <EpisodeList episodes={episodes} />
      </RatingProviver>
    </>
  )
}

export default App
