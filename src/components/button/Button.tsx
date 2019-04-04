import React from 'react';

import './Button.scss';

interface IButtonProps {
  children: any;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  small?: boolean;
}

export default function Button(props: IButtonProps) {
  const { children, onClick = () => {}, disabled = false, className = '', small = false } = props;

  // væri líka hægt að nota `classnames` pakka
  const classes = [
    'button', className ? className : null,
    disabled ? 'button--disabled' : null,
    small ? 'button--small' : null
  ].filter(Boolean).join(' ');

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>{children}</button>
  )
}
