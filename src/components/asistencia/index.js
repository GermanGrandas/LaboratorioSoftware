import React, {Component} from 'react';
import PieChart from 'react-minimal-pie-chart';
import {Button,Header,Grid} from 'semantic-ui-react';

import api from '../../api';

class Asistencia extends Component{
    state = {
        list : []
    }
    
    componentWillMount(){
        let {estudiante} = this.props;
        let {documentoestudiante, materias} = estudiante; 
        console.log(documentoestudiante);
        api.asistencia.getAsistencia({documentoestudiante,materias}).then(
            list =>{
                console.log('mount: ',list);
                this.setState({list});
            }
        );
    }
    update(materia){
        let {estudiante} = this.props;
        let {documentoestudiante} = estudiante;
        api.asistencia.updateAsistencia({documentoestudiante,materia}).then(
            result =>{
                console.log('update: ',result);
                
                this.setState({list :  result});
            }
        )
    }
    /*create(){
        console.log('hola creo sin parar elementos');
        
        let {estudiante} = this.props;
        let {documentoestudiante, materias} = estudiante;
        api.asistencia.createAsistencia({documentoestudiante,materias}).then(
            result =>{

                console.log('create: ', result);
                this.setState({list : [...this.state.list, result]});
            }
        )
    }*/
    renderPie = materias =>{
        let w =materias.map(
            item=>{
                let { estudiante} = this.props;
                
                if(!(item === null | item ===undefined) && item.documentoestudiante === estudiante.documentoestudiante )
                {   
                    console.log('renderPieInside: ',item);
                    let  porcentaje = estudiante.materias.map(i=>{
                        
                    if(i === null | i=== undefined){
                        return 0
                    }else if(i === item.nombreMateria){
                        return item.porcentaje
                    }else{
                        return 0
                    }
                });
                porcentaje = porcentaje[0];         
                return(
                    <Grid key={item.documentoestudiante} style={{width : 100,height : 100, margin : '0 50px'}}>
                        <Grid.Row>
                            <Header as='h3' content={item.nombreMateria} style={{marginRight : '0.2em'}} />
                            <Button icon='plus' onClick={()=>this.update(item.nombreMateria)}/>
                        </Grid.Row>
                        <Grid.Row>
                            <PieChart
                                data={[{ value: 1, key: 1, color: '#E38627' }]}
                                reveal={porcentaje}
                                lineWidth={20}
                                animate
                            />
                        </Grid.Row>
                    </Grid>
                )}else{
                    //this.create();
                    return(
                        <div key={`t_${estudiante.documentoestudiante}`}></div>
                    )
                }
            }
        )
        return w
    }
    render(){
        let {list} = this.state;
        return(
            <div>
                {this.renderPie(list)}
            </div>
        )
    }
}
export default Asistencia;