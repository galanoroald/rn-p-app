import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native';
///Component
import Game from './Game';
import {GameContext, SetPage} from './GameContext';
import { withNavigation } from 'react-navigation';

const Shop = (props) => {
    const game = useContext(GameContext);

    return (
        <View>
            <SetPage page={props.page} />
            <FlatList
                data={game.results}
                keyExtractor={game => game.id.toString()}
                renderItem={({ item }) => (
                    <Game key={item.id} name={item.name} image={item.background_image}></Game>
                )}
            />
        </View>

    );
}

export default Shop;

const styles = StyleSheet.create({
    textRed: {
        color: 'red',
    }
})
