import React from 'react';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import './landing.css';

export default function renderLanding(props){

    return (
        <div className="landBox">
        <strong className="landTitleText">Tramd19</strong>
        <strong className="landTitleDesc">Traffic Management for Covid19</strong>
        <DriveEtaIcon className="landIcon1"/>
        <LocalHospitalIcon className="landIcon2"/>
        
        </div>
    );
}