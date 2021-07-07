import React, {Component} from 'react'
import toastr from 'cogo-toast';
import firebase from '../../firebase'

/*dropdown*/
import Dropdown, {
    MenuItem
} from '@trendmicro/react-dropdown';

import Checkbox from 'rc-checkbox';

class Create extends Component
{
	constructor() {
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			errors : [],
			name  : '',
            price : '',
            classes : '',
            level: {},
			language : null,
			intensity : null,
            materials : null,
            teachers: [],
            /*data from other tables*/
            levels: [],
            teachersToSelect: []
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleInsert = this.handleInsert.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
        this.fetchData();
	}

    fetchData(){
        firebase.database().ref('level').once("value", snapshot => {
            if (snapshot && snapshot.exists()) {
                snapshot.forEach(element => {
                    this.setState({
                        levels: [...this.state.levels, element.val()]
                    });
                });
            }
        });

        firebase.database().ref('teacher').once("value", snapshot => {
            if (snapshot && snapshot.exists()) {
                snapshot.forEach(element => {
                    this.setState({
                        teachersToSelect: [...this.state.teachersToSelect, element.val()]
                    });
                });
            }
        });

    }

	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		});
	}

	//--- Insert new user in users state array by props method ---//
	handleInsert(e) {
		e.preventDefault();
		const data = {
            id : '_' + Math.random().toString(36).substr(2, 9),
            name  : this.state.name,
            price : this.state.price,
            classes : this.state.classes,
            level: this.state.level,

            teachers: Array.from(new Set(this.state.teachers))
		}
       
        data.teachers.forEach(item => {
            delete item.courseTypes; //removing courseTypes from material in courseType table 
            delete item.courses;
        });
		if( !this.checkValidation(data) ) {
            const firestore = firebase.database().ref('/course_type');
            firestore.push(data);
			this.reset();
			this.props.updateState(data, 0);
			document.getElementById("closeAddModal").click();
			toastr.success('New course type added successfully!', {position : 'top-right', heading: 'Done'});
		}
	}
	//--- Validate all input field ---//
    checkValidation(fields) {
    	var error = {};
    	if(fields.name.length === 0) {
    		error.name = ['This field is required!'];
    	}
        if(fields.price.length === 0) {
    		error.price = ['This field is required!'];
    	}
        if(fields.classes.length === 0) {
    		error.classes = ['This field is required!'];
    	}
        if(Object.keys(this.state.level).length === 0){
            error.level = ['You must select level!'];
        }
        
        if(this.state.teachers.length === 0){
            error.teachers = ['You must select at least one teacher!'];
        }
		this.setState({
			errors : error
		})
		if(fields.name.length === 0 || fields.price.length === 0 || fields.classes.length === 0 || Object.keys(this.state.level).length === 0 || this.state.teachers.length === 0) {
			return true;
		} else {
			return false;
		}
    }
    //--- Reset all state variable while insert new user ---//
    reset() {
        this.setState(this.baseState);
        this.fetchData();
    }
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName) {
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName) {
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Nov član u vrsti kursa</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleInsert}>
			      		<div className="modal-body">
			          		<div className="form-group">
			            		<label htmlFor="name" className="col-form-label">Ime:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
			            		 id="name" name="name" placeholder="Ime" onChange={this.handleInputFieldChange} value={this.state.name}/>
			            		{this.renderErrorFor('name')}
			         	 	</div>
                            <div className="form-group">
			            		<label htmlFor="price" className="col-form-label">Cena:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('price') ? 'is-invalid' : ''}`}
			            		 id="price" name="price" placeholder="Cena" onChange={this.handleInputFieldChange} value={this.state.price}/>
			            		{this.renderErrorFor('price')}
			         	 	</div>
                            <div className="form-group">
			            		<label htmlFor="classes" className="col-form-label">Broj časova:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('classes') ? 'is-invalid' : ''}`}
			            		 id="classes" name="classes" placeholder="Broj časova" onChange={this.handleInputFieldChange} value={this.state.classes}/>
			            		{this.renderErrorFor('classes')}
			         	 	</div>
                             <div className="form-group" style={{marginBottom: '5px'}}>
                                <label htmlFor="level" className="col-form-label">Kategorija:</label>
                                <Dropdown style={{marginLeft: "10px", marginTop: "3px"}} className={`${this.hasErrorFor('level') ? 'is-invalid' : ''}`}>
                                    <Dropdown.Toggle title={Object.keys(this.state.level).length === 0 ? 'Level' : this.state.level.label} btnStyle="link"/>
                                    <Dropdown.Menu>
                                        {this.state.levels.map(item => (
                                            <MenuItem eventKey={item} onSelect={(eventKey) => {
                                                this.setState({
                                                    level : eventKey
                                                });
                                            }}>
                                                {item.label} 
                                            </MenuItem>
                                            ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                {this.renderErrorFor('level')}
                            </div>
                           
                            <div className="form-group" style={{marginBottom: '5px'}}>
                                <label htmlFor="teachers" className="col-form-label">Instruktor:</label>
                                        {this.state.teachersToSelect.map((item,index) => (
                                            <label style={{marginLeft: '10px'}} className={`${this.hasErrorFor('teachers') ? 'is-invalid' : ''}`}>
                                                <Checkbox
                                                onChange={(e) => {
                                                    if(e.target.checked){
                                                        this.setState({
                                                            teachers: [...this.state.teachers, item]
                                                        });
                                                    } else {
                                                        this.setState({
                                                            teachers : this.state.teachers.filter(teacher => {
                                                                teacher.name !== item.name;
                                                            })
                                                        });
                                                    }
                                                }}
                                                />
                                                {item.name} &nbsp;
                                            </label>   
                                        ))}
                                {this.renderErrorFor('teachers')}
                            </div>
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeAddModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Nazad</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Sačuvaj izmene</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Create