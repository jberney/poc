import { Center, Slider, VStack } from '@chakra-ui/react';
import { keys, map } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/supabaseClient';

const userId = Math.random().toString(36).slice(2, 10);

export function PlayerSlider({ label, ...props }) {
  return (
    <Slider.Root max={10} min={0} size="lg" w="full" {...props}>
      <Slider.Label children={label} fontWeight={props?.disabled ? 400 : 600} />
      <Slider.ValueText userSelect="none" />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb>
          <Slider.DraggingIndicator />
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  );
}

export function Siteframe() {
  const [channel] = useState(supabase.channel('channel', { config: { presence: { key: userId } } }));
  const [userIds, setUserIds] = useState(keys(channel.presenceState()));
  const [values, setValues] = useState({});

  useEffect(() => {
    channel
      .on('presence', { event: 'sync' }, () => setUserIds(keys(channel.presenceState())))
      .on('broadcast', { event: 'setValue' }, ({ payload }) =>
        setValues(prev => ({
          ...prev,
          [payload.userId]: payload.value,
        }))
      )
      .subscribe(async status => status === 'SUBSCRIBED' && channel.track({ value: [4] }));
    return () => channel.untrack();
  }, []);

  return (
    <Center p={4}>
      <VStack maxW="20rem" w="full" spacing={6}>
        <strong>Your user id:{userId}</strong>
        {map(userIds, id => (
          <PlayerSlider
            key={id}
            label={id}
            disabled={id !== userId}
            onValueChange={async e => {
              await channel.send({
                event: 'setValue',
                payload: { userId, value: e.value },
                type: 'broadcast',
              });
            }}
            value={values[id] || 0}
          />
        ))}
      </VStack>
    </Center>
  );
}
