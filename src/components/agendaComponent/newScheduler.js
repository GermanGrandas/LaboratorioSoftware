import React, {Component} from 'react';
import {Form,Segment,Message,Button} from 'semantic-ui-react';

import api from '../../api';

class newScheduler extends Component{
    state = {
        data: {
                nombreMateria : ''
            },
        materias : [],
        errors : {}
        }
    componentDidMount(){
        let {user} = this.props;
        if(user === "" | user === undefined){
            user = localStorage.user
        }
        api.materias.getMaterias(user).then(materiasR=>{
            let {materias} = this.state;
            let x = materiasR.map( (x) =>{
                let materiasDict = {}
                materiasDict['key'] = x['nombre'];
                materiasDict['text'] = x['nombre']
                materiasDict['value'] = x['nombre']
                return materiasDict
            })
            materias.push(x);
            this.setState({materias});
        });
    }
    handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
        this.setState({ errors});
		if (Object.keys(errors).length === 0) {
            let {user} = this.props;
            if(user === "" | user === undefined){
                user = localStorage.user
            }
            let {data} = this.state;
			api.agenda.makeAgenda({data}).then(data=> {
                console.log(data);
                if(!data.error){
                    this.props.closeModal();
                    this.setState({data:{
                        nombreMateria : ''
                    }});
                }else{
                    this.setState({errors : {input : data.error}});
                }
            });
		}
    };

    componentDidUpdate(prevProps){
		if(prevProps.errors !== this.props.errors){
			this.setState({errors : this.props.errors});
		}
    }

    validate = (data) => {
        const errors = {};
        if (!data.nombreMateria) errors.nombreMateria = 'Debe ingresar el nombre de Materia';
		return errors;
	};
    handleSelectChange = (e,{value}) =>{        
		this.setState({ data: { ...this.state.data, nombreMateria: value } });
	}
    render(){
        const { data, errors,materias} = this.state;
        const {closeModal} = this.props;
        let errorsList = [];
		if(Object.keys(errors).length !== 0){
			
			Object.keys(errors).forEach(
				key=> errorsList.push(errors[key]));
		}
        return(
            <Form size='big' error={Object.keys(errors).length !== 0 ? true : false} onSubmit={this.handleSubmit}>
                <Segment stacked>
                    {
                        materias === undefined ? 
                            <div>No hay materias para Planificar</div>: 
                            <Form.Select fluid options={materias[0]} placeholder='Materia a Planificar'
                                clearable
                                error={errors.nombreMateria ? true : false}
                                value={data.nombreMateria}
                                onChange={this.handleSelectChange}
                            /> 
                    }
                    {
						Object.keys(errors).length !== 0 ?
							<Message
								error
								header='Se han producido errores'
								list={errorsList}
							/> : <div></div>
					}
					    <Button.Group fluid>
                        <Button 
                            type="submit"
                            color='green'
                        >Crear Planificador</Button>
                        <Button.Or text='o'/>
                        <Button
                            color='red'
                            onClick={()=>closeModal()}
                        >Cancelar</Button>

                        </Button.Group>
                </Segment>
            </Form>
        )
    }
}

export default newScheduler;