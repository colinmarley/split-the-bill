import React from 'react';
import SummaryPersonCostItem from './SummaryPersonCostItem';

interface Props {
  people: any[];
}

export default function SummaryPersonList({ people }: Props) {
  return (
    <>
      {people.map((person: any) => (
        <SummaryPersonCostItem key={person.id} person={person} />
      ))}
    </>
  );
}
