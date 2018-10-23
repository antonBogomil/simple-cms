import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContentComponent from "../../../ContentComponent";
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';

import Style from '../style/EditPageComponentStyle';



import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PageEditMainTabComponent from "./edit/tabs/PageEditMainTabComponent";
import Button from "@material-ui/core/Button";

class PageEditFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: {},
            isDataLoad: false,
            selectedTab: 0,
        };
    }

    handleChangeTab = (event, value) =>{
        this.setState({selectedTab: value});
    };

    handeUpdatePage = event => {
        event.preventDefault();

        const {page} = this.state;
        const {onPageUpdate} = this.props;
        onPageUpdate(page, page.id);

    };

    handleCancel = () => {
        this.props.history.goBack();
    };

    handleEditPage = (event, propName) => {
        const {page} = this.state;

        if(propName === 'isMainPage'){
            page[propName] = event.target.checked;
        }else{
            page[propName] = event.target.value;
        }

        this.setState({page: page});
    };

    handleDeleteComponentFromPage = (event, component) => {
        const {page} = this.state;
        const index = page.components.indexOf(component);

        page.components.splice(index, 1);
        this.setState({page: page});
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.page) {
            this.setState({
                page: nextProps.page,
                isDataLoad: true
            });
        }
    };

    render() {
        const {classes} = this.props;


        const {page} = this.state;
        const {isDataLoad} = this.state;

        const {selectedTab} = this.state;
        return (
            isDataLoad ? (
                <ContentComponent navigation="Page / Edit">


                    <div className={classes.mainFormWrapper}>
                        <Typography variant="headline"
                                    color="textPrimary">
                            Edit page
                        </Typography>
                        <Divider/>

                        <form id="page-form"
                              autoComplete="off"
                              className={classes.formStyle}
                              onSubmit={this.handeUpdatePage}
                        >

                            <AppBar position={"static"}>
                                <Tabs value={selectedTab} onChange={this.handleChangeTab}>
                                    <Tab label={"Main configuration"}/>
                                    <Tab label={"Page builder"}/>
                                </Tabs>
                            </AppBar>

                            {
                                selectedTab === 0 &&
                                <PageEditMainTabComponent page={page} onEdit={this.handleEditPage}/>
                            }

                            <div className={classes.buttonContainer}>
                                <Button variant="contained"
                                        color="primary"
                                        type="submit"
                                        form="page-form"
                                        className={classes.button}>
                                    Save
                                </Button>
                                <Button variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={this.handleCancel}
                                >
                                    Cancel
                                </Button>
                            </div>

                        </form>
                    </div>

                </ContentComponent>

            ) : null

        );
    }
}

PageEditFormComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired,
    page: PropType.object.isRequired
};

export default withStyles(Style)(PageEditFormComponent);
