import React from 'react'
import {Input, Icon, Button} from 'semantic-ui-react'

class EditableField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            text:""
        }
    };

    turnEditModeOn=()=>{
        this.setState({text:this.props.text,isEditMode: true});
        // this.inputRef.focus();

    };
    handleRef = (c) => {
        this.inputRef = c
    };

    render() {
        if (!this.state.isEditMode) {
            const Tag=this.props.tag;
            // return (
            //     <Tag onDoubleClick={() => this.turnEditModeOn()}>{this.props.text}</Tag>
            // )
            return (
                <p style={{fontWeight:"600",fontSize: "20px",marginBottom:"5px"}} onDoubleClick={() => this.turnEditModeOn()}>{this.props.text}</p>
            )
        }
        else {
            return (
                <div style={{display: "flex"}}>
                    <Input icon style={{paddingRight:"5px"}} value={this.state.text} ref={this.handleRef}
                           onChange={(event) => this.setState({text: event.target.value})}/>
                    <Button icon primary>
                        <Icon name='check'/>
                    </Button>
                    <Button icon onClick={() => this.setState({isEditMode: false})}>
                        <Icon name='cancel'/>
                    </Button>
                </div>
            )
        }

    }
};

export default EditableField
