import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#f1f1f1',
        flex: 1,
    },
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
        fontSize: 50
    }
});
