import React, {Component} from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ComponentItemView from './ComponentItemView';

class ComponentsListView extends Component {



	render() {
		const {components} = this.props;
		const types = [...new Set(components.map(c => c.type))];

		return (
			<List component="nav"
			      subheader={
				      <ListSubheader component="div">All components</ListSubheader>
			      }>

				{
					types.map((type, index) => {
						return (
							<ComponentItemView addComponentHandler={this.props.addComponent}  key={index}
							                   components={components.filter(c => c.type === type)}
							                   menuTitle={type}/>
						)
					})
				}

			</List>

		);
	}
}


export default ComponentsListView;