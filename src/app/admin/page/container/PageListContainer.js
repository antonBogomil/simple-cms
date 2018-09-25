import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {deletePage, fetchPages} from "../action/pageActions";
import PageListComponent from "../component/PageListComponent";
import InfoWindow from "../../utils/InfoWindow";

class PageListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            isSelectAll: false,
            numSelected: 0,
            responseMessage: '',
            isDataLoad: false
        };
    }

    handleSelectAll = () => {
        const {isSelectAll} = this.state;
        const {pages} = this.props;

        if (!isSelectAll) {
            this.setState({
                isSelectAll: true,
                selected: pages.map(n => n.id),
                numSelected: pages.length
            });
        } else {
            this.setState({
                isSelectAll: false,
                selected: [],
                numSelected: 0
            });
        }
    };

    handleSelectPage = (event, id) => {
        const {pages} = this.props;

        const {selected} = this.state;
        const {isSelectAll} = this.state;

        const isArticleChecked = selected.indexOf(id) !== -1;

        if (isArticleChecked) {
            const index = selected.indexOf(id);
            selected.splice(index, 1);

            if (isSelectAll && selected.length === 0) {
                this.setState({selected: [], isSelectAll: false});
            } else if (isSelectAll && selected.length !== pages.length) {
                this.setState({isSelectAll: false});
            }

            this.setState({selected: selected});
        } else {
            selected.push(id);

            if (!isSelectAll && selected.length === pages.length) {
                this.setState({isSelectAll: true});
            }

            this.setState({selected: selected});
        }

        this.setState({numSelected: selected.length});
    };

    handleOnDeletePages = () => {
        const {selected} = this.state;
        this.props.deletePage(selected);

        this.setState({
            numSelected: 0,
            selected: [],
            isSelectAll: false,
            responseMessage: selected.length + " page(s) was deleted successfully"
        })
    };

    isPageSelected = id => {
        return this.state.selected.indexOf(id) !== -1;
    };

    componentWillMount() {
        if(!this.props.pages || this.props.pages.length === 0) {
            this.props.fetchPages();
        }else{
            this.setState({isDataLoad: true})
        }
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.pages) {
            this.setState({isDataLoad: true})
        }
    };

    render() {
        const {pages} = this.props;
        const {numSelected} = this.state;
        const {isSelectAll} = this.state;
        const {isDataLoad} = this.state;

        const {open} = this.props;
        const {message} = this.props;
        return (
            isDataLoad ? (
                <div>
                    <PageListComponent pages={pages}
                                       numSelected={numSelected}
                                       isSelectAll={isSelectAll}
                                       isPageSelected={this.isPageSelected}
                                       onSelectPage={this.handleSelectPage}
                                       onSelectAll={this.handleSelectAll}
                                       onDeletePages={this.handleOnDeletePages}/>
                    {open ? (
                        <InfoWindow open={open} message={message}/>
                    ) : null}

                </div>
            ) : null
        )

    }

}

PageListContainer.propType = {
    fetchPages: PropTypes.func.isRequired,
    deletePage: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired
};


const mapStateToProps = state => {
    return {
        pages: state.pages.pages,

        open: state.info.open,
        message: state.info.message
    }
};

export default connect(mapStateToProps, {fetchPages, deletePage})(PageListContainer);