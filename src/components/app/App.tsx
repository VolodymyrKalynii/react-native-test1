import React from 'react';
import {
    Text,
    View
} from 'react-native';
import {Provider} from 'react-redux';
import {Container} from 'native-base';

import {store} from '../../redux/store';
import {ImgBlock} from '../img-block';
import {styles} from './styles';
import {Loader} from '../loader';

export const App = () =>
    <Provider store={store}>
        <Container>
            <Loader/>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>Погладь кота</Text>
                </View>
                <ImgBlock/>
            </View>
        </Container>
    </Provider>;
