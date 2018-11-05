import React, {Component} from 'react';
import PropType from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import Style from '../../../../style/PageEditBuilderComponentStyle';
import ComponentsListView from "./ComponentListView";
import Button from "@material-ui/core/es/Button/Button";

import SvgIcon from '@material-ui/core/SvgIcon';
import Paper from "@material-ui/core/es/Paper/Paper";
import List from "@material-ui/core/es/List/List";
import ListSubheader from "@material-ui/core/es/ListSubheader/ListSubheader";
import Typography from "@material-ui/core/es/Typography/Typography";
import SubListItem from "./SubListItem";
import ListItem from "@material-ui/core/es/ListItem/ListItem";


class PageEditBuilderComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			allComponents: [],
			pageComponents: [],
		}
	}

	addComponent = (id) => {
		const newComponent = this.props.components.filter((component) => {
			return component.id === id;
		});
		const newPageComponents = [...this.state.pageComponents, newComponent[0]];
		this.setState({
			pageComponents: newPageComponents
		});
		console.log(newComponent[0]);
	};
	removeComponent = (order) => {
		const filteredPageComponents = this.state.pageComponents.slice(0);
		filteredPageComponents.splice(order,1);
		this.setState({
			pageComponents: filteredPageComponents
		});
	}

	render() {
		const {classes} = this.props;
		const {components} = this.props;
		const {pageComponents} = this.state;
		return (
			<Grid container className={classes.builderContainer}>
				<Grid item xs={3} className={classes.componentsContainer}>
					<Paper className={classes.listContainerPaper}>
						<ComponentsListView addComponent={this.addComponent} components={components}/>
					</Paper>
				</Grid>
				<Grid item xs={1}>
				</Grid>
				<Grid item xs={8} className={classes.componentsContainer}>
					<Paper className={classes.listContainerPaper}>
						<List component="nav"
						      subheader={
							      <ListSubheader component="div">Selected components</ListSubheader>
						      }>
							{
								pageComponents.map((c, index) => {
									return (
										<ListItem className={classes.selectedItems}  key={index}>
											<SubListItem type={c.type} isSelected={true}
											             removeComponentHandler={this.removeComponent}

											             order={index}
											             componentIndex={c.id} title={c.title} classes={classes}>
											</SubListItem>
										</ListItem>

									)
								})}

							<Typography variant='title'
							            className={classes.info}>
								Add components for this page
							</Typography>
						</List>


					</Paper>

				</Grid>
			</Grid>
		);
	}

}

PageEditBuilderComponent
	.propType = {
	articles: PropType.array.isRequired

};


PageEditBuilderComponent = withStyles(Style)(PageEditBuilderComponent);
export default (PageEditBuilderComponent);


