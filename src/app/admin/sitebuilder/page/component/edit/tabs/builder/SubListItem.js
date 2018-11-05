import React, {Component} from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from "@material-ui/core/es/Button/Button";
import IconAdd from '@material-ui/icons/Add';
import IconArticle from '@material-ui/icons/Subject';
import IconDelete from '@material-ui/icons/Delete'

class SubListItem extends Component {
	state = {
		id: null,
		onHover: false,
	};
	handleMouseOver = (e) => {
		this.setState(state => ({onHover: true}));
	};
	handleMouseLeave = () => {
		this.setState(state => ({onHover: false}));
	};
	selectOrRemoveClick = () => {
		this.props.isSelected ? this.props.removeComponentHandler(this.props.order)
			: this.props.addComponentHandler(this.props.componentId)
	};

	render() {
		const {onHover} = this.state;
		const {isSelected} = this.props;
		const {title, classes, componentIndex,type} = this.props;
		return (
			<ListItem button={true} className={classes.nested} onMouseOver={this.handleMouseOver}
			          onMouseLeave={this.handleMouseLeave}>
				{ type==='ARTICLE'? <IconArticle/>  : null}
				<ListItemText inset primary={title}/>
				{onHover ?
					<Button onClick={this.selectOrRemoveClick} mini={true} variant="fab" color="primary">
						{
							isSelected ? <IconDelete/> : <IconAdd/>
						}
					</Button> : null
				}
			</ListItem>
		);
	}
}

export default SubListItem
