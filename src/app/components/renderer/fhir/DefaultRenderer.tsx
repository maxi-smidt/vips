import { RenderProps } from '@/app/components/renderer/RenderProps';
import React from 'react';
import { Text, View } from '@react-pdf/renderer';

export default function DefaultRenderer({
  value,
  configEntry,
  pdf,
}: RenderProps) {
  if (pdf) {
    return (
      <View>
        <Text style={{ fontWeight: 'bold' }}>{configEntry.display}: </Text>
        <Text>{value as string}:</Text>
      </View>
    );
  }
  return (
    <p>
      <strong>{configEntry.display}:</strong> {value as string}
    </p>
  );
}
