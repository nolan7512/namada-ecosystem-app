import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import thư viện icon MaterialIcons
import Toast from 'react-native-simple-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import cheerio from 'cheerio';

const ShowPlayer = ({ playerData }) => {
    const copyToClipboard = (itemtext) => {
        Clipboard.setString(itemtext);
        Toast.show('Address copied to clipboard', Toast.SHORT);
    };
    const formattedScore = playerData.score.toLocaleString();
    return (

        <View
            style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
                paddingVertical: 10,
                paddingHorizontal: 15,
                color: '#FFFF00'
            }}
        >
            <View style={{ flex: 1, justifyContent: 'left', alignItems: 'left' }}>
                <Text style={styles.valueText}>{playerData.ranking_position}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                {/* <Image
                    source={{ uri: playerData.avatar_url }}
                    style={{ width: 25, height: 25, borderRadius: 20 }}
                /> */}
                <Text style={styles.valueText}>{playerData.moniker}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => copyToClipboard(playerData.player_address)
                }>
                    <Text style={styles.valueText}>{`${playerData.player_address.slice(0, 2)}...${playerData.player_address.slice(-5)}`} <Icon style={{
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

const ShowTransaction = ({ transaction }) => {
    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        Toast.show('Copied to clipboard', Toast.SHORT);
    };
    const copyTxToClipboard = () => {
        Clipboard.setString(JSON.stringify(transaction.tx, null, 2));
        Toast.show('Copied to clipboard', Toast.SHORT);
    };
    console.log(transaction)

    //     if (!transaction || !transaction.tx) {
    //         return null;
    //     }

    //     try {
    //         return (
    //             <ScrollView>
    //                 {Object.keys(transaction.tx).map((txType, index) => (
    //                     <View key={index} style={styles.txContainer}>
    //                         <Text style={styles.txHeader}>{txType}</Text>
    //                         {Object.entries(transaction.tx[txType]).map(([key, value], idx) => {
    //                             const displayValue = typeof value === 'string' && value.length > 100 ? `${value.slice(0, 100)}...` : value;
    //                             return (
    //                                 <View key={idx} style={styles.txRow}>
    //                                     <Text style={styles.txLabel}>{key}:</Text>
    //                                     {/* Check if value is not null before rendering */}
    //                                     {value !== null && typeof value === 'object' ? (
    //                                         Object.entries(value).map(([subKey, subValue], subIdx) => {
    //                                             const truncatedSubValue = typeof subValue === 'string' && subValue.length > 50 ? `${subValue.slice(0, 50)}...` : subValue;
    //                                             // Check if subValue is an array and has more than 10 elements
    //                                             if (Array.isArray(subValue) && subValue.length > 10) {
    //                                                 return (
    //                                                     <Text key={subIdx} style={styles.txValue}>{`${subKey}: ${subValue.join(', ')}`}</Text>
    //                                                 );
    //                                             } else {
    //                                                 return (
    //                                                     <Text key={subIdx} style={styles.txValue}>{`${subKey}: ${truncatedSubValue}`}</Text>
    //                                                 );
    //                                             }
    //                                         })
    //                                     ) : (
    //                                         <Text style={styles.txValue}>
    //                                             {typeof value === 'string' && value.length > 100 ? `${value.slice(0, 100)}...` : value}
    //                                         </Text>
    //                                     )}
    //                                 </View>
    //                             );
    //                         })}
    //                     </View>
    //                 ))}
    //             </ScrollView>
    //         );
    //     } catch (error) {
    //         console.error('Error rendering transaction details:', error);
    //         return null;
    //     }
    // };


    //gần đúng
    // const renderTxDetails = () => {
    //     if (!transaction || !transaction.tx) {
    //         return null;
    //     }

    //     try {
    //         return (
    //             <ScrollView>
    //                 {Object.keys(transaction.tx).map((txType, index) => (
    //                     <View key={index} style={styles.txContainer}>
    //                         <Text style={styles.txHeader}>{txType}</Text>
    //                         {Object.entries(transaction.tx[txType]).map(([key, value], idx) => {
    //                             const displayValue = typeof value === 'string' && value.length > 100 ? `${value.slice(0, 100)}...` : value;
    //                             return (
    //                                 <View key={idx} style={styles.txRow}>
    //                                     <Text style={styles.txLabel}>{key}:</Text>
    //                                     {/* Check if value is not null before rendering */}
    //                                     {value !== null && typeof value === 'object' ? (
    //                                         <View style={styles.subObject}>
    //                                             <Text style={styles.subObjectHeader}>{key}</Text>
    //                                             {Object.entries(value).map(([subKey, subValue], subIdx) => {
    //                                                 const truncatedSubValue = typeof subValue === 'string' && subValue.length > 50 ? `${subValue.slice(0, 50)}...` : subValue;
    //                                                 // Check if subValue is an array
    //                                                 if (Array.isArray(subValue)) {
    //                                                     // Check the length of the array
    //                                                     if (subValue.length > 5) {
    //                                                         return (
    //                                                             <Text key={subIdx} style={styles.txValue}>{`${subKey}: ${subValue.slice(0, 5).join(', ')}, ...`}</Text>
    //                                                         );
    //                                                     } else {
    //                                                         return (
    //                                                             <Text key={subIdx} style={styles.txValue}>{`${subKey}: ${subValue.join(', ')}`}</Text>
    //                                                         );
    //                                                     }
    //                                                 } else if (typeof subValue === 'object') {
    //                                                     return (
    //                                                         <View key={subIdx} style={styles.subObject}>
    //                                                             <Text style={styles.subObjectHeader}>{subKey}</Text>
    //                                                             {Object.entries(subValue).map(([innerSubKey, innerSubValue], innerSubIdx) => (
    //                                                                 <Text key={innerSubIdx} style={styles.txValue}>{`${innerSubKey}: ${innerSubValue}`}</Text>
    //                                                             ))}
    //                                                         </View>
    //                                                     );
    //                                                 } else {
    //                                                     return (
    //                                                         <Text key={subIdx} style={styles.txValue}>{`${subKey}: ${truncatedSubValue}`}</Text>
    //                                                     );
    //                                                 }
    //                                             })}
    //                                         </View>
    //                                     ) : (
    //                                         <Text style={styles.txValue}>
    //                                             {typeof value === 'string' && value.length > 100 ? `${value.slice(0, 100)}...` : value}
    //                                         </Text>
    //                                     )}
    //                                 </View>
    //                             );
    //                         })}
    //                     </View>
    //                 ))}
    //             </ScrollView>
    //         );
    //     } catch (error) {
    //         console.error('Error rendering transaction details:', error);
    //         return null;
    //     }
    // };


    //
    const renderTxDetails = () => {
        if (!transaction || !transaction.tx) {
            return null;
        }

        try {
            return (
                <ScrollView>
                    {Object.keys(transaction.tx).map((txType, index) => (
                        <View key={index} style={styles.txContainer}>
                            <Text style={styles.txHeader}>{txType}</Text>
                            <View style={styles.copyTxButtonContainer}>
                                <TouchableOpacity onPress={copyTxToClipboard}>
                                    <Icon name="content-copy" size={20} color="#FFFF00" />
                                </TouchableOpacity>
                            </View>
                            {Object.entries(transaction.tx[txType]).map(([key, value], idx) => {
                                const displayValue = typeof value === 'string' && value.length > 100 ? `${value.slice(0, 100)}...` : value;
                                return (
                                    <View key={idx} style={styles.txRow}>
                                        <Text style={styles.txLabel}>{key}:</Text>
                                        {/* Check if value is not null before rendering */}
                                        {Array.isArray(value) ? (
                                            // Check if value is an array
                                            // Check the length of the array
                                            <>
                                                <Text style={styles.txValue}>{`[${value.slice(0, 10).join(', ')}${value.length > 10 ? `, ... (${value.length - 10} more)` : ''}]`}</Text>
                                            </>
                                        ) : (<></>)}
                                        {value !== null && typeof value === 'object' ? (
                                            <View >
                                                {/* <Text style={styles.subObjectHeader}>{key}</Text> */}
                                                {Object.entries(value).map(([subKey, subValue], subIdx) => {
                                                    const truncatedSubValue = typeof subValue === 'string' && subValue.length > 50 ? `${subValue.slice(0, 50)}...` : subValue;
                                                    // Check if subValue is an array

                                                    if (Array.isArray(subValue)) {
                                                        // Check the length of the array
                                                        const displayArray = subValue.slice(0, 20);
                                                        const moreItems = subValue.length > 20 ? `,...(${subValue.length - 5} more)]` : '';
                                                        return (
                                                            <>

                                                                <View style={{ flexDirection: "row" }} >
                                                                    <Text style={{ color: '#fff000', fontWeight: 'bold', paddingLeft: 15 }} >{subKey} :
                                                                        <Text key={subIdx} style={styles.txValue}>{` [${displayArray.join(', ')}, ${moreItems}`}</Text>
                                                                    </Text>
                                                                    {/* <Text key={subIdx} style={styles.txValue}>{`${subKey}: ${cleanedValue}`}</Text> */}
                                                                </View>
                                                                {/* <Text key={subIdx} style={styles.txValue}>{`${subKey}: [${displayArray.join(', ')}, ${moreItems}]`}</Text> */}
                                                                {/* <Text style={styles.txValue}>{`[${value.slice(0, 10).join(', ')}${value.length > 10 ? `, ... (${value.length - 10} more)` : ''}]`}</Text> */}

                                                            </>

                                                        );
                                                    } else if (typeof subValue === 'object') {
                                                        return (
                                                            <View key={subIdx}>
                                                                {/* <Text>{subKey}</Text> */}
                                                                {Object.entries(subValue).map(([innerSubKey, innerSubValue], innerSubIdx) => (
                                                                    <Text key={innerSubIdx} style={styles.txValue}>{`${innerSubKey}: ${innerSubValue}`}</Text>
                                                                ))}
                                                            </View>
                                                        );
                                                    } else if (Array.isArray(subValue)) {
                                                        return (
                                                            <>
                                                                {/* <Text key={subIdx} style={styles.txValue}>{`${subKey}: ${truncatedSubValue}`}</Text> */}
                                                                <Text style={styles.txValue}>{`${key}: [${value.slice(0, 5).join(', ')}${value.length > 5 ? `, ... (${value.length - 5} more)` : ''}]`}</Text>
                                                            </>
                                                        );
                                                    }
                                                    else if (typeof subValue === 'string') {
                                                        // Remove everything after the first colon (including the colon itself)
                                                        const cleanedValue = subValue.split(':')[0];
                                                        return (
                                                            <View style={{ flexDirection: "row" }} >
                                                                <Text style={{ color: '#fff000', fontWeight: 'bold', paddingLeft: 15 }} >{subKey}:
                                                                    <Text key={subIdx} style={styles.txValue}>{`${cleanedValue}`}</Text>
                                                                </Text>
                                                            </View>

                                                        );
                                                    }
                                                })}
                                            </View>
                                        ) : (
                                            <Text style={styles.txValue}>
                                                {typeof value === 'string' && value.length > 100 ? `${value.slice(0, 100)}...` : value}
                                            </Text>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </ScrollView>
            );
        } catch (error) {
            console.error('Error rendering transaction details:', error);
            return null;
        }
    };
    return (
        <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.labelText}>Hash:</Text>
                <Text style={styles.valueText}>{transaction.hash}</Text>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => copyToClipboard(transaction.hash)}>
                    <Icon name="content-copy" size={20} color="#FFFF00" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.labelText}>Block ID:</Text>
                <Text style={styles.valueText}>{transaction.block_id}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.labelText}>Transaction Type:</Text>
                <Text style={styles.valueText}>{transaction.tx_type}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.labelText}>Wrapper ID:</Text>
                <Text style={styles.valueText}>{transaction.wrapper_id}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingRight: 50 }}>
                <Text style={styles.labelText}>Data:</Text>
                {transaction.data.length > 100 ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 5 }}>
                        <Text style={styles.valueText}>{transaction.data.slice(0, 100)}...
                            {/* <TouchableOpacity onPress={() => copyToClipboard(transaction.data)}>
                                <Icon name="content-copy" size={20} color="#FFFF00" />
                            </TouchableOpacity> */}
                        </Text>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => copyToClipboard(transaction.hash)}>
                            <Icon name="content-copy" size={20} color="#FFFF00" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={styles.valueText}>{transaction.data}</Text>
                )}
            </View>
            {renderTxDetails()}
        </View>
    );
};


