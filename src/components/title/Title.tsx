import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import {LocalizationTexts} from '../../localization';

import {styles} from './styles';


export class Title extends React.Component{
    constructor(props) {
        super(props);

        console.log(LocalizationTexts.getLocale());
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{LocalizationTexts.get('title_text')}</Text>
            </View>
        );
    }
};