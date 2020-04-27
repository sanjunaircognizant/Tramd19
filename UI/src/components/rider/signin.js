import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {login} from '../../api/apiService';
import  { Redirect } from 'react-router-dom';


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class signin extends Component {

  state={
    username:"",
    password:"",
    error:"",
    redirect:false
  }
  
  onChange=(e)=>{
    this.setState({...this.state,[e.target.name]:e.target.value});
  }

  click=()=>{
    login({username:this.state.username,password:this.state.password})
    .then(res=>{  
      if(res && res.data){
        localStorage.setItem("token",res.data.token);
        this.props.changeAuth(true);
        this.setState({...this.state,redirect:true})
      }
    })
  }

  render() {
    const classes = this.props.classes;
    if(this.state.redirect){
      return <Redirect to='/dashboard'  />
    }
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
        <small>OFFICIAL</small> <strong>LOGIN</strong>
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={this.onChange.bind(this)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onChange.bind(this)}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.click.bind(this)}
          >
            Login
          </Button>
         
        </div>
      </div>
     
    </Container>
    )
  }
}

export default  withStyles(useStyles)(signin)
