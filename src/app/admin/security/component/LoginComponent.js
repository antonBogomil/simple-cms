import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import axios from 'axios';

import Style from '../style/LoginComponentStyle';


class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            showPassword: false,
        }
    }

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleLogin = () => {
        const {username} = this.state;
        const {password} = this.state;

        const {onLogin} = this.props;
        onLogin(username, password);

        this.setState({
            username: '',
            password: ''
        });
    };


    render() {
        const {classes} = this.props;
        const {username} = this.state;
        const {password} = this.state;
        const {showPassword} = this.state;

        return (
            <div className={classes.wrapper}>
                <Paper className={classes.loginPaper}>
                    <Grid container className={classes.formContainer}>
                        <Grid item xs={12} className={classes.windowTitle}>
                            <Typography variant="title">
                                Login
                            </Typography>
                            <Divider/>
                        </Grid>

                        <Grid item xs={12} style={{"marginBottom": "10px"}}>
                            <FormControl className={classes.fullWidth}>
                                <TextField
                                    required
                                    autoFocus
                                    fullWidth
                                    placeholder="Enter the username"
                                    value={username}
                                    onChange={(event) => this.setState({username: event.target.value})}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{width: "100%"}}>
                            <FormControl className={classes.fullWidth}>
                                <Input
                                    required
                                    fullWidth
                                    placeholder="Enter the password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => this.setState({password: event.target.value})}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.confirmBtn}>
                        <Button variant="contained"
                                color="primary"
                                onClick={this.handleLogin}
                        >
                            Log in
                        </Button>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(Style)(LoginComponent);