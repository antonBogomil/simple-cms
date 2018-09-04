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
import {withRouter} from 'react-router-dom';

import axios from 'axios';

import Style from '../../style/security/LoginComponentStyle';


class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            showPassword: false,
            isAuthenticate: false,
        }
    }

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleLogin = event => {
        event.preventDefault();

        const {username} = this.state;
        const {password} = this.state;

        const data = new FormData();
        data.set('username', username);
        data.set('password', password);

        axios.post('/api/auth/user', data)
            .then(response => {
                const code = response.data.code;

                if (code === 200) {
                    this.props.history.push({
                        pathname: '/admin/login/redirect',
                        state: {
                            isAuth: true,
                        }
                    });
                }
            }).catch(exception => {
            console.log(exception);
        })

    };


    render() {
        const {classes} = this.props;
        const {username} = this.state;
        const {password} = this.state;
        const {showPassword} = this.state;

        return (
            <div className={classes.wrapper}>
                <Paper className={classes.loginPaper}>
                    <form onSubmit={this.handleLogin}>
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
                                        placeholder="Enter the username"
                                        fullWidth
                                        value={username}
                                        onChange={(event) => this.setState({username: event.target.value})}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{width: "100%"}}>
                                <FormControl className={classes.fullWidth}>
                                    <Input
                                        required
                                        placeholder="Enter the password"
                                        fullWidth
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
                                    type="submit"
                            >
                                Log in
                            </Button>
                        </Grid>
                    </form>

                </Paper>
            </div>
        );
    }
}

LoginComponent = withStyles(Style)(LoginComponent);
export default withRouter(LoginComponent);