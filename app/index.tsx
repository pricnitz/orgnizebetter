import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function App() {
    return (
        <View style={styles.container}>

            {/* Left Section - Image */}
            <Image
                source={require("../assets/tablet.png")} // replace with your actual image path
                style={styles.image}
                resizeMode="cover"
            />

            {/* Right Section */}
            <View style={styles.textBox}>
                <Text style={styles.tagline}>Write It Track It Live It</Text>
                <Text style={styles.title}>Organize.</Text>
                <Text style={styles.subtitle}>Better</Text>
            </View>

            {/* Next Button */}
            <Link href="/Login" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 288, // w-72
        height: 384, // h-96
        borderRadius: 16,
    },
    textBox: {
        marginTop: 24,
        alignItems: "center",
    },
    tagline: {
        fontSize: 14,
        fontStyle: "italic",
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 18,
        letterSpacing: 3,
    },
    button: {
        position: "absolute",
        bottom: 40,
        right: 24,
        backgroundColor: "#e5e5e5",
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 12,
        elevation: 3, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        fontWeight: "600",
    },
});
