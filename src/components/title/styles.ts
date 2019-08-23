import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 2,
        // position: 'relative'
    },
    title: {
        fontSize: 30
    }
});
