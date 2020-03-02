import React, {useState, useEffect, createContext, Component} from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';

export const GameContext = createContext();

var page = "1";

export const SetPage = (props) => {
    page = props.page;

    return null;
}

export const GameProvider = (props) => {

    useEffect(() => {
        fetchItems();
    }, []);

    const [games, setGames] = useState([]);

    const fetchItems = async () => {
        const data = await fetch("https://rawg-video-games-database.p.rapidapi.com/games?page="+page+"&search=metal gear", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
                "x-rapidapi-key": "c0c3caa552msh584591515729e56p1d3ad5jsne7604d4ee7b4"
            }
        });

        const item = await data.json();
        //console.log(items);
        setGames(item);
    }

    return(
        <GameContext.Provider value={games}>
            {props.children}
        </GameContext.Provider>
    );
}
