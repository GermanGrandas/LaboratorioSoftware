
import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Select from 'react-select';
import {Link} from 'react-router-dom';

import Menu from './sideMenu';
import FormInlineMessage from './FormInlineMessage';
import api from '../api';
/**
 * Código Materia
 * Nombre Materia
 * Secundaria o Universitaria 
 * Secundaria:
    grado, año, fecha de inicio y fecha de finalización, e institución
    horario, días 
 * Universitario:
    teórico o práctico, fecha de inicio y fecha de finalización, numero de créditos, institución,
    horario, días, año 
 */

class MateriaForm extends Component{
    state = {
		data: {
            codigo: '',
			nombre: '',
            tipoM: '',
            tipoM2: '',
			grado: '',
			year: '',
			fInicio: '',
			fFin: '',
			institucion : '',
			horario : '',
			dias : '',
			creditos : '',
			teoPrac: ''
		},
		loading: false,
		errors: {},
    };
    submit = data =>{
        api.materias.create(data).then(data=> {
            console.log(data);
           // this.props.history.push('/home');
        });
    };

    handleStringChange = (e) => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
    };
    validate = (data) => {
        const errors = {};
        const today = new Date(Date.now());
        const year = today.getFullYear();
		if (!data.codigo) errors.codigo = 'Debe ingresar el codigo';
		if (!data.nombre) errors.nombre = 'Debe ingresar un nombre';
        if (!data.year) errors.year = 'Debe ingresar el Año';
        if( parseInt(data.year,10) < year) errors.year= 'El año debe ser mayor al Actual';
		if (!data.fInicio) errors.fInicio = 'Debe ingresar la Fecha de Inicio';
		if (!data.fFin) errors.fFin = 'Debe ingresar la Fecha de Finalización';
		if (!data.institucion) errors.institucion = 'Debe ingresar la Institución';
        if (!data.horario) errors.horario = 'Debe ingresar el horario';
        if (!data.dias) errors.dias = 'Debe ingresar los días';
       
        if (!data.tipoM) errors.tipoM = 'Debe ingresar el tipo de Materia';
        if(data.tipoM.value === 'Universidad'){
            if (!data.creditos) errors.creditos = 'Debe ingresar el número de créditos';
            if(parseInt(data.creditos,10)<=0) errors.creditos = 'Los creditos deben ser mayores a 0';
            if (!data.teoPrac) errors.teoPrac = 'Debe ingresar el tipo de Materia';
        }else{
            if(!data.grado) errors.grado = 'Debe ingresar un grado';
            if(parseInt(data.grado,10) <0 | parseInt(data.grado,10) >12) errors.grado = 'El grado no debe ser menor a 0 o mayor a 12';
        }
		return errors;
	};
    handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
			//this.submit(this.state.data);
			//alert('UserSaved');.catch(err=> this.setState({errors:err.response.data.errors, loading:false}));
		}
    };
    handleHourChange = (hour)=>{
        this.setState({
			data: { ...this.state.data, horario: hour }
		});
    }
    handleTipoChange = (tipo)=>{
        const { value} = tipo
        this.setState({
			data: { ...this.state.data, tipoM:tipo, tipoM2 : value }
        });
    }
    handleTipoChange2 = (tipo)=>{
        this.setState({
			data: { ...this.state.data, teoPrac:tipo}
        });
    }
    handleDateChangeInicio=(date)=>{
		this.setState({
			data: { ...this.state.data, fInicio: date }
		});
    }
    handleDateChangeFin=(date)=>{
		this.setState({
			data: { ...this.state.data, fFin: date }
		});
	}
    render(){
        const { data, errors} = this.state;
        const today = new Date(Date.now());
        const Mopt = [{value:'Secundaria',label:'Secundaria'},{value:'Universidad',label:'Universidad'}]
        const Mop2 = [{value:'Teorica',label:'Teorica'},{value:'Practica',label:'Practica'}]
        return(
            <div id='App'>            
                <Menu pageWrapId={"page-wrap"} outerContainerId={"App"} logout={this.props.logout}/>
                <div className='nav-wrapper white' id="page-wrap">
                    <h1>Docent Helper</h1>
                    <div className='container'>
                        <form className="col s6" onSubmit={this.handleSubmit}>
                            <h3 className="header">Crear Materia</h3>
                            <div className="row">
                                <div className="input-field col s4">
                                    <input
                                        type="text"
                                        id="codigo"
                                        name="codigo"
                                        className={errors.codigo ? 'validate invalid' : 'validate'}
                                        value={data.codigo}
                                        onChange={this.handleStringChange}
                                    />
                                    <label id="font" htmlFor="codigo">
                                        Codigo
                                    </label>
                                    <FormInlineMessage content={errors.codigo} type="error" />
                                </div>
                                <div className="input-field col s4">
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className={errors.nombre ? 'validate invalid' : 'validate'}
                                        value={data.nombre}
                                        onChange={this.handleStringChange}
                                    />
                                    <label id="font" htmlFor="nombre">
                                        Nombre Materia
                                    </label>
                                    <FormInlineMessage content={errors.codigo} type="error" />
                                </div>
                                <div className="input-field col s4">
                                    <input
                                        type="number"
                                        id="year"
                                        name="year"
                                        min={today.getFullYear()}
                                        className={errors.year ? 'validate invalid' : 'validate'}
                                        value={data.year}
                                        onChange={this.handleStringChange}
                                    />
                                    <label id="font" htmlFor="year">
                                        Año
                                    </label>
                                    <FormInlineMessage content={errors.year} type="error" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4">
                                    <input
                                        type="text"
                                        id="institucion"
                                        name="institucion"
                                        className={errors.institucion ? 'validate invalid' : 'validate'}
                                        value={data.institucion}
                                        onChange={this.handleStringChange}
                                    />
                                    <label id="font" htmlFor="institucion">
                                        Institucion
                                    </label>
                                    <FormInlineMessage content={errors.institucion} type="error" />
                                </div>
                                <div className="input-field col s4">
                                    <input
                                        id="dias"
                                        type="text"
                                        className={errors.dias ? 'validate invalid' : 'validate'}
                                        name="dias"
                                        value={data.dias}
                                        onChange={this.handleStringChange}
                                    />
                                    <label id="font" htmlFor="dias">
                                        Dias
                                    </label>
                                    <FormInlineMessage content={errors.dias} type="error" />
                                </div>
                                <div className="col s4">
                                    <label id="font" htmlFor="tipo">
                                                Clase Materia
                                    </label>
                                    <Select
                                        value={data.tipoM}
                                        onChange={this.handleTipoChange}
                                        options={Mopt}
                                    />
                                    <FormInlineMessage content={errors.tipoM} type="error" />
                                </div>
                                
                            </div>
                            <div className='row'>
                                {data.tipoM2 ==='Secundaria'?
                                    <div className="input-field col s4">
                                        <input
                                            type="text"
                                            id="grado"
                                            name="grado"
                                            min = '0'
                                            max='12'
                                            className={errors.grado ? 'validate invalid' : 'validate'}
                                            value={data.grado}
                                            onChange={this.handleStringChange}
                                        />
                                        <label id="font" htmlFor="grado">
                                            Grado
                                        </label>
                                        <FormInlineMessage content={errors.grado} type="error" />
                                    </div> :
                                    <div>
                                        <div className="input-field col s4">
                                            <input
                                                type="number"
                                                id="creditos"
                                                name="creditos"
                                                min='1'
                                                max='6'
                                                className={errors.creditos ? 'validate invalid' : 'validate'}
                                                value={data.creditos}
                                                onChange={this.handleStringChange}
                                            />
                                            <label id="font" htmlFor="creditos">
                                                Creditos
                                            </label>
                                            <FormInlineMessage content={errors.creditos} type="error" />
                                        </div>
                                        <div className="col s4">
                                            <label id="font" htmlFor="tipo">
                                                        Teórico o Practica
                                            </label>
                                            <Select
                                                value={data.teoPrac}
                                                onChange={this.handleTipoChange2}
                                                options={Mop2}
                                            />
                                             <FormInlineMessage content={errors.teoPrac} type="error" />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='row'>
                                <div className="col s4">
                                        <label id="font" htmlFor="fInicio">
                                             Fecha Inicio
                                        </label>	
                                        <DatePicker
                                            locale = 'es-CO'
                                            minDate = {new Date(today.getFullYear(),0,20)}
                                            maxDate = {new Date(today.getFullYear(),10,30)}
                                            onChange={this.handleDateChangeInicio}
                                            value={data.fInicio}
                                        />
                                        <FormInlineMessage content={errors.fInicio} type="error" />
                                </div>
                                <div className="col s4">
                                        <label id="font" htmlFor="fInicio">
                                            Fecha Finalizacion
                                        </label>	
                                        <DatePicker
                                            locale = 'es-CO'
                                            minDate = {data.fInicio}
                                            maxDate = {new Date(today.getFullYear(),10,30)}
                                            onChange={this.handleDateChangeFin}
                                            value={data.fFin}
                                        />
                                        <FormInlineMessage content={errors.fFin} type="error" />
                                </div>
                                <div className="input-field col s3">
                                    <label htmlFor='horario'>
                                        Horario
                                    </label>
                                    <TimePicker
                                        label='Horario'
                                        id="horario"
                                        name="horario"
                                        onChange={this.handleHourChange}
                                        className={errors.horario ? 'validate invalid' : 'validate'}
                                        value={data.horario}
                                    />
                                    <FormInlineMessage content={errors.horario} type="error" />
                                </div>
                            </div>      
                        
                            <div className="col s12 m10">
                                <button className="btn black waves-effect waves-light" type="submit">
                                    Crear Materia
                                </button>
                                <Link to='/home' className='btn red waves-effect waves-light'>Cancelar</Link>
                            </div>
                    </form>

                	</div> 
				</div>
            </div>
        )
    }
}


export default MateriaForm;