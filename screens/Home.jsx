// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    View, Text,
    StyleSheet, Image, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import thư viện icon MaterialIcons
const technologies =
    [
        'React Native',
        'JavaScript',
        'Node.js',
        'Express',
        'MongoDB'
    ];

const API = "https://api.nodejom.xyz";
const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwODQzNjMsImV4cCI6MTcxNzQ1MjM2M30.4Fk2-GpkRKK7SiTN4AgpmLUWUGTidBDYcIe-U_tacaE";

const API2 = "https://it.api.namada.red/api/v1";

const fetchData = async (
    setEpoch,
    setLatestBlock,
    setBlockTime,
    setActiveValidator,
    setTotalStake,
    setTransparentTransfer,
    setShieldedTransfer
) => {
    try {
        const overviewResponse = await axios.get(`${API}/overview`, {
            headers: {
                Authorization: "Bearer " + Token,
            },
        });
        const data = overviewResponse.data.data;
        setEpoch(data.epoch);
        setLatestBlock(data.last_height);
        setBlockTime(parseFloat(data.avg_blocktime).toFixed(2));
        setTotalStake(parseFloat(data.total_stake).toFixed(2));
        setActiveValidator(data.nb_validators);
        const otherResponse = await axios.get(`${API2}/chain/info`);
        setTransparentTransfer(otherResponse.data.total_transparent_txs);
        setShieldedTransfer(otherResponse.data.total_shielded_txs);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const fetchDataInterval = (
    setEpoch,
    setLatestBlock,
    setBlockTime,
    setActiveValidator,
    setTotalStake,
    setTransparentTransfer,
    setShieldedTransfer,
    setCountdown
) => {
    fetchData(
        setEpoch,
        setLatestBlock,
        setBlockTime,
        setActiveValidator,
        setTotalStake,
        setTransparentTransfer,
        setShieldedTransfer
    );
    const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
                fetchData(
                    setEpoch,
                    setLatestBlock,
                    setBlockTime,
                    setActiveValidator,
                    setTotalStake,
                    setTransparentTransfer,
                    setShieldedTransfer
                );
                return 15;
            } else {
                return prevCountdown - 1;
            }
        });
    }, 1000);

    return () => clearInterval(interval);
};

const Home = () => {
    const [epoch, setEpoch] = useState("");
    const [latestBlock, setLatestBlock] = useState("");
    const [blockTime, setBlockTime] = useState("");
    const [activeValidator, setActiveValidator] = useState("");
    const [totalStake, setTotalStake] = useState("");
    const [transparentTransfer, setTransparentTransfer] = useState("");
    const [shieldedTransfer, setShieldedTransfer] = useState("");
    const [countdown, setCountdown] = useState(15);

    // useEffect(() => {
    //     const fetchOverview = async () => {
    //         try {
    //             const overviewResponse = await axios.get(`${API}/overview`, {
    //                 headers: {
    //                     Authorization: "Bearer " + Token,
    //                 },
    //             });
    //             const data = overviewResponse.data.data;
    //             setEpoch(data.epoch);
    //             setLatestBlock(data.last_height);
    //             setBlockTime(data.avg_blocktime);
    //             setActiveValidator(data.nb_validators);
    //             setTotalStake(data.total_stake);
    //         } catch (error) {
    //             console.error("Error fetching overview:", error);
    //         }
    //     };

    //     const fetchOther = async () => {
    //         try {
    //             const otherResponse = await axios.get(`${API2}/chain/info`);
    //             setTransparentTransfer(otherResponse.data.total_transparent_txs);
    //             setShieldedTransfer(otherResponse.data.total_shielded_txs);
    //         } catch (error) {
    //             console.error("Error fetching other info:", error);
    //         }
    //     };

    //     fetchOverview();
    //     fetchOther();
    // }, []);

    useEffect(() => {
        const cleanupInterval = fetchDataInterval(
            setEpoch,
            setLatestBlock,
            setBlockTime,
            setActiveValidator,
            setTotalStake,
            setTransparentTransfer,
            setShieldedTransfer,
            setCountdown
        );
        return () => cleanupInterval();
    }, []);

    const renderTechBoxes = () => {
        return (
            <View style={styles.techContainer}>
                {technologies
                    .map((tech, index) => (
                        <View key={index}
                            style={styles.techBox}>
                            <Text style={styles.techText}>
                                {tech}
                            </Text>
                        </View>
                    ))}
            </View>
        );
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source=
                    {
                        {
                            uri:
                                'https://i.imgur.com/kbD9hHK.png'
                        }
                    } style={styles.profileImage} />
                <Text style={styles.header}>
                    Namada Explorer App - AdamanLabs
                </Text>
                {/* //Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3 */}
                {/* <Text style={styles.subheader}>
                Namada Shielded Expedition
            </Text> */}
                <Text style={styles.description}>
                    Welcome to the Namada Explorer application developed by AdamanLabs.
                </Text>
                <Text style={styles.descriptionsub}>
                    Memo : tpknam1qr0f3m6cjs5taskgy4q2x0pa2frv0f055p42t3rjdvl79sl0hxplgquqlx9
                </Text>
                <View style={styles.textContainer}>

                    <Text style={styles.labelText}><Icon style={styles.valueIcon} name="key" /> Chain ID: </Text>
                    <Text style={styles.valueText}>shielded-expedition.88f17d1d14</Text>
                </View>
                <View style={styles.textContainer}>

                    <Text style={styles.labelText}><Icon style={styles.valueIcon} name="rocket-launch" /> Epoch:</Text>
                    <Text style={styles.valueText}>{epoch}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.labelText}><Icon style={styles.valueIcon} name="view-in-ar" /> Latest Block:</Text>
                    <Text style={styles.valueText}>{latestBlock}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.labelText}><Icon style={styles.valueIcon} name="timer" /> Block Time:</Text>
                    <Text style={styles.valueText}>{blockTime}s</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.labelText}><Icon style={styles.valueIcon} name="verified-user" /> Active Validator:</Text>
                    <Text style={styles.valueText}>{activeValidator}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.labelText}><Icon style={styles.valueIcon} name="token" /> Total Stake:</Text>
                    <Text style={styles.valueText}>{totalStake} Naan</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.labelText}><Icon style={styles.valueIcon} name="remove-moderator" /> Transparent Transfer:</Text>
                    <Text style={styles.valueText}>{transparentTransfer}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.labelText}><Icon style={styles.valueIcon} name="security" /> Shielded Transfer:</Text>
                    <Text style={styles.valueText}>{shieldedTransfer}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.valueText}>Next fetch in: {countdown} seconds</Text>
                </View>

                {/* <Text style={styles.subheader}>
                Technologies Known
            </Text>
            {renderTechBoxes()} */}
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#000000" // Sử dụng màu nền từ theme

    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 75,
        marginBottom: 15,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFF00' // Chữ màu vàng Hash : cbdd305afe971a9595806efdbc8616a3
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
    //Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3
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
        width: 180,
        fontSize: 16,
        color: '#FFFF00',
        fontWeight: 'bold',
        textAlign: 'left',
        marginRight: 10,
    },
    valueText: {
        flex: 1, // Sử dụng phần còn lại của không gian
        fontSize: 16,
        color: '#FFFFFF',
    },
    valueIcon: {
        fontSize: 18,
        color: '#FFFF00',
    },
});

export default Home;
//Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3