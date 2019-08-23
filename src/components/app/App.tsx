import React from 'react';
import {
    Text,
    View
} from 'react-native';
import {Provider} from 'react-redux';
import {Container} from 'native-base';

import {store} from '../../redux/store';
import {ImgBlock} from '../img-block';
import {Title} from '../title';
import {Loader} from '../loader';

import {styles} from './styles';

export const App = () =>
    <Provider store={store}>
        <Container>
            <Loader/>
            <View style={styles.wrapper}>
                <Title/>
                <ImgBlock/>
            </View>
        </Container>
    </Provider>;
