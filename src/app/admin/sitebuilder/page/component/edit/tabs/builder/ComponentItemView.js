import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Style from '../../../../style/PageEditBuilderComponentStyle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SubListItem from './SubListItem';
import FolderIcon from '@material-ui/icons/Folder'
import FolderIconOpen from '@material-ui/icons/FolderOpen'
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";

class ComponentItemView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	handleClick = () => {
		this.setState(state => ({open: !state.open}));
	};



	render() {
		const {classes} = this.props;
		const {components} = this.props;
		const {menuTitle} = this.props;


		const {open} = this.state;
		return (
			<div style={{cursor: 'pointer', overflow: 'auto'}}>
				<ListItem onClick={this.handleClick}>
					<ListItemIcon>
						{open? <FolderIconOpen/> : <FolderIcon />}

					</ListItemIcon>
					<ListItemText primary={menuTitle}/>
					{open ? <ExpandLess/> : <ExpandMore/>}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{
							components.map((c, index) => {
								return (
									<SubListItem type={c.type} isSelected={false} addComponentHandler={this.props.addComponentHandler}  key={index} componentId={c.id} title={c.title} classes={classes} itemOnSelect={this.handleSelectItem}/>
								)
							})
						}
					</List>
				</Collapse>
			</div>
		);
	}
}



export default withStyles(Style)(ComponentItemView);