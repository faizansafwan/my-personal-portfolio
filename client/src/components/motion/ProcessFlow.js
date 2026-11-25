import React from 'react';
import { ClipboardList, Code2, Frame, MonitorPlay, PackageCheck } from 'lucide-react';
import { deliverables, processSteps } from '../../data/motion';
import './ProcessFlow.css';

const ICONS = { brief: ClipboardList, style: Frame, build: Code2, test: MonitorPlay, deliver: PackageCheck };

export default function ProcessFlow() {
  return (
    <>
      <ol className="process">
        {processSteps.map((step, i) => {
          const Icon = ICONS[step.id];
          return (
            <li key={step.id} className="process__step motion-fade">
              <span className="process__icon" aria-hidden="true">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__text">{step.text}</p>
            </li>
          );
        })}
      </ol>

      <div className="deliver">
        <div className="deliver__col tile-card motion-fade">
          <h3 className="deliver__title">Lottie UI animation</h3>
          <ul className="deliver__list">
            {deliverables.lottie.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="deliver__col tile-card motion-fade">
          <h3 className="deliver__title">Motion graphics video</h3>
          <ul className="deliver__list">
            {deliverables.video.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
