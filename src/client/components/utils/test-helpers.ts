import { act } from 'react-dom/test-utils';

const next = () => new Promise((resolve) => process.nextTick(resolve));

export const nextProcess = async () => {
  await act(async () => {
    await next();
  })
}
