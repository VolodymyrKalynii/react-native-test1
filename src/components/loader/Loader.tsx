import * as React from 'react';
import {connect} from 'react-redux';
import {
    ActivityIndicator,
    View
} from 'react-native';

import {styles} from './styles';

type Props = {
    isShowingPreloader:boolean;
};

const Preloader = (props:Props) => {
    const {isShowingPreloader} = props;

    return isShowingPreloader
        ? <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        : null;
};

const mapStateToProps = store => ({
    isShowingPreloader: store.isShowingPreloader
});

export default connect(mapStateToProps)(Preloader);