
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TextFieldGroup from "./TextFieldGroup";

const SocialMediaInput = ({
                      name,
                      placeholder,
                      value,
                      error,
                      icon,
                      type,
                      onChange
                  }) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && (<div className="invalid-feedback"> {error} </div>)}

        </div>
    )
}

SocialMediaInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

SocialMediaInput.defaultProps = {
    type: 'text'
};

export default SocialMediaInput;
