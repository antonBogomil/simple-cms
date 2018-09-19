import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContentComponent from "../../ContentComponent";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

import Style from '../style/EditArticleComponentStyle';
import InfoSnackBar from "../../utils/InfoSnackBar";

class EditArticleComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataLoad: false,
            pages: [],
            article: {},
            joditConfig: {
                height: '350'
            },
            responseMessage: '',
            openInfoDialog: false
        };
    }


    handleArticleBodyChange = model => {
        const {article} = this.state;
        article.body = model;
        this.setState({article: article});
    };

    changeArticleTitle = event => {
        const {article} = this.state;
        article.title = event.target.value;
        this.setState({article: article});
    };

    handleChangeOrderNumber = event => {
        const {article} = this.state;
        article.orderNumber = event.target.value;
        this.setState({article: article})
    };

    handleAddOwnerPage = event => {
        const {pages} = this.state;
        const {article} = this.state;

        console.log('select');

        //Set page to article user index in pages like id
        article.page = pages[event.target.value];

        console.log("Select: " + article.page);

        this.setState({article: article});

    };

    updateArticle = event => {
        event.preventDefault();

        const {article} = this.state;

        const data = new FormData();
        data.set('id', article.id);
        data.set('title', article.title);
        data.set('body', article.body);
        data.set('orderNumber', article.orderNumber);


        data.set('page', article.page.id);

        axios.post('/api/article/update/' + article.id, data)
            .then(reponse => {
                this.setState({
                    responseMessage: reponse.data.message,
                    openInfoDialog: true
                });

            }).catch(exception => {
            const errorMgs = exception.response.data.message;
            this.setState({
                responseMessage: errorMgs,
                openInfoDialog: true
            });
        });
    };

    componentDidMount() {
        const {id} = this.props.match.params;

        axios.get('/api/article/get/' + id)
            .then(response => {
                this.setState({article: response.data});
            }).catch(exception => {
            console.log(exception)
        });

        axios.get('/api/page/list')
            .then(response => {
                this.setState({pages: response.data});
            }).catch(exception => {
            console.log(exception);
        });

        this.setState({isDataLoad: true});

    }

    render() {
        const {classes} = this.props;
        const {articlesOrder} = this.props.location.state;

        const {isDataLoad} = this.state;
        const {joditConfig} = this.state;

        const {responseMessage} = this.state;
        const {openInfoDialog} = this.state;

        const {article} = this.state;
        const {pages} = this.state;

        return (
            <ContentComponent navigation="Article / Edit">

                {isDataLoad ? (

                    <div className={classes.mainFormWrapper}>
                        <Typography variant="headline"
                                    color="textPrimary">
                            Edit article
                        </Typography>
                        <Divider/>


                        <form onSubmit={this.updateArticle}
                              autoComplete="off"
                              className={classes.formStyle}>
                            <div className={classes.formControlStyle}>

                                <FormControl>
                                    <TextField
                                        label="Title"
                                        style={{marginTop: '16px'}}
                                        fullWidth
                                        value={article.title}
                                        name={article.title}
                                        onChange={this.changeArticleTitle}
                                        required
                                        autoFocus={true}
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink htmlFor="orederNumber">Order nubmer</InputLabel>
                                    <Select
                                        required
                                        native
                                        value={article.orderNumber}
                                        onChange={this.handleChangeOrderNumber}
                                        id='orederNumber'
                                    >
                                        <option value=""/>

                                        {articlesOrder !== undefined ? (
                                            articlesOrder.map(order => {
                                                return (<option key={order} value={order}>{order}</option>)
                                            })
                                        ) : ''}

                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ownerPage">Owner Page</InputLabel>
                                    <Select
                                        native
                                        onChange={this.handleAddOwnerPage}
                                        inputProps={{
                                            id: 'ownerPage',
                                            name: 'page'
                                        }}>

                                        {article.page ? (
                                            <option key={article.page.id}
                                                    value={pages.indexOf(article.page)}>{article.page.title}</option>
                                        ) : <option value=""/>}

                                        {pages.map((page, index) => {
                                            return (
                                                article.page && article.page.id === page.id ? null
                                                    : (<option key={page.id} value={index}>{page.title}</option>)
                                            )
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={classes.articleBodyStyle}>
                                <JoditEditor
                                    value={article.body}
                                    config={joditConfig}
                                    onChange={this.handleArticleBodyChange}
                                />

                            </div>

                            <div className={classes.buttonContainer}>
                                <Button variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        type="submit">
                                    Save
                                </Button>
                                <Button variant="contained"
                                        color="secondary"
                                        className={classes.button}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>

                ) : null}


                    <InfoSnackBar open={openInfoDialog}
                                  onClose={()=> this.setState({openInfoDialog: false})}
                        timeOut={2000}
                        message={responseMessage}/>




            </ContentComponent>
        );
    }
}

EditArticleComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired,
    pages: PropType.array.isRequired,
    article: PropType.object.isRequired
};

export default withStyles(Style)(EditArticleComponent);
