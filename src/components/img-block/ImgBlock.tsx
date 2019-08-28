import React from 'react';
import {
    View,
    Image,
    PanResponder,
    PanResponderInstance
} from 'react-native';
import {Audio} from 'expo-av';

import {hidePreloader} from '../../redux/dispatchers';
import {styles} from './styles';

import {PlaybackStatus} from 'expo-av/build/AV';

type Props = {};

export class ImgBlock extends React.Component<Props> {
    private panResponder:PanResponderInstance;
    private playbackStatus:PlaybackStatus;
    private startXPosition:number;
    private startYPosition:number;
    private endXPosition:number;
    private endYPosition:number;
    private myComponent:any;
    private readonly soundObject = new Audio.Sound();
    private userHangOffTouchTimeout = null;
    private soundDowningInterval = null;

    constructor(props) {
        super(props);

        this.soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);

        this.panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            // onMoveShouldSetPanResponder: (evt, gestureState) => true,
            // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: async (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                // console.log('gesture has started');
                // await this.startPlaying();
                // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: async (evt, gestureState) => {
                const isPointerOutOfElement = this.checkIsPointerOutOfElement(gestureState);

                // if (this.userHangOffTouchTimeout)
                //     clearTimeout(this.userHangOffTouchTimeout);
                //
                // // console.log(gestureState);
                //
                // this.userHangOffTouchTimeout = setTimeout(async () => {
                //     await this.pausePlaying();
                // }, 2000);

                this.runCheckingUserHangOffTouch();

                if (isPointerOutOfElement)
                    this.userHangOffTouchTimeout = setTimeout(async () => {
                        await this.pausePlaying();
                    }, 2000);
                else
                    await this.startPlaying();
            },
            // onPanResponderRelease: async (evt, gestureState) => {
            //     console.log('onPanResponderRelease');
            //     await this.stopPlaying();
            // },
        });
    }


    private runCheckingUserHangOffTouch = () => {
        if (this.userHangOffTouchTimeout)
            clearTimeout(this.userHangOffTouchTimeout);

        this.userHangOffTouchTimeout = setTimeout(async () => {
            await this.pausePlaying();
        }, 2000);
    };

    private pausePlaying = async () => {
        if (this.playbackStatus.isLoaded)
            if (this.playbackStatus.isPlaying)
                this.startPausingAudio();
    };

    private startPausingAudio = () => {
        this.soundDowningInterval = setInterval(async () => {
            // @ts-ignore
            const {volume} = this.playbackStatus;
            const newVolume = +volume.toFixed(1) - 0.1;


            if (newVolume > 0) {
                await this.setVolume(newVolume);
            } else {
                await this.finishSoundDowning()
            }
        }, 500);
    };

    private setVolume = async (volume) => {
        await this.soundObject.setVolumeAsync(volume);
    };

    private finishSoundDowning = async () => {
        await this.soundObject.stopAsync();
        clearInterval(this.soundDowningInterval);
    };

    private stopPlaying = async () => {
        if (this.playbackStatus.isLoaded)
            if (!this.playbackStatus.isPlaying)
                await this.soundObject.stopAsync();
    };

    private startPlaying = async () => {
        if (this.playbackStatus.isLoaded) {
            if (!this.playbackStatus.isPlaying) {
                await this.soundObject.setVolumeAsync(1);
                await this.soundObject.playAsync();
            }
        }
    };

    private onPlaybackStatusUpdate = async (playbackStatus) => {
        this.playbackStatus = playbackStatus;
    };

    private checkIsPointerOutOfElement = (gestureState) => {
        const {moveX, moveY} = gestureState;

        return moveX < this.startXPosition || moveX > this.endXPosition ||
            moveY < this.startYPosition || moveY > this.endYPosition
    };

    componentDidMount = async () => {
        await this.soundObject.loadAsync(require('../../sound/cat.mp3'));

        this.myComponent.measure((fx, fy, width, height, px, py) => {
            this.startXPosition = px;
            this.startYPosition = py;

            this.endXPosition = px + width;
            this.endYPosition = py + height;
        });

        setTimeout(() => {
            hidePreloader();
        }, 500);
    };

    render() {
        return <View style={styles.container}>
            <Image
                style={styles.img}
                resizeMode='contain'
                {...this.panResponder.panHandlers}
                ref={view => {
                    this.myComponent = view;
                }}
                source={require('../../img/cat.png')}/>
        </View>;
    }
}


