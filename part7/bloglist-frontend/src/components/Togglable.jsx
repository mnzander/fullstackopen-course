import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    padding: 0.5em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
  `;

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <br />
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
