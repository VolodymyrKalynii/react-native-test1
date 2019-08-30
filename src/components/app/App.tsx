import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

import {store} from 'red/store';
import {ImgBlock} from '../img-block';
import {Title} from '../title';
import {Loader} from '../loader';

import {styles} from './styles';

export const App = () =>
    <Provider store={store}>
        <Loader/>
        <View style={styles.wrapper}>
            <Title/>
            <ImgBlock/>
        </View>
    </Provider>;
