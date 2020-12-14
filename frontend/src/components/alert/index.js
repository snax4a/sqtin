/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { alertService, AlertType } from '_services';
import { useHistory } from 'react-router-dom';
import './styles/alert.scss';

const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

const defaultProps = {
  id: 'default-alert',
  fade: true,
};

export default function Alert({ id, fade }) {
  const [alerts, setAlerts] = useState([]);
  const history = useHistory();

  const removeAlert = useCallback(
    (alert) => {
      if (fade) {
        // fade out alert
        const alertWithFade = { ...alert, fade: true };
        setAlerts((alerts) => alerts.map((x) => (x === alert ? alertWithFade : x)));

        // remove alert after faded out
        setTimeout(() => {
          setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
        }, 250);
      } else {
        // remove alert
        setAlerts((alerts) => alerts.filter((x) => x !== alert));
      }
    },
    [fade]
  );

  useEffect(() => {
    // subscribe to new alert notifications
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      // clear alerts when an empty alert is received
      if (!alert.message) {
        setAlerts((alerts) => {
          // filter out alerts without 'keepAfterRouteChange' flag
          const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          filteredAlerts.forEach((x) => delete x.keepAfterRouteChange);
          return filteredAlerts;
        });
      } else {
        // add alert to array
        setAlerts((alerts) => [...alerts, alert]);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => removeAlert(alert), 3000);
        }
      }
    });

    // clear alerts on location change
    const historyUnlisten = history.listen(({ pathname }) => {
      // don't clear if pathname has trailing slash because this will be auto redirected again
      if (pathname.endsWith('/')) return;

      alertService.clear(id);
    });

    // clean up function that runs when the component unmounts
    return () => {
      // unsubscribe & unlisten to avoid memory leaks
      subscription.unsubscribe();
      historyUnlisten();
    };
  }, [id, removeAlert, history]);

  function cssClasses(alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning',
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

  if (!alerts.length) return null;

  return (
    <div className="alert-container">
      {alerts.map((alert, index) => (
        <div key={index} className={cssClasses(alert)}>
          <span dangerouslySetInnerHTML={{ __html: alert.message }} />
          <span className="close" onClick={() => removeAlert(alert)}>
            &times;
          </span>
        </div>
      ))}
    </div>
  );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
