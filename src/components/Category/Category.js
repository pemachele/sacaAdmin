import React ,{ useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from "material-table";
import axios from 'axios';

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
    }
};

const useStyles = makeStyles(styles);





const Category =()=> {
    const classes = useStyles();


    const [columns, setColumns] = useState([
        { title: 'Name', field: 'category_name' }
    ]);

    const [category, setCategory] = useState([
        { category_name: 'Engineering' },
        { category_name: 'International Business'},
    ]);
    const [dep, setDep] = useState(0);

    const fetchCategory = async () =>{

        axios({
            method: 'post',
            url: 'http://ec2-13-58-137-105.us-east-2.compute.amazonaws.com/SACA/index.php/API',
            data: JSON.stringify({
                code:"117",
                api:"120"
            })

        }).then( res=>{


            const {data:{ code , categories}} =res;

            if ( code === 200 ){
                setCategory(categories)
            }else{
                setCategory('loading')
            }


        })

    }


    const addCategory = (data) =>{
        axios({
            method: 'post',
            url: 'http://ec2-13-58-137-105.us-east-2.compute.amazonaws.com/SACA/index.php/API',
            data: JSON.stringify({
                code:110,
                api:120,
                data:{
                    category_name:data.category_name
                }
            })

        }).then( res=>{

            const {data:{ code , data}} =res;

            if ( code === 200 ){
                setDep(dep +1)


            }else{

            }


        })

    }

    useEffect( ()=>{
        fetchCategory();
    },[])



    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary" className={classes.header} >
                        <li className={classes.list}>
                            <ul>
                                <h4 className={classes.cardTitleWhite}>Categories</h4>
                            </ul>
                        </li>
                    </CardHeader>
                    <CardBody>
                        <MaterialTable
                            title="Categories"
                            columns={columns}
                            data={category}
                            editable={{
                                onRowAdd:newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            addCategory(newData);

                                            resolve();
                                        }, 1000)
                                    })
                            }}
                             options={{ maxBodyHeight:'500px'}}
                        />

                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>
    );
}

export default Category;
