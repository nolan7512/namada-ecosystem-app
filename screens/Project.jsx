// Projects.js
import React from 'react';
import {
	View, Text,
	StyleSheet, FlatList,
	TouchableOpacity
} from 'react-native';

const projectsData = [
	{
		id: '1',
		title: 'Ticket booking app',
		description: `A React Native ticket booking app allows 
					users to browse, select, and book tickets for
					various events, movies, or transportation 
					services with an intuitive mobile interface.`,
		technologies: ['React Native', 'Firebase', 'Redux'],
	},
	{
		id: '2',
		title: 'Food recipe app',
		description: `A React Native food recipe app 
					offers a simple and interactive 
					platform for users to discover, explore, 
					and cook a variety of recipes, enhancing 
					their culinary experience on mobile devices.`,
		technologies: ['React Native', 'Node.js', 'Express', 'MongoDB'],
	},
	{
		id: '3',
		title: 'Spotify clone',
		description: `A React Native Spotify clone replicates 
					the popular music streaming service, 
					providing users with a familiar interface 
					to discover, play, and create playlists, 
					bringing the Spotify experience to mobile devices.`,
		technologies: ['React Native', 'Firebase', 'Redux'],
	},

];

const Projects = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>
				Projects
			</Text>
			<FlatList
				data={projectsData}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.projectItem}>
						<Text style={styles.projectTitle}>
							{item.title}
						</Text>
						<Text style={styles.projectDescription}>
							{item.description}
						</Text>
						<View style={styles.technologiesContainer}>
							{item.technologies
								.map((tech, index) => (
									<View key={index} 
										style={styles.techBox}>
										<Text style={styles.techText}>
											{tech}
										</Text>
									</View>
								))}
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,

	},
	projectItem: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 15,
		marginBottom: 20,
		elevation: 3,
	},
	projectTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
		color: 'black',
	},
	projectDescription: {
		fontSize: 16,
		color: '#666',
		marginBottom: 10,
	},
	technologiesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	techBox: {
		backgroundColor: '#61dafb',
		borderRadius: 5,
		padding: 5,
		marginRight: 5,
		marginBottom: 5,
	},
	techText: {
		color: '#fff',
	},
});

export default Projects;
