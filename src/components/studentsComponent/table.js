import React from 'react';
import ReactTable from 'react-table';
import PieChart from 'react-minimal-pie-chart';
import {Grid,Header} from 'semantic-ui-react';

const Table = ({estudiantes,materia})=>{
    if(!(estudiantes === [] | estudiantes === undefined)){
        const columns = materia ?[
            {
              Header: 'Nombre',
              accessor: 'nombre',
              sortable: true,
            },
            {
                Header: 'Apellido',
                accessor: 'apellido',
                sortable: true,
            },
            {
                Header: 'Correo',
                accessor: 'correo',
                sortable: false,
            },
            {
                Header: 'Direccion',
                accessor: 'direccion',
                sortable: false,
            },
            {
                Header: 'Telefono',
                accessor: 'telefono',
                sortable: false,
            }
        ] :[
            {
              Header: 'Nombre',
              accessor: 'nombre',
              sortable: true,
            },
            {
                Header: 'Apellido',
                accessor: 'apellido',
                sortable: true,
            },
            {
                Header: 'Correo',
                accessor: 'correo',
                sortable: false,
            },
            {
                Header: 'Direccion',
                accessor: 'direccion',
                sortable: false,
            },
            {
                Header: 'Telefono',
                accessor: 'telefono',
                sortable: false,
            },
            {
              Header: 'Materias',
              accessor: 'materias',
              sortable: false
            },
        ]
        let percentage = 80;
        return(
           <div style={{height: '30vh',width: '100%',}} className="tabla">
            <ReactTable
                data={estudiantes}
                columns={columns}
                showPagination={false}
                defaultPageSize={estudiantes.length}
                showPageJump={false}
                className="-highlight"
                style={{
                    height: '100%',
                    width: '100%',
                    textAlign: 'center'
                }}
                SubComponent = {
                    row => {
                        console.log(row.original);
                        return(
                            <div style={{ padding: "20px" }}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header 
                                                as='h3'
                                                content='Asistencia'
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <PieChart
                                            data={[{ value: 1, key: 1, color: '#E38627' }]}
                                            reveal={percentage}
                                            lineWidth={20}
                                            animate
                                            style={{
                                                width : 100,
                                                height : 100
                                            }}
                                        />
                                    </Grid.Row>
                                </Grid>
                            </div>
                        )
                    }
                }
            />
            </div>
        )
    }else{
        return(
            <div>
                No se han encontrado Estudiantes
            </div>
        )
    }
}

export default Table;