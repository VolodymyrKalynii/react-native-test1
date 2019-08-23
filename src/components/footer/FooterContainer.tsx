import * as React from 'react';
import {connect} from 'react-redux';

import {AppFooter} from './Footer';

type Props = {
  mode:string;
};

const FooterContainer = (props:Props) =>
    <AppFooter mode={props.mode}/>;

const mapStateToProps = (state) => ({
    mode: state.mode
});


export default connect(mapStateToProps)(FooterContainer);