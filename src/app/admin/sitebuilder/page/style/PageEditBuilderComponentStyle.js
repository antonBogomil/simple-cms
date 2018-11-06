const Style = theme => ({
	builderContainer: {
		minHeight: '600px',
		paddingTop: '20px'
	},

	componentsContainer: {},

	pageContainer: {
		backgroundColor: '#f4f5f7',
		display: 'flex',
		flexDirection: 'column',
		borderRadius: '5px',
		overflow: 'auto',
		maxHeight: '600px',
		flexGrow: '3',
	},

	info: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		border: '2px dashed gray',
		borderRadius: '5px',
		padding: '10px',
		margin: '30px'
	},

	componentViewBlock: {
		display: 'flex',
		borderRadius: '5px',
		textAlign: 'center',
		margin: '5px',
		backgroundColor: '#c6efef',
		transition: 'transform 400ms'
	},

	componentMeta: {
		margin: 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
		height: '50px'
	},
	listContainerPaper:{
		minHeight: '60vh',
	},
	selectedItems:{
		padding: '0px'
	},
	buttonChangeOrder:{
		margin: '5px'
	},
	buttonDelete:{
		margin: '5px'
	}



});
export default  Style