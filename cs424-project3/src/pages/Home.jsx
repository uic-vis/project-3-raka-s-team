/** @jsxImportSource theme-ui */
import raw from '../hooks/functions/divvy_dataset.json';
import { useEffect } from 'react';
import { Flex, Heading, Text, Avatar } from 'theme-ui';

const Home = ({data, changeData, renderMode, changeRenderMode, chosenData, changeChosenData, ...props}) => {
    useEffect(() =>{
        changeData(raw);
        changeRenderMode('none');
        },[])
    return (
        <Flex sx={{justifyContent: "center", flexDirection: "column", alignItems:'center'}}>
            <Heading as="h1">Divvy Data Exploration</Heading>
            <Text>We are analysing data from Divvy bicycle rideshare service in Chicago, IL, USA. Both of us are regular uses of the service, which adds to our familiarity and interest on working with their data.</Text>
            <Heading as="h2">Authors</Heading>
            <Heading as="h3">Khanh Duy Nguyen</Heading>
            <Heading as="h3">Raka Primardika</Heading>
            
        </Flex>
    );
};

export default Home;
