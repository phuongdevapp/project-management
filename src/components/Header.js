import React from 'react';
import {
    View,
    Image,
    Platform,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { Screen, Color } from '../constants/Styles';

export const Header = ({ iconLeft, iconRight, onLeft, onRight, leftEnabled = true, rightEnabled = true, children, style }) => (
    <View style={[styles.header, Platform.OS === 'ios' ? { paddingTop: 20 } : { paddingTop: 0 }, style]}>
        {leftEnabled ? <TouchableOpacity
            style={[styles.headerButton, { marginLeft: 5 }]}
            onPress={onLeft}
            activeOpacity={leftEnabled ? 0.2 : 1}
        >
            <Image
                style={styles.headerIcon}
                source={iconLeft}
            />
        </TouchableOpacity> : null}
        {children}
        {rightEnabled ? <TouchableOpacity
            style={[styles.headerButton, { marginRight: 5 }]}
            activeOpacity={rightEnabled ? 0.2 : 1}
            onPress={onRight}
        >
            <Image
                style={styles.headerIcon}
                source={iconRight}
            />
        </TouchableOpacity> : null}

    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: Screen.height * 0.09,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Color.appTheme,
    },
    headerIcon: {
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    headerButton: {
        width: Screen.width * 0.11,
        height: Screen.width * 0.11,
        justifyContent: 'center',
    }
});
