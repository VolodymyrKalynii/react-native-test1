import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    preloader: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#f1f1f1'
    }
});
