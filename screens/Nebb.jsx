import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import thư viện icon MaterialIcons
import Toast from 'react-native-simple-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
const API_PILOTS = "https://it.api.namada.red/api/v1/scoreboard/pilots?page=0"
const API_CREW = "https://it.api.namada.red/api/v1/scoreboard/crew?page=0"

const ListCrew = ({ item }) => {
    const copyToClipboard = (itemtext) => {
        Clipboard.setString(itemtext);
        Toast.show('Address copied to clipboard', Toast.SHORT);
    };
    const formattedScore = item.score.toLocaleString();
    return (

        <View
            style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
                paddingVertical: 10,
                paddingHorizontal: 15,
            }}
        >
            <View style={{ flex: 1, justifyContent: 'left', alignItems: 'left' }}>
                <Text style={styles.valueText}>{item.ranking_position}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                {/* <Image
                    source={{ uri: item.avatar_url }}
                    style={{ width: 25, height: 25, borderRadius: 20 }}
                /> */}
                <Text style={styles.valueText}>{item.moniker}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => copyToClipboard(item.player_address)
                }>
                    <Text style={styles.valueText}>{`${item.player_address.slice(0, 2)}...${item.player_address.slice(-5)}`} <Icon style={{
                        width: 25,
                        height: 25, color: '#FFFF00'
                    }} name="content-copy" /></Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={styles.valueText}>{formattedScore}</Text>
            </View>
        </View>

    );
};

const ListPilot = ({ item }) => {
    const copyToClipboard = (itemtext) => {
        Clipboard.setString(itemtext);
        Toast.show('Data copied to clipboard', Toast.SHORT);

    };
    const formattedScore = item.score.toLocaleString();
    return (
        <View
            style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
                paddingVertical: 10,
                paddingHorizontal: 15,
            }}
        >
            <View style={{ flex: 1, justifyContent: 'left', alignItems: 'left' }}>
                <Text style={styles.valueText}>{item.ranking_position}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row' }}>
                {/* <Image
                    source={{ uri: item.avatar_url }}
                    style={{ width: 25, height: 25, borderRadius: 20 }}
                /> */}
                <Text style={styles.valueText}>{item.moniker}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => copyToClipboard(item.player_address)
                }>
                    <Text style={styles.valueText}>{`${item.player_address.slice(0, 2)}...${item.player_address.slice(-5)}`} <Icon style={{
                        width: 25,
                        height: 25, color: '#FFFF00'
                    }} name="content-copy" /></Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={styles.valueText}>{formattedScore}</Text>
            </View>
        </View>

    );
};

const Nebb = () => {
    const [crew, setCrew] = useState([]);
    const [pilot, setPilot] = useState([]);
    const [numberItemGet, setnumberItemGet] = useState(100); // Initial fetch timer value in seconds
    const [isLoadingPilots, setIsLoadingPilots] = useState(true); // Initial loading state for pilots
    const [isLoadingCrew, setIsLoadingCrew]= useState(true); // Initial loading state for crew


    const fetchPilotsData = async () => {
        try {
            const response = await axios.get(API_PILOTS, { timeout: 600000 });
            const data = response.data.players.slice(0, numberItemGet);
            setPilot(data);
            setIsLoadingPilots(false);
            console.log(data)
        } catch (error) {
            console.error('Error fetching pilots data:', error);
        }
    };

    const fetchCrewData = async () => {
        try {
            const response = await axios.get(API_CREW, { timeout: 600000 });
            const data = response.data.players.slice(0, numberItemGet);
            setCrew(data);
            setIsLoadingCrew(false);
            console.log(data)
        } catch (error) {
            console.error('Error fetching crew data:', error);
        }
    };
    useEffect(() => {
        fetchCrewData();
        fetchPilotsData();
    }, []);

    const renderLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.valueText} >Fetching data, please wait...</Text>
            </View>
        );
    };
    return (

        <View style={{ width: "100%", height: "100%" }} >
            <View style={{ flex: 1 }}>
                <Text style={styles.header}>
                    Top Pilot
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'black',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        backgroundColor: '#121212',
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Rank</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Moniker</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Addr</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: "flex-end" }}>
                        <Text style={styles.labelText}>ROIDS</Text>
                    </View>
                    {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.labelText}>VP *bdd305afe971a9595806efdbc8616a3</Text> 
            </View> */}
                </View>
                <View style={{ flex: 1 }}>
                    {isLoadingPilots ? (
                        renderLoading()
                    ) : (
                        <FlatList
                            nestedScrollEnabled
                            contentContainerStyle={{ flexGrow: 1 }}
                            data={pilot}
                            renderItem={({ item }) => <ListPilot item={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}
                </View>

                <Text style={styles.header}>
                    Top Crew
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'black',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        backgroundColor: '#121212',
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Rank</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Moniker</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Addr</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: "flex-end" }}>
                        <Text style={styles.labelText}>ROIDS</Text>
                    </View>
                    {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                    //Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3
                <Text style={styles.labelText}>VP</Text>
            </View> */}
                </View>
               
                <View style={{ flex: 1 }} >
                {isLoadingCrew ? (
                        renderLoading()
                    ) : (
                        <FlatList nestedScrollEnabled

                        data={crew}
                        renderItem={({ item }) => <ListCrew item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    )}
                    
                </View>

                

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#121212" // Sử dụng màu nền từ theme

    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 75,
        marginBottom: 15,
    },
    header: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#FFFF00' // Chữ màu vàng
    },
    subheader: {
        fontSize: 18,
        color: '#FFFFFF', // Màu chữ mặc định
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    descriptionsub: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFFFFF',
    },
    techContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    techBox: {
        backgroundColor: '#61dafb', // Màu nền hộp tech
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
    techText: {
        color: '#FFFFFF', // Màu chữ trắng
    },
    textContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'flex-start', // Canh trái các dòng văn bản
    },
    labelText: {
        fontSize: 12,
        color: '#FFFF00',
        fontWeight: 'bold',
        textAlign: 'left',
        marginRight: 10,
    },
    valueText: {
        flex: 1, // Sử dụng phần còn lại của không gian
        fontSize: 13,
        color: '#FFFF00',
    },
    //Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3
    valueIcon: {
        fontSize: 18,
        color: '#FFFF00',
    },
});
export default Nebb;
//Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3