const Nebb = () => {
    const [playerData, setPlayerData] = useState([]);
    const [tnx, setTnx] = useState({});
    const [searchText, setSearchText] = useState(""); // State save value input search
    const [inputType, setInputType] = useState("");
    const [inputTypeSearch, setInputTypeSearch] = useState("");
    const [dataWallet, setDataWallet] = useState(null);
    const fetchPlayerByAddress = async (playerAddress) => {
        try {
            const response = await axios.get(`https://it.api.namada.red/api/v1/player/search/${playerAddress}?player_kind=Crew`);
            const data = response.data.players;
            // console.log("API Response:", data); // Log phản hồi từ API
            //Hash : cbdd305afe971a9595806efdbc8616a3
            setPlayerData(data); // Gán dữ liệu vào state
        } catch (error) {
            console.error('Error fetching crew data:', error); // Log lỗi nếu có
        }
    };
    const fetchTransactionData = async (hashValue) => {
        try {
            // Generate URL to send request
            const api_url = `https://api-namada.cosmostation.io/tx/${hashValue}`;

            // Send API request
            const transactionData = await axios.get(api_url);
            setTnx(transactionData.data);
            // Check if the request was successful

        } catch (error) {
            // throw new Error(error.message);
            console.error('Error fetching transaction data:', error);
        }
    };

    const fetchDataWallet = async (wallet) => {
        try {
            const response = await axios.get(`http://explorer.testnet.one/transactions.php?address=${wallet}&mode=transactions&sort=7&ascdesc=desc&from=&to=&range=wallets_incoming`);
            const html = response.data;
            const $ = cheerio.load(html);
            const extractedData = [];
            // Tìm và trích xuất thông tin SE-moniker/class
            const seMonikerRow = $('body').filter((index, element) => {
                return $(element).text().includes('SE-moniker/class:');
            });
            const seMonikerText = seMonikerRow.text();
            const seMoniker = seMonikerText.includes('SE-moniker/class:') ? seMonikerText.split('SE-moniker/class:')[1].trim() : '';
            const seMonikerLines = seMoniker.split('\n').slice(0, 4);
            const seMonikerFinal = seMonikerLines.join('\n').trim();
            let extractedData_split = [];
            // Kiểm tra xem data có tồn tại và có phải là mảng không
            //Hash : cbdd305afe971a9595806efdbc8616a3
            if (Array.isArray(seMonikerLines) && seMonikerLines.length > 0) {
                seMonikerLines.forEach(item => {
                    // Kiểm tra xem item có tồn tại và có thể chia thành mảng không
                    if (typeof item === 'string') {
                        // Tách chuỗi thành các phần riêng biệt bằng các điểm chia
                        const parts = item.split(/(Wallet:|Transactions sent:|Transactions received:|Total amount sent:|Total amount received:|Number of wallet sent to:|Number of wallets received from:)/);

                        // Loại bỏ các phần tử rỗng và nối vào mảng kết quả
                        extractedData_split = extractedData_split.concat(parts.filter(part => part.trim() !== "" && !part.includes("Wallet:") && !part.includes("Transactions sent:") && !part.includes("Transactions received:") && !part.includes("Total amount sent:") && !part.includes("Total amount received:") && !part.includes("Number of wallet sent to:") && !part.includes("Number of wallets received from:")));
                    } else {
                        console.error('Invalid data format: Expected string but received', typeof item);
                    }
                });
            } else {
                console.error('Invalid data: Expected non-empty array but received', data);
            }
            //Hash : cbdd305afe971a9595806efdbc8616a3
            // console.log(extractedData_split);
            // extractedData.push(<Text key="seMoniker">SE-moniker/class: {seMonikerFinal}</Text>);
            // Hiển thị thông tin tương ứng
            extractedData.push(

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerWallet} key="walletTitle">Moniker:</Text>
                        <Text style={{ color: "white" }} key="walletValue">{extractedData_split[0]}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerWallet} key="walletTitle">Wallet:</Text>
                        <Text style={{ color: "white" }} key="walletValue">{extractedData_split[1]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerWallet} key="transactionsSentTitle">Transactions sent:</Text>
                        <Text style={{ color: "white" }} key="transactionsSentValue">{extractedData_split[2]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerWallet} key="transactionsReceivedTitle">Transactions received:</Text>
                        <Text style={{ color: "white" }} key="transactionsReceivedValue">{extractedData_split[3]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerWallet} key="totalAmountSentTitle">Total Naan sent:</Text>
                        <Text style={{ color: "white" }} key="totalAmountSentValue">{extractedData_split[4]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerWallet} key="totalAmountReceivedTitle">Total Naan received:</Text>
                        <Text style={{ color: "white" }} key="totalAmountReceivedValue">{extractedData_split[5]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerWallet} key="numberOfWalletsSentToTitle">Number of wallets interacted(sent to):</Text>
                        <Text style={{ color: "white" }} key="numberOfWalletsSentToValue">{extractedData_split[6]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerWallet} key="numberOfWalletsReceivedFromTitle">Number of wallets interacted with(received from):</Text>
                        <Text style={{ color: "white" }} key="numberOfWalletsReceivedFromValue">{extractedData_split[7]}</Text>
                    </View>
                </View>

            );
            setDataWallet(extractedData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const detectInputType = (text) => {

        if (text.startsWith("tnam") || text.startsWith("tpknam1") || (text !== "" && text.length !== 64)) {
            setInputType("player");
            return "player";
        } else if (text.length === 64) {
            setInputType("hash");
            return "hash";
        }
    };
    const detectInputTypeTracking = (text) => {

        if (text.startsWith("tnam") && text.length === 45) {
            setInputType("wallet");
            return "wallet";
        } else {
            return "error";
        }
    };

    const handleSearch = async () => {
        const inputTypeSearch = detectInputType(searchText);
        if (inputTypeSearch === "player") {
            // Xử lý nếu đầu vào là loại "player"
            fetchPlayerByAddress(searchText);
        } else if (inputTypeSearch === "hash") {
            // Xử lý nếu đầu vào là loại "hash"
            fetchTransactionData(searchText);
        }
        else {
            Toast.show('Please Enter (tx hash | tnam | tpknam)', Toast.SHORT);
        }
    };
    const handleTrackingWallet = async () => {
        const inputTypeSearch = detectInputTypeTracking(searchText);
        if (inputTypeSearch === "wallet") {
            // Xử lý nếu đầu vào là loại "wallet"
            fetchDataWallet(searchText);
        } else {
            Toast.show('Please Enter Wallet (tnam...)', Toast.SHORT);

        }
    };

    // useEffect(() => {
    //     console.log("Data thay doi ");
    //     console.log(playerData);
    // }, [playerData]);
    //Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3
    const clearSearchText = () => {
        setSearchText('');
    };
    const handlePaste = async () => {
        const clipboardContent = await Clipboard.getString();
        setSearchText(clipboardContent);
    };
    const renderLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    };
    return (
        <KeyboardAvoidingView style={{ width: "100%", height: "90%", paddingBottom: 10 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.header}>
                    Player(tpknam/tnam/moniker) || Tx (hash) || Wallet (tnam)
                </Text>

                <View style={[styles.card, styles.elevation, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TextInput
                        style={{ flex: 1, padding: 5, paddingRight: 105, color: "#000" }}
                        onChangeText={text => setSearchText(text)}
                        value={searchText}
                        placeholder="Enter value to search"
                    />
                    {searchText !== '' && (
                        <TouchableOpacity onPress={clearSearchText} style={[styles.iconButton, { right: 60 }]}>
                            <Icon name="clear" size={20} color="#FFF" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={handlePaste} style={[styles.iconButton, { right: 5 }]}>
                        <Icon name="content-paste" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <View style={{ width: 300, flexDirection: "row" }}>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10, padding: 5, backgroundColor: '#FFFF00', borderRadius: 5 }}
                        onPress={handleSearch}
                    >
                        <View style={{  alignItems: 'center', justifyContent: "center", flexDirection: "row" }}>
                            <Text style={{ alignItems: 'center', justifyContent: 'center', color: "#000" }}>Search  </Text>
                            <Icon name="search" size={25} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10, padding: 5, backgroundColor: '#FFFF00', borderRadius: 5 }}
                        onPress={handleTrackingWallet}
                    >
                        <View style={{  alignItems: 'center', justifyContent: "center", flexDirection: "row" }}>
                            <Text style={{ alignItems: 'center', justifyContent: 'center', color: "#000" }}>Tracking  </Text>
                            <Icon name="account-balance-wallet" size={25} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                flex: 2
            }}>
                {inputType === "player" && playerData.length > 0 &&
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderBottomColor: 'black',
                                paddingVertical: 5,
                                paddingHorizontal: 5,
                                backgroundColor: '#121212',
                            }}>
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

                        </View>

                        <FlatList
                            nestedScrollEnabled
                            contentContainerStyle={{ flexGrow: 1 }}
                            data={playerData}
                            renderItem={({ item }) => <ShowPlayer playerData={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />



                    </View>
                }
                {inputType === "hash" && Object.keys(tnx).length > 0 && (
                    <ShowTransaction transaction={tnx} />
                )}

                {inputType === "wallet" && dataWallet && (
                    <View>
                        {dataWallet}
                    </View>
                )}
            </View>

        </KeyboardAvoidingView>
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
        fontSize: 13,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#FFFF00' // Chữ màu vàng
    },
    headerWallet: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFF00', // Chữ màu vàng
        marginRight: 5,
    },
    //Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3
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
        color: '#FFFFFF', // Màu chữ trắng  Hash : cbdd305afe971a9595806efdbc8616a3
    },
    textContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'flex-start', // Canh trái các dòng văn bản
    },
    labelText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFFF00',
        fontWeight: 'bold',
        textAlign: 'left',
        marginRight: 10,
    },
    valueText: {
        flex: 1, // Sử dụng phần còn lại của không gian
        fontSize: 13,
        color: '#fff',
    },
    valueIcon: {
        fontSize: 18,
        color: '#FFFF00',
    },
    // CSS cho input
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputField: {
        width: '100%',
        padding: 15,
        borderRadius: 25,
        backgroundColor: '#121212',
        color: '#fff',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    inputIcon: {
        position: 'absolute',
        top: '50%',
        right: 15,
        transform: [{ translateY: '-50%' }],
        color: '#999',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 5,
        width: '100%',
        marginVertical: 5,
        color: '#fff',
    },
    elevation: {
        elevation: 20,
        shadowColor: '#FFFF00',
    },
    iconButton: {
        position: 'absolute',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Màu nền đen mờ mờ trong suốt
        borderRadius: 10, // Đặt giá trị để bo góc
    },
    txContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        width: '100%', // Set the width to 100%
    },
    txHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFFF00',
    },
    txRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        paddingLeft: 10,
        color: '#FFFF00',
        flexWrap: 'wrap', // Allow text to wrap to the next line if it exceeds the container width
    },
    txLabel: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#FFFF00',
    },
    txSubLabel: {
        marginRight: 1,
        color: '#FFFF00',
    },
    txValue: {
        color: '#fff',
        flex: 1, // Allow the text to take up the available space
    },
    copyTxButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999,
    },
    copyTxButton: {
        color: 'blue',
    },
});

export default Nebb;
