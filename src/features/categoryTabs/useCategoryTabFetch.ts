import { useCallback, useRef } from 'react';

const FOCUS_DELAY_MS = 2000;

export function useCategoryTabFetch(fetchAction: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onFocus = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      fetchAction();
    }, FOCUS_DELAY_MS);
  }, [fetchAction, clearTimer]);

  const onBlur = useCallback(() => {
    clearTimer();
  }, [clearTimer]);

  const onClick = useCallback(() => {
    clearTimer();
    fetchAction();
  }, [fetchAction, clearTimer]);

  return { onFocus, onBlur, onClick };
}
