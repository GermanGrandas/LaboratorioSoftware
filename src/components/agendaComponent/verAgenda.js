import React, {Component} from 'react';
import { ReactAgenda , ReactAgendaCtrl , Modal } from 'react-agenda';
import {Grid,Icon,Header} from 'semantic-ui-react';

import moment from 'moment';

import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';

import api from '../../api';

const now = new Date();

const colors= {
    'color-1':"rgba(102, 195, 131 , 1)" ,
    "color-2":"rgba(242, 177, 52, 1)" ,
    "color-3":"rgba(235, 85, 59, 1)",
    "color-4":"rgba(70, 159, 213, 1)",
    "color-5":"rgba(170, 59, 123, 1)"
  }

class verAgenda extends Component{
    state = {
        items : [],
        selected:[],
        cellHeight:30,
        showModal:false,
        rowsPerHour:2,
        numberOfDays:4,
        startDate: new Date()
    }
    componentDidMount(){
        let {activo} = this.props;
        api.agenda.getAgenda(activo).then(res=>{
            if(!res.error) {
                //console.log(Date(res[0].endDateTime));
                console.log(res);
                res.map(
                    item =>{
                        let dict = {}
                        dict['_id'] = item['_id']
                        dict['classes'] = item['classes']
                        dict['name'] = item['name']
                        dict['startDateTime'] = new Date(item['startDateTime'])
                        dict['endDateTime'] = new Date(item['endDateTime'])
                        this.setState({items : [...this.state.items , dict]});
                        return true
                    }
                );
                //this.setState({items :res});
            }else{
                console.log(res.error);
                
            }
        });
    }
    componentWillReceiveProps(next , last){
        if(next.items){
      
          this.setState({items:next.items})
        }
      }
    
    handleItemEdit =(item, openModal)=> {
      if(item && openModal === true){
        this.setState({selected:[item] })
        return this._openModal();
      }  
    }
    handleCellSelection = (item, openModal) =>{
          if(this.state.selected && this.state.selected[0] === item){
            return  this._openModal();
          }
             this.setState({selected:[item] })
        }
      
    zoomIn = ()=>{
      var num = this.state.cellHeight + 15
      this.setState({cellHeight:num})
    }
    zoomOut=()=>{
      var num = this.state.cellHeight - 15
      this.setState({cellHeight:num})
    }
      
      
    handleDateRangeChange= (startDate, endDate) =>{
        this.setState({startDate:startDate })
    }
      
    handleRangeSelection= (selected)=> {
      this.setState({selected:selected , showCtrl:true})
      this._openModal();
      
    }
    handleItemChange =(items , item)=>{
        this.setState({items:items})
    }

    handleItemSize=(items , item)=>{    
        this.setState({items:items});
    }
        
    removeEvent=(items , item)=>{
        this.setState({ items:items});
    }    
    
    addNewEvent=(items , newItems)=>{
        let {activo} = this.props;        
        api.agenda.addEntry({activo,newItems}).then(
            res=>{
                if(!res.error){
                    this.setState({showModal:false ,selected:[] , items:items});
                    this._closeModal();
                }else{
                    this.setState({showModal:false ,selected:[]});
                    this._closeModal();
                }
            }
        )
        
    }
    
    editEvent =(items , item)=>{
        this.setState({showModal:false ,selected:[] , items:items});
        this._closeModal();
    }
        
    changeView = (days , event )=>{
        this.setState({numberOfDays:days})
        }
    _openModal =()=>{
        this.setState({showModal:true})
      }
    _closeModal =(e)=>{
        
        this.setState({showModal:false});
      }

    render(){
        let {handle,activo} = this.props;        
        return(
            <Grid>
                <Grid.Row> 
                    <Grid.Column floated='left'>
                        <Icon size='big' onClick={handle ? ()=>{handle('back');} : ()=>{this.props.history.push('/home');}}
                            link name='arrow alternate circle left outline'/>
                        </Grid.Column>                        
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column>
                            <Header 
                                as='h1'
                                content={`Planificador ${activo}`}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <div>
                            <div className="control-buttons">
                                <button  className="button-control" onClick={this.zoomIn}> <i className="zoom-plus-icon"></i> </button>
                                <button  className="button-control" onClick={this.zoomOut}> <i className="zoom-minus-icon"></i> </button>
                                <button  className="button-control" onClick={this._openModal}> <i className="schedule-icon"></i> </button>
                                <button  className="button-control" onClick={this.changeView.bind(null , 7)}> {moment.duration(7, "days").humanize()}  </button>
                                <button  className="button-control" onClick={this.changeView.bind(null , 4)}> {moment.duration(4, "days").humanize()}  </button>
                                <button  className="button-control" onClick={this.changeView.bind(null , 3)}> {moment.duration(3, "days").humanize()}  </button>
                                <button  className="button-control" onClick={this.changeView.bind(null , 1)}> {moment.duration(1, "day").humanize()} </button>
                            </div>
                            <ReactAgenda
                                minDate={now}
                                maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
                                disablePrevButton={false}
                                startDate={this.state.startDate}
                                cellHeight={this.state.cellHeight}
                                locale={moment.locale('es')}
                                items={this.state.items}
                                numberOfDays={this.state.numberOfDays}
                                rowsPerHour={this.state.rowsPerHour}
                                itemColors={colors}
                                view="calendar"
                                autoScale={false}
                                fixedHeader={true}
                                onRangeSelection={this.handleRangeSelection.bind(this)}
                                onChangeEvent={this.handleItemChange.bind(this)}
                                onChangeDuration={this.handleItemSize.bind(this)}
                                onItemEdit={this.handleItemEdit.bind(this)}
                                onCellSelect={this.handleCellSelection.bind(this)}
                                
                                onDateRangeChange={this.handleDateRangeChange.bind(this)}/>
                                {
                                    this.state.showModal? <Modal clickOutside={this._closeModal} >
                                    <div className="modal-content">
                                        <ReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} Addnew={this.addNewEvent} edit={this.editEvent}  />
                                    </div>
                                    </Modal>:''
                            }
                        </div>
                    </Grid.Row>                                    
            </Grid>
            
        )
    }
}


export default verAgenda;