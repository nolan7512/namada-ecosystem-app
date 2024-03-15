import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio';

const Project = () => {
	return (
		<ScrollView >
			<View style={styles.container}>
				<Image source=
					{
						{
							uri:
								'https://i.imgur.com/kbD9hHK.png'
						}
					} style={styles.profileImage} />
				<Text style={styles.header}>
					Adaman Labs
				</Text>

				{/* <Text style={styles.subheader}>
                Namada Shielded Expedition
				cbdd305afe971a9595806efdbc8616a3
            </Text> */}
				<Text style={styles.description}>
					We are a team of enthusiastic young people, this is the first "competition" that our team has participated in. Desire to accompany and contribute to the Namada community.
				</Text>
				<Text style={styles.description}>
					The application in the early stages still has many shortcomings. We hope to receive comments via email: teik7512@gmail.com
				</Text>
				<Text style={styles.description}>
					Member :
				</Text>
				<Text style={styles.descriptionMember}>
					Nolan (Team Leader)
				</Text>
				<Text style={styles.descriptionMember}>
					Nancy
				</Text>
				<Text style={styles.descriptionMember}>
					Zenitsu
				</Text>
				<Text style={styles.descriptionMember}>
					Hai
				</Text>
				<Text style={styles.descriptionMember}>
					Dat
				</Text>
				<Text style={styles.descriptionsub}>
					Moniker : Nancy2393622235
				</Text>
				<Text style={styles.descriptionsub}>
					Memo : tpknam1qr0f3m6cjs5taskgy4q2x0pa2frv0f055p42t3rjdvl79sl0hxplgquqlx9
				</Text>
				<Text style={styles.descriptionsub}>
					Copyright (c) 2024-03-15 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3
				</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center', //Hash : cbdd305afe971a9595806efdbc8616a3
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
	descriptionMember: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 10,
		color: '#00FFFF',
	},
	descriptionsub: {
		fontSize: 14,
		textAlign: 'center',
		marginBottom: 20,
		color: '#FFFFFF',//cbdd305afe971a9595806efdbc8616a3
	},
	techContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	// Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3
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
		color: '#FFFFFF', //Hash : cbdd305afe971a9595806efdbc8616a3
	},
	valueIcon: {
		fontSize: 18,
		color: '#FFFF00',
	},
});

export default Project;
// Copyright (c) 2024-15-03 AdamanLabs. All rights reserved. Hash : cbdd305afe971a9595806efdbc8616a3