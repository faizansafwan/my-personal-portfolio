import React from 'react';
import './PageBackdrop.css';

export default function PageBackdrop() {
  return (
    <div className="page-backdrop" aria-hidden="true">
      <div className="page-backdrop__orb page-backdrop__orb--1" />
      <div className="page-backdrop__orb page-backdrop__orb--2" />
      <div className="page-backdrop__grid" />
    </div>
  );
}
