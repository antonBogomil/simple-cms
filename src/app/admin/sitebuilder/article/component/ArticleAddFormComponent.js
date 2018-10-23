import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContentComponent from "../../../ContentComponent";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";


import Style from '../style/AddArticleComponentStyle';




class ArticleAddFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            joditConfig: {
                height: '350',
                iframe: true,
                fontSize: '25px'
            },
        };
    }

    handleArticleBodyChange = (model) => {
        this.setState({body: model});
    };

    handleClearForm = () => {
        this.setState({
            title: '',
            body: '',
        });
    };

    handeSaveArticle = event => {
        event.preventDefault();

        const article = {
            title: this.state.title,
            body: this.state.body,
        };

        const {onCreate} = this.props;
        onCreate(article);

        this.handleClearForm();
    };


    render() {
        const {classes} = this.props;

        const {joditConfig} = this.state;


        const {body} = this.state;
        const {title} = this.state;

        return (
            <div>
                <ContentComponent navigation="Article / Add">
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
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </div>

                </ContentComponent>
            </div>
        );
    }
}

ArticleAddFormComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired,
};

export default withStyles(Style)(ArticleAddFormComponent);
