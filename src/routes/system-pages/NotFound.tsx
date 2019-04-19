import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import './SystemPages.scss';

export default function NotFound() {
  return (
    <Fragment>
      <Helmet title="Síða finnst ekki" />
      <div className="system-page">
        <h1 className="system-page__title">Síða finnst ekki</h1>
        <Link to="/" className="system-page__link">Aftur á forsíðu</Link>
      </div>
    </Fragment>
  )
}
