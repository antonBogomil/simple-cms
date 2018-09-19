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


import Style from '../style/AddArticleComponentStyle';
import InfoSnackBar from "../../utils/InfoSnackBar";
import AlertDialogComponent from "../../utils/AlertDialogComponent";

class ArticleFormPageChooser extends Component {

    handleSelectPage = event => {
        const {onPageSelect} = this.props;
        onPageSelect(event.target.value);
    };

    render() {
        const {classes} = this.props;
        const {pages} = this.props;


        return (
            <FormControl className={classes.pageChooser}>
                <InputLabel htmlFor="pageChooser">Choose parent page</InputLabel>
                <Select
                    native
                    required
                    inputProps={{
                        id: 'pageChooser'
                    }}
                    onChange={this.handleSelectPage}
                >
                    <option value=""/>
                    {pages.map((page, index) => {
                        return (
                            <option key={page.id} value={index}>{page.title}</option>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }
}

ArticleFormPageChooser = withStyles(Style)(ArticleFormPageChooser);

class AddArticleComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataLoad: false,
            pages: [],
            title: '',
            body: '',
            page: null,
            joditConfig: {
                height: '350'
            },
            responseMessage: '',
            openInfoDialog: false
        };
    }

    handleArticleBodyChange = (model) => {
        this.setState({body: model});
    };

    handleAddParentPage = pageIndex => {
        const selectedPage = this.state.pages[pageIndex];
        this.setState({
            page: selectedPage === undefined ? "" : selectedPage.id
        });
    };

    handleClearForm = () => {
        this.setState({
            title: '',
            body: '',
            page: null,
        });
    };

    handeSaveArticle = event => {
        event.preventDefault();

        const {title, body, page} = this.state;

        const article = new FormData();
        article.set('title', title);
        article.set('body', body);
        article.set('page', page);

        axios.post('/api/article/save', article)
            .then(response => {
                this.setState({
                    responseMessage: response.data.message,
                    openInfoDialog: true,
                    title: '',
                    body: ''
                })
            })
            .catch(exception => {
                const errorMgs = exception.response.data.message;
                this.setState({
                    responseMessage: errorMgs,
                    openInfoDialog: true
                });
            });
    };

    componentDidMount() {
        axios.get("/api/page/list")
            .then(response => {
                this.setState({
                    pages: response.data,
                    isDataLoad: true
                });
            })
            .catch(exception => {
                const errorMgs = exception.response.data.message;
                this.setState({
                    responseMessage: errorMgs,
                    openInfoDialog: true
                });
            })
    }

    render() {
        const {classes} = this.props;

        const {body} = this.state;
        const {title} = this.state;
        const {pages} = this.state;
        const {isDataLoad} = this.state;
        const {joditConfig} = this.state;
        const {responseMessage} = this.state;
        const {openInfoDialog} = this.state;

        return (
            <div>
                <ContentComponent navigation="Article / Add">
                    {isDataLoad ? (
                        <div className={classes.mainFormWrapper}>
                            <Typography variant="headline" color="textPrimary">
                                Add article
                            </Typography>
                            <Divider/>

                            <form autoComplete="off"
                                  className={classes.formStyle}
                                  onSubmit={this.handeSaveArticle}
                            >

                                <div className={classes.formControlStyle}>
                                    <FormControl>
                                        <TextField placeholder="Enter the title"
                                                   fullWidth
                                                   value={title}
                                                   onChange={(event) => this.setState({title: event.target.value})}
                                                   label="Title"
                                                   required
                                        />
                                    </FormControl>

                                    <ArticleFormPageChooser
                                        pages={pages}
                                        onPageSelect={this.handleAddParentPage}
                                    />
                                </div>

                                <div className={classes.articleBodyStyle}>
                                    <JoditEditor
                                        value={body}
                                        onChange={this.handleArticleBodyChange}
                                        config={joditConfig}
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
                                            className={classes.button}
                                            onClick={this.handleClearForm}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>

                    ) : (
                        null
                    )}

                    {(isDataLoad && pages.length === 0) ? (
                        <AlertDialogComponent
                            redirectTo={'/admin/page'}
                            title="Article creation problem"
                            helpMessage="There are no pages created.
                            Ar first you have to create the page."
                        />
                    ) : null}


                    {responseMessage !== '' ? (
                        <InfoSnackBar open={openInfoDialog}
                                      onClose={()=> this.setState({openInfoDialog: false})}
                                      timeOut={2000}
                                      message={responseMessage}/>
                    ) : ''
                    }


                </ContentComponent>
            </div>
        );
    }
}

AddArticleComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired,
    pages: PropType.array.isRequired
};

export default withStyles(Style)(AddArticleComponent);
