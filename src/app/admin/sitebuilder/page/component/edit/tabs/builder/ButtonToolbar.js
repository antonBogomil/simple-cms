import React, {Component} from 'react';


import Button from "@material-ui/core/es/Button/Button";
import IconUp from '@material-ui/icons/ArrowDropUp';
import IconDown from '@material-ui/icons/ArrowDropDown';
import IconAdd from '@material-ui/icons/Add';
import IconArticle from '@material-ui/icons/Subject';
import IconDelete from '@material-ui/icons/Remove'

class ButtonToolbar extends Component {
	selectRemoveHandler = () => {
		this.props.selectRemoveHandler();
	};
	moveUpHandler = () => {
		this.props.changeOrder('UP');
	};
	moveDownHandler = () => {
		this.props.changeOrder('DOWN');
	};


	render() {
		const {isSelected, reOrder, classes, moveUp, moveDown} = this.props;
		return (
			<div>

				{
					reOrder ?
						<span>
							{moveUp ?
								<Button onClick={this.moveUpHandler} className={classes.buttonChangeOrder} mini={true}
								        variant="fab"
								        color="default">
									<IconUp/>
								</Button> : null}
							{moveDown ?
								<Button onClick={this.moveDownHandler} className={classes.buttonChangeOrder} mini={true}
								        variant="fab"
								        color="default">
									<IconDown/>
								</Button> : null}

						</span> : null
				}
				<span>
					<Button className={classes.buttonDelete} onClick={this.props.selectRemoveHandler} mini={true}
					        variant="fab" color="secondary">
						{
							isSelected ? <IconDelete/> : <IconAdd/>
						}
					</Button>
				</span>


			</div>
		);
	}
}

export default ButtonToolbar