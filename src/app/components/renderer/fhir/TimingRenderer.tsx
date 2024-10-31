import { Timing } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/timing';
import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';

// CSS-in-JS style object
const styles = {
  indentedContent: {
    marginLeft: '25px', // Adjust indentation as needed
  },
};

export default function TimingRenderer({ value, configEntry }: RenderProps) {
  const timing = value as Timing;

  return (
    <div>
      <h4>{configEntry.display}:</h4>

      {/* Wrapper for indented content */}
      <div style={styles.indentedContent}>
        {/* Event times */}
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

        {/* Repeat details */}
        {timing.repeat && (
          <div>
            <strong>Repeat Details:</strong>
            {timing.repeat.count && <p>Count: {timing.repeat.count}</p>}
            {timing.repeat.countMax && (
              <p>Count Max: {timing.repeat.countMax}</p>
            )}
            {timing.repeat.duration && (
              <p>
                Duration: {timing.repeat.duration} {timing.repeat.durationUnit}
              </p>
            )}
            {timing.repeat.durationMax && (
              <p>
                Duration Max: {timing.repeat.durationMax}{' '}
                {timing.repeat.durationUnit}
              </p>
            )}
            {timing.repeat.frequency && (
              <p>Frequency: {timing.repeat.frequency}</p>
            )}
            {timing.repeat.frequencyMax && (
              <p>Frequency Max: {timing.repeat.frequencyMax}</p>
            )}
            {timing.repeat.period && (
              <p>
                Period: {timing.repeat.period} {timing.repeat.periodUnit}
              </p>
            )}
            {timing.repeat.periodMax && (
              <p>
                Period Max: {timing.repeat.periodMax} {timing.repeat.periodUnit}
              </p>
            )}
            {timing.repeat.dayOfWeek && timing.repeat.dayOfWeek.length > 0 && (
              <p>Days of Week: {timing.repeat.dayOfWeek.join(', ')}</p>
            )}
            {timing.repeat.timeOfDay && timing.repeat.timeOfDay.length > 0 && (
              <p>Times of Day: {timing.repeat.timeOfDay.join(', ')}</p>
            )}
            {timing.repeat.when && timing.repeat.when.length > 0 && (
              <p>When: {timing.repeat.when.join(', ')}</p>
            )}
            {timing.repeat.offset && (
              <p>Offset: {timing.repeat.offset} minutes</p>
            )}
          </div>
        )}

        {/* Codeable concept for timing abbreviation */}
        {timing.code && timing.code.coding && timing.code.coding.length > 0 && (
          <div>
            <strong>Code:</strong>
            <p>
              {timing.code.coding.map((coding) => coding.display).join(', ')}
            </p>
          </div>
        )}

        {/* Bounds details */}
        {timing.repeat?.boundsDuration && (
          <p>
            <strong>Bounds Duration:</strong>{' '}
            {timing.repeat.boundsDuration.value}{' '}
            {timing.repeat.boundsDuration.unit}
          </p>
        )}
        {timing.repeat?.boundsRange && (
          <p>
            <strong>Bounds Range:</strong>{' '}
            {timing.repeat.boundsRange.low?.value} -{' '}
            {timing.repeat.boundsRange.high?.value}{' '}
            {timing.repeat.boundsRange.low?.unit ||
              timing.repeat.boundsRange.high?.unit}
          </p>
        )}
        {timing.repeat?.boundsPeriod && (
          <p>
            <strong>Bounds Period:</strong>{' '}
            {timing.repeat.boundsPeriod.start
              ? new Date(timing.repeat.boundsPeriod.start).toLocaleString()
              : ''}{' '}
            -{' '}
            {timing.repeat.boundsPeriod.end
              ? new Date(timing.repeat.boundsPeriod.end).toLocaleString()
              : ''}
          </p>
        )}
      </div>
    </div>
  );
}
