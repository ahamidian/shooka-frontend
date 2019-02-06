import React, {Component, Fragment} from 'react';
import {Form, Button, Label} from 'semantic-ui-react';
import {withRouter} from "react-router-dom";
import Select, {components} from 'react-select';
import conditions from './conditions';
import {getApi} from "../../api";
import {LOGIN} from "../../actions/UserActions";

class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: null,
            operation: null,
            value: ""
        }
    }


    getConditionOption() {
        let options = [];
        conditions.map(condition => options.push({
            value: condition.value,
            label: condition.label,
            operations: condition.operations.map((operation) => {
                return {"value": operation, "label": operation}
            })
        }));
        return options

    }

    onFieldSelectChange = (selectedOption) => {
        this.setState({field: selectedOption, operation: null, value: ""});
    };
    onOperationSelectChange = (selectedOption) => {
        this.setState({operation: selectedOption, value: ""});
    };

    onValueChange = (value) => {
        this.setState({value}, () => this.props.onChange({
            field: this.state.field.value,
            operation: this.state.operation.value,
            value: this.state.value
        }));

    };

    onSubmit = () => {
        getApi().post(`filter/`, {
            field: this.state.field.value,
            operation: this.state.operation.value,
            value: this.state.value
        })
            .then(response => {
                console.log(response)
            })
            .catch((response) => {
                console.log(response)

            });
    };

    renderOperationSelect() {
        if (this.state.field !== null) {
            return (
                <div style={{width: "200px", marginRight: "10px"}}>
                    <Select
                        value={this.state.operation}
                        onChange={this.onOperationSelectChange}
                        options={this.state.field.operations}
                    />
                </div>
            )
        }
    }

    renderInput() {
        if (this.state.field !== null) {
            return (
                <Form.Field>
                    <input value={this.state.value}
                           onChange={(event) => this.onValueChange(event.target.value)}/>
                </Form.Field>
            )
        }
    }

    render() {
        return (
            <div style={{display: "flex", marginBottom: "20px"}}>
                <div style={{width: "200px", marginRight: "10px"}}>
                    <Select
                        value={this.state.field}
                        onChange={this.onFieldSelectChange}
                        options={this.getConditionOption()}
                    />
                </div>

                {this.renderOperationSelect()}
                {this.renderInput()}
                <Button onClick={() => this.onSubmit()}>evaluate</Button>
            </div>


        );
    }
}


export default withRouter(FilterForm);

