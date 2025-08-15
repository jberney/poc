import { Center, Flex, Slider } from '@chakra-ui/react';
import { first } from 'lodash-es';
import React, { useEffect, useRef } from 'react';
import { supabase } from '../../../supabase/supabaseClient';

export function Siteframe() {
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const fetchValue = async () => {
      const { data } = await supabase.from('progress').select('value').eq('id', 1).single();
      if (data && !isDragging.current) setValue(data.value);
    };
    fetchValue();
    const handleVisibility = () => document.hidden || fetchValue();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);
  useEffect(() => {
    const channel = supabase
      .channel('progress-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'progress', filter: 'id=eq.1' },
        payload => isDragging.current || setValue(payload.new.value)
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);
  const isDragging = useRef(false);
  return (
    <Center p={4}>
      <Flex alignItems="center" maxW="20rem" w="full">
        <Slider.Root
          flex={1}
          max={10}
          min={0}
          onValueChange={e => {
            isDragging.current = true;
            const value = Number(first(e.value));
            setValue(value);
            supabase
              .from('progress')
              .update({ value })
              .eq('id', 1)
              .then(() => {});
          }}
          onValueChangeEnd={() => (isDragging.current = false)}
          size="lg"
          value={[value]}
        >
          <Slider.Label />
          <Slider.ValueText userSelect="none" />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb>
              <Slider.DraggingIndicator />
              <Slider.HiddenInput />
            </Slider.Thumb>
            <Slider.MarkerGroup>
              <Slider.Marker />
            </Slider.MarkerGroup>
          </Slider.Control>
        </Slider.Root>
      </Flex>
    </Center>
  );
}
