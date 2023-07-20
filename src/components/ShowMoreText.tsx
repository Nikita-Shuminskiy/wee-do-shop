import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ShowMoreText = ({ text, maxLength }) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={showFullText ? undefined : maxLength} style={styles.text}>
                {text}
            </Text>
            {text.length > maxLength && (
                <TouchableOpacity onPress={toggleText}>
                    <Text style={styles.showMoreButton}>
                        {showFullText ? 'Show Less' : 'Show More'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
    showMoreButton: {
        color: 'blue',
        marginTop: 5,
    },
});

export default ShowMoreText;
