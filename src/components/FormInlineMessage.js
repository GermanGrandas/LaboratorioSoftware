
import React from 'react';
import PropTypes from 'prop-types';

const FormInlineMessage = ({content, type})=>{
    return ( 
        <span style={{
            color : type === 'error' ? "#9f3A38" : "#6597a7"
        }}>
            {content}
        </span>
    )
}

FormInlineMessage.defaultProps ={
    content : PropTypes.string,
    type : PropTypes.oneOf(["error","info"]).isRequired
}
FormInlineMessage.defaultProps ={
    content : ""
}
export default FormInlineMessage;