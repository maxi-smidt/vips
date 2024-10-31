import React from 'react';
import { Timing } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/timing';

export default function TimingRenderer({ value, configEntry }) {
  const timing = value as Timing;

  return (
    <div>
      <h4>{configEntry.display}:</h4>
      <div className="ml-4 mb-2 space-y-2" style={{ width: '400px' }}>
        {timing.event && timing.event.length > 0 && (
          <div>
            <strong>Event Times:</strong>
            <ul>
              {timing.event.map((event, index) => (
                <li key={index}>{new Date(event).toLocaleString()}</li>
              ))}
            </ul>
          </div>
        )}

        {timing.repeat && (
          <div>
            <strong>Repeat Details:</strong>
            {timing.repeat.count && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Count:</div>
                <div className="flex-1 ml-4">{timing.repeat.count}</div>
              </div>
            )}
            {timing.repeat.countMax && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Count Max:</div>
                <div className="flex-1 ml-4">{timing.repeat.countMax}</div>
              </div>
            )}
            {timing.repeat.duration && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Duration:</div>
                <div className="flex-1 ml-4">
                  {timing.repeat.duration} {timing.repeat.durationUnit}
                </div>
              </div>
            )}
            {timing.repeat.durationMax && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Duration Max:</div>
                <div className="flex-1 ml-4">
                  {timing.repeat.durationMax} {timing.repeat.durationUnit}
                </div>
              </div>
            )}
            {timing.repeat.frequency && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Frequency:</div>
                <div className="flex-1 ml-4">{timing.repeat.frequency}</div>
              </div>
            )}
            {timing.repeat.frequencyMax && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Frequency Max:</div>
                <div className="flex-1 ml-4">{timing.repeat.frequencyMax}</div>
              </div>
            )}
            {timing.repeat.period && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Period:</div>
                <div className="flex-1 ml-4">
                  {timing.repeat.period} {timing.repeat.periodUnit}
                </div>
              </div>
            )}
            {timing.repeat.periodMax && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Period Max:</div>
                <div className="flex-1 ml-4">
                  {timing.repeat.periodMax} {timing.repeat.periodUnit}
                </div>
              </div>
            )}
            {timing.repeat.dayOfWeek && timing.repeat.dayOfWeek.length > 0 && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Days of Week:</div>
                <div className="flex-1 ml-4">
                  {timing.repeat.dayOfWeek.join(', ')}
                </div>
              </div>
            )}
            {timing.repeat.timeOfDay && timing.repeat.timeOfDay.length > 0 && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Times of Day:</div>
                <div className="flex-1 ml-4">
                  {timing.repeat.timeOfDay.join(', ')}
                </div>
              </div>
            )}
            {timing.repeat.when && timing.repeat.when.length > 0 && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>When:</div>
                <div className="flex-1 ml-4">
                  {timing.repeat.when.join(', ')}
                </div>
              </div>
            )}
            {timing.repeat.offset && (
              <div className="flex items-center ml-4">
                <div style={{ width: '175px' }}>Offset:</div>
                <div className="flex-1 ml-4">
                  {timing.repeat.offset} minutes
                </div>
              </div>
            )}
          </div>
        )}

        {timing.code && timing.code.coding && timing.code.coding.length > 0 && (
          <div>
            Code:
            <p>
              {timing.code.coding.map((coding) => coding.display).join(', ')}
            </p>
          </div>
        )}

        {timing.repeat?.boundsDuration && (
          <div className="flex items-center ml-4">
            <div style={{ width: '175px' }}>Bounds Duration:</div>
            <div className="flex-1 ml-4">
              {timing.repeat.boundsDuration.value}{' '}
              {timing.repeat.boundsDuration.unit}
            </div>
          </div>
        )}

        {timing.repeat?.boundsRange && (
          <div className="flex items-center ml-4">
            <div style={{ width: '175px' }}>Bounds Range:</div>
            <div className="flex-1 ml-4">
              {timing.repeat.boundsRange.low?.value} -{' '}
              {timing.repeat.boundsRange.high?.value}{' '}
              {timing.repeat.boundsRange.low?.unit ||
                timing.repeat.boundsRange.high?.unit}
            </div>
          </div>
        )}

        {timing.repeat?.boundsPeriod && (
          <div className="flex items-center ml-4">
            <div style={{ width: '175px' }}>Bounds Period:</div>
            <div className="flex-1 ml-4">
              {timing.repeat.boundsPeriod.start
                ? new Date(timing.repeat.boundsPeriod.start).toLocaleString()
                : ''}{' '}
              -
              {timing.repeat.boundsPeriod.end
                ? new Date(timing.repeat.boundsPeriod.end).toLocaleString()
                : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
