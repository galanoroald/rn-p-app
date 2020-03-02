import React from 'react';
import { StyleSheet, Text, Image, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
///Component

class Review extends React.Component {

    render(){
        return (
            <View>
                <TouchableOpacity onPress= {() => {
                  this.props.navigation.navigate('Game', {
                      name: this.props.name,
                      image: this.props.image,
                  });
                }}>
                    <Image
                        style={styles.imageIcon}
                        source={{ uri:this.props.image }}
                    />
                    <Text style={styles.imageText}>{this.props.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Review;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    title:{
        width: 300,
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#bbded6'
    }
});
