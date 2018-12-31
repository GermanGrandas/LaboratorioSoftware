import React, { Component } from 'react'
import {Button,Modal,Form, Message,Segment} from 'semantic-ui-react';
import {DatesRangeInput,TimeInput} from 'semantic-ui-calendar-react';

import api from '../../api';
class NuevaMateria extends Component{
    state = {
		data: {
            codigo: '',
            nombre: '',
            tipoM: '',
            grado: '',
            year: '',
            datesRange : '',
            institucion : '',
            hInicio : '',
            hFin:'',
            dias : '',
            creditos : '',
            teoPrac: ''
		},
		modalOpen: false,
		errors: {}
    };
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
        api.materias.create(data).then(data=> {            
            if(!data.error){
                this.setState({modalOpen : false});
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
			this.submit({data : this.state.data,user: this.props.user});
		}
    };
    handleSelectChange = (e,{value}) =>{
		this.setState({ data: { ...this.state.data, tipoM: value } });
	}
    handleSelectChange2 = (e,{value}) =>{
		this.setState({ data: { ...this.state.data, teoPrac: value } });
	}
    handleChange = (event, {name, value}) => {
        if (this.state.data.hasOwnProperty(name)) {            
          this.setState({data: { ...this.state.data, [name]: value }});
        }
    }
	validate = (data) => {
        const errors = {};
        const today = new Date(Date.now());
        const year = today.getFullYear();
        let fecha = data.hInicio.split(':')
        const h1 = new Date('1000','01','01',fecha[0],fecha[1])
        fecha = data.hFin.split(':')
        const h2 = new Date('1000','01','01',fecha[0],fecha[1])
        if(h2-h1 <= 0) errors.hFin = 'La hora de finalización debe ser mayor a la hora de inicio';
		if (!data.codigo) errors.codigo = 'Debe ingresar el codigo';
		if (!data.nombre) errors.nombre = 'Debe ingresar un nombre';
        if (!data.year) errors.year = 'Debe ingresar el Año';
        if( parseInt(data.year,10) < year) errors.year= 'El año debe ser mayor al Actual';
		if (!data.datesRange) errors.datesRange = 'Debe ingresar las Fechas de inicio y finalización';
		if (!data.institucion) errors.institucion = 'Debe ingresar la Institución';
        if (!data.hInicio) errors.hInicio = 'Debe ingresar la hora de inicio';
        if (!data.hFin) errors.hFin = 'Debe ingresar la hora de Finalización';
        if (!data.dias) errors.dias = 'Debe ingresar los días';
       
        if (!data.tipoM) errors.tipoM = 'Debe ingresar el tipo de Materia';
        if(data.tipoM === 'universidad'){
            if (!data.creditos) errors.creditos = 'Debe ingresar el número de créditos';
            if(parseInt(data.creditos,10)<=0) errors.creditos = 'Los creditos deben ser mayores a 0';
            if (!data.teoPrac) errors.teoPrac = 'Debe ingresar el tipo de Materia';
        }else{
            if(!data.grado) errors.grado = 'Debe ingresar un grado';
            if(parseInt(data.grado,10) <0 | parseInt(data.grado,10) >12) errors.grado = 'El grado no debe ser menor a 0 o mayor a 12';
        }
		return errors;
	};
    handleModal = () => this.setState({ modalOpen: !this.state.modalOpen })
    render(){
        const { data, errors} = this.state;
        let errorsList = [];
        const today = new Date(Date.now());
        const Mopt = [{key:'s',value:'secundaria',text:'Secundaria'},{key: 'u',value:'universidad',text:'Universidad'}]
        const Mop2 = [{key: 't',value:'teorica',text:'Teorica'},{key:'u',value:'practica',text:'Practica'}]
		if(Object.keys(errors).length !== 0){
			
			Object.keys(errors).forEach(
				key=> errorsList.push(errors[key]));
		}
        return(
            <Modal trigger={<Button onClick={this.handleModal} circular icon='add'/>} size='large' open={this.state.modalOpen} onClose={this.handleClose}>
                <Modal.Header>Crear una Materia</Modal.Header>
                <Modal.Content>
					<Form size='big' error={Object.keys(errors).length !== 0 ? true : false} onSubmit={this.handleSubmit}>
						<Segment stacked>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    icon='id badge outline'
                                    iconPosition='left'
                                    type="text"
                                    id="codigo"
                                    name="codigo"
                                    placeholder='Codigo'
                                    error={errors.codigo ? true : false}	
                                    value={data.codigo}
                                    onChange={this.handleStringChange}/>
                                    
                                <Form.Input 
                                    fluid
                                    required
                                    icon='book' iconPosition='left'
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
                                    icon='calendar outline'
                                    iconPosition='left'
                                    id="year"
                                    min={today.getFullYear()}
                                    type="number"
                                    placeholder='Año'
                                    error={errors.year ? true : false}
                                    name="year"
                                    value={data.year}									
                                    onChange={this.handleStringChange}
                                    />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    required
                                    icon='home'
                                    iconPosition='left'
                                    id="institucion"
                                    type="text"
                                    placeholder='Institución'
                                    error={errors.institucion ? true : false}
                                    name="institucion"
                                    value={data.institucion}									
                                    onChange={this.handleStringChange}
                                />
                                <Form.Input
                                    fluid
                                    required
                                    icon='calendar'
                                    iconPosition='left'
                                    id="dias"
                                    type="text"
                                    placeholder='Días'
                                    error={errors.dias ? true : false}
                                    name="dias"
                                    value={data.dias}									
                                    onChange={this.handleStringChange}
                                />
                                 <Form.Select fluid options={Mopt} placeholder='Tipo de Materia'
                                    error={errors.tipoM ? true : false}
                                    value={data.tipoM}
                                    onChange={this.handleSelectChange}
                                  />
                            </Form.Group>
							{
                                data.tipoM === 'secundaria' ?
                                    <Form.Input
                                        fluid
                                        required
                                        icon='book'
                                        iconPosition='left'
                                        id="grado"
                                        type="number"
                                        min = '0'
                                        max='12'
                                        placeholder='Grado'
                                        error={errors.grado ? true : false}
                                        name="grado"
                                        value={data.grado}									
                                        onChange={this.handleStringChange} 
                                    /> :
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                        fluid
                                        required
                                        icon='book'
                                        iconPosition='left'
                                        id="creditos"
                                        type="number"
                                        min = '1'
                                        max='6'
                                        placeholder='Créditos'
                                        error={errors.creditos ? true : false}
                                        name="creditos"
                                        value={data.creditos}									
                                        onChange={this.handleStringChange} 
                                        />
                                    <Form.Select fluid options={Mop2} placeholder='Teórica o Práctica'
                                        error={errors.teoPrac ? true : false}
                                        value={data.teoPrac}
                                        onChange={this.handleSelectChange2}
                                    />
                                    </Form.Group>
                                        
                                }
                            <Form.Group widths='equal'>
                                <DatesRangeInput
                                    name="datesRange"
                                    locale = 'es-CO'
                                    placeholder="Fecha de Inicio/Fecha Finalización"
                                    value={data.datesRange}
                                    iconPosition="left"
                                    onChange={this.handleChange}
                                    minDate = {new Date(data.year,0,20)}
                                    maxDate = {new Date(data.year,10,30)}
                                    initialDate={new Date(data.year,1,1)}
                                    popupPosition='top right'
                                    closeOnMouseLeave={false}
                                />
                                <TimeInput
                                    name="hInicio"
                                    placeholder="Hora Inicio"
                                    value={data.hInicio}
                                    iconPosition="left"
                                    onChange={this.handleChange}
                                    closeOnMouseLeave={false}
                                />
                                <TimeInput
                                    name="hFin"
                                    placeholder="Hora Finalización"
                                    value={data.hFin}
                                    iconPosition="left"
                                    onChange={this.handleChange}
                                    closeOnMouseLeave={false}
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
                                    onClick={this.handleModal}
                                >Cancelar</Button>

                                </Button.Group>
                                	
							</Segment>
						</Form>
                </Modal.Content>
            </Modal>
        )
    }
}


export default NuevaMateria;

