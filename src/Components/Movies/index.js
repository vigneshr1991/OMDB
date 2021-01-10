import { useState } from "react";
import styled from "styled-components";

import { useFetch } from "../../Hooks/useFetch";

const MovieContainer = styled.div`
    margin: 10px;
    margin-left: 100px;
`;

const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Card = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 20px black;
    border-radius: 5px; 
    margin: 25px;
`;

const ImageSection = styled.div`
    width: 100%;
    min-width: 100%;
    height: 350px;
    max-height: 350px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    img {
        width: 100%;
        max-width: 100%;
        max-height: 100%;
    }
`;

const TitleSection = styled.div`
    text-align: center;
    padding: 10px;
    font-size: 18px;
    color: #000;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const InputSection = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #ea5da4;
`;

const Input = styled.input`
    width: 300px;
    padding: 0px 10px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #615858;
    &:focus{
        outline: none;
        border-color: none;
    } 
`;

const YearSection = styled.span`
    text-align: center;
`;

const NoMoviesFound = styled.h1`
    text-align: center;
`;

const Movies = (props) => {
    const [searchQuery, setSearchQuery] = useState('Batman')
    const [loading, data] = useFetch(`https://www.omdbapi.com?s=${searchQuery}&page=1&apikey=75d7dc3f&`, [searchQuery]);

    const movies = !loading && data && data.Search && data.Search.map(movie => {
        return(
            <Card key={movie.imdbID}>
                <ImageSection>
                    <img src={movie.Poster} alt={movie.imdbID} />
                </ImageSection>
                <TitleSection>
                    {`${movie.Title}`}
                    <br />
                    <YearSection>{`Year - ${movie.Year}`}</YearSection>
                </TitleSection>
            </Card>
        );
    });
    
    return(
        <MovieContainer>
            <InputSection>
                Search Movie : <Input
                    placeholder="Search by movie title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </InputSection>
            <br />
            <hr />
            <ListContainer>
                {movies && movies.length ? movies : <NoMoviesFound>No Movies found</NoMoviesFound>}
            </ListContainer>
        </MovieContainer>
    )
}

export default Movies;