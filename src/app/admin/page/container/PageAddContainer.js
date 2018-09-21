import React, {Component} from "react";

import {connect} from 'react-redux';
import {createPage} from '../action/pageActions'
import PageAddFormComponent from "../component/PageAddFormComponent";
import InfoWindow from "../../utils/InfoWindow";


class PageAddContainer extends Component {

    handleCreatePage = page => {
        const formPage = new FormData();

        for (const prop in page) {
            if (page.hasOwnProperty(prop)) {
                formPage.set(prop, page[prop]);
            }
        }

        this.props.createPage(formPage);
    };

    render() {
        const {open} = this.props;
        const {message} = this.props;

        return (
            <div>

                <PageAddFormComponent onPageCreate={this.handleCreatePage}/>

                {open ? (
                    <InfoWindow open={open}
                                message={message}/>
                ) : null}
            </div>


        )
            ;
    }
}

const mapStateToProps = state =>{
    return {
        open: state.info.open,
        message: state.info.message
    }
};

export default connect(mapStateToProps, {createPage})(PageAddContainer);