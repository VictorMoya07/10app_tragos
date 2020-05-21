import React, { useContext,useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    //COnfiguracion del modal de material UI

    const [ modalStyle ] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen =()=>{
        setOpen(true);
    }

    const handleClose = ()=>{
        setOpen(false);
    }

    // extraer los valores del context
    const { guardarIdReceta, recetainfo, guardarReceta  } = useContext(ModalContext);

    const mostrarIngredientes = recetainfo =>{
        let ingredientes = [];
        for(let i = 1; i<16; i++){
            if(recetainfo[`strIngredient${i}`]){
                ingredientes.push(
                    <li>{recetainfo[`strIngredient${i}`]}  {recetainfo[`strMeasure${i}`]}</li>
                )
            }
        }

        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de &{receta.strDrnk}`}/>

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={()=>{
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>

                    <Modal
                        open={open}
                        onClose = {()=>{
                            guardarIdReceta(null);
                            handleClose();
                            guardarReceta({});
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{recetainfo.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {recetainfo.strInstructions}
                            </p>

                            <img  className="img-fluid my-4" src= {recetainfo.strDrinkThumb}/>

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                               {mostrarIngredientes(recetainfo)} 
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Receta;