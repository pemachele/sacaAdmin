import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography'; 
//custom components
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios'; 



function Copyright() {


    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                SACA
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
} 



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
}));


export default function AdminLogin() { 
   
    const [username, setUsername]=useState(null);
    const [password,setPassword] =useState(null);
    const [open, setOpen] = React.useState(false);

    // const handleAlertClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleAlertClose = () => {
    //     setOpen(false);
    // };
   
    const handleUsernameChange = (event) => {
        setUsername(event.target.value) ;  
        
       
    }  

   const handlePasswordChange = (event) => {
        setPassword(event.target.value) ;
    }  

   


    
    const login = () => {
 

        const response = axios({
            method: 'post',
            url: 'http://ec2-13-58-137-105.us-east-2.compute.amazonaws.com/SACA/index.php/API',
            data: JSON.stringify({ 
                code:110,
                api:100,
                 data:{
                     username:username,
                     password:password
                    }
                })

        }).then(function (response) { 
            if(response.data.code ===300){
             alert('fails')


                
            }else{ 
                const baseUrl=window.location.origin;
                window.location.href=`${baseUrl}/admin`
               
            }
           
        })
            .catch(function (error) {
                console.log(error);
            });

    };

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="username"
                            name="username"
                            autoComplete="username"
                            autoFocus  
                            onChange={handleUsernameChange}
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
                            onChange={handlePasswordChange}
                        />
                        
                        <Button

                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                             onClick={login}
                        >
                            Sign In
                        </Button>
                       
                        <Box mt={5}>
                            <Copyright/>
                           
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}