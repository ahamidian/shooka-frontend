import React from "react";
import PropTypes from 'prop-types';
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import {findAndParseAction, getActionDataFromParams} from "@/components/notification/actions";


export default class NotificationActionSelect extends React.Component {
    static propTypes = {
        actions: PropTypes.array.isRequired,
        hintText: PropTypes.string,
        floatingLabelText: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedAction: null,
            paramValues: {},
            errors: {}
        };

        if (props.input.value) {
            const parsedAction = findAndParseAction(props.actions, props.input.value);

            if (parsedAction) {
                this.state.selectedAction = parsedAction.action;
                this.state.paramValues = parsedAction.params;
            }
        }
    }

    componentDidMount() {
        if (this.state.selectedAction) {
            this.emitChange();
        }
    }

    componentDidUpdate() {
        const {submitFailed} = this.props.meta;
        const errors = submitFailed ? this.props.meta.error : null;

        if (errors !== this.state.errors) {
            this.setState({errors: errors})
        }
    }

    emitChange() {
        const {selectedAction, paramValues} = this.state;

        if (selectedAction == null) {
            this.props.input.onChange(null);
            return;
        }

        let actionData = getActionDataFromParams(selectedAction, paramValues);

        this.props.input.onChange({
            id: selectedAction.id,
            action_type: selectedAction.actionType,
            params: paramValues,   // paramValue need to be sent for validation
            ...actionData
        });
    }

    selectAction(action) {
        this.setState({
            selectedAction: action,
            paramValues: {}
        }, this.emitChange.bind(this));
    }

    setParamValues(key, value) {
        this.setState({
            paramValues: {...this.state.paramValues, [key]: value}
        }, this.emitChange.bind(this));
    }

    getSelectedActionParams() {
        if (!this.state.selectedAction) {
            return [];
        }

        return this.state.selectedAction.params || [];
    }

    render() {
        const {selectedAction, paramValues} = this.state;
        const errors = this.state.errors || {};
        const {actions, hintText, floatingLabelText} = this.props;

        return (
            <div>
                <SelectField
                    className="mui-select"
                    name="action"
                    value={selectedAction}
                    floatingLabelText={floatingLabelText}
                    hintText={hintText}
                    fullWidth={true}
                    maxHeight={240}
                    onChange={(event, key, value) => this.selectAction(value)}
                >
                    {actions.map((action) => (
                        <MenuItem key={action.id} value={action} primaryText={action.text}/>))}
                </SelectField>

                {
                    this.getSelectedActionParams().map((item, idx) => {
                        if (item.type === 'text') {
                            return (
                                <TextField
                                    key={`${selectedAction.id}${idx}`}
                                    floatingLabelText={`${item.label}`}
                                    value={paramValues[item.name]}
                                    onChange={(e, value) => this.setParamValues(item.name, value)}
                                    errorText={errors[item.name]}
                                />
                            )
                        } else if (item.type === 'select') {
                            return (
                                <SelectField
                                    key={`${selectedAction.id}${idx}`}
                                    floatingLabelText={item.label}
                                    value={paramValues[item.name]}
                                    onChange={(e, k, value) => this.setParamValues(item.name, value)}
                                >
                                    {item.items.map(i => <MenuItem value={i.value} primaryText={i.text}/>)}
                                </SelectField>
                            )
                        }
                    })
                }
            </div>
        );
    }
}
