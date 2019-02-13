import React, { Component } from 'react'
import {Button,Form, Message,Segment} from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

import api from '../../api';
class NuevoEstudiante extends Component{
    state = {
		data: {
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            correo : '',
            materiapertenece : ''
        },
        materias : [],
		errors: {}
    };
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
    componentDidUpdate(prevProps){
		if(prevProps.errors !== this.props.errors){
			this.setState({errors : this.props.errors});
		}
	}
	handleStringChange = (e) => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
    };
    submit = data =>{
        api.estudiantes.create(data).then(data=> {
            console.log(data);
            if(!data.error){
                this.props.closeModal();
                this.setState({data:{
                    codigo : '',
                    nombre: '',
                    apellido: '',
                    telefono: '',
                    direccion: '',
                    correo : '',
                    materiapertenece : []
                }})
            }else{
                this.setState({errors : {input : data.error}});
            }
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
			this.submit(this.state.data);
		}
    };
    handleSelectChange = (e,{value}) =>{
        console.log(value);
        
		this.setState({ data: { ...this.state.data, materiapertenece: value } });
	}
    handleChange = (event, {name, value}) => {
        if (this.state.data.hasOwnProperty(name)) {            
          this.setState({data: { ...this.state.data, [name]: value }});
        }
    }
	validate = (data) => {
        const errors = {};
        if (!isEmail(data.correo)) errors.correo = 'Correo invalido';
		if (!data.codigo) errors.codigo = 'Debe ingresar el codigo del estudiante';
        if (!data.nombre) errors.nombre = 'Debe ingresar el nombre';
        if (!data.apellido) errors.apellido = 'Debe ingresar el apellido';
		if (!data.telefono) errors.telefono = 'Debe ingresar el Telefono';
        if (!data.direccion) errors.direccion = 'Debe ingresar la dirección del estudiante';
        if (!data.correo) errors.correo = 'Debe ingresar el correo';
        if (!data.materiapertenece) errors.materiapertenece = 'Debe ingresar una materia';
		return errors;
	};
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
                        <Form.Group widths='equal'>
                            <Form.Input
                                    fluid
                                    icon='id badge outline'
                                    iconPosition='left'
                                    type="number"
                                    id="codigo"
                                    name="codigo"
                                    placeholder='Codigo'
                                    error={errors.codigo ? true : false}	
                                    value={data.codigo}
                                    onChange={this.handleStringChange}/>
                                    
                                <Form.Input 
                                    fluid
                                    required
                                    icon='user' iconPosition='left'
                                    id="nombre"
                                    type="text"
                                    placeholder='Nombre'
                                    error={errors.nombre ? true : false}
                                    name="nombre"
                                    value={data.nombre}
                                    onChange={this.handleStringChange}
                                />
                                <Form.Input 
                                    fluid
                                    required
                                    icon='user' iconPosition='left'
                                    id="apellido"
                                    type="text"
                                    placeholder='apellido'
                                    error={errors.apellido ? true : false}
                                    name="apellido"
                                    value={data.apellido}
                                    onChange={this.handleStringChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    required
                                    icon='phone'
                                    iconPosition='left'
                                    id="telefono"
                                    type="number"
                                    placeholder='Telefono'
                                    error={errors.telefono ? true : false}
                                    name="telefono"
                                    value={data.telefono}									
                                    onChange={this.handleStringChange}
                                />
                                <Form.Input
                                    fluid
                                    required
                                    icon='address book'
                                    iconPosition='left'
                                    id="direccion"
                                    type="text"
                                    placeholder='Direccion'
                                    error={errors.direccion ? true : false}
                                    name="direccion"
                                    value={data.direccion}									
                                    onChange={this.handleStringChange}
                                />
                                {
                                    materias === undefined ? 
                                    <div></div>: 
                                    <Form.Select fluid options={materias[0]} placeholder='Materia a la que pertenece'
                                        multiple clearable
                                        error={errors.materiapertenece ? true : false}
                                        value={data.materiapertenece}
                                        onChange={this.handleSelectChange}
                                    /> 
                                }
                                 
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input 
                                    fluid
                                    required
                                    icon='at' iconPosition='left'
                                    id="correo"
                                    type="correo"
                                    placeholder='Correo'
                                    error={errors.correo ? true : false}
                                    name="correo"
                                    value={data.correo}
                                    onChange={this.handleStringChange}
                                />
                            </Form.Group>
							
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
                                >Guardar Materia</Button>
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


export default NuevoEstudiante;