import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#30d0fe',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    img: {
        // backgroundColor: 'red',
        width: Dimensions.get('window').width / 1.1,
        height: Dimensions.get('window').height /  1.2
    }
});
