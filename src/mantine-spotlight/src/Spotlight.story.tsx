/* eslint-disable no-console */
import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { Spotlight } from './Spotlight2';
import { createSpotlight } from './spotlight.store';

const [store, actions] = createSpotlight();

export default { title: 'Spotlight' };

const actionsData = [
  { label: 'Home', description: 'Home page', keyword: 'test' },
  { label: 'About', description: 'About me', keyword: 'ng' },
  { label: 'Contact', description: 'Contact me', keyword: 'react' },
];

export function Compound() {
  const [query, setQuery] = useState('');

  const actionsList = actionsData
    .filter((action) => action.label.toLowerCase().includes(query.toLowerCase().trim()))
    .map((action) => (
      <Spotlight.Action
        key={action.label}
        onClick={() => console.log(`action ${action.label}`)}
        label={action.label}
        description={action.description}
        keywords={action.keyword}
      />
    ));

  return (
    <div style={{ padding: 40 }}>
      <Spotlight.Root
        store={store}
        query={query}
        onQueryChange={setQuery}
        onSpotlightOpen={() => console.log('open')}
        onSpotlightClose={() => console.log('close')}
      >
        <Spotlight.Search
          placeholder="Search something..."
          leftSection={<IconSearch stroke={1.5} size={20} />}
        />

        <Spotlight.ActionsList>
          {actionsList}
          {actionsList.length === 0 && <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>

        <Spotlight.Footer>This is footer</Spotlight.Footer>
      </Spotlight.Root>

      <Button onClick={actions.open}>Open spotlight</Button>
    </div>
  );
}
