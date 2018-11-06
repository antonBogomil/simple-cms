import React, {Component} from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconArticle from '@material-ui/icons/Subject';

import ButtonToolbar from "./ButtonToolbar";


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
	changeOrder = (type) => {
		this.props.changeOrder(type, this.props.order);
	};


	render() {
		const {onHover} = this.state;
		const {isSelected} = this.props;
		const {title, classes, componentIndex, type, reOrder, moveUp, moveDown} = this.props;
		return (
			<ListItem disableRipple={true} button={true} className={classes.nested} onMouseOver={this.handleMouseOver}
			          onMouseLeave={this.handleMouseLeave}>
				{type === 'ARTICLE' ? <IconArticle/> : null}
				<ListItemText inset primary={title}/>
				{onHover ?
					<ButtonToolbar changeOrder={this.changeOrder} moveUp={moveUp} moveDown={moveDown} classes={classes}
					               reOrder={reOrder} selectRemoveHandler={this.selectOrRemoveClick}
					               isSelected={isSelected}/> : null

				}
			</ListItem>
		);
	}
}


export default SubListItem
