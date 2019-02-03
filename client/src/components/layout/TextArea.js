
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TextFieldGroup from "./TextFieldGroup";

const TextArea = ({
                            name,
                            placeholder,
                            value,
                            error,
                            info,
                            onChange
                        }) => {
    return (
        <div className="form-group">
            <textarea
                className={classnames('form-control form-control-lg', {
                       'is-invalid': error
                   })}
                   placeholder={placeholder}
                   name={name}
                   value={value}
                   onChange={onChange}
            />
            {info && (<small className="form-text text-mutated">{info}</small>)}
            {error && (<div className="invalid-feedback"> {error} </div>)}

        </div>
    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string
};



export default TextArea;
