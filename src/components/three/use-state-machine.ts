import { useRocketStore } from '@/lib/stores/rocket-store';
import { useEffect } from 'react';

type StateMachineConfig = {
  initial: RocketState;
  states: {
    [key in RocketState]: {
      onEnter?: () => void;
      onLeave?: () => void;
    };
  };
};

export type RocketState = 'idle' | 'launching' | 'following' | 'resetting';

type StateMachine = {
  value: RocketState;
  transitionTo: (nextState: RocketState) => void;
};

const useStateMachine = (config: StateMachineConfig): StateMachine => {
  const rocketState = useRocketStore((state) => state.rocketState);
  const setRocketState = useRocketStore((state) => state.setRocketState);

  const transitionTo = (nextState: RocketState) => {
    const currentStateConfig = config.states[rocketState];
    const nextStateConfig = config.states[nextState];

    if (!nextStateConfig) {
      console.warn(`No state "${nextState}" found in the state machine.`);
      return;
    }

    console.log(`🚀 [${rocketState}] -> [${nextState}]`);

    // Call onLeave for the current state
    currentStateConfig.onLeave?.();

    // Change the state in the Zustand store
    setRocketState(nextState);

    // Call onEnter for the next state
    nextStateConfig.onEnter?.();
  };

  // Trigger the initial state's onEnter if defined
  useEffect(() => {
    const initialStateConfig = config.states[config.initial];
    initialStateConfig.onEnter?.();
  }, [config.initial, config.states]);

  return {
    value: rocketState,
    transitionTo,
  };
};

export default useStateMachine;
