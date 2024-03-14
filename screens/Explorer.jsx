import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import thư viện icon MaterialIcons
import Toast from 'react-native-simple-toast';
import { SafeAreaView } from 'react-native-safe-area-context';

const API = "https://api.nodejom.xyz";
const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwODQzNjMsImV4cCI6MTcxNzQ1MjM2M30.4Fk2-GpkRKK7SiTN4AgpmLUWUGTidBDYcIe-U_tacaE";

const fetchData = async (
    setValidator,
    setLatestBlocks) => {
    try {
        const response = await axios.get(API + "/overview", {
            headers: {
                Authorization: "Bearer " + Token,
            },
        });
        const data = response.data.data;
        setValidator(data.validators);
        setLatestBlocks(data.blocks);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const fetchDataInterval = (
    setValidator,
    setLatestBlocks,
    setCountdown
) => {
    fetchData(
        setValidator,
        setLatestBlocks
    );
    const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
                fetchData(
                    setValidator,
                    setLatestBlocks
                );
                return 40;
            } else {
                return prevCountdown - 1;
            }
        });
    }, 1000);

    return () => clearInterval(interval);
};

const ListItemValidator = ({ item }) => {
    const copyToClipboard = (itemtext) => {
        Clipboard.setString(itemtext);
        Toast.show('Address copied to clipboard', Toast.SHORT);

    };
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
                <Image
                    source={{ uri: item.logo_url || 'https://i.imgur.com/kbD9hHK.png' }}
                    style={{ width: 25, height: 25, borderRadius: 20 }}
                />
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={styles.valueText}>{item.moniker || `${item.address.slice(0, 2)}...${item.address.slice(-5)}`}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => copyToClipboard(item.address)
                }>
                    <Text style={styles.valueText}>{`${item.address.slice(0, 2)}...${item.address.slice(-5)}`} <Icon style={{
                        width: 25,
                        height: 25, color: '#FFFF00'
                    }} name="content-copy" /></Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems:'flex-end' }}>
                <Text style={styles.valueText}>{item.commission_rate}</Text>
            </View>
        </View>

    );
};

const ListItemBlocks = ({ item }) => {
    const copyToClipboard = (itemtext) => {
        Clipboard.setString(itemtext);
        Toast.show('Data copied to clipboard', Toast.SHORT);

    };
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

            <View style={{ flex: 1.5, justifyContent: 'center' }}>

                <TouchableOpacity onPress={() => copyToClipboard(item.hash)
                }>
                    <Text style={styles.valueText}>{item.height}<Icon style={{
                        width: 25,
                        height: 25, color: '#FFFF00'
                    }} name="content-copy" /></Text>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>

                <TouchableOpacity onPress={() => copyToClipboard(item.hash)
                }>
                    <Text style={styles.valueText}>{`${item.hash.slice(0, 2)}...${item.hash.slice(-5)}`}<Icon style={{
                        width: 20,
                        height: 20, color: '#FFFF00'
                    }} name="content-copy" /></Text>
                </TouchableOpacity>


            </View>

            {/* <View style={{ flex: 1, justifyContent: 'left', alignItems: 'left' }}>
                <Image
                    source={{ uri: item.logo_url || 'https://i.imgur.com/kbD9hHK.png' }}
                    style={{ width: 25, height: 25, borderRadius: 20 }}
                />
            </View> */}
            <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row'}}>
                <Image
                    source={{ uri: item.logo_url || 'https://i.imgur.com/kbD9hHK.png' }}
                    style={{ width: 15, height: 15, borderRadius: 20, marginRight: 2 }}
                />
                <Text style={styles.valueText}>{item.moniker || `${item.proposer.slice(0, 2)}...${item.proposer.slice(-5)}`}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={styles.valueText}>{item.transactions.length}</Text>
            </View>
        </View>

    );
};

const Explorer = () => {
    const [validators, setValidators] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [countdown, setCountdown] = useState(40); // Initial fetch timer value in seconds

    useEffect(() => {
        const cleanupInterval = fetchDataInterval(
            setValidators,
            setBlocks,
            setCountdown
        );
        return () => cleanupInterval();
    }, []);
    // useEffect(() => {
    //     const fetchAndUpdateData = async () => {
    //         const data = await fetchData();
    //         if (data) {
    //             setValidators(data.validators);
    //             setBlocks(data.blocks);
    //             setFetchTimer(15); // Reset fetch timer
    //         } else {
    //             console.log('Failed to fetch data.');
    //         }
    //     };

    //     // Fetch data immediately
    //     fetchAndUpdateData();

    //     // Update data every 15 seconds
    //     const intervalId = setInterval(() => {
    //         fetchAndUpdateData();
    //         setFetchTimer(prevTimer => prevTimer - 1); // Decrement fetch timer every second
    //     }, 1000);

    //     // Clean up interval when component unmounts
    //     return () => clearInterval(intervalId);
    // }, []);
    return (

        <View style={{ width: "100%" , height : "100%"}} >
            <Text style={{
                fontSize: 13,
                color: '#FFFF00'
            }}>
                Next fetch in {countdown} seconds
            </Text>
            <View>
                <Text style={styles.header}>
                    Top Validators
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
                        <Text style={styles.labelText}>Logo</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Moniker</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Address</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center'}}>
                        <Text style={styles.labelText}>Commission Rate</Text>
                    </View>
                    {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.labelText}>VP</Text>
            </View> */}
                </View>
                <View style={{height : 200}}>
                    <FlatList nestedScrollEnabled
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        data={validators}
                        renderItem={({ item }) => <ListItemValidator item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>


                <Text style={styles.header}>
                    Latest blocks
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
                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.labelText}>Block Height</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Hash</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.labelText}>Proposer</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' , alignItems: 'flex-end'}}>
                        <Text style={styles.labelText}>Txs</Text>
                    </View>
                    {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.labelText}>VP</Text>
            </View> */}
                </View>
                <View style={{height : 300}} >
                <FlatList nestedScrollEnabled

                    data={blocks}
                    renderItem={({ item }) => <ListItemBlocks item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
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
    valueIcon: {
        fontSize: 18,
        color: '#FFFF00',
    },
});
export default Explorer;
