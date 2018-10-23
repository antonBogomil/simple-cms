import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContentComponent from "../../../ContentComponent";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

import Style from '../style/EditArticleComponentStyle';

class ArticleEditFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article: {},
            joditConfig: {
                height: '350',
                iframe: true
            },
        };
    }


    handleChangeArticle = (event, propName) => {
        const {article} = this.state;

        if(propName === 'body'){
            article[propName] = event;
        }else {
            article[propName] = event.target.value;
        }
        this.setState({article: article});
    };

    updateArticle = event => {
        event.preventDefault();

        const {article} = this.state;
        const {onUpdate} = this.props;
        onUpdate(article);
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.article) {
            this.setState({
                article: nextProps.article
            })
        }
    };


    render() {
        const {classes} = this.props;

        const {joditConfig} = this.state;
        const {article} = this.state;

        return (
            <ContentComponent navigation="Article / Edit">
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

                            <FormControl >
                                <TextField
                                    fullWidth
                                    label="Title"
                                    style={{marginTop: '16px'}}
                                    value={article.title}
                                    name={article.title}
                                    onChange={event => this.handleChangeArticle(event, 'title')}
                                    autoFocus={true}
                                    required
                                />
                            </FormControl>


                        </div>

                        <div className={classes.articleBodyStyle}>
                            <JoditEditor
                                value={article.body}
                                config={joditConfig}
                                onChange={model => this.handleChangeArticle(model, 'body')}
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

            </ContentComponent>
        );
    }
}

ArticleEditFormComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired,

    article: PropType.object.isRequired,

    onUpdate: PropType.func.isRequired
};

export default withStyles(Style)(ArticleEditFormComponent);
