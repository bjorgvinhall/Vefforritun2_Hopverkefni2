import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './SystemPages.scss';

export default function NotFound() {
  return (
    <Fragment>
      <div className="system-page">
        <h1 className="system-page__title">Aðgangur óheimilaður</h1>
        <Link to="/" className="system-page__link">Aftur á forsíðu</Link>
      </div>
    </Fragment>
  )
}
