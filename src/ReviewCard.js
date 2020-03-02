import React from 'react';
import { StyleSheet, Text, Image, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { render } from 'react-dom';
///Component

const ReviewCard = ( props ) => {

    var stars = [];

    for (let i = 0; i < props.item.rating; i++) {
        stars.push(<Icon name="star" size={15} color="#fae3d9"></Icon>)
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text>
                    {props.item.title}
                </Text>
                <View style={styles.stars}>
                    { stars }
                </View>
            </View>
            <TouchableOpacity
                onPress= {() => {
                    props.navigation.navigate('Review_View', {
                        key: props.item.objectId,
                        title: props.item.title,
                        desc: props.item.description,
                        rating: props.item.rating,
                        owner: props.item.ownerId
                    });
                }}
            >
                <Icon name="visibility" size={30} color="#8ac6d1"></Icon>
            </TouchableOpacity>

        </View>
    );
}

export default ReviewCard;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    card: {
        width: 300,
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#bbded6'
    },
    stars:{
        flexDirection: 'row',
        marginTop: 5
    }
});
