import * as React from 'react';
import {Text} from 'react-native';
import {Footer, FooterTab, Button} from 'native-base';

import {MODES} from '../../redux/constants';
import {changeMode} from '../../redux/dispatchers';

type Props = {
    mode:string;
};

export const AppFooter = (props:Props) => {
    const {mode} = props;

    return (
        <Footer style={{backgroundColor:'#fff'}}>
            <FooterTab>
                <Button active={mode === MODES.ARTICLES} onPress={
                    () => changeMode(MODES.ARTICLES)}>
                    <Text>ARTICLES</Text>
                </Button>
                <Button active={mode === MODES.PODCAST} onPress={
                    () => changeMode(MODES.PODCAST)}>
                    <Text>Podcasts</Text>
                </Button>
            </FooterTab>
        </Footer>
    )
};

