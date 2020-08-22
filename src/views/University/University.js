import React ,{ useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button, Typography, FormControlLabel,Checkbox, Grid,Paper } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import MaterialTable from "material-table";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import Category from "../../components/Category/Category";

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    list:{
        display:'flex',
        marginLeft:'0px'
    },

    main:{
        paddingBottom:'20px'
    },
    checkPosition: {
        float:'right'
    }
};

const useStyles = makeStyles(styles);



const CategoryModal = (open,handleAlertClose,) => {


    return (
        <div>

            <Dialog
                open={open}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xs'
            >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       <Category/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose} color="primary" autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const Alert = (open,handleAlertClose,) => {


    return (
        <div>

            <Dialog
                open={open}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xs'
            >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Category/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose} color="primary" autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}




const University =()=> {
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);

    const handleAlertClickOpen = () => {
        setOpen(true);
    };

    const handleAlertClose = () => {
        setOpen(false);
    };

    const [checked,setChecked]=useState(false)
    let  newChecked;
    const checkboxHandler=()=>{
        newChecked = !checked;
        setChecked(newChecked);
    }


    const [columns, setColumns] = useState([
        { title: 'University Name', field: 'university_name' },
        { title: 'Country', field: 'country'},
        { title: 'City', field: 'city'},
        { title: 'Motto', field: 'moto'},
        { title: 'Address', field: 'address'},
        { title: 'Description', field: 'description'}

    ]);

    const [university, setUniversity] = useState([
        { university_name: 'Engineering', country: 'Get induced with making machines',city:'',moto:'',address:'',description: '' }

    ]);
    const [dep, setDep] = useState(0);

    const fetchUniversity = async () =>{

        axios({
            method: 'post',
            url: 'http://ec2-13-58-137-105.us-east-2.compute.amazonaws.com/SACA/index.php/API',
            data: JSON.stringify({
                code:"113",
                api:"120"
            })

        }).then( res=>{


            const {data:{ code , msg}} =res;

            if ( code === 200 ){
                setUniversity(msg)
            }else{
                setUniversity('loading')
            }


        })

    }


    // const addCategory = (data) =>{
    //     axios({
    //         method: 'post',
    //         url: 'http://ec2-13-58-137-105.us-east-2.compute.amazonaws.com/SACA/index.php/API',
    //         data: JSON.stringify({
    //             code:110,
    //             api:120,
    //             data:{
    //                 category_name:data.category_name
    //             }
    //         })
    //
    //     }).then( res=>{
    //
    //         const {data:{ code , data}} =res;
    //
    //         if ( code === 200 ){
    //             setDep(dep +1)
    //
    //
    //         }else{
    //
    //         }
    //
    //
    //     })
    //
    // }

    useEffect( ()=>{
        fetchUniversity();
    },[])



    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary" className={classes.header} >
                        <Grid container justify='center' className={classes.main} >
                            <Grid item xs={2} md={2}>
                                <Button color="transparent" onClick={handleAlertClickOpen} >
                                    <Typography className={classes.cardTitleWhite}>Categories</Typography>
                                </Button>

                            </Grid>
                            <Grid item xs={2} md={2}>
                                <Button color="transparent" onClick={handleAlertClickOpen} >
                                    <Typography className={classes.cardTitleWhite}>Add University</Typography>
                                </Button>
                            </Grid>
                            <Grid item xs={8} md={8}>
                                <div className={classes.checkPosition}>
                                    <FormControlLabel
                                        control={<Checkbox checked={checked} color='white'  onChange={checkboxHandler} name="Filter" />}
                                        label="add filter"
                                    />
                                </div>

                            </Grid>
                        </Grid>
                    </CardHeader>
                    <CardBody>
                        <MaterialTable
                            title="Universities"
                            columns={columns}
                            data={university}
                            editable={{
                                onRowAdd:newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {


                                            resolve();
                                        }, 1000)
                                    })
                            }}
                            actions={[
                                {
                                    icon:()=><EditIcon color='primary'/>,
                                    tooltip: 'process',
                                    onClick: (event, rowData) => {

                                    }
                                } ,
                                {
                                    icon:()=><DeleteForeverIcon color='secondary'/>,
                                    tooltip: 'process',
                                    onClick: (event, rowData) => {

                                    }
                                }
                            ]}
                            options={{
                                actionsColumnIndex: -1,
                                filtering: checked
                                // axBodyHeight:'320px'
                            }}

                        />

                    </CardBody>
                </Card>
            </GridItem>
            {Alert(open, handleAlertClose)}
        </GridContainer>
    );
}

export default University;